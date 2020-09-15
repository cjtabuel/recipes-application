import moment from 'moment';
import { getRecipes, saveRecipes } from './recipe'
import { renderIngredientsAlert } from './views'

const recipes = getRecipes()

const addIngredient = (recipeId, { ingredientName }) => {
  const recipe = recipes.find((recipe) => recipe.id === recipeId)
  const recipeIngredients = recipe.ingredients
  let ingredientsExist

  recipeIngredients.forEach((ingredient) => {
    if (ingredient.ingredientName.toLowerCase() === ingredientName.toLowerCase()) {
      ingredientsExist = true
    }
  })

  if (ingredientsExist) {
    renderIngredientsAlert(ingredientName)
  } else {
    recipeIngredients.push({
      ingredientName: ingredientName,
      hasIngredient: false
    })
    recipe.createdAt = moment().valueOf()
    recipe.updatedAt = moment().valueOf()
    saveRecipes()
  }
}

const updateIngredients = (ingredient, recipe) => {
  ingredient.hasIngredient = !ingredient.hasIngredient
  recipe.updatedAt = moment().valueOf()
  saveRecipes()
}

export { addIngredient, updateIngredients } 