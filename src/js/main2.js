import { getTopBooks, getCategoryList, getBooksByCategory } from './fetch-api';


//Containers
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