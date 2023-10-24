const state = {
    breweries: []
}

// TOP LEVEL VARS
const root = 'https://api.openbrewerydb.org/v1/breweries'
const breweriesList = document.querySelector('#breweries-list')
const stateSearchForm = document.querySelector('#select-state-form')
const stateVal = document.getElementById('select-state')
const filterVal = document.getElementById('filter-by-type')

// FULL PAGE RENDER ON INITIAL LOAD
function render() {
    renderBreweryList()
    renderCities()
}

// CLEAR BREWERY LIST FUNCTION
function clearBreweryList() {
    breweriesList.innerHTML =''
}

// RENDER BREWERY LIST (DEFAULT BREWERY LIST)
function renderBreweryList() {
    fetch(`${root}`)
    .then((res) => res.json())
    .then((data) => {
        state.breweries = data
        renderBrewery()
    })
}

// RENDER INDIVIDUAL BREWERIES
function renderBrewery() {
    state.breweries.forEach((brewery) => {
            if (brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional'|| brewery.brewery_type === 'brewpub') {
            const breweryLiItem = document.createElement('li')

            breweryLiItem.append(
                breweryNameSection(brewery),
                breweryTypeSection(brewery),
                breweryAddressSection(brewery),
                breweryPhoneSection(brewery),
                breweryWebsiteSection(brewery)
                )
            breweriesList.append(breweryLiItem)
        }
    })
}

// BREWERY LIST COMPONENTS

// BREWERY NAME
function breweryNameSection(brewery) {
    const breweryName = document.createElement('h2')
    breweryName.innerText = brewery.name
    return breweryName
}

// BREWERY TYPE
function breweryTypeSection(brewery) {
    const breweryType = document.createElement('div')
    breweryType.innerText = brewery.brewery_type
    breweryType.classList.add('type')
    return breweryType
}

// BREWERY ADDRESS
function breweryAddressSection(brewery) {
    const breweryAddress = document.createElement('section')
    const breweryAddressHeader = document.createElement('h3')
    const breweryAddressLine1 = document.createElement('p')
    const breweryAddressLine2 = document.createElement('p')
    const breweryAddressLine2Strong = document.createElement('strong')

    breweryAddress.classList.add('address')
    breweryAddressHeader.innerText = 'Address:'
    breweryAddressLine1.innerText = brewery.address_1
    breweryAddressLine2Strong.innerText = `${brewery.city}, ${brewery.postal_code}`

    breweryAddressLine2.append(breweryAddressLine2Strong)

    breweryAddress.append(
        breweryAddressHeader,
        breweryAddressLine1,
        breweryAddressLine2
        )

    return breweryAddress
}

// BREWERY PHONE
function breweryPhoneSection(brewery) {
    const breweryPhone = document.createElement('section')
    const breweryPhoneHeader = document.createElement('h3')
    const breweryPhoneNumber = document.createElement('p')

    breweryPhone.classList.add('phone')
    breweryPhoneHeader.innerText = 'Phone:'

    if (brewery.phone === null) {
        breweryPhoneNumber.innerText = 'N/A'
    }
    else {
        breweryPhoneNumber.innerText = brewery.phone
    }

    breweryPhone.append(
        breweryPhoneHeader,
        breweryPhoneNumber
    )
    return breweryPhone
}

// BREWERY WEBSITE
function breweryWebsiteSection(brewery) {
    const breweryWebsite = document.createElement('section')
    const breweryWebsiteLink = document.createElement('a')
    
    breweryWebsite.classList.add('link')
    breweryWebsiteLink.innerText = 'Visit Website'

    if (brewery.website_url === null) {
        breweryWebsiteLink.href = null
    }
    else (
        breweryWebsiteLink.href = brewery.website_url
    )

    breweryWebsiteLink.target = "_blank"

    breweryWebsite.append(breweryWebsiteLink)
    return breweryWebsite
}

// SEARCH/FILTER OPTIONS

// FILTER FUNCTION
function filter(link) {
    fetch(link)
        .then((res) => res.json())
        .then((data) => {
            state.breweries = data
            renderBrewery()
        })
}

// SEARCH BY STATE
stateSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    clearBreweryList()

    if (!filterVal.value) {
        filter(`${root}?by_state=${stateVal.value}`)
    }
        else {
        filter(`${root}?by_state=${stateVal.value}&by_type=${filterVal.value}`)
    }
})

// EVENT LISTENER ADDED TO FILTER LIST TO UPDATE BREWERIES IN REAL TIME WHEN SELECTED
filterVal.addEventListener('change', (event) => {
    event.preventDefault()
    clearBreweryList()

    if (!filterVal.value && !stateVal.value) {
        renderBreweryList()
    }
    else if (filterVal.value) {
        filter(`${root}?by_type=${filterVal.value}`)
    }
    else {
        filter(`${root}?by_state=${stateVal.value}`)
    }
})

