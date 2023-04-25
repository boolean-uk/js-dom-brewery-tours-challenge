const state = {
    breweries: [],
    citySearchList: [],
    citySearchActive: [],
}

// FILE WIDE CONSTANTS

const searchField = document.querySelector(`#select-state-form`)
const breweryList = document.querySelector(`#breweries-list`)
const cityFilterForm = document.querySelector(`#filter-by-city-form`)

// EXTRACTS SEARCH TERM, FETCHES DATA USING THAT TERM, CHECKS BREWERY TYPE AND WRITES VALID
// BREWERIES TO STATE AND ADDS VISIBLE PROPERTY
function searchSubmit() {
    const searchText = searchField[`select-state`].value
    if (searchText === ``) {
        alert(`Search Cannot Be Empty - Please Enter a State`)
        return
    }
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchText}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {        
        state.breweries = []
        data.filter(currentBrewery => {
            if (currentBrewery.brewery_type === `micro` || currentBrewery.brewery_type === `regional` || currentBrewery.brewery_type === `brewpub`) {          
                state.breweries.push({...currentBrewery, filter: true, search: true, cityFilter: true})
            } 
        })
        if (state.breweries.length === 0) {
            alert(`No Results Found`)
            return
        }
    renderCards(state.breweries)
    createCityArray(state.breweries)
    })
}

// CREATES AN ARRAY OF EVERY CITY FROM THE CURRENTLY SELECTED STATE
function createCityArray(arr) {
    state.citySearchList = []
    arr.forEach(brewery => {
        if (state.citySearchList.length === 0 || !state.citySearchList.includes(`${brewery.city}`)) {
        state.citySearchList.push(brewery.city)
        }
    })
    renderCitySearchButtons(state.citySearchList)
}

// CREATES A CHECK BOX FOR EVERY CITY
function renderCitySearchButtons(arr) {
    cityFilterForm.innerHTML = ``
    arr.forEach(city => {
        const cityInput = document.createElement(`input`)
            cityInput.setAttribute(`type`, `checkbox`)
            cityInput.setAttribute(`name`, `${city}`)
            cityInput.setAttribute(`value`, `${city}`)
        const cityLabel = document.createElement(`label`)
            cityLabel.setAttribute(`for`, `${city}`)
            cityLabel.innerText = `${city}`
        cityFilterForm.append(cityInput)
        cityFilterForm.append(cityLabel)
        cityInput.addEventListener(`click`, () => {
            cityFilterArray(cityInput, cityInput.value)
        })
    })
}

// CREATES ARRAY OF ACTIVE FILTERS AND MODIFIES STATE.BREWERIES TO SHOW ACTIVE ONLY
function cityFilterArray(cityInput, city) {
    if (cityInput.checked) {
        state.citySearchActive.push(city)
    } else {
        state.citySearchActive.splice(state.citySearchActive.indexOf(city), 1)
    }
    state.breweries.forEach(brewery => {
        const pattern = new RegExp(brewery.city)
        if (pattern.test(state.citySearchActive)) {
            brewery.cityFilter = true
        } else {
            brewery.cityFilter = false
        }
    })
    renderCards(state.breweries)
}

// RENDER BREWERY CARDS
function renderCards(arr) {
    breweryList.innerHTML = ``
    arr.forEach(brewery => {
        if (brewery.filter === true && brewery.search === true && brewery.cityFilter === true) {
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

// ADDS EVENT LISTENER TO LIVE SEARCH BAR
function brewerySearchEventListener() {
    const searchArea = document.querySelector(`#search-breweries-form`)
    searchArea.addEventListener(`keyup`, (event) => {
        brewerySearchArray(event.target.value)
    })
    searchArea.addEventListener(`submit`, (event) => {
        event.preventDefault()
    })
}

// UPDATES STATE BASED ON SEARCH TEXT
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

// SEARCH BUTTON - PREVENTS PAGE REFRESH AND FUNS SEARCHSUBMIT FUNCTION
function searchEventListener() {
    searchField.addEventListener('submit', (event) => {
        event.preventDefault()
        const searchArea = document.querySelector(`#search-breweries`)
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