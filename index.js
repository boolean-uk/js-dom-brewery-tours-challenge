const selectStateForm = document.querySelector('#select-state-form')
const selectStateSearch = document.querySelector('#select-state')
const filterByTypeForm = document.querySelector('#filter-by-type-form')
const filterByBreweryElement = document.querySelector('#filter-by-type')
const breweriesList = document.querySelector('#breweries-list')
const brewerySearchForm = document.querySelector('#search-breweries-form')
const brewerySearchElement = document.querySelector('#search-breweries')
const filterByCityForm = document.querySelector('#filter-cities-form')
const filterByCitySection = document.querySelector('#filter-by-city')

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
    breweries.forEach(brewery => renderBrewery(brewery))
}


function renderBrewery(brewery) {

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
    filterBreweries.forEach(brewery => renderBrewery(brewery))
}


selectStateForm.addEventListener('submit', (event) => {filterStates(event)})

function filterStates(event) {
    event.preventDefault()
    const userSearch = selectStateSearch.value

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${userSearch}`)
        .then(response => response.json())
        .then(json => {breweriesList.innerHTML = '', json.forEach(brewery => renderBrewery(brewery))})
}

brewerySearchElement.addEventListener('input', (event) => searchBrewery(event))


function searchBrewery(event) {
    event.preventDefault()
    const userSearch = brewerySearchElement.value
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${userSearch}`)
        .then(response => response.json())
        .then(json => {breweriesList.innerHTML = '', json.forEach(brewery => renderBrewery(brewery))})
}


function listCities() {
    fetch(url)
        .then(response => response.json())
        .then(brewery => {filterCities(brewery)})

}
listCities()


function filterCities(brewery) {
    const filterCitiesFromAPI = brewery.map(brewery => brewery.city)
    removeDuplicates(filterCitiesFromAPI)
    function removeDuplicates(filterCitiesFromAPI) {
        return filterCitiesFromAPI.filter((city, index) => filterCitiesFromAPI.indexOf(city) === index)
    }
    removeDuplicates(filterCitiesFromAPI).forEach(brewery => createCitiesForFilter(brewery))
}


// function createCitiesForFilter(brewery) {
//     const listItem = document.createElement('li')

//     const input = document.createElement('input')
//     input.type = 'checkbox'
//     input.setAttribute('id', 'city-option')
//     const label = document.createElement('label')
//     label.setAttribute('for', 'city-option')

    
//     label.innerText = brewery
    
//     listItem.append(input)
//     listItem.append(label)
//     filterByCitySection.append(listItem)
//     filterByCityForm.append(filterByCitySection)

//     const cityOptionCheckbox = document.querySelector('#city-option')
//     const labelForCityOption = document.querySelector('label[for="city-option"]')
    
//     cityOptionCheckbox.addEventListener('change', () => {cityOptionCheckbox.checked = !cityOptionCheckbox.checked, citiesCheckedByUser()})

//     function citiesCheckedByUser() {

//     if(cityOptionCheckbox.checked) {
//         console.log('box checked')
//         }
//     }
// }

function createCitiesForFilter(brewery) {
    const listItem = document.createElement('li')
    const label = document.createElement('label')
    label.innerText = brewery
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add('city-option')
    
    
    label.append(input)
    listItem.append(label)
    filterByCitySection.append(listItem)
    filterByCityForm.append(filterByCitySection)

    label.addEventListener('change', () => {label.checked = !label.checked, citiesCheckedByUser()})

    function citiesCheckedByUser() {

    if(label.checked) {
        console.log(label.innerText)
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${label.innerText}`)
            .then(response => response.json())
            .then(brewery => {breweriesList.innerHTML = '', brewery.forEach(brewery => renderBrewery(brewery))})
        }
    } 
}





function errorMessage() {
    const listItem = document.createElement('li')
    const breweryName = document.createElement('h2')
    breweryName.innerText = 'Oops, sorry, no brewery matching your search request'
    listItem.append(breweryName)
    breweriesList.innerHTML = ''
    breweriesList.append(listItem)
}
