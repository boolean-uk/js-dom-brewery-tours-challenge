const BREWERIES_BASE_URL = 'https://api.openbrewerydb.org/breweries'

const BREWERY_LIST = document.querySelector('.breweries-list')
const SEARCH_FORM = document.querySelector('#search-breweries-form')
const SEARCH_BREWERIES_BY_NAME = document.querySelector('#search-breweries')
const TYPE_FILTER = document.querySelector('#filter-by-type')
const CITIES_FILTER = document.querySelector('#filter-by-city-form')

let state = []

let currentSearchCriteria = {
    by_name: '',
    by_type: '',
    by_city: '',
    per_page: 100,
    page: 1
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
            createPagination()
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

function createPagination() {
    const PAGINATION = document.querySelector('#pagination')
    PAGINATION.innerHTML = ''

    if (currentSearchCriteria.page > 1) {
        const BUTTON_BACK = document.createElement('button')
        BUTTON_BACK.innerText = '← Previous Page'

        PAGINATION.appendChild(BUTTON_BACK)

        BUTTON_BACK.addEventListener('click', function (event) {
            currentSearchCriteria.page--
            getBreweries()
        })
    }

    if (state.length > 0) {
        const BUTTON_FORWARD = document.createElement('button')
        BUTTON_FORWARD.innerText = 'Next Page →'
        BUTTON_FORWARD.addEventListener('click', function (event) {
            currentSearchCriteria.page++
            getBreweries()
        })

        PAGINATION.appendChild(BUTTON_FORWARD)
    }

}

function movePageForward(pageNumber) {
    currentSearchCriteria.page = pageNumber
    getBreweries()
}

function movePageBack(pageNumber) {
    currentSearchCriteria.page = pageNumber
    getBreweries()
}

function generateCityList() {
    // This constant is from the file cities.js
    for (const CITY of LARGEST_US_CITIES) {
        const CITY_VALUE = CITY.replaceAll(' ', '_').toLowerCase()

        const CITY_FORM_INPUT = document.createElement('input')
        CITY_FORM_INPUT.setAttribute('type', 'checkbox')
        CITY_FORM_INPUT.setAttribute('name', CITY_VALUE)
        CITY_FORM_INPUT.setAttribute('value', CITY_VALUE)

        const CITY_FORM_LABEL = document.createElement('label')
        CITY_FORM_LABEL.setAttribute('for', CITY_VALUE)
        const LABEL_TEXT = document.createTextNode(CITY)
        CITY_FORM_LABEL.appendChild(LABEL_TEXT)

        CITIES_FILTER.appendChild(CITY_FORM_INPUT)
        CITIES_FILTER.appendChild(CITY_FORM_LABEL)

        CITY_FORM_INPUT.addEventListener('change', function (event) {
            console.log(CITY_FORM_INPUT.value)
        })        
    }

}

function setup() {
    getBreweries()

    SEARCH_BREWERIES_BY_NAME.addEventListener('keyup', function () {
        const searchedBrewerieName = SEARCH_BREWERIES_BY_NAME.value
        currentSearchCriteria.page = 1
        currentSearchCriteria.by_name = searchedBrewerieName
        getBreweries()
    })

    SEARCH_FORM.addEventListener('submit', function (event) {
        event.preventDefault()
    })

    TYPE_FILTER.addEventListener('change', function (event) {
        currentSearchCriteria.page = 1
        currentSearchCriteria.by_type = TYPE_FILTER.value
        getBreweries()
    })
}

setup()

generateCityList()