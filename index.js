import { createCharacterCard } from './components/CharacterCard/CharacterCard.js';

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
let searchQuery = '';

pagination.textContent = `${page} / ${maxPage}`;

/*---------------------------------------------------------------------------------
| Fetch Data
|----------------------------------------------------------------------------------
| 
*/
const baseURL = 'https://rickandmortyapi.com/api/';

async function fetchCharacters(url) {
	cardContainer.innerHTML = '';

	// const resp = await fetch('https://rickandmortyapi.com/api/character');
	const resp = await fetch(url);
	const data = await resp.json();

	console.log(data.results);

	const results = data.results;

	results.forEach((result) => {
		cardContainer.appendChild(createCharacterCard(result));
    });
}
// 
 //fetchCharacters(baseURL + 'character');
// fetchCharacters(baseURL + 'character?page=3');
fetchCharacters(baseURL + `character/?name=${searchQuery}`);

/*---------------------------------------------------------------------------------
| Pagination
|----------------------------------------------------------------------------------
| 
*/
prevButton.addEventListener('click', showPreviousCharacter);
nextButton.addEventListener('click', showNextCharacter);

function showPreviousCharacter() {
    page--;
    
    if (page < 1) {
        page = 1;	
	}

    pagination.textContent = `${page} / ${maxPage}`;

	fetchCharacters(baseURL + `character/?page=${page}`);
}

function showNextCharacter() {
    page++;
    
    if (page > maxPage) {
        page = maxPage;
	}

	pagination.textContent = `${page} / ${maxPage}`;

	fetchCharacters(baseURL + `character/?page=${page}`);
}


/*---------------------------------------------------------------------------------
| Search Bar
|----------------------------------------------------------------------------------
| 
*/
