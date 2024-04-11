const selectStateForm = document.querySelector('#select-state-form')
const selectStateSearch = document.querySelector('#select-state')
const filterByForm = document.querySelector('#filter-by-type-form')
const filterByBrewery = document.querySelector('#filter-by-type')
const breweriesList = document.querySelector('#breweries-list')
const brewerySearchForm = document.querySelector('#search-breweries-form')
const brewerySearch = document.querySelector('#search-breweries')
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


filterByBrewery.addEventListener('change', (event) => {filterSelection(event)})

function filterSelection(event) {
    event.preventDefault()
    const userSelection = event.target.value

    if (userSelection.value === breweries.brewery_type) {
        const filterBreweries = breweries.filter(brewery => brewery.brewery_type === userSelection)
        const breweryType = filterBreweries.map(brewery => brewery)
        breweriesList.innerHTML = ''
        breweryType.forEach(brewery => renderBreweries(brewery))
    } else {errorMessage()}
}


selectStateForm.addEventListener('submit', (event) => {filterStates(event)})

function filterStates(event) {
    event.preventDefault()
    const userSearch = selectStateForm.value

    if (userSearch === breweries.state_province) {
        const filterState = breweries.filter(brewery => brewery.state_province === selectStateSearch.value)
        const mapStates = filterState.map(brewery => brewery)
        breweriesList.innerHTML = ''
        mapStates.forEach(brewery => renderBreweries(brewery))
    } else {errorMessage()}
}

brewerySearch.addEventListener('input', (event) => searchBrewery(event))


function searchBrewery(event) {
    event.preventDefault()
    const userSearch = brewerySearch.value
    const breweryNameList = breweries.map(brewery => brewery.name)
    const compareNames = breweryNameList.forEach(brewery => brewery === userSearch)
    console.log(compareNames)
    
    // findEachName.forEach(brewery => renderBreweries(brewery))
}


function errorMessage() {
    const listItem = document.createElement('li')
    const breweryName = document.createElement('h2')
    breweryName.innerText = 'Oops, sorry, no brewery matching your search request'
    listItem.append(breweryName)
    breweriesList.innerHTML = ''
    breweriesList.append(listItem)
}

