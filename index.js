const selectStateForm = document.querySelector('#select-state-form')
const selectStateSearch = document.querySelector('#select-state')
const filterByTypeForm = document.querySelector('#filter-by-type-form')
const filterByBreweryElement = document.querySelector('#filter-by-type')
const breweriesList = document.querySelector('#breweries-list')
const brewerySearchForm = document.querySelector('#search-breweries-form')
const brewerySearchElement = document.querySelector('#search-breweries')
const url = 'https://api.openbrewerydb.org/v1/breweries'

let breweries = []

fetch(url)
    .then(response => response.json())
    .then(json => {loadBreweries(json)})


function loadBreweries(json) {
    const filterBreweries = json.filter(brewery =>
        brewery.brewery_type === "micro" ||
        brewery.brewery_type === "brewpub" ||
        brewery.brewery_type === "regional"
    )
    breweries = structuredClone(filterBreweries)

    createEachListItem()
}

function createEachListItem() {
    breweries.forEach(brewery => renderBreweries(brewery))
}


function renderBreweries(brewery) {
    
    const listItem = document.createElement('li')

    const breweryName = document.createElement('h2')
    breweryName.innerText = brewery.name
    listItem.append(breweryName)

    const breweryType = document.createElement('div')
    breweryType.classList.add('type')
    breweryType.innerText = brewery.brewery_type
    listItem.append(breweryType)

    const addressSection = document.createElement('section')
    addressSection.classList.add('address')
    const h3Address = document.createElement('h3')
    h3Address.innerText = 'Address:'
    addressSection.append(h3Address)
    const streetAddress = document.createElement('p')
    streetAddress.innerText = brewery.street
    addressSection.append(streetAddress)
    const cityPostcode = document.createElement('p')
    const boldText = document.createElement('strong')
    boldText.innerText = `${brewery.city}, ${brewery.postal_code}`
    cityPostcode.append(boldText)
    addressSection.append(cityPostcode)
    listItem.append(addressSection)

    const phoneSection = document.createElement('section')
    phoneSection.classList.add('phone')
    const h3Phone = document.createElement('h3')
    h3Phone.innerText = 'Phone:'
    phoneSection.append(h3Phone)
    const phoneNumber = document.createElement('p')
    phoneNumber.innerText = brewery.phone
    phoneSection.append(phoneNumber)
    listItem.append(phoneSection)

    const linkSection = document.createElement('section')
    linkSection.classList.add('link')
    const websiteLink = document.createElement('a')
    websiteLink.href = brewery.website_url
    websiteLink.target = '_blank'
    websiteLink.innerText = 'Visit Website'
    linkSection.append(websiteLink)
    listItem.append(linkSection)

    
    breweriesList.append(listItem)
}


filterByBreweryElement.addEventListener('change', (event) => {filterSelection(event)})

function filterSelection(event) {
    event.preventDefault()
    const userSelection = event.target.value

    const filterBreweries = breweries.filter(brewery => brewery.brewery_type === userSelection)
    breweriesList.innerHTML = ''
    filterBreweries.forEach(brewery => renderBreweries(brewery))
}


selectStateForm.addEventListener('submit', (event) => {filterStates(event)})

function filterStates(event) {
    event.preventDefault()
    const userSearch = selectStateSearch.value

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${userSearch}`)
        .then(response => response.json())
        .then(json => {breweriesList.innerHTML = '', json.forEach(brewery => renderBreweries(brewery))})
}

brewerySearchElement.addEventListener('input', (event) => searchBrewery(event))


function searchBrewery(event) {
    event.preventDefault()
    const userSearch = brewerySearchElement.value
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${userSearch}`)
        .then(response => response.json())
        .then(json => {breweriesList.innerHTML = '', json.forEach(brewery => renderBreweries(brewery))})
}


function errorMessage() {
    const listItem = document.createElement('li')
    const breweryName = document.createElement('h2')
    breweryName.innerText = 'Oops, sorry, no brewery matching your search request'
    listItem.append(breweryName)
    breweriesList.innerHTML = ''
    breweriesList.append(listItem)
}
