import state from "./state.js";
import fetchByState from "./fetchByState.js";
import fetchByType from "./fetchByType.js";

const searchBtn = document.getElementById('select-state-form')
const filterBtn = document.getElementById('filter-by-type')
const searchBarForm = document.getElementById('search-breweries-form')
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

searchBarForm.addEventListener('change', (e) => {
  e.preventDefault()
  console.log('happened in form')
})

searchBar.addEventListener('', (e) => {
  e.preventDefault()
  debugger
  console.log('hello')
  console.log(e.target.value)
})