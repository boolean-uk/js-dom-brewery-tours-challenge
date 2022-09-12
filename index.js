const BREWERIES_BASE_URL = 'https://api.openbrewerydb.org/breweries'

const BREWERY_LIST = document.querySelector('.breweries-list')
const STATE_SEARCH_INPUT = document.querySelector('#select-state-form')

let appState = []

function getBreweries(category, term) {
    BREWERY_LIST.innerHTML = ''
    console.log('In getBreweries')
    fetch(BREWERIES_BASE_URL + '?' + category + '=' + term)
        .then(res => res.json())
        .then(breweries => breweries.forEach(brewery => renderBreweryListItems(brewery)) )
}

function renderBreweryListItems(singleBrewery) {
    const breweryLi = document.createElement('li')

    const breweryLiTemplate = `
        <h2>${singleBrewery.name}</h2>
        <div class="type">${singleBrewery.brewery_type}</div>
        <section class="address">
        <h3>Address:</h3>
        <p>${singleBrewery.street}</p>
        <p><strong>${singleBrewery.city}, ${singleBrewery.postal_code}, ${singleBrewery.state}</strong></p>
        </section>
        <section class="phone">
        <h3>Phone:</h3>
        <p>${singleBrewery.phone}</p>
        </section>
        <section class="link">
        <a href="${singleBrewery.website_url}" target="_blank">Visit Website</a>
        </section>
        </li>
        `

    breweryLi.innerHTML = breweryLiTemplate
    BREWERY_LIST.appendChild(breweryLi)
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
