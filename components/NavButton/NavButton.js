export function NavButton(label, onClick) {
	const btn = document.createElement('button');

	btn.classList.add('button');

	if (label === 'previous') {
		btn.classList.add('button--prev');
		btn.setAttribute('data-js', 'button-prev');
	} else {
		btn.classList.add('button--next');
		btn.setAttribute('data-js', 'button-next');
	}

	btn.textContent = label;

	btn.addEventListener('click', onClick);

	return btn;
}