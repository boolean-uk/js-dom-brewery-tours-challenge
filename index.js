const BREWERIES_BASE_URL = 'https://api.openbrewerydb.org/breweries'

const BREWERY_LIST = document.querySelector('.breweries-list')
const US_STATE_SEARCH_INPUT = document.querySelector('#select-state-form')
const TYPE_FILTER = document.querySelector('#filter-by-type')
const CITIES_FILTER = document.querySelector('#filter-by-city-form')

const REQUIRED_BREWERY_TYPES = ['micro', 'regional', 'brewpub']

let allData = []
let state = []
let availableCities = []

let currentSearchCriteria = {
    by_name: '',
    by_city: '',
    by_us_state: '',
    by_brewery_type: '',
    per_page: 50,
    page: 1
}

function requestAllBreweries(breweryType, pageNo, lastType) {
    fetch(BREWERIES_BASE_URL + '?by_type=' + breweryType + '&per_page=50&page=' + pageNo)
        .then(res => res.json())
        .then((breweries) => {

            if (breweries.length) {
                allData = [...allData, ...breweries]
                requestAllBreweries(breweryType, pageNo += 1, lastType)
            }

            if (breweries.length == 0 && lastType) {
                removeProgressIndicator()
                state = sortItemsByName(allData)
                renderBreweries(state)
            }
        })
}

function getAllRequiredTypesOfBreweries() {
    let lastType = false
    REQUIRED_BREWERY_TYPES.forEach((breweryType, index) => {
        if (index === REQUIRED_BREWERY_TYPES.length - 1) {
            lastType = true
        }
        pageNo = 1
        requestAllBreweries(breweryType, pageNo, lastType)
    })
}

function setProgressIndicator() {
    BREWERY_LIST.innerHTML = ''
    const PROGRESS_LI = document.createElement('li')
    PROGRESS_LI.setAttribute('class', 'progressIndicator')
    const PROGRESS_LI_STRONG = document.createElement('strong')
    PROGRESS_LI_STRONG.innerText = 'Getting fresh brewery data.'
    PROGRESS_LI.appendChild(PROGRESS_LI_STRONG)
    BREWERY_LIST.appendChild(PROGRESS_LI)
}

function removeProgressIndicator() {
    BREWERY_LIST.innerHTML = ''
}

