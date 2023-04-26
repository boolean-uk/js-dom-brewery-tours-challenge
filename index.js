const state = {
    breweries: [],
    typeFilter: ``,
    liveSearch: ``,
    displayedData: [],
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
                state.breweries.push({...currentBrewery})
            } 
        })
        if (state.breweries.length === 0) {
            alert(`No Results Found`)
            return
        }
    state.displayedData = state.breweries
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
    clearFiltersButton()
}

function clearFiltersButton() {
    const clearButton = document.querySelector(`.clear-all-btn`)
    clearButton.addEventListener(`click`, () => {
        let checkBoxes = document.querySelectorAll(`.checkbox`)
        checkBoxes.forEach(box => {
            box.checked = false
        })
        state.citySearchActive = []
    displayedData(state.breweries)
    })
}

// CREATES A CHECK BOX FOR EVERY CITY
function renderCitySearchButtons(arr) {
    cityFilterForm.innerHTML = ``
    arr.forEach(city => {
        const cityInput = document.createElement(`input`)
            cityInput.setAttribute(`class`, `checkbox`)
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
    displayedData(state.breweries)
}

// RENDER BREWERY CARDS
function renderCards(arr) {
    breweryList.innerHTML = ``
    arr.forEach(brewery => {
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
    })
}

// ADDS EVENT LISTENER TO FILTER
function filterEventListener() {
    const field = document.querySelector(`#filter-by-type`)
    field.addEventListener(`change`, (event) => {
        state.typeFilter = event.target.value      
        displayedData(state.breweries)
    })
}

// CHANGES RENDERED DATA WHEN FILTERS ARE APPLIED
function displayedData(arr) {
    if (state.typeFilter !== ``) {
        arr = arr.filter(function (el) {
            return el.brewery_type === state.typeFilter
        })
    }
    if (state.citySearchActive.length > 0) {
        arr = arr.filter(function (el) {
            return state.citySearchActive.includes(el.city)
        })
    }
    if (state.liveSearch !== ``) {
        const pattern = state.liveSearch.toLowerCase()
        arr = arr.filter(function (el) {
            return el.name.toLowerCase().includes(`${pattern}`)
        })
    }
    state.displayedData = arr
    renderCards(state.displayedData)
}

// ADDS EVENT LISTENER TO LIVE SEARCH BAR
function brewerySearchEventListener() {
    const searchArea = document.querySelector(`#search-breweries-form`)
    searchArea.addEventListener(`keyup`, (event) => {
        state.liveSearch = event.target.value
        displayedData(state.breweries)
    })
    searchArea.addEventListener(`submit`, (event) => {
        event.preventDefault()
    })
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