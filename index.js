const uri = "https://api.openbrewerydb.org/breweries"
const breweriesList = document.querySelector(".breweries-list")

const state = {
    breweries: []
}

function loadBreweryData () {

    fetch(uri)
    .then((response) => {
        return response.json()

    })
    .then((breweries) => {
        renderBreweries()
        state.breweries = breweries
      

    })

}

loadBreweryData()

function renderBreweries() {
    breweriesList.innerHTML = ""

    state.breweries.forEach((brewery) => {
        const li = document.createElement("li")
        li.innerText = brewery.name + "" 
        // Only rendering names of breweries currenly as html has not been implemented yet
        // Currently using one single li element to test run
        breweriesList.appendChild(li)

    })

}
console.log(loadBreweryData())





