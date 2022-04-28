import cityCheckbox from "./components/cityCheckbox.js";
import cityLabel from "./components/cityLabel.js";

function renderCityCheckBoxes(data, targetTypes) {
  const citiesList = document.getElementById('filter-by-city-form')
  citiesList.innerHTML = ''
  const citiesSet = new Set()
  
  data.forEach(brewery => {
    const { city, brewery_type: type} = brewery
    if (targetTypes.includes(type)) citiesSet.add(city)
  });

  citiesSet.forEach(city => {
    citiesList.append(cityCheckbox(city))
    citiesList.append(cityLabel(city))
  })
}

export default renderCityCheckBoxes
