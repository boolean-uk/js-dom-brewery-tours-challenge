import state from "./state.js";
import fetchByState from "./fetchByState.js";
import fetchByType from "./fetchByType.js";
import fetchByName from "./fetchByName.js";

const searchBtn = document.getElementById('select-state-form')
const filterBtn = document.getElementById('filter-by-type')
const searchBar = document.getElementById('search-breweries')

searchBtn.addEventListener('submit', (e) => {
  e.preventDefault()
  const USState = e.target[0].value.split(' ').join('_')

  fetchByState(USState)
})

filterBtn.addEventListener('change', (e) => {
  const typeFilter = e.target.value

  fetchByType(typeFilter, e)
})

searchBar.addEventListener('input', (e) => {
  e.preventDefault()
  const name = e.target.value

  fetchByName(name)
})