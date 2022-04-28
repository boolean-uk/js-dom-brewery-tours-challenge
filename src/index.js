import fetchByState from "./fetchByState.js";
import fetchByType from "./fetchByType.js";
import fetchByName from "./fetchByName.js";
import handleChangeCityFilters from "./handleChangeCityFilters.js";

const searchBtn = document.getElementById('select-state-form')
const filterBtn = document.getElementById('filter-by-type')
const searchBar = document.getElementById('search-breweries')
const cityFilters = document.getElementById('filter-by-city-form')
const cityFiltersClearBtn = document.querySelector('.clear-all-btn')

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

cityFilters.addEventListener('change', handleChangeCityFilters)
