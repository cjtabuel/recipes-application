import { getRecipes, saveRecipes } from './recipe'
import { getFilters } from './filters'
import { updateIngredients } from './ingredients'
import moment from 'moment';

const renderRecipes = () => {
  const recipeDiv = document.querySelector('div#recipes')
  const filters = getFilters()
  const recipes = getRecipes()

  const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))
  
  recipeDiv.innerHTML = ''

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((recipe) => {
      recipeDiv.appendChild(generateRecipeDOM(recipe))
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No recipes to display. Click Add Recipe to get started'
    emptyMessage.classList.add('text-center', 'container', 'my-4')
    recipeDiv.appendChild(emptyMessage)
  }
}

const generateRecipeDOM = (recipe) => {
  const recipeCard = document.createElement('a')
  const recipeCardEl = document.createElement('div')
  const recipeCardBody = document.createElement('div')
  const recipeCardTitle = document.createElement('h4')
  const recipeCardSummary = document.createElement('p')
  const lastEditedEl = document.createElement('p')

  recipeCard.setAttribute('href', `./edit.html#${recipe.id}`)
  recipeCard.classList.add('custom-card')

  recipeCardEl.classList.add('card', 'my-2')
  recipeCard.appendChild(recipeCardEl)

  recipeCardBody.classList.add('card-body')
  recipeCardEl.appendChild(recipeCardBody)

  if (recipe.title.length > 0) {
    recipeCardTitle.textContent = recipe.title
  } else {
    recipeCardTitle.textContent = 'Unnamed recipe'
  }
  recipeCardTitle.classList.add('card-title')
  recipeCardBody.appendChild(recipeCardTitle)

  recipeCardSummary.classList.add('card-subtitle', 'font-italic')
  const ingredient = recipe.ingredients
  const hasAllIngredients = ingredient.every((item) => item.hasIngredient === true)
  const hasSomeIngredients = ingredient.some((item) => item.hasIngredient === true)
  const ingredientsExist = ingredient.length > 0

  if (ingredientsExist && hasAllIngredients) {
    recipeCardSummary.textContent = 'You have all the ingredients for this recipe'
  } else if (ingredientsExist && hasSomeIngredients) {
    recipeCardSummary.textContent = 'You have some ingredients for this recipe'
  } else {
    recipeCardSummary.textContent = 'You do not have ingredients for this recipe'
  }

  recipeCardBody.appendChild(recipeCardSummary)

  lastEditedEl.textContent = generateLastEdited(recipe.updatedAt)
  lastEditedEl.classList.add('text-muted')
  recipeCardBody.appendChild(lastEditedEl)

  return recipeCard
 }

const initializeRecipeEditPage = (recipeId) => {
  const recipeTitleEl = document.querySelector('#recipe-title')
  const recipeBodyEl = document.querySelector('#recipe-instructions')
  const createdAtEl = document.querySelector('label#created-at')
  
  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)

  if(!recipe) {
    location.assign('./index.html')
  }

  recipeTitleEl.value = recipe.title
  recipeBodyEl.value = recipe.body
  createdAtEl.textContent = `Created: ${moment(recipe.createdAt).format('MMM Do, YYYY')}`
 }

const renderIngredients = () => {
  const recipeId = location.hash.substring(1)
  const recipeIngredientsEl = document.querySelector('ul#ingredients-list')
  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)
  const recipeIngredients = recipe.ingredients

  recipeIngredientsEl.innerHTML = ''

  if (recipeIngredients.length > 0) {
    recipeIngredients.forEach((ingredient) => {
      recipeIngredientsEl.appendChild(generateIngredientsDOM(ingredient, recipeIngredients, recipe))
    })
  } else  {
      const emptyMessage = document.createElement('p')
      emptyMessage.textContent = 'How are we going to cook without ingredients?! Add some now!'
      emptyMessage.classList.add('text-center', 'container', 'my-4')
      recipeIngredientsEl.appendChild(emptyMessage)
  }
 }

const generateIngredientsDOM = (ingredient, recipeIngredients, recipe) => {
  const ingredientItem = document.createElement('li')
  const listGroupItem = document.createElement('div')
  const ingredientCheckbox = document.createElement('input')
  const ingredientName = document.createElement('span')
  const removeIngredientBtn = document.createElement('span')
  
  ingredientItem.classList.add('list-group-item', 'd-flex', 'align-items-center')
  ingredientItem.appendChild(listGroupItem)
  
  listGroupItem.classList.add('list-group-item-prepend')
  
  ingredientCheckbox.setAttribute('type', 'checkbox')
  ingredientCheckbox.checked = ingredient.hasIngredient
  ingredientCheckbox.addEventListener('change', () => {
    updateIngredients(ingredient, recipe)
  })
  listGroupItem.appendChild(ingredientCheckbox)
  
  ingredientName.textContent = ingredient.ingredientName
  ingredientName.classList.add('mx-2')
  ingredientItem.appendChild(ingredientName)

  removeIngredientBtn.textContent = 'X'
  removeIngredientBtn.classList.add('btn', 'btn-danger', 'ml-auto')
  removeIngredientBtn.addEventListener('click', () => {
    const ingredientIndex = recipeIngredients.indexOf(ingredient)
    if (ingredientIndex > -1) {
      recipeIngredients.splice(ingredientIndex, 1)
      saveRecipes()
      renderIngredients()
    }
  })
  ingredientItem.appendChild(removeIngredientBtn)
  return ingredientItem
 }

const renderIngredientsAlert = (ingredientName) => {
   const ingredientsAlert = document.querySelector('div#ingredients-alert')
   
    ingredientsAlert.innerHTML = ''

    ingredientsAlert.appendChild(generateIngredientsAlertDOM(ingredientName))
 }

const generateIngredientsAlertDOM = (ingredientName) => {
   const alertEl = document.createElement('div')
   const dismissAlertBtn = document.createElement('button')
  //  const dismissAlertSpan = document.createElement('span')

   alertEl.classList.add(
     'alert', 
     'alert-danger', 
     'alert-dismissable', 
     'fade', 
     'show', 
     'd-flex', 
     'justify-content-between'
     )

   alertEl.textContent = `The ingredient: "${ingredientName}", already exists.`

   dismissAlertBtn.classList.add('close')
   dismissAlertBtn.setAttribute('data-dismiss', 'alert')
   dismissAlertBtn.setAttribute('type', 'button')
   dismissAlertBtn.textContent = 'x'
   alertEl.appendChild(dismissAlertBtn)

   return alertEl
 }

const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`

 export { 
   renderRecipes, 
   initializeRecipeEditPage, 
   renderIngredients, 
   renderIngredientsAlert, 
   generateLastEdited 
  }