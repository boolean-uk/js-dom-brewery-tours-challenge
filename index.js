// STATE
const state = {
    breweries: [],
    micro: [],
    regional: [],
    brewpub: [],
    usa: ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin"]
}
// 
// SELECTORS
const formForSearching = document.querySelector("#select-state-form")
const inputForState = document.querySelector("#select-state")
const listOfBreweries = document.querySelector("#breweries-list")
const selectForFilter = document.querySelector("#filter-by-type")
// 
// PLACEHOLDERS
let US_STATE = ""
let breweryName = ""
let breweryType = ""
let breweryNumberAndRoad = ""
let city = ""
let postcode = ""
let phoneNumber = ""
let breweryLink = ""
// 
// FUNCTIONS
const clearListOfBreweries = () => {
    listOfBreweries.innerHTML = ""
}

const renderListOfBreweries = () => {
    const newBrewery = document.createElement("li")
    listOfBreweries.append(newBrewery)

    const h2ForBreweryName = document.createElement("h2")
        h2ForBreweryName.innerText = breweryName

    const divForType = document.createElement("div")
        divForType.setAttribute("class", "type")
        divForType.innerText = breweryType

    const sectionForAddress = document.createElement("section")
        sectionForAddress.setAttribute("class", "address")

    const h3ForAddress = document.createElement("h3")
        h3ForAddress.innerText = "Address:"

    const pForNumberAndRoad = document.createElement("p")
        pForNumberAndRoad.innerText = breweryNumberAndRoad

    const pForCityAndPostcode = document.createElement("p")
    const strongForP = document.createElement("strong")
        strongForP.innerText = `${city}, ${postcode}`
        pForCityAndPostcode.append(strongForP)

    const sectionForPhone = document.createElement("section")
        sectionForPhone.setAttribute("class", "phone")
    
    const h3ForPhone = document.createElement("h3")
        h3ForPhone.innerText = "Phone:"

    const pForPhone = document.createElement("p")
        pForPhone.innerText = phoneNumber

    const sectionForLink = document.createElement("section")
        sectionForLink.setAttribute("class", "link")
    
    const anchorForWebsite = document.createElement("a")
        anchorForWebsite.setAttribute("href", breweryLink)
        anchorForWebsite.setAttribute("target", "_blank")
        anchorForWebsite.innerText = "Visit Website"

    newBrewery.append(h2ForBreweryName, divForType, sectionForAddress, sectionForPhone, sectionForLink)
    sectionForAddress.append(h3ForAddress, pForNumberAndRoad, pForCityAndPostcode)
    sectionForPhone.append(h3ForPhone, pForPhone)
    sectionForLink.append(anchorForWebsite)
}

const loopThroughData = () => {
    state.breweries.forEach(brewery => {
        breweryName = brewery.name
        breweryType = brewery.brewery_type
        breweryNumberAndRoad = brewery.street
        city = brewery.city
        postcode = brewery.postal_code
        phoneNumber = brewery.phone
        breweryLink = brewery.website_url
        renderListOfBreweries()
        if (brewery.brewery_type === "micro") {
            state.micro.push(brewery)
        } else if (brewery.brewery_type === "regional") {
            state.regional.push(brewery)
        } else if (brewery.brewery_type === "brewpub") {
            state.brewpub.push(brewery)}
    })
}

const fetchData = () => {
    inputForState.value = ''
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${US_STATE}&per_page=50`)
        .then((response) => {return response.json()})
        .then((responseData) => {
            console.log("Breweries received", responseData)
            state.breweries = responseData
            clearListOfBreweries()
            loopThroughData()
        })
}
// 
// LISTENERS
formForSearching.addEventListener("submit", (event) => {
    event.preventDefault()
    const stateSubmitted = inputForState.value.toLowerCase()
    if (state.usa.includes(stateSubmitted)) {
        if (stateSubmitted.includes(" ")) {
            US_STATE = stateSubmitted.replace(" ", '_')
            fetchData()
        } else {
            US_STATE = stateSubmitted
            fetchData()
        }
    } else {alert(`${stateSubmitted} IS NOT A STATE`)
    inputForState.value = ''}
})

selectForFilter.addEventListener("change", () => {
    clearListOfBreweries()
    if (selectForFilter.value === "micro") {
        state.micro.forEach(brewery => {
            breweryName = brewery.name
            breweryType = brewery.brewery_type
            breweryNumberAndRoad = brewery.street
            city = brewery.city
            postcode = brewery.postal_code
            phoneNumber = brewery.phone
            breweryLink = brewery.website_url
            renderListOfBreweries()
        })
    } else if (selectForFilter.value === "regional") {
        clearListOfBreweries()
        state.regional.forEach(brewery => {
            breweryName = brewery.name
            breweryType = brewery.brewery_type
            breweryNumberAndRoad = brewery.street
            city = brewery.city
            postcode = brewery.postal_code
            phoneNumber = brewery.phone
            breweryLink = brewery.website_url
            renderListOfBreweries()
        })
    } else if (selectForFilter.value === "brewpub") {
        clearListOfBreweries()
        state.brewpub.forEach(brewery => {
            breweryName = brewery.name
            breweryType = brewery.brewery_type
            breweryNumberAndRoad = brewery.street
            city = brewery.city
            postcode = brewery.postal_code
            phoneNumber = brewery.phone
            breweryLink = brewery.website_url
            renderListOfBreweries()
        })
    } else {loopThroughData()}
})
// 