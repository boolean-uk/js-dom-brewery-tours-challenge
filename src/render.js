import breweryLi from "./components/breweryLi.js";

function render(data) {
  const targetBreweryTypes = ['micro', 'regional', 'brewpub']
  const breweriesList = document.getElementById('breweries-list')
  breweriesList.innerHTML = ''

  data.forEach(element => {
    const { brewery_type: type } = element
    if (targetBreweryTypes.includes(type)) breweriesList.append(breweryLi(element))
  });
}

export default render
