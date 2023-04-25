const state = {
    breweries: [],
    searchedCities: []
}

// FILE WIDE CONSTANTS

const searchField = document.querySelector(`#select-state-form`)
const breweryList = document.querySelector(`#breweries-list`)


// EXTRACTS SEARCH TERM, FETCHES DATA USING THAT TERM, CHECKS BREWERY TYPE AND WRITES VALID
// BREWERIES TO STATE AND ADDS VISIBLE PROPERTY
function searchSubmit() {
    const searchText = searchField[`select-state`].value
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchText}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {        
        state.breweries = []
        data.filter(currentBrewery => {
            if (currentBrewery.brewery_type === `micro` || currentBrewery.brewery_type === `regional` || currentBrewery.brewery_type === `brewpub`) {          
                state.breweries.push({...currentBrewery, filter: true, search: true})
            } 
        })
    renderCards(state.breweries)
    })
}

// RENDER BREWERY CARDS
function renderCards(arr) {
    breweryList.innerHTML = ``
    arr.forEach(brewery => {
        if (brewery.filter === true && brewery.search === true) {
        
        const li = document.createElement(`li`)
        li.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          ${brewery.address_1 ? `<p>${brewery.address_1}</p>` : `<p>No Address Given</p>`}
          ${brewery.address_2 ? `<p><strong>${brewery.address_2}</strong></p>` : ''}
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${brewery.phone}</p>
        </section>
        <section class="link">
          <a href="${brewery.website_url}" target="_blank">Visit Website</a>
        </section>
        `
        breweryList.append(li)
    }
})
}

// ADDS EVENT LISTENER TO FILTER
function filterEventListener() {
    const field = document.querySelector(`#filter-by-type`)
    field.addEventListener(`change`, (event) => {
        filterArray(event.target.value)
    })
}

// TAKES FILTER VALUE AND CHANGES VISIBLE PROPERTY OF EACH OBJECT BASED ON FILTER VALUE
function filterArray(filter) {
    state.breweries.forEach(brewery => {
        if (brewery.brewery_type === filter || filter === ``) {
            brewery.filter = true
        } else {
            brewery.filter = false
        }
    })
    renderCards(state.breweries)
    return state.breweries
}

function brewerySearchEventListener() {
    const searchArea = document.querySelector(`#search-breweries-form`)
    searchArea.addEventListener(`keyup`, (event) => {
        brewerySearchArray(event.target.value)
    })
    searchArea.addEventListener(`submit`, (event) => {
        event.preventDefault()
    })
}

function brewerySearchArray(searchTerm) {
    const pattern = new RegExp(searchTerm, `i`)
    state.breweries.forEach(brewery => {
        if (pattern.test(brewery.name)) {
            brewery.search = true
        } else {
            brewery.search = false
        }
    })
    renderCards(state.breweries)
}

// Changes visible value based on other events

// SEARCH BUTTON - PREVENTS PAGE REFRESH AND FUNS SEARCHSUBMIT FUNCTION
function searchEventListener() {
    searchField.addEventListener('submit', (event) => {
        event.preventDefault()
        const searchArea = document.querySelector(`#brewery-search`)
        searchArea.value = ``
        searchSubmit()
    })
}

function pageLoad() {
    searchEventListener()
    filterEventListener()
    brewerySearchEventListener()
}


pageLoad()