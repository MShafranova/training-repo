import axios from "axios";
const BASE_URL = 'https://books-backend.p.goit.global';

// Отримання переліку категорій
export async function getCategoryList() {
  try {
    const response = await axios.get(`${BASE_URL}/books/category-list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw error;
  }
}

// Отримання популярних книг
export async function getTopBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books/top-books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top books:', error);
    throw error;
  }
}

// Отримання книг обраної категорії
export async function getBooksByCategory(selectedCategory) {
  try {
    const response = await axios.get(`${BASE_URL}/books/category?category=${selectedCategory}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books for category ${selectedCategory}:`, error);
    throw error;
  }
}

// Отримання детальної інформації про книгу за її ID
export async function getBookInfo(bookId) {
  try {
    const response = await axios.get(`${BASE_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for book ID ${bookId}:`, error);
    throw error;
  }
}
// -----------------------------------------------------
const categoriesList = document.querySelector('.categories-list');

export function generateCategoryListItem(book) {
    return `<li class='сategories-itm'><a href="">${book.list_name}</a></li>`;
}

export function renderCategoriesListList(books) {
    const allCategoriesItem = '<li class="categories-itm js-categories-current"><a href="page-2.html">All categories</a></li>';
    const otherCategoriesMarkup = books.map(generateCategoryListItem).join('');
    categoriesList.innerHTML = allCategoriesItem + otherCategoriesMarkup;
  }
// Функції для генерації HTML-розмітки відображення списку книг
const booksBoxHolder = document.querySelector('.books-box-holder');

function generateCategoryTitle(books) {
    return `<h3 class="books-box-subtitle">${books.list_name}</h3>`;
}

// Викликати функцію з текстом категорії і вставити елемент в DOM
export function insertCategoryTitleIntoDOM(categoryName) {
  const categoryTitleMarkup = generateCategoryTitle(categoryName);
  booksBoxHolder.insertAdjacentHTML('beforeend', categoryTitleMarkup);
}

export function generateMainBookHTML(book) {
    const { book_image, title, author, _id } = book;

    return `<li class="books-box-itm" data-id="${_id}">
              <div class="books-box-wrap">
                <img
                  class="books-img"
                  src="${book_image}" 
                  alt="${title}"
                  />
                <div class="books-overlay">
                  <p class="books-overlay-text">quick view</p>
                </div>
              </div>
              <div class="books-box-desc">
                <p class="books-box-desc-title">${title}</p>
                <p class="books-box-desc-author">${author}</p>
              </div>
            </li>`;
}

export function generateMainBooksHTML(books) {
    return books.map(generateMainBookHTML).join('');
}
// Функції для генерації HTML-розмітки відображення списку книг конкретної категорії

const booksList = document.querySelector(".books-box-list")

export function renderCategoriesListMain(books) {
    const mainMarkup = generateMainBooksHTML(books);
    insertMarkupIntoCategoriesMain(mainMarkup);
}

function insertMarkupIntoCategoriesMain(markup) {
    booksList.insertAdjacentHTML('beforeend', markup);
}
// =============TOP
export const renderTopBooks = (data) => {
    const { book_image, title, author, _id } = book
    const categoriesTopBooks = data.map(el => {
        const categorieName = el.list_name;
        return `<div class="books-box-holder">
        <h3 class="books-box-subtitle">${categorieName}</h3>
        <ul class="books-box-list">
        <li class="books-box-itm" id="">
        <div class="books-box-wrap">
          <img
            class="books-img"
            src="${book_image}" 
            alt="${title}"
          />
          <div class="books-overlay">
            <p class="books-overlay-text">quick view</p>
          </div>
        </div>
        <div class="books-box-desc">
        <p class="books-box-desc-title">${title}</p>
        <p class="books-box-desc-author">${author}</p>
        </div>
      </li>
      </ul>
          <button class="books-btn-see-more" type="button" data-categorieName="${categorieName}">see more</button>
        </div>`;
    }).join('');
  
    return `<div class="books-container"><h2 class="books-title">Best Sellers Books</h2>${categoriesTopBooks}</div>`;
  }

document.addEventListener('DOMContentLoaded', () => {
    const seeMoreBtn = document.querySelector('.books-btn-see-more');
    seeMoreBtn.addEventListener('click', (event) => selectCategory(event));

    const categoryClick = document.querySelector('.categories-itm');
    categoryClick.addEventListener('click', (event) => selectCategory(event));

    document.querySelector('.categories-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('categories-itm')) {
            const selectedCategory = event.target.list_name;
            if (selectedCategory) {
                handleClick(selectedCategory);
            }
        }
    });
});


// export async function handleClick(category) {
//   try {
//     const categoryBooks = await getBooksByCategory(category);
//     renderCategoriesListMain(categoryBooks);
//   } catch (error) {
//     console.error(`Error handling category ${category}:`, error);
//   }
// }
// ---------------------------------------


// document.addEventListener('DOMContentLoaded', async () => {
//     try {
    
//       const categories = await getCategoryList();
//       renderCategoriesListList(categories);
  
//       // Event listener for category click
//       document.querySelector('.categories-list').addEventListener('click', async (event) => {
//         if (event.target.classList.contains('categories-itm')) {
//           event.preventDefault(); 
  
//           const selectedCategory = event.target.textContent;
//           if (selectedCategory === 'All categories') {
//             // Redirect to the main page or handle as needed
//             window.location.href = 'page-2.html'; 
//           } else {
//             // Handle category click
//             await handleClick(selectedCategory);
//             // // Insert category title into DOM
//             // insertCategoryTitleIntoDOM(selectedCategory);
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Error initializing the page:', error);
//     }
//   });
  document.addEventListener('DOMContentLoaded', async () => {
    try {
        const categories = await getCategoryList();
        renderCategoriesListList(categories);

        // Event listener for category click
        const categoriesList = document.querySelector('.categories-list');
         if (categoriesList) {
               categoriesList.addEventListener('click', async (event) => {
            if (event.target.classList.contains('categories-itm')) {
                event.preventDefault();

                const selectedCategory = event.target.textContent;
                if (selectedCategory === 'All categories') {
                    // Redirect to the main page or handle as needed
                    window.location.href = 'page-2.html';
                } else {
                    // Handle category click
                    await handleClick(selectedCategory);
                    // Insert category title into DOM
                    insertCategoryTitleIntoDOM(selectedCategory);
                }
            }
        });

        // Event listener for "See More" button on the main page
        const seeMoreBtn = document.querySelector('.books-btn-see-more');
if (seeMoreBtn) {

        seeMoreBtn.addEventListener('click', async (event) => {
            const selectedCategory = event.target.dataset.categorieName;
            await handleClick(selectedCategory);
        });

        }}} catch (error) {
        console.error('Error initializing the page:', error);
    }
    });
// Додати цей код після вже існуючого JS-коду

// Функція для очищення списку книг
function clearBooksList() {
    const booksList = document.getElementById('main-books-list');
    booksList.innerHTML = '';
}

// Функція для відображення книг на головній сторінці
export function renderMainBooks(books) {
    clearBooksList(); // Очищення списку перед додаванням нових книг
    const mainMarkup = generateMainBooksHTML(books);
    insertMarkupIntoCategoriesMain(mainMarkup);
}

// Функція для відображення книг в конкретній категорії
export function renderBooksByCategoryBooks(books) {
    const booksList = document.getElementById('category-books-list');
    booksList.innerHTML = generateMainBooksHTML(books);
}

// Змінити функцію handleClick
export async function handleClick(category) {
    try {
        const categoryBooks = await getBooksByCategory(category);

        if (category === 'All categories') {
            // Вивести книги на головній сторінці
            renderMainBooks(categoryBooks);
            // Сховати блок з книгами конкретної категорії
            document.getElementById('category-books-box').classList.add('visually-hidden');
        } else {
            // Вивести книги в конкретній категорії
            renderBooksByCategoryBooks(categoryBooks);
            // Показати блок з книгами конкретної категорії
            document.getElementById('category-books-box').classList.remove('visually-hidden');
        }
    } catch (error) {
        console.error(`Error handling category ${category}:`, error);
    }
}
