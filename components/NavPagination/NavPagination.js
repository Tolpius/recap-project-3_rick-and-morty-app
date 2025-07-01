export function NavPagination() {
    const paginationSpan = document.createElement('span');

    paginationSpan.classList.add('navigation__pagination');
    paginationSpan.setAttribute('data-js', "pagination");

    paginationSpan.textContent = '1 / 1';

    return paginationSpan;
}