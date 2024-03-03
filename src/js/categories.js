import { addMediaWidth } from "./media-width";

export async function murkupCategoryList(fetch) {
  return await fetch.data.map(({ list_name }) => { return `<li class="category__home-itm" data-category="${list_name}">${list_name}</li>` }).join('');
}

async function sliceData(data) {

  if (addMediaWidth() === "mobile") {
    return makeListOfBooks(data.slice(0, 1))
  } else if (addMediaWidth() === "tablet") {
    return makeListOfBooks(await data.slice(0, 3))
  } else {
    return makeListOfBooks(data)
  }
}

export async function murkup(data) {

  return await Promise.all(data.map(async ({ list_name, books }) => {
    return ` 
    <div class="item-books__home"> 
    <h3 class="js-book-categoty">${list_name}</h3> 
    <ul class='list-books__home'>${await makeListOfBooks(books)}</ul>  
    <button class="button see-more" data-js="${list_name}" aria-label="See more">See more</button> 
    </div> 
    `;
  }));
}

export async function makeCategoryPage(category, data) {

  const title = category.split(" ");
  return ` 
  <h2 class="block__books-title"
>${title
      .splice(0, title.length / 2)
      .join(' ')} <span class="block__books-colortitle">${title
        .splice(title.length / 2, title.length)
        .join(' ')}</span></h2> 
        <ul class="block__books-list">${await makeListOfBooks(data)}</ul>
        <button class="button all-categories__btn" data-js="All Categories" aria-label="All categories">All Categories</button>`;

};

export async function makeListOfBooks(data) {

  return data.map(({ author, book_image, title, description, _id }) => {
    return `<li class="books__itm" id=${_id} >  
    <div class="books__wrapper"> 
    <img class="books__image" src="${book_image}"  alt="${description}" loading="lazy"  /> 
    <div class="books__overlay"> 
    <p class="books__overlay-text">QUICK VIEW</p> 
    </div> 
    </div> 
    <div class="books__info">  
    <p class="books__info-title">${title}</p>  
    <p class="books__info-author">${author}</p>  
    </div>  
    </li>`;
  }
  ).join('');
};

export async function currentCategoryTogle(value) {
  await document.querySelector('.js-current-category').classList.remove(`js-current-category`);
  document.querySelector(`li[data-category="${value}"]`).classList.add(`js-current-category`);
};










import axios from "axios"
import { BooksAPI } from "./fetch";
import { makeCategoryPage } from "./functions";
import { murkupCategoryList } from "./functions";
import { murkup } from "./functions";
import { addMediaWidth } from "./media-width";
import {
  startPreloader,
  stopPreloader,
  addMarkupOfPreloader,
} from '../preloader';
import Notiflix from "notiflix";
import { currentCategoryTogle } from "./functions";
import { modalAboutBook } from "../popup-about-book"
import { scrollToStart } from "../scroll-up"




const refBooks = document.querySelector('.block__books')
const refCategory = document.querySelector('.category__home')
const markupBook = document.querySelector('.block__category')

const bookCart = document.querySelector('.book-card__home')

const bookApi = new BooksAPI();

onFirstload()

async function onFirstload() {
  try {
    const categoryApi = (await bookApi.getCategoryList());
    refCategory.insertAdjacentHTML('beforeend', (await murkupCategoryList(categoryApi)));

    const preloader = document.querySelector('#preloader');
    preloader.firstElementChild.style.zIndex = '1002';
  } catch (error) {
    Notiflix.Notify.failure(`Categories was not found : ${error.message}`);
  }
  try {
    const resp = (await bookApi.getTopBooks());
    refBooks.insertAdjacentHTML('afterbegin', '<h2 class="block__books-title">Best Sellers<span class="block__books-colortitle"> Books</span></h2>');
    refBooks.insertAdjacentHTML('beforeend', (await murkup(resp.data)).join(""));
    stopPreloader();
    return resp.data;
  } catch (error) {
    Notiflix.Notify.failure(`Books was not found : ${error.message}`);
    stopPreloader();
  }
}
refCategory.addEventListener('click', onCategoryClick);

async function onCategoryClick(el) {
  el.preventDefault();

  if (el.target.classList.contains("category__home-itm")) {
    scrollToStart();
    refBooks.innerHTML = "";
    refBooks.insertAdjacentHTML(
      'afterbegin',
      addMarkupOfPreloader()
    );
    startPreloader();
    if (el.target.dataset.category === `all categories`) {
      try {
        const resp = (await bookApi.getTopBooks());
        refBooks.insertAdjacentHTML('afterbegin', '<h2 class="block__books-title">Best Sellers<span class="block__books-colortitle"> Books</span></h2>')
        refBooks.insertAdjacentHTML('beforeend', (await murkup(resp.data)).join(""));
        currentCategoryTogle(el.target.dataset.category);
        stopPreloader();
      } catch (error) {
        Notiflix.Notify.failure(`Books was not found : ${error.message}`);
      };
      return;
    } else {
      try {
        const data = await (await bookApi.getOneCategory(`${el.target.dataset.category}`)).data;
        refBooks.insertAdjacentHTML('beforeend', await makeCategoryPage(`${el.target.dataset.category}`, data));
        currentCategoryTogle(el.target.dataset.category)
        stopPreloader();
      } catch (error) {
        Notiflix.Notify.failure(`Books was not found : ${error.message}`);
      };
    }
  };
};

refBooks.addEventListener('click', onSeeMoreClick);

async function onSeeMoreClick(event) {
  event.preventDefault();
  const currentEl = event.target.closest('.books__itm');
  if (currentEl) {
    const bookId = currentEl.attributes.id.value;
    modalAboutBook(bookId);
  }

  if (event.target.classList.contains('see-more')) {
    scrollToStart();
    const requestedCategory = event.target.dataset.js;
    refBooks.innerHTML = '';
    refBooks.insertAdjacentHTML('afterbegin', addMarkupOfPreloader());
    startPreloader();
    try {
      const data = await (
        await bookApi.getOneCategory(`${requestedCategory}`)
      ).data;
      refBooks.insertAdjacentHTML(
        'beforeend',
        await makeCategoryPage(`${requestedCategory}`, data)
      );
      currentCategoryTogle(`${requestedCategory}`);
      stopPreloader();
    } catch (error) {
      Notiflix.Notify.failure(`Books was not found : ${error.message}`);
    }
  } else if (event.target.classList.contains('all-categories__btn')) {
    scrollToStart();
    refBooks.innerHTML = '';
    refBooks.insertAdjacentHTML('afterbegin', addMarkupOfPreloader());
    startPreloader();
    try {
      const resp = await bookApi.getTopBooks();
      refBooks.insertAdjacentHTML(
        'afterbegin',
        '<h2 class="block__books-title">Best Sellers<span class="block__books-colortitle"> Books</span></h2>'
      );
      refBooks.insertAdjacentHTML(
        'beforeend',
        (await murkup(resp.data)).join('')
      );
      stopPreloader();
      currentCategoryTogle("all categories");
    } catch (error) {
      Notiflix.Notify.failure(`Books was not found : ${error.message}`);
    }
  }
};





