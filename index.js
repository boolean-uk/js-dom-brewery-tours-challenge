const selectStateForm = document.querySelector('#select-state-form')
const selectStateSearch = document.querySelector('#select-state')


const filterByForm = document.querySelector('#filter-by-type-form')
const filterByBrewery = document.querySelector('#filter-by-type')

const breweriesList = document.querySelector('#breweries-list')

const url = 'https://api.openbrewerydb.org/v1/breweries'


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
    
    createEachItem(allBreweries)
}

function createEachItem(allBreweries) {
    allBreweries.forEach(brewery => createListItems(brewery))
}



function createListItems(brewery) {
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