const state = {
    breweries: []
}

// TOP LEVEL VARS
const root = 'https://api.openbrewerydb.org/v1/breweries'
const breweriesList = document.querySelector('#breweries-list')
const stateSearchForm = document.querySelector('#select-state-form')
const filterByType = document.querySelector('#filter-by-type')

// FULL PAGE RENDER ON INITIAL LOAD
function render() {
    renderBreweryList()
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

// SEARCH BY STATE
stateSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    clearBreweryList()

    const stateName = event.target[0].value
    const filterVal = document.getElementById('filter-by-type').value

    if (filterVal) {
        // if filter applied
        fetch(`${root}?by_state=${stateName}&by_type=${filterVal}`)
        .then((res) => res.json())
        .then((data) => {
        state.breweries = data
        renderBrewery()
    })
    }
    else {
        // state only
        fetch(`${root}?by_state=${stateName}`)
        .then((res) => res.json())
        .then((data) => {
        state.breweries = data
        renderBrewery()
    })
    }
})

// FILTER OPTIONS TO UPDATE BREWERIES IN REAL TIME (STATE ALREADY IN SEARCH BAR)
const stateVal = document.getElementById('select-state')

filterByType.addEventListener('change', (event) => {
    event.preventDefault()
    const breweryFilterType = event.target.value
    clearBreweryList()

    if (stateVal.value && breweryFilterType) {
        // filter applied, state already searched
        fetch(`${root}?by_state=${stateVal.value}&by_type=${breweryFilterType}`)
        .then((res) => res.json())
        .then((data) => {
            state.breweries = data
            renderBrewery()
        })
    } 
    else if (breweryFilterType) {
        // filter only
            fetch(`${root}?by_type=${breweryFilterType}`)
            .then((res) => res.json())
            .then((data) => {
                state.breweries = data
                renderBrewery()
            })
    }
    else if (stateVal.value) {
        // no filter, state already searched
            fetch(`${root}?by_state=${stateVal.value}`)
            .then((res) => res.json())
            .then((data) => {
                state.breweries = data
                renderBrewery()
            })
    }
    else {
        // no filter, no state
            renderBreweryList()
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

// TARGET SEARCH BREWS FORM AND USE FETCH
searchBrewsForm.addEventListener('input', (event) => {
    clearBreweryList()

    const input = event.target.value

    fetch(`${root}?by_name=${input}`)
    .then((res) => res.json())
    .then((data) => {
        state.breweries = data
        renderBrewery()
    })
})

// --------------------- | CALL INITIAL RENDER | --------------------- \\
render()