import breweryLi from "./components/breweryLi.js";
import renderCityCheckBoxes from "./renderCityCheckBoxes.js";
import state from "./state.js";

function render(data) {
  const breweriesList = document.getElementById('breweries-list')
  const targetBreweryTypes = ['micro', 'regional', 'brewpub']

  const filterFlag = Boolean([...state.cityFilters].length)
  if (filterFlag) { // Render option if there are filters checked
  breweriesList.innerHTML = ''
    data.forEach(element => {
      const { city, brewery_type: type } = element
      if (state.cityFilters.has(city) && targetBreweryTypes.includes(type)) {
        breweriesList.append(breweryLi(element))
      }
    })
    return
  }

  breweriesList.innerHTML = ''
  data.forEach(element => { // Normal rendering
    const { brewery_type: type } = element
    if (targetBreweryTypes.includes(type)) breweriesList.append(breweryLi(element))
  });

  renderCityCheckBoxes(data, targetBreweryTypes)
}

export default render
