const BASE_URL = 'https://books-backend.p.goit.global';

// Отримання переліку категорій
async function getCategoryList() {
  try {
    const response = await axios.get(`${BASE_URL}/books/category-list`);
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw error;
  }
}

// Отримання популярних книг
async function getTopBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books/top-books`);
    return response.data.books;
  } catch (error) {
    console.error('Error fetching top books:', error);
    throw error;
  }
}

// Отримання книг обраної категорії
async function getBooksByCategory(selectedCategory) {
  try {
    const response = await axios.get(`${BASE_URL}/books/category?category=${selectedCategory}`);
    return response.data.books;
  } catch (error) {
    console.error(`Error fetching books for category ${selectedCategory}:`, error);
    throw error;
  }
}

// Отримання детальної інформації про книгу за її ID
async function getBookInfo(bookId) {
  try {
    const response = await axios.get(`${BASE_URL}/books/${bookId}`);
    return response.data.book;
  } catch (error) {
    console.error(`Error fetching details for book ID ${bookId}:`, error);
    throw error;
  }
}