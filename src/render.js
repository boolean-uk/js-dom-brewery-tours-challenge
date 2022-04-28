import breweryLi from "./components/breweryLi.js";
import renderCityCheckBoxes from "./renderCityCheckBoxes.js";
import state from "./state.js";

function render(data) {
  const breweriesList = document.getElementById('breweries-list')

  const filterFlag = Boolean([...state.cityFilters].length)
  if (filterFlag) { // Render option if there are filters checked
  breweriesList.innerHTML = ''
    data.forEach(element => {
      const { city } = element
      if (state.cityFilters.has(city)) breweriesList.append(breweryLi(element))
    })
    return
  }

  const targetBreweryTypes = ['micro', 'regional', 'brewpub']
  breweriesList.innerHTML = ''

  data.forEach(element => { // Normal rendering
    const { brewery_type: type } = element
    if (targetBreweryTypes.includes(type)) breweriesList.append(breweryLi(element))
  });

  renderCityCheckBoxes(data, targetBreweryTypes)
}

export default render
