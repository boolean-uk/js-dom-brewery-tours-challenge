// STATE
const state = {
    breweries: [],
};

// VARIABLES
// Used by the initial state search form listener 
// to make sure the state is spelled correctly.
const usStates = [
    "alabama", "alaska", "arizona", "arkansas", 
    "california", "colorado", "connecticut", "delaware", 
    "florida", "georgia", "hawaii", "idaho", 
    "illinois", "indiana", "iowa", "kansas", 
    "kentucky", "louisiana", "maine", "maryland", 
    "massachusetts", "michigan", "minnesota", "mississippi", 
    "missouri", "montana", "nebraska", "nevada", 
    "new hampshire", "new jersey", "new mexico", "new york", 
    "north carolina", "north dakota", "ohio", "oklahoma", 
    "oregon", "pennsylvania", "rhode island", "south carolina", 
    "south dakota", "tennessee", "texas", "utah", 
    "vermont", "virginia", "washington", "west virginia", 
    "wisconsin"
]

// Used for the filter by cities.
let checkedCities = []

// SELECT EXISTING HTML ELEMENTS
const stateForm = document.querySelector("#select-state-form")
const stateInput = document.querySelector("#select-state")
const breweryUL = document.querySelector("#breweries-list")
const filterForm = document.querySelector("#filter-by-type-form")
const filterSelect = document.querySelector("#filter-by-type")
const searchForm = document.querySelector("#search-breweries-form")
const searchInput = document.querySelector("#search-breweries")
const cityForm = document.querySelector("#filter-by-city-form")
const clearButton = document.querySelector(".clear-all-btn")

// EVENT LISTENERS

function submitFormListen() {
    stateForm.addEventListener('submit', (event) => {
        event.preventDefault()
        // stateInput.value = what was typed in.
        const stateSubmit = stateInput.value.toLowerCase()
        if(usStates.find(stateName => stateName === stateSubmit) === undefined){
            // must be a word that is in the array of US States above, and spelt correctly.
            return alert("That is not a real/correctly spelled State")
        }
        // regex to replace all spaces with an underscore - for fetch URL use.
        const true_state = (stateSubmit.replace(/ /g,"_"))
        // Fetch the Data from the API using the state.
        getAllBreweries(true_state)
    })
}

function filterTypeListen() {
    // Listening for the Type of Brewery drop down.
    filterForm.addEventListener('change', (event) => {
        const selectInput = event.target.value
        // Passing the FILTER BY TYPE function directly into the
        // render breweries and cities.
        renderBreweries(filterBreweriesByType(selectInput))
        renderCities(filterBreweriesByType(selectInput))
    })
}

function searchBarListen() {
    // Listening for the Search Bar - each stroke.
    searchForm.addEventListener("input", (event) => {
        const searchQuery = event.target.value
        // Passing the FILTER BY NAME function directly into the
        // render breweries and cities.
        renderBreweries(filterBreweriesByName(searchQuery))
        renderCities(filterBreweriesByName(searchQuery))
    })
}

function clearAllListen() {
    // Listening for the clear all button.
    clearButton.addEventListener("click", () => {
        // Empty the checkedCities array so no duplicates.
        checkedCities = []
        // Passing the ALL filter - so all micros/regionals/brewpubs 
        // get rendered by breweries/cities.
        renderBreweries(filterBreweriesAll())
        renderCities(filterBreweriesAll())
        
    })
}

