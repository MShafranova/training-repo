import { getBooksByCategory } from './booksAPI.js';
import { renderCategoriesListMain } from './categories.js';

const seeMoreBtn = document.querySelector(`.books-btn-see-more`);
seeMoreBtn.addEventListener('click', selectCategory);

const categoryClick = document.querySelector(`.categories-itm`);
categoryClick.addEventListener('click', (event) => selectCategory(event));

document.querySelector('.categories-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('categories-itm')) {
        const selectedCategory = event.target.list_name;
        if (selectedCategory) {
            handleClick(selectedCategory);
        }
    }
});


export async function selectCategory(event) {
  const selectedCategory = event.target.list_name || 'All categories';
  await handleClick(selectedCategory);
}

export async function handleClick(category) {
  try {
    const categoryBooks = await getBooksByCategory(category);
    renderCategoriesListMain(categoryBooks);
  } catch (error) {
    console.error(`Error handling category ${category}:`, error);
  }
}