// EXTENSION 1

// HIGH LEVEL VARS
const main = document.querySelector('main')

// CREATE SEARCH BAR FOR BREWERIES
const searchbarHeader = document.createElement('header')
searchbarHeader.classList.add('search-bar')

const searchBrewsForm = document.createElement('form')
searchBrewsForm.id = 'search-breweries-form'
searchBrewsForm.autocomplete = 'off'

const searchBrewsLabel = document.createElement('label')
searchBrewsLabel.setAttribute('for', 'search-breweries')

const searchBrewsH2 = document.createElement('h2')
searchBrewsH2.innerText = 'Search breweries:'

const searchBrewsInput = document.createElement('input')
searchBrewsInput.id = 'search-breweries'
searchBrewsInput.name = 'search-breweries'
searchBrewsInput.type = 'text'

searchBrewsLabel.append(searchBrewsH2)
searchBrewsForm.append(searchBrewsLabel, searchBrewsInput)
searchbarHeader.append(searchBrewsForm)

main.append(searchbarHeader)

// SEARCH BREWS - UPDATES LIST WHILE TYPING INCL. ANY CURRENT FILTERS/STATES
searchBrewsForm.addEventListener('input', (event) => {
    clearBreweryList()
    const input = event.target

    if (!filterVal.value && !stateVal.value) {
        // no filter, no state
        fetch(`${root}?by_name=${input.value}`)
        .then((res) => res.json())
        .then((data) => {
            state.breweries = data
            renderBrewery()
        })
    }
    else if (filterVal.value && stateVal.value) {
        // filter & state
        filter(`${root}?by_state=${stateVal.value}&by_type=${filterVal.value}&by_name=${input.value}`)
    }
    else if (filterVal.value) {
        // filter only
        filter(`${root}?by_type=${filterVal.value}&by_name=${input.value}`)
    }
    else {
        // state only
        filter(`${root}?by_state=${stateVal.value}&by_name=${input.value}`)
    }
})

// EXTENSION 2

// HIGH LEVEL VARS
const filterSection = document.querySelector('.filters-section .filters-section')

// CITY FILTER DIV
const cityFilterDiv = document.createElement('div')
cityFilterDiv.classList.add('filter-by-city-heading')

const cityFilterH3 = document.createElement('h3')
cityFilterH3.innerText = 'Cities'

const clearAllButton = document.createElement('button')
clearAllButton.classList.add('clear-all-btn')
clearAllButton.innerText = 'clear all'

cityFilterDiv.append(cityFilterH3, clearAllButton)
filterSection.append(cityFilterDiv)

// CITY FILTER FORM
const cityFilterForm = document.createElement('form')
cityFilterForm.id = 'filter-by-city-form'

// RENDER CITIES FUNCTION
function renderCities() {

    // FETCH ALL BREWERIES, LOOP THROUGH AND EXTRACT CITIES REMOVING DUPLICATES 
    // ARRANGE IN ALPHABTICAL ORDER, APPEND TO CITY FILTER SECTION
    fetch(`${root}`)
    .then((res) => res.json())
    .then((data) => {
        state.breweries = data
        let cities = []
        state.breweries.forEach((brewery) => {
            let city = brewery.city
            if (!cities.includes(city)) {
                cities.push(city)
            }
        })
        let sortedCities = cities.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
        sortedCities.forEach((city) => {
            const cityFilterFormInput = document.createElement('input')
            cityFilterFormInput.type = 'checkbox'
            cityFilterFormInput.name = city
            cityFilterFormInput.value = city
        
            const cityFilterFormLabel = document.createElement('label')
            cityFilterFormLabel.setAttribute('for', city)
            cityFilterFormLabel.innerText = city
        
            cityFilterForm.append(cityFilterFormInput, cityFilterFormLabel)
        })
    })
}
filterSection.append(cityFilterDiv, cityFilterForm)

// CITY FILTER LIST FUNCTIONALITY
cityFilterForm.addEventListener('click', (event) => {
    const citySelect = event.target.name
    clearBreweryList()

    fetch(`${root}?by_city=${citySelect}`)
    .then((res) => res.json())
    .then((data) => {
        state.breweries = data
        renderBrewery()
    })
})

// CLEAR ALL BUTTON
clearAllButton.addEventListener('click', () => {
    console.log('clicked')
    cityFilterForm.innerHTML = ''
    renderCities()
    clearBreweryList()
    renderBreweryList()
})

// --------------------- | CALL INITIAL RENDER | --------------------- \\
render()