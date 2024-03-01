// Підключення Axios
import axios from 'axios';

// Функція для отримання даних з API
async function fetchData(url, processData) {
  try {
    const response = await axios.get(url);
    processData(response.data);
  } catch (error) {
    console.error(`Помилка при отриманні даних: ${error.message}`);
  }
}

// Отримання списку категорій та популярних книг
fetchData(
  'https://books-backend.p.goit.global/books/category-list',
  processCategories
);

// Отримання книг для обраної категорії
function getBooksByCategory(category) {
  fetchData(
    `https://books-backend.p.goit.global/books/category?category=${category}`,
    processPopularBooks
  );
}

// Обробка та збереження категорій
function processCategories(data) {
  data.categories.forEach(category => {
    categories.addCategory(category);

    // Динамічне відображення категорій на сторінці Home
    console.log('Категорія:', category);

    // Додаємо обробник подій до кнопок "See more" кожної категорії
    const seeMoreButton = document.getElementById(`seeMoreButton-${category}`);
    seeMoreButton.addEventListener('click', () => getBooksByCategory(category));
  });
}

// Обробка та збереження популярних книг
function processPopularBooks(data) {
  // Обробка та відображення додаткових книг на сторінці Home
  console.log('Додаткові книги:', data.books);
}




axios
  .get('https://books-backend.p.goit.global/books/category-list')
  .then(response => response.data)
  .then(data => {
    console.log('Список категорій:', data.categories);
  })
  .catch(error => console.error('Помилка при отриманні категорій:', error));
class Categories {
  constructor() {
    this.list = [];
  }

  addCategory(category) {
    this.list.push(category);
  }
}

class PopularBooks {
  constructor() {
    this.list = [];
  }

  addBook(book) {
    this.list.push(book);
  }
}

const categories = new Categories();
const popularBooks = new PopularBooks();
axios
  .get('https://books-backend.p.goit.global/books/category-list')
  .then(response => response.data)
  .then(data => {
    processCategories(data);
    categories.list.forEach(category => {
      console.log('Категорія:', category);
    });
  })
  .catch(error => console.error('Помилка при отриманні категорій:', error));

function processCategories(data) {
  data.categories.forEach(category => {
    categories.addCategory(category);
  });
}

axios
  .get(
    `https://books-backend.p.goit.global/books/category?category=${category}`
  )
  .then(response => response.data)
  .then(data => {
    console.log(`Додаткові книги з категорії ${category}:`, data.books);
  })
  .catch(error =>
    console.error(
      `Помилка при отриманні додаткових книг для категорії ${category}:`,
      error
    )
  );
