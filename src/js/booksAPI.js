// import axios from "axios";
// import { renderTopBooks, renderCategoriesList, renderBooksByCategory } from './categories.js';
// const BASE_URL = 'https://books-backend.p.goit.global';

// //Fatch for top books
// export const getTopBooks = async booksPerRow => {
//   const endpoint = '/books/top-books/';
//   const fetchUrl = BASE_URL + endpoint;

//   try {
//     const response = await axios.get(fetchUrl);
//     return renderTopBooks(response.data, booksPerRow);
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Fatch for categories
// export const getCategoryList = async () => {
//   const endpoint = '/books/category-list/';
//   const fetchUrl = BASE_URL + endpoint;

//   try {
//     const response = await axios.get(fetchUrl);
//     return renderCategoriesList(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Fatch for categories books
// export const getBooksByCategory = async categoryName => {
//   const endpoint = '/books/category/';
//   const fetchUrl = BASE_URL + endpoint;
//   const params = {
//     category: categoryName,
//   };

//   try {
//     const response = await axios.get(fetchUrl, { params });
//     return renderBooksByCategory(response.data, categoryName);
//   } catch (error) {
//     console.log(error);
//   }
// };
// // повертає дані однієї книги по id
// export const getBookInfo = async id => {
//   const endpoint = `/books/${id}`;
//   const fetchUrl = BASE_URL + endpoint;

//   try {
//     const response = await axios.get(fetchUrl);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };


















import axios from "axios";
import { renderTopBooks, renderCategoriesList, renderBooksByCategory } from './categories.js';

const BASE_URL = 'https://books-backend.p.goit.global';

const fetchData = async (endpoint, params = null) => {
  const fetchUrl = `${BASE_URL}/books${endpoint}`;

  try {
    const response = await axios.get(fetchUrl, { params });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTopBooks = async (booksPerRow) => {
  const data = await fetchData('/top-books/');
  return renderTopBooks(data, booksPerRow);
};

export const getCategoryList = async () => {
  const data = await fetchData('/category-list/');
  return renderCategoriesList(data);
};

export const getBooksByCategory = async (categoryName) => {
  const data = await fetchData('/category/', { category: categoryName });
  return renderBooksByCategory(data, categoryName);
};

export const getBookInfo = async (id) => {
  return fetchData(`/${id}`);
};








// // Отримання переліку категорій
// export async function getCategoryList() {
//   try {
//     const response = await axios.get(`${BASE_URL}/books/category-list`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching category list:', error);
//     throw error;
//   }
// }

// // Отримання популярних книг
// export async function getTopBooks() {
//   try {
//     const response = await axios.get(`${BASE_URL}/books/top-books`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching top books:', error);
//     throw error;
//   }
// }

// // Отримання книг обраної категорії
// export async function getBooksByCategory(selectedCategory) {
//   try {
//     const response = await axios.get(`${BASE_URL}/books/category?category=${selectedCategory}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching books for category ${selectedCategory}:`, error);
//     throw error;
//   }
// }

// // Отримання детальної інформації про книгу за її ID
// export async function getBookInfo(bookId) {
//   try {
//     const response = await axios.get(`${BASE_URL}/books/${bookId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching details for book ID ${bookId}:`, error);
//     throw error;
//   }
// }
