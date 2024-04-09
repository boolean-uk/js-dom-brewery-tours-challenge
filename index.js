const selectStateForm = document.querySelector('#select-state-form')
const selectStateSearch = document.querySelector('#select-state')


const filterByForm = document.querySelector('#filter-by-type-form')
const filterByBrewery = document.querySelector('#filter-by-type')

const breweriesList = document.querySelector('#breweries-list')

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
    const allBreweries = filterBreweries.map(brewery => brewery)
    breweries = breweries.concat(filterBreweries)

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


filterByBrewery.addEventListener('change', () => {filterSelection()})


function filterSelection() {

    if (filterByBrewery.value === 'micro') {
        const filterMicroBreweries = breweries.filter(brewery => brewery.brewery_type === "micro")
        const microBreweries = filterMicroBreweries.map(brewery => brewery)
        breweriesList.innerHTML = ''
        microBreweries.forEach(brewery => renderBreweries(brewery))
    } else if (filterByBrewery.value === 'brewpub') {
        const filterBrewpubBreweries = breweries.filter(brewery => brewery.brewery_type === "brewpub")
        const brewpubBreweries = filterBrewpubBreweries.map(brewery => brewery)
        breweriesList.innerHTML = ''
        brewpubBreweries.forEach(brewery => renderBreweries(brewery))
    } else if (filterByBrewery.value === 'regional') {
        const filterRegionalBreweries = breweries.filter(brewery => brewery.brewery_type === "regional")
        const regionalBreweries = filterRegionalBreweries.map(brewery => brewery)
        breweriesList.innerHTML = ''
        regionalBreweries.forEach(brewery => renderBreweries(brewery))
    }
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

function errorMessage() {
    const listItem = document.createElement('li')
    const breweryName = document.createElement('h2')
    breweryName.innerText = 'Oops, sorry, no brewery matching your search request'
    listItem.append(breweryName)
    breweriesList.innerHTML = ''
    breweriesList.append(listItem)
}
