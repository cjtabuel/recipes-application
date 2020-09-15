import { createRecipe, loadRecipes} from './recipe'
import { renderRecipes } from './views'
import { setFilters } from './filters'
import 'bootstrap'
import './scss/main.scss'

renderRecipes()

document.querySelector('#add-recipe').addEventListener('click', (e) => {
  const id = createRecipe()
  location.assign(`./edit.html#${id}`)
})

document.querySelector('#search-recipe').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderRecipes()
})

window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    loadRecipes()
    renderRecipes()
  } 
})