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

// For filtering
let microToggle = true
let regionalToggle = true
let brewpubToggle = true

// SELECT EXISTING HTML ELEMENTS
const stateForm = document.querySelector("#select-state-form")
const stateInput = document.querySelector("#select-state")
const breweryUL = document.querySelector("#breweries-list")
const filterForm = document.querySelector("#filter-by-type-form")
const filterSelect = document.querySelector("#filter-by-type")

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
        // Toggles my variables above to true or false, depending on selection.
        if(selectInput === "micro"){
            microToggle = true
            regionalToggle = false
            brewpubToggle = false
        } else if(selectInput === "regional"){
            microToggle = false
            regionalToggle = true
            brewpubToggle = false
        } else if(selectInput === "brewpub"){
            microToggle = false
            regionalToggle = false
            brewpubToggle = true
        } else {
            // if the "select a type" choice is reselected, then it will reset all variables to true.
            microToggle = true
            regionalToggle = true
            brewpubToggle = true
        }

        renderAllBreweries()
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
        renderAllBreweries()
    })

}

// RENDERING
function renderAllBreweries() {
    breweryUL.innerHTML = "";
    // filter for all micro, regional, AND brewpubs depending on above variables.
    const filteredBreweries = state.breweries.filter((data) => {
        if(microToggle){
            if(data.brewery_type === "micro") {
                return true
            }
        }
        if(regionalToggle){
            if(data.brewery_type === "regional") {
                return true
            }
        }
        if(brewpubToggle){
            if(data.brewery_type === "brewpub") {
                return true
            }
        }
    })

    // Render filtered version
    filteredBreweries.forEach((brewery) => {
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

// START
submitFormListen()
filterTypeListen()
// renderAllBreweries()