import { initializeRecipeEditPage, renderIngredients } from './views'
import { updateRecipe, removeRecipe } from './recipe'
import { addIngredient } from './ingredients'
import 'bootstrap'
import './scss/main.scss'

const recipeTitleEl = document.querySelector('input#recipe-title')
const recipeBodyEl = document.querySelector('textarea#recipe-instructions')
const deleteRecipeBtn = document.querySelector('button#delete-recipe')

const recipeId = location.hash.substring(1)

initializeRecipeEditPage(recipeId)
renderIngredients()

recipeTitleEl.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    title: e.target.value
  })
})

recipeBodyEl.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    body: e.target.value
  })
})

deleteRecipeBtn.addEventListener('click', (e) => {
  removeRecipe(recipeId)
  location.assign('./index.html')
})

document.querySelector('form#ingredients-form').addEventListener('submit', (e) => {
  const ingredientText = e.target.elements.newIngredient.value.trim()
  e.preventDefault()

  if (ingredientText) {
    addIngredient(recipeId, {
      ingredientName: ingredientText
    })
    renderIngredients(recipeId)
    e.target.elements.newIngredient.value = ''
  }
})