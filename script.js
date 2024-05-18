// API base URL and endpoints
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
const randomMealEndpoint = 'random.php';
const searchMealEndpoint = 'filter.php';

let searchedMealsData;

// Event listener when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchRandomMeals();
    document.getElementById('search-input').addEventListener('input', handleSearchInput);
});
// Function to display a meal item
function displayMeal(meal) {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');
    mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
    `;
    mealItem.addEventListener('click', () => {
        displayInstructions(meal);
    });
    return mealItem;
}
// Function to display random meal grid
function displayRandomMealGrid(meals) {
    const randomMealSection = document.getElementById('random-meal-container');
    randomMealSection.innerHTML = '';
    meals.forEach(meal => {
        randomMealSection.appendChild(displayMeal(meal));
    });
}
// Function to fetch random meals from API
function fetchRandomMeals() {
    fetch(apiUrl + randomMealEndpoint)
        .then(response => response.json())
        .then(data => {
            const randomMeals = data.meals;
            displayRandomMealGrid(randomMeals);
        })
        .catch(error => console.error('Error fetching random meals:', error));
}
// Function to display modal with meal details
function displayInstructions(meal) {
    const instructionsContent = document.getElementById('instructions-content');
    instructionsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredientsList(meal)}
        </ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    `;
    const modal = document.getElementById('instructions');
    modal.style.display = 'block';
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
// Function to generate ingredients list for a meal
function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}
// Function to handle search input
function handleSearchInput(event) {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
        fetchSearchMeals(searchTerm);
    } else {
        document.getElementById('searched-meals-container').style.display = 'none';
    }
}
// Function to fetch meals based on search term
function fetchSearchMeals(searchTerm) {
    fetch(apiUrl + searchMealEndpoint + '?c=' + searchTerm)
       .then(response => response.json())
       .then(data => {
            searchedMealsData = data.meals;
            displaySearchMeals();
        })
       .catch(error => console.error('Error fetching search meals:', error));
}

// Function to display searched meals
function displaySearchMeals() {
    const searchedMealsContainer = document.getElementById('searched-meals-container');
    searchedMealsContainer.innerHTML = '';
    searchedMealsData.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.className = 'searched-meal-item';
        mealItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        searchedMealsContainer.appendChild(mealItem);
    });
    searchedMealsContainer.style.display = 'grid';
}