function renderBreweries(listOfBreweries) {

    BREWERY_LIST.innerHTML = ''

    if (listOfBreweries.length === 0) {
        showNothingFound()
        return
    }

    let maxIndex = listOfBreweries.length
    let startingIndex = currentSearchCriteria.per_page * (currentSearchCriteria.page - 1)
    let endingIndex = currentSearchCriteria.per_page * currentSearchCriteria.page - 1
    if (maxIndex < endingIndex) { endingIndex = maxIndex }
    if (startingIndex >= maxIndex) { startingIndex = maxIndex }

    for (let breweryIndex = startingIndex; breweryIndex <= endingIndex; breweryIndex++) {
        if (listOfBreweries[breweryIndex]) {
            const BREWERY_LI = document.createElement('li')

            const BREWERY_H2 = document.createElement('h2')
            BREWERY_H2.innerText = listOfBreweries[breweryIndex].name

            const BREWERY_TYPE_DIV = document.createElement('div')
            BREWERY_TYPE_DIV.setAttribute('class', 'type')
            BREWERY_TYPE_DIV.innerText = listOfBreweries[breweryIndex].brewery_type

            const BREWERY_ADDRESS_SECTION = document.createElement('section')
            const BREWERY_ADDRESS_STREET = document.createElement('p')
            BREWERY_ADDRESS_STREET.innerText = listOfBreweries[breweryIndex].street
            BREWERY_ADDRESS_SECTION.appendChild(BREWERY_ADDRESS_STREET)

            const BREWERY_ADDRESS_CITY_PC = document.createElement('p')
            const BREWERY_ADDRESS_CITY_PC_STRONG = document.createElement('strong')
            BREWERY_ADDRESS_CITY_PC_STRONG.innerText = `${listOfBreweries[breweryIndex].city}, ${listOfBreweries[breweryIndex].postal_code}, ${listOfBreweries[breweryIndex].state}`
            BREWERY_ADDRESS_CITY_PC.appendChild(BREWERY_ADDRESS_CITY_PC_STRONG)
            BREWERY_ADDRESS_SECTION.appendChild(BREWERY_ADDRESS_CITY_PC)

            const BREWERY_PHONE_SECTION = document.createElement('section')
            BREWERY_PHONE_SECTION.setAttribute('class', 'phone')

            const BREWERY_PHONE_HEADING_P = document.createElement('p')
            BREWERY_PHONE_HEADING_P.innerText = 'Phone:'
            BREWERY_PHONE_SECTION.appendChild(BREWERY_PHONE_HEADING_P)

            const BREWERY_PHONE_NUMBER_P = document.createElement('p')
            BREWERY_PHONE_NUMBER_P.innerText = listOfBreweries[breweryIndex].phone
            BREWERY_PHONE_SECTION.appendChild(BREWERY_PHONE_NUMBER_P)

            const BREWERY_URL_SECTION = document.createElement('section')
            BREWERY_URL_SECTION.setAttribute('class', 'link')

            const BREWERY_URL_LINK = document.createElement('a')
            BREWERY_URL_LINK.setAttribute('href', listOfBreweries[breweryIndex].website_url)
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
    }

    const STARTING_PAGE_NUMBER = startingIndex + 1
    let endingPageNumber = endingIndex + 1
    if (endingPageNumber > maxIndex) { endingPageNumber = maxIndex }

    document.querySelector('#currentShowing').innerText = ' (' + STARTING_PAGE_NUMBER + ' to ' + endingPageNumber + ' of ' + maxIndex + ')'
    createPagination(maxIndex - STARTING_PAGE_NUMBER)
}

function showNothingFound() {
    const BREWERY_LI = document.createElement('li')
    const BREWERY_H2 = document.createElement('h2')
    BREWERY_H2.innerText = 'No breweries found for this search term'
    BREWERY_LI.appendChild(BREWERY_H2)
    BREWERY_LIST.appendChild(BREWERY_LI)
}

function sortItemsByName(dataSet) {
    const SORTED_BREWERIES = dataSet.sort((a, b) => (a.name > b.name) ? 1 : -1)
    return SORTED_BREWERIES
}

function createPagination(itemsRemaining) {
    const PAGINATION_BACK = document.querySelector('#pagination-back')
    const PAGINATION_FORWARD = document.querySelector('#pagination-forward')

    PAGINATION_BACK.innerHTML = ''
    PAGINATION_FORWARD.innerHTML = ''

    if (currentSearchCriteria.page > 1) {
        const BUTTON_BACK = document.createElement('button')
        BUTTON_BACK.innerText = '← Previous Page'

        PAGINATION_BACK.appendChild(BUTTON_BACK)

        BUTTON_BACK.addEventListener('click', function () {
            currentSearchCriteria.page--
            renderBreweries(state)
        })
    }

    if (itemsRemaining > currentSearchCriteria.per_page) {
        const BUTTON_FORWARD = document.createElement('button')
        BUTTON_FORWARD.innerText = 'Next Page →'
        BUTTON_FORWARD.addEventListener('click', function () {
            currentSearchCriteria.page++
            renderBreweries(state)
        })

        PAGINATION_FORWARD.appendChild(BUTTON_FORWARD)
    }
}

function filterStateByCriteria() {

    console.log('' + currentSearchCriteria.by_brewery_type)

    if (currentSearchCriteria.by_brewery_type && currentSearchCriteria.by_us_state) {
        let filteredData = state.filter(function (thisBrewery) {
            return thisBrewery.state === currentSearchCriteria.by_us_state && thisBrewery.brewery_type === currentSearchCriteria.by_brewery_type
        })
        return filteredData
    }

    if (currentSearchCriteria.by_brewery_type) {
        let filteredData = state.filter(function (thisBrewery) {
            return thisBrewery.brewery_type === currentSearchCriteria.by_brewery_type
        })
        return filteredData
    }

    if (currentSearchCriteria.by_us_state) {
        let filteredData = state.filter(function (thisBrewery) {
            return thisBrewery.state === currentSearchCriteria.by_us_state
        })
        return filteredData
    }

    return state
}

function capitalizeFirstLetter(text) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text
}

function capitalizeEachWord(words) {
    let individualWords = words.split(' ')
    let combinedCapitalizedWord = ''

    individualWords.forEach((thisWord, index) => {
        if (index > 0) { combinedCapitalizedWord += ' ' }
        combinedCapitalizedWord += capitalizeFirstLetter(thisWord)
    })

    return combinedCapitalizedWord
}

function getCityListFromData(dataSet) {
    dataSet.forEach((dataItem) => {
        if (!findExistingCity(dataItem.city)) {
            availableCities.push(dataItem.city)
        }
    })
}

function generateCityList(dataSet) {

    getCityListFromData(dataSet)

    CITIES_FILTER.innerHTML = ''

    for (const CITY of availableCities) {
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
            if (selectedCities.indexOf(CITY_FORM_INPUT.value) >= 0 ) {
                let indexCount = selectedCities.indexOf(CITY_FORM_INPUT.value)
                selectedCities.splice(indexCount, 1)
            } else {
                selectedCities.push(CITY_FORM_INPUT.value)
            }
            console.log(selectedCities)
        })        
    }
}

function findExistingCity(city) {
    if (availableCities.find(element => element === city)) {
        return true
    }
    return false
}

function setup() {
    setProgressIndicator()
    getAllRequiredTypesOfBreweries()

    US_STATE_SEARCH_INPUT.addEventListener('submit', (event) => {
        event.preventDefault()
        state = sortItemsByName(allData)
        let searchedState = US_STATE_SEARCH_INPUT.querySelector('#select-state').value
        searchedState = capitalizeEachWord(searchedState)
        currentSearchCriteria.page = 1
        currentSearchCriteria.by_us_state = searchedState
        state = [...filterStateByCriteria()]
        renderBreweries(state)
    })

    TYPE_FILTER.addEventListener('change', () => {
        state = sortItemsByName(allData)
        currentSearchCriteria.page = 1
        currentSearchCriteria.by_brewery_type = TYPE_FILTER.value
        state = [...filterStateByCriteria()]
        renderBreweries(state)
    })
}

setup()