const BREWERIES_BASE_URL = 'https://api.openbrewerydb.org/breweries'

const BREWERY_LIST = document.querySelector('.breweries-list')
const US_STATE_SEARCH_INPUT = document.querySelector('#select-state-form')
const TYPE_FILTER = document.querySelector('#filter-by-type')

let state = []

const REQUIRED_TYPES = ['micro', 'regional', 'brewpub']

let currentSearchCriteria = {
    by_state: '',
    by_type: '',
    per_page: 100,
    page: 3
}

function getBreweries() {
    BREWERY_LIST.innerHTML = ''
    const CURRENT_SEARCH_CRITERIA = getCurrentSearchFilter(currentSearchCriteria)

    fetch(BREWERIES_BASE_URL + CURRENT_SEARCH_CRITERIA)
        .then(res => res.json())
        .then((breweries) => {
            BREWERY_LIST.innerHTML = ''
            if (breweries.length === 0) {
                const BREWERY_LI = document.createElement('li')
                const BREWERY_H2 = document.createElement('h2')
                BREWERY_H2.innerText = 'No breweries found for this search term'
                BREWERY_LI.appendChild(BREWERY_H2)
                BREWERY_LIST.appendChild(BREWERY_LI)
                state = []
            } else {
                state = [...onlyIncludeBreweryTypes(breweries)]
            }
        })
        .then(() => {
            renderBreweryListItems()
        })
}

function renderBreweryListItems() {
    state.forEach(singleBrewery => {
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
    })
}

function onlyIncludeBreweryTypes(breweries) {
    let FILTERED_BREWERIES = []

    FILTERED_BREWERIES = breweries.filter(function (brewery) {
        return brewery.brewery_type == 'micro' || brewery.brewery_type == 'brewpub' || brewery.brewery_type == 'regional'
    });

    FILTERED_BREWERIES.sort((a, b) => (a.name > b.name) ? 1 : -1)

    return FILTERED_BREWERIES
}


function getCurrentSearchFilter() {
    queryString = '?'
    for (const TERM in currentSearchCriteria) {
        if (currentSearchCriteria[TERM]) {
            queryString += TERM + '='
            queryString += currentSearchCriteria[TERM] + '&'
        }
    }
    return queryString
}

function setup() {
    getBreweries()

    US_STATE_SEARCH_INPUT.addEventListener('submit', function (event) {
        event.preventDefault()
        const searchedState = US_STATE_SEARCH_INPUT.querySelector('#select-state').value
        currentSearchCriteria.by_state = searchedState
        getBreweries()
    })

    TYPE_FILTER.addEventListener('change', function (event) {
        console.log(TYPE_FILTER.value)
        currentSearchCriteria.by_type = TYPE_FILTER.value
        console.log('currentSearchCriteria.by_type')
        console.log(currentSearchCriteria.by_type)
        getBreweries()
    })
}

setup()