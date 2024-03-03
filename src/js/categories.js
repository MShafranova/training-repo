//Render one book
function renderOneBook(books) {
  const booksRendered = books.map(el => {
      const {_id, book_image, title, author} = el;
      return `<li class="books-box-itm" id="${_id}">
      <div class="books-box-wrap">
              <img
                class="books-img"
                src="${book_image}"
                alt="${title}"
              />
              <div class="books-overlay">
                <a href="#" data-id="${_id}" class="books-overlay-text">
                quick view </a>
              </div>
            </div>
            <div class="books-box-desc">
              <p class="books-box-desc-title">${title}</p>
              <p class="books-box-desc-author">${author}</p>
            </div> 
            </li>`;
  }).join('');

  return booksRendered;
} 
//Render top books
export const renderTopBooks = (data, booksPerRow) => {;
  const categoriesTopBooks = data.map(el => {
      const categorieName = el.list_name;
      const books = renderOneBook(el.books.slice(0, booksPerRow))
      return `<div class="books-box-holder">
        <h3 class="books-box-subtitle">${categorieName}</h3>
        <ul class="books-box-list">${books}</ul>
        <button data-categorieName="${categorieName}" class="books-btn-see-more" type="button">see more</button>
      </div>`;
  }).join('');

  return `<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${categoriesTopBooks}</div>`;
}
//Render categories
export const renderCategoriesList = (data) => {
  const categoriesItems = data.map(el => {
    return `<li class="categories-itm"><a href="#" data-categorieName="${el.list_name}">${el.list_name}</a></li>`;
  }).join('');

  return `<li class="categories-itm js-categories-current "><a href="#" data-categorieName="">All categories</a></li>${categoriesItems}`;
}
//Render category books
export const renderBooksByCategory = (data, categoryName) => {
  const books = renderOneBook(data)
  const categoryMarkup = `<div class="books-category-box visually-hidden">
<h2 class="books-box-title">${categoryName}</h2>
        <ul class="books-category-list">${books}</ul>
        </div>`;
  return categoryMarkup;
}













// // Cтворення та відображення списку категорій книг
// const categoriesList = document.querySelector('.categories-list');

// export function generateCategoryListItem(book) {
//     return `<li class='сategories-itm'><a href="">${book.list_name}</a></li>`;
// }

// export function renderCategoriesListList(books) {
//     const markup = books.map(generateCategoryListItem).join('');
//     categoriesList.innerHTML = markup;
// }
// // Функції для генерації HTML-розмітки відображення списку книг
// // const booksBoxHolder = document.querySelector('.books-box-holder');

// // function generateCategoryTitle(books) {
// //     return `<h3 class="books-box-subtitle">${books.list_name}</h3>`;
// // }

// // Викликати функцію з назвою категорії і вставити елемент в DOM
// // export function insertCategoryTitleIntoDOM(categoryName) {
// //   const categoryTitleMarkup = generateCategoryTitle(categoryName);
// //   booksBoxHolder.insertAdjacentHTML('beforeend', categoryTitleMarkup);
// // }

// export function generateMainBookHTML(book) {
//     const { book_image, title, author, _id } = book;

//     return `<li class="books-category-item">
//             <div class="books-box-wrap">
//               <img
//                 class="books-img"
//                 src="${book_image}" 
//                 alt="${title}"
//               />
//               <div class="books-overlay">
//                 <p class="books-overlay-text">quick view</p>
//               </div>
//             </div>
//             <div class="books-box-desc">
//             <p class="books-box-desc-title">${title}</p>
//             <p class="books-box-desc-author">${author}</p>
//             </div>
//             </li>`;
// }

// export function generateMainBooksHTML(books) {
//     return books.map(generateMainBookHTML).join('');
// }
// // Функції для генерації HTML-розмітки відображення списку книг конкретної категорії

// const booksList = document.querySelector(".books-box-list")

// export function renderCategoriesListMain(books) {
//     const mainMarkup = generateMainBooksHTML(books);
//     insertMarkupIntoCategoriesMain(mainMarkup);
// }

// function insertMarkupIntoCategoriesMain(markup) {
//     booksList.insertAdjacentHTML('beforeend', markup);
// }
// // -----TOP
// export const renderTopBooks = (data, booksPerRow) => {
//   const { book_image, title, author, _id } = book
//   const categoriesTopBooks = data.map(el => {
//       const categorieName = el.list_name;
//       return `<div class="books-box-holder">
//       <h3 class="books-box-subtitle">${categorieName}</h3>
//       <ul class="books-box-list">
//       <li class="books-box-itm" id="">
//       <div class="books-box-wrap">
//         <img
//           class="books-img"
//           src="${book_image}" 
//           alt="${title}"
//         />
//         <div class="books-overlay">
//           <p class="books-overlay-text">quick view</p>
//         </div>
//       </div>
//       <div class="books-box-desc">
//       <p class="books-box-desc-title">${title}</p>
//       <p class="books-box-desc-author">${author}</p>
//       </div>
//     </li>
//     </ul>
//         <button class="books-btn-see-more" type="button" data-categorieName="${categorieName}">see more</button>
//       </div>`;
//   }).join('');

//   return `<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${categoriesTopBooks}</div>`;
// }
// // ----CategoryBooks
// export const renderBooksByCategory = (categoryName) => {
//   const { book_image, title, author, _id } = book
//   const categoryMarkup = `<div class="books-container">
//   <h2 class="books-title">${categoryName}</h2>
//   <div class="books-category-container">
//     <ul class="books-list"></ul>
//   </div>
// </div>
// <div class="books-category-box visually-hidden">
// <h3 class="books-box-subtitle">${categorieName}</h3>
//         <ul class="books-category-list">
//           <li class="books-category-item">
//             <div class="books-box-wrap">
//               <img
//                 class="books-img"
//                 src="${book_image}" 
//                 alt="${title}"
//               />
//               <div class="books-overlay">
//                 <p class="books-overlay-text">quick view</p>
//               </div>
//             </div>
//             <div class="books-box-desc">
//             <p class="books-box-desc-title">${title}</p>
//             <p class="books-box-desc-author">${author}</p>
//             </div>
//           </li>
//         </ul>
//       </div>`;

//   return categoryMarkup;
// }




// <div class="books-box-holder">
//       <h3 class="books-box-subtitle">${categorieName}</h3>
//       <ul class="books-box-list">${books}
//       <li class="books-box-itm" id="">
//       <div class="books-box-wrap">
//         <img
//           class="books-img"
//           src="${book_image}" 
//           alt="${title}"
//         />
//         <div class="books-overlay">
//           <p class="books-overlay-text">quick view</p>
//         </div>
//       </div>
//       <div class="books-box-desc">
//       <p class="books-box-desc-title">${title}</p>
//       <p class="books-box-desc-author">${author}</p>
//       </div>
//     </li>
//     </ul>
//         <button class="books-btn-see-more" type="button" data-categorieName="${categorieName}">see more</button>
//       </div>