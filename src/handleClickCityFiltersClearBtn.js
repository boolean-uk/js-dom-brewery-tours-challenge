import state from "./state.js"
import render from "./render.js"

const cityFilters = document.getElementById('filter-by-city-form')

function handleClickCityFiltersClearBtn() {
  cityFilters.reset()
  state.cityFilters.clear()
  render()
}

export default handleClickCityFiltersClearBtn