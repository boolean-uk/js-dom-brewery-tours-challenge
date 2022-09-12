const BREWERIES_BASE_URL = 'https://api.openbrewerydb.org/breweries'

const BREWERY_LIST = document.querySelector('.breweries-list')
const STATE_SEARCH_INPUT = document.querySelector('#select-state-form')

let appState = []

function getBreweries(category, term) {
    BREWERY_LIST.innerHTML = ''
    console.log('In getBreweries')
    fetch(BREWERIES_BASE_URL + '?' + category + '=' + term)
        .then(res => res.json())
        .then(breweries => breweries.forEach(brewery => renderBreweryListItems(brewery)))
}

function renderBreweryListItems(singleBrewery) {
    const BREWERY_LI = document.createElement('li')

    const BREWERY_H2 = document.createElement('h2')
    BREWERY_H2.innerText = singleBrewery.name

    const BREWERY_TYPE_DIV = document.createElement('div')
    BREWERY_TYPE_DIV.setAttribute('class', 'type')
    BREWERY_TYPE_DIV.innerText = singleBrewery.brewery_type

    const BREWERY_ADDRESS_SECTION = document.createElement('section')
    const BREWERY_ADDRESS_STREET = document.createElement('p')
    BREWERY_ADDRESS_STREET.innerText = singleBrewery.street
    BREWERY_ADDRESS_SECTION.appendChild(BREWERY_ADDRESS_STREET)

    const BREWERY_ADDRESS_CITY_PC = document.createElement('p')
    const BREWERY_ADDRESS_CITY_PC_STRONG = document.createElement('strong')
    BREWERY_ADDRESS_CITY_PC_STRONG.innerText = `${singleBrewery.city}, ${singleBrewery.postal_code}, ${singleBrewery.state}`
    BREWERY_ADDRESS_CITY_PC.appendChild(BREWERY_ADDRESS_CITY_PC_STRONG)
    BREWERY_ADDRESS_SECTION.appendChild(BREWERY_ADDRESS_CITY_PC)

    const BREWERY_PHONE_SECTION = document.createElement('section')
    BREWERY_PHONE_SECTION.setAttribute('class', 'phone')

    const BREWERY_PHONE_HEADING_P = document.createElement('p')
    BREWERY_PHONE_HEADING_P.innerText = 'Phone:'
    BREWERY_PHONE_SECTION.appendChild(BREWERY_PHONE_HEADING_P)

    const BREWERY_PHONE_NUMBER_P = document.createElement('p')
    BREWERY_PHONE_NUMBER_P.innerText = singleBrewery.phone
    BREWERY_PHONE_SECTION.appendChild(BREWERY_PHONE_NUMBER_P)

    const BREWERY_URL_SECTION = document.createElement('section')
    BREWERY_URL_SECTION.setAttribute('class', 'link')

    const BREWERY_URL_LINK = document.createElement('a')
    BREWERY_URL_LINK.setAttribute('href', singleBrewery.website_url)
    BREWERY_URL_LINK.setAttribute('target', '_blank')
    BREWERY_URL_LINK.innerText = 'Visit Website'

    BREWERY_URL_SECTION.appendChild(BREWERY_URL_LINK)


    BREWERY_LI.appendChild(BREWERY_H2)
    BREWERY_LI.appendChild(BREWERY_TYPE_DIV)
    BREWERY_LI.appendChild(BREWERY_ADDRESS_SECTION)
    BREWERY_LI.appendChild(BREWERY_PHONE_SECTION)
    BREWERY_LI.appendChild(BREWERY_URL_SECTION)

    BREWERY_LIST.appendChild(BREWERY_LI)
}

function setup() {
    getBreweries(null, null)

    STATE_SEARCH_INPUT.addEventListener('submit', function (event) {
        event.preventDefault()
        const searchedState = STATE_SEARCH_INPUT.querySelector('#select-state').value
        getBreweries('by_state', searchedState)
    })
}

setup()
