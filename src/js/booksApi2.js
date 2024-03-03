import axios from 'axios';
import { renderTopBooks, renderCategoriesList, renderBooksByCategory } from './rendering-books';

const BASEURL = 'https://books-backend.p.goit.global';

//Fatch for top books
export const getTopBooks = async booksPerRow => {
  const endpoint = '/books/top-books/';
  const fetchUrl = BASEURL + endpoint;

  try {
    const response = await axios.get(fetchUrl);
    return renderTopBooks(response.data, booksPerRow);
  } catch (error) {
    console.log(error);
  }
};

//Fatch for categories
export const getCategoryList = async () => {
  const endpoint = '/books/category-list/';
  const fetchUrl = BASEURL + endpoint;

  try {
    const response = await axios.get(fetchUrl);
    return renderCategoriesList(response.data);
  } catch (error) {
    console.log(error);
  }
};

//Fatch for categories books
export const getBooksByCategory = async categoryName => {
  const endpoint = '/books/category/';
  const fetchUrl = BASEURL + endpoint;
  const params = {
    category: categoryName,
  };

  try {
    const response = await axios.get(fetchUrl, { params });
    return renderBooksByCategory(response.data, categoryName);
  } catch (error) {
    console.log(error);
  }
};

// повертає дані однієї книги по id
export const getBookInfo = async id => {
  const endpoint = `/books/${id}`;
  const fetchUrl = BASEURL + endpoint;

  try {
    const response = await axios.get(fetchUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};