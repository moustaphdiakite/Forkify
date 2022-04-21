import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import View from './Views/view.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import paginationView from './Views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1) Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Logging results
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage) {
  // Logging new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render updated pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update de recope view
  recipeView.render(model.state.recipe);
}

function init() {
  recipeView.addhandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
