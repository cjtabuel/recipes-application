import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

let recipes = []

const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')

  try {
    recipes = recipesJSON ? JSON.parse(recipesJSON) : []
    // return recipesJSON ? JSON.parse(recipesJSON) : []
  } catch (e) {
    recipes = []
    // return []
  }
}

const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const createRecipe = () => {
  let id = uuidv4()
  const getTimestamp = () => moment().valueOf()

  recipes.push({
    id: id,
    title: '',
    body: '',
    ingredients: [],
    createdAt: getTimestamp(),
    updatedAt: getTimestamp()
  })
  saveRecipes()
  return id
}

const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
    saveRecipes()
  }
}

const updateRecipe = (id, {title, body}) => {
  const recipe = recipes.find((recipe) => recipe.id === id)

  if (!recipe) {
    return
  }

  if (typeof title === 'string') {
    recipe.title = title
    recipe.updatedAt = moment().valueOf()
  }
  
  if (typeof body === 'string') {
    recipe.body = body
    recipe.updatedAt = moment().valueOf()
  }

  saveRecipes()
}

// const sortRecipe = () => {

// }

loadRecipes()
// recipes = loadRecipes()

export { createRecipe, getRecipes, removeRecipe, updateRecipe, saveRecipes, loadRecipes }