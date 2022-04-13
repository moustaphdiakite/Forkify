import * as model from './model.js';
import recipeView from './Views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
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
    alert(err);
  }
}