// NETWORK REQUESTS
function getAllBreweries(stateName) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`)
    .then((response) => {
        return response.json()
    })
    .then((allBreweries) => {
        // setting state.breweries to the data from the API
        state.breweries = allBreweries
        // Passing the filtered breweries (micro/regional/brewpub) directly into the
        // renderBreweries and renderCities functions.
        renderBreweries(filterBreweriesAll())
        renderCities(filterBreweriesAll())
    })

}
// FILTER FUNCTIONS

function filterBreweriesByType(type) {
    // the type being passed is either micro, regional, or brewpub.
    const filteredBreweries = state.breweries.filter((data) => {
        // all breweries that match the type, are kept in the array.
        if(data.brewery_type === type) {
            return true
        }
    })
    return filteredBreweries
}

function filterBreweriesAll() {
    // filters the FETCH data and only keeps brewery_types of micro, regional, or brewpub.
    const filteredBreweries = state.breweries.filter((data) => {
        if(data.brewery_type === "micro" || data.brewery_type === "regional" || data.brewery_type === "brewpub") {
            return true
        }
    })
    // sets our state to the filtered array.
    state.breweries = filteredBreweries
    return filteredBreweries
}

function filterBreweriesByName(letters) {
    // if the name of the brewery contains any of the letters passed to this
    // function, then it is kept and returned.
    const filteredBreweries = state.breweries.filter((data) => {
        const breweryName = data.name.toLowerCase()
        if(breweryName.includes(letters)) {
            return true
        }
    })
    return filteredBreweries
}

function filterByCity(city) {
    // if the city matches the state.breweries.city, then it is kept and returned.
    const filteredBreweries = state.breweries.filter((data) => {
        if(city === data.city) {
            return true
        }
    })
    return filteredBreweries
}

// RENDERING
function renderBreweries(breweries) {
    breweryUL.innerHTML = "";
    // Render filtered version
    breweries.forEach((brewery) => {
        // CREATING
        const brewLI = document.createElement("li")

        const brewH2 = document.createElement("h2")
        brewH2.innerText = brewery.name

        const brewDiv = document.createElement("div")
        brewDiv.className = "type"
        brewDiv.innerText = brewery.brewery_type

        const addressSection = document.createElement("section")
        addressSection.className = "address"

        const addressH3 = document.createElement("h3")
        const roadP = document.createElement("p")
        const areaP = document.createElement("p")
        const areaStrong = document.createElement("strong")

        addressH3.innerText = "Address:"
        roadP.innerText = brewery.street
        areaStrong.innerText = `${brewery.city}, ${brewery.postal_code}`

        // APPENDING
        areaP.append(areaStrong)
        addressSection.append(addressH3, roadP, areaP)

        // CREATING
        const phoneSection = document.createElement("section")
        phoneSection.className = "phone"

        const phoneH3 = document.createElement("h3")
        const phoneP = document.createElement("p")

        phoneH3.innerText = "Phone:"
        if(brewery.phone === null){
            phoneP.innerText = "N/A"
        } else {
            phoneP.innerText = brewery.phone
        }

        // APPENDING
        phoneSection.append(phoneH3, phoneP)

        // CREATING
        const websiteSection = document.createElement("section")
        websiteSection.className = "link"

        const websiteAn = document.createElement("a")
        websiteAn.href = brewery.website_url
        websiteAn.target = "_blank"
        websiteAn.innerText = "Visit Website"

        // APPENDING
        websiteSection.append(websiteAn)

        //FINAL APPEND
        brewLI.append(brewH2, brewDiv, addressSection, phoneSection, websiteSection)
        breweryUL.append(brewLI)
    })
    
  }

function renderCities(breweries){
    cityForm.innerHTML = "";
    
    // Mapping over the filtered array of breweries, creating an array of cities.
    const cities = breweries.map((company) => company.city)
    // Filter through that array and remove duplicates.
    const filteredCities = cities.filter((city, index) => cities.indexOf(city) === index).sort()
    
    // Render each city from the filtered array.
    filteredCities.forEach((city) => {
        // CREATING
        const cityInput = document.createElement("input")
        cityInput.type = "checkbox"
        cityInput.name = city
        cityInput.value = city

        const cityLabel = document.createElement("label")
        cityLabel.for = city
        cityLabel.innerText = city

        // Listening for check marks on cities, to then filter and re-render breweries.
        cityInput.addEventListener("change", () => {
            if(cityInput.checked) {
                // If checked, push the city into the checked cities array, 
                // and rerender breweries from that array.
                checkedCities.push(city)
                const filteredBreweries = state.breweries.filter((brewery) => checkedCities.includes(brewery.city))
                renderBreweries(filteredBreweries)
            } else {
                // If unchecked - and checkedCities array has more than 1 city
                // remove that city from the array and re-render the breweries.
                if(checkedCities.length > 1){
                    checkedCities = checkedCities.filter((item) => item !== city)
                    const filteredBreweries = state.breweries.filter((brewery) => checkedCities.includes(brewery.city))
                    renderBreweries(filteredBreweries)
                } else if(checkedCities.length === 1) {
                    // If unchecked - and checkedCities array has only 1 city in it.
                    // set checkedCities to empty, and rerender all cities/breweries using
                    // the all filter, to get back all breweries.
                    checkedCities = []
                    renderBreweries(filterBreweriesAll())
                    renderCities(filterBreweriesAll())
                }
            }
        })
        // APPENDING
        cityForm.append(cityInput, cityLabel)
    })
}



// START
submitFormListen()
filterTypeListen()
searchBarListen()
clearAllListen()