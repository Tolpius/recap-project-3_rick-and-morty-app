import { createCharacterCard } from './components/CharacterCard/CharacterCard.js';

import { NavButton } from './components/NavButton/NavButton.js';
import { NavPagination } from './components/NavPagination/NavPagination.js';
import { SearchBar } from './components/SearchBar/SearchBar.js';

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 42;
let page = 1;
let searchQuery = '';

// pagination.textContent = `${page} / ${maxPage}`;

/*---------------------------------------------------------------------------------
| Use Component-Functions
|----------------------------------------------------------------------------------
| 
*/
const prevButton = NavButton("previous", showPreviousCharacter);
const nextButton = NavButton("next", showNextCharacter);
const pagination = NavPagination();
const searchBar = SearchBar((event, page) => showSearchResults(event, page));

navigation.append(prevButton, pagination, nextButton);

searchBarContainer.append(searchBar);

/*---------------------------------------------------------------------------------
| Fetch Data
|----------------------------------------------------------------------------------
| 
*/
const baseURL = 'https://rickandmortyapi.com/api/';

async function fetchCharacters(url) {
	console.log('fetching characters from: ' + url);
	cardContainer.innerHTML = '';

	try {
		const resp = await fetch(url);

		if (!resp.ok) {
			cardContainer.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
			return;
		}

		const data = await resp.json();
		const results = data.results;

		maxPage = data.info.pages;
		pagination.textContent = `${page} / ${maxPage}`;

		console.log(data.results);
		console.log('maxPage: ' + maxPage);

		results.forEach((result) => {
			cardContainer.appendChild(createCharacterCard(result));
		});
	} catch (error) {
		cardContainer.innerHTML = '<p>Fehler beim Laden der Daten.</p>';
		navigation.innerHTML = '';

		console.error(error);
	}
}

fetchCharacters(baseURL + 'character');
// fetchCharacters(baseURL + 'character?page=3');
// fetchCharacters(baseURL + `character/?name=${searchQuery}`);

/*---------------------------------------------------------------------------------
| Pagination
|----------------------------------------------------------------------------------
| 
*/
function showPreviousCharacter(event) {
	page--;
	if (page < 1) page = 1;
	else showSearchResults(event, page);
}

function showNextCharacter(event) {
	page++;
	if (page > maxPage) page = maxPage;
	else showSearchResults(event, page);
}

/*---------------------------------------------------------------------------------
| Search Bar
|----------------------------------------------------------------------------------
| 
*/
const searchInput = document.querySelector('[data-js="search-bar"] input');

searchBar.addEventListener('submit', showSearchResults);

function showSearchResults(event, newPage = 1) {
	event.preventDefault();

	searchQuery = searchInput.value;

	if (event.type === 'submit') {
		page = 1;
	} else {
		page = newPage;
	}

	let url;

	if (searchQuery.trim() === '') {
		url = baseURL + `character?page=${page}`;
	} else {
		url = baseURL + `character?page=${page}&name=${searchQuery}`;
	}

	fetchCharacters(url);
}
