import axios from "axios";
import { renderTopBooks, renderCategoriesList, renderBooksByCategory } from './categories.js';

const BASE_URL = 'https://books-backend.p.goit.global';

const fetchData = async (endpoint, params = null) => {
  const fetchUrl = `${BASE_URL}/books${endpoint}`;

  try {
    const response = await axios.get(fetchUrl, { params });
    console.log('Data from server:', response.data)
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


export const getBooksByCategory = async (categoryName = '') => {
  const data = await fetchData('/category/', { category: categoryName });
  return renderBooksByCategory(data);
};

export const getBookInfo = async (id) => {
  return fetchData(`/${id}`);
};
// export const getBooksByCategory = async (categoryName = el.list_name) => {
//   const data = await fetchData('/category/', { category: categoryName });
//   return renderBooksByCategory(data, categoryName);
// };


