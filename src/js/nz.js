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



// ----------------------------------------------
const booksContainer = document.querySelector('.books-container');
const categoriesListContainer = document.querySelector('.categories-menu');


// ==============================================================
//Function for display books
export async function showTopBooks() {
     const windowWidth = window.innerWidth;
     const booksPerRow = booksPerRowFunction(windowWidth);
     const renderedTop = await getTopBooks(booksPerRow);

     booksContainer.innerHTML = renderedTop;
     wrapLastWord();
};


// ==============================================================
//Function for display categories
export async function showCategories() {
    const renderedCategories = await getCategoryList();

    categoriesListContainer.innerHTML = renderedCategories;
};


// ==============================================================
//Function for display category books
export async function showBooksByCategorie(categoryName) {
    const renderedCat = await getBooksByCategory(categoryName);

     booksContainer.innerHTML = renderedCat;
     wrapLastWord();
}

// ==============================================================
//Function for wrapp last title word
function wrapLastWord() {
    const title = document.querySelector('.books-title');
    const textContent = title.textContent.split(" ");
    const lastWord = textContent.pop();

    const updatedContent = textContent.join(" ") + (textContent.length > 0 ? ` <span  class="books-title-color">${lastWord}</span>` : lastWord);

    title.innerHTML = updatedContent;
}


//Fontiono for detectiong books per row
function booksPerRowFunction(windowWith) {
    let booksCount = 3;

    if(windowWith >= 1440) {
        booksCount = 5;
    } 
    
    if(windowWith < 768) {
        booksCount = 1;
    }

    return booksCount;
}


//function for change books display
const windowWidthStart = window.innerWidth;
let ctrlBreikpoint = booksPerRowFunction(windowWidthStart);

async function changeTopDisplay() {
    const isAllCats = document.querySelector('.categories-nav.active').dataset.categoryName;

    if(!isAllCats) {
        const windowWidth = window.innerWidth;
        const booksPerRow = booksPerRowFunction(windowWidth);

        if(ctrlBreikpoint !== booksPerRow) {
            ctrlBreikpoint = booksPerRow;
            const renderedTop = await getTopBooks(booksPerRow);

            booksContainer.innerHTML = renderedTop;
            wrapLastWord();
        }
    }
}



// ==============================================================
if(booksContainer) {
    showTopBooks();
    showCategories();

    categoriesListContainer.addEventListener('click', e => {
        e.preventDefault();
    
        const target = e.target;
    
        if(target.tagName === 'A') {
            const categoryName = target.dataset.categoryName;
    
            categoriesListContainer.querySelector('.active').classList.remove('active');
            target.classList.add('active');
            
            if(categoryName) {
                showBooksByCategorie(categoryName);
            } else {
                showTopBooks();
            }
        }
    });
    
    booksContainer.addEventListener('click', e => {
        e.preventDefault();
    
        const target = e.target;
    
        if(target.classList.contains('books-btn')) {
            const categoryName = target.dataset.categoryName;
    
            categoriesListContainer.querySelector('.active').classList.remove('active');
            categoriesListContainer.querySelector('[data-categoryName="'+categoryName+'"]').classList.add('active');
            
            showBooksByCategorie(categoryName);
        }
    });


    window.addEventListener("resize", changeTopDisplay);
}























// -------------------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {
//     const seeMoreBtn = document.querySelector('.books-btn-see-more');
//     seeMoreBtn.addEventListener('click', (event) => selectCategory(event));

//     const categoryClick = document.querySelector('.categories-itm');
//     categoryClick.addEventListener('click', (event) => selectCategory(event));

//     document.querySelector('.categories-list').addEventListener('click', (event) => {
//         if (event.target.classList.contains('categories-itm')) {
//             const selectedCategory = event.target.list_name;
//             if (selectedCategory) {
//                 handleClick(selectedCategory);
//             }
//         }
//     });
// });


// export async function handleClick(category) {
//   try {
//     const categoryBooks = await getBooksByCategory(category);
//     renderCategoriesListMain(categoryBooks);
//   } catch (error) {
//     console.error(`Error handling category ${category}:`, error);
//   }
// }
// // ---------------------------------------


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
//   ----------------
// const booksContainer = document.querySelector('.categories-box');
// const categoriesListContainer = document.querySelector('.categories-list');

// export async function showTopBooks() {
//     const windowWidth = window.innerWidth;
//     const booksPerRow = booksPerRowFunction(windowWidth);
//     const renderedTop = await getTopBooks(booksPerRow);

//     booksContainer.innerHTML = renderedTop;
    
// };
// function booksPerRowFunction(windowWith) {
//     let booksCount = 3;

//     if(windowWith >= 1440) {
//         booksCount = 5;
//     } 
    
//     if(windowWith < 768) {
//         booksCount = 1;
//     }

//     return booksCount;
// }


// export async function showBooksByCategorie(categoryName) {
//     const renderedCat = await getBooksByCategory(categoryName);

//      booksContainer.innerHTML = renderedCat;
     
// }
