//Render top books
export const renderTopBooks = (data, booksPerRow) => {;
    const categoriesTopBooks = data.map(el => {
        const categorieName = el.list_name;
        const books = renderOneBook(el.books.slice(0, booksPerRow))
        return `<div class="books-category-container">
        <h3 class="books-category-title">${categorieName}</h3>
        <ul class="books-list">${books}</ul>
        <div class="books-btn-container">
          <button data-categorieName="${categorieName}" type="button" class="books-btn">see more</button>
        </div>
      </div>`;
    }).join('');

    return `<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${categoriesTopBooks}</div>`;
}

//Render categories
export const renderCategoriesList = (data) => {
  const categoriesItems = data.map(el => {
    return `<li class="categories-list">
      <a href="#" data-categorieName="${el.list_name}" class="categories-nav">${el.list_name}</a>
    </li>`;
  }).join('');

  return `<li class="categories-list">
  <a href="#" data-categorieName="" class="categories-nav active">All categories</a>
  </li>${categoriesItems}`;
}

//Render category books
export const renderBooksByCategory = (data, categoryName) => {
    const books = renderOneBook(data)
    const categoryMarkup = `<div class="books-container">
    <h2 class="books-title">${categoryName}</h2>
    <div class="books-category-container">
      <ul class="books-list">${books}</ul>
    </div>
  </div>`;

    return categoryMarkup;
}

//Render one book
function renderOneBook(books) {
    const booksRendered = books.map(el => {
        const {_id, book_image, title, author} = el;
        return `<li class="books-item">
        <div class="books-wrapper">
          <img
            class="books-img"
            src="${book_image}"
            alt="${title}"
          />
          <a href="#" data-id="${_id}" class="books-overlay">
            QUICK VIEW
          </a>
        </div>
        <div class="books-info">
          <p class="books-info-title">${title}</p>
          <p class="books-info-author">${author}</p>
        </div>
      </li>`;
    }).join('');

    return booksRendered;
} 