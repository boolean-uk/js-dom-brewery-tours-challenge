// STATE
const state = {
    breweries: [],
};

// VARIABLES
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
            // must be a state, and spelt correctly.
            return alert("That is not a real/correctly spelled State")
        }
        // regex to replace all spaces with an underscore
        const true_state = (stateSubmit.replace(/ /g,"_"))

        getAllBreweries(true_state)
    })
}

function filterTypeListen() {
    filterForm.addEventListener('change', (event) => {
        const selectInput = event.target.value
        const filterType = filterBreweriesByType(selectInput)
        renderBreweries(filterType)
        renderCities(filterType)
    })
}

function searchBarListen() {
    searchForm.addEventListener("input", (event) => {
        const searchQuery = event.target.value
        const filterType = filterBreweriesByName(searchQuery)
        renderBreweries(filterType)
        renderCities(filterType)
    })
}

function clearAllListen() {
    clearButton.addEventListener("click", () => {
        checkedCities = []
        const filterType = filterBreweriesAll()
        renderBreweries(filterType)
        renderCities(filterType)
        
    })
}

// NETWORK REQUESTS
function getAllBreweries(stateName) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`)
    .then((response) => {
        return response.json()
    })
    .then((allBreweries) => {
        state.breweries = allBreweries
        const filterType = filterBreweriesAll()
        renderBreweries(filterType)
        renderCities(filterType)
    })

}
// FILTER FUNCTIONS

function filterBreweriesByType(type) {
    const filteredBreweries = state.breweries.filter((data) => {
        if(data.brewery_type === type) {
            return true
        }
    })
    return filteredBreweries
}

function filterBreweriesAll() {
    const filteredBreweries = state.breweries.filter((data) => {
        if(data.brewery_type === "micro" || data.brewery_type === "regional" || data.brewery_type === "brewpub") {
            return true
        }
    })
    state.breweries = filteredBreweries
    return filteredBreweries
}

function filterBreweriesByName(letters) {
    const filteredBreweries = state.breweries.filter((data) => {
        const breweryName = data.name.toLowerCase()
        if(breweryName.includes(letters)) {
            return true
        }
    })
    return filteredBreweries
}

function filterByCity(city) {
    const filteredBreweries = state.breweries.filter((data) => {
        // const cityName = city.toLowerCase()
        console.log("data:", data.city, "city name:", city)
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

let checkedCities = []
function renderCities(breweries){
    cityForm.innerHTML = "";
    
    const cities = breweries.map((company) => company.city)
    const filteredCities = cities.filter((city, index) => cities.indexOf(city) === index).sort()
    

    filteredCities.forEach((city) => {
        const cityInput = document.createElement("input")
        cityInput.type = "checkbox"
        cityInput.name = city
        cityInput.value = city

        const cityLabel = document.createElement("label")
        cityLabel.for = city
        cityLabel.innerText = city

        cityInput.addEventListener("change", (event) => {
            // const filterType = filterByCity(city)
            // renderBreweries(filterType)
            if(cityInput.checked) {
                checkedCities.push(city)
                const filteredBreweries = state.breweries.filter((brewery) => checkedCities.includes(brewery.city))
                renderBreweries(filteredBreweries)
            } else {
                if(checkedCities.length > 1){
                    checkedCities = checkedCities.filter((item) => item !== city)
                    const filteredBreweries = state.breweries.filter((brewery) => checkedCities.includes(brewery.city))
                    renderBreweries(filteredBreweries)
                } else if(checkedCities.length === 1) {
                    const filterType = filterBreweriesAll()
                    console.log(filterType)
                    renderBreweries(filterType)
                    renderCities(filterType)
                }
                
            }
        })
        
        cityForm.append(cityInput, cityLabel)
    })
}



// START
submitFormListen()
filterTypeListen()
searchBarListen()
clearAllListen()