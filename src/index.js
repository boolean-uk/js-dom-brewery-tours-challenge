import handleSubmitSearchByState from "./handleSubmitSearchByState.js";
import handleChangeFilterByTypeBtn from "./handleChangeFilterByTypeBtn.js";
import handleInputSearchBar from "./handleInputSearchBar.js";
import handleChangeCityFilters from "./handleChangeCityFilters.js";
import handleClickCityFiltersClearBtn from "./handleClickCityFiltersClearBtn.js";

const searchByStateBtn = document.getElementById('select-state-form')
const filterByTypeBtn = document.getElementById('filter-by-type')
const nameSearchBar = document.getElementById('search-breweries')
const cityFilters = document.getElementById('filter-by-city-form')
const cityFiltersClearBtn = document.querySelector('.clear-all-btn')

searchByStateBtn.addEventListener('submit', handleSubmitSearchByState)

filterByTypeBtn.addEventListener('change', handleChangeFilterByTypeBtn)

nameSearchBar.addEventListener('input', handleInputSearchBar)

cityFilters.addEventListener('change', handleChangeCityFilters)

cityFiltersClearBtn.addEventListener('click', handleClickCityFiltersClearBtn)