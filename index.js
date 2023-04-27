const state = {
    breweries: [],
    typeFilter: ``,
    liveSearch: ``,
    toVisit: [],
    displayedData: [],
    citySearchList: [],
    citySearchActive: [],
}

// FILE WIDE CONSTANTS

const searchField = document.querySelector(`#select-state-form`)
const breweryList = document.querySelector(`#breweries-list`)
const cityFilterForm = document.querySelector(`#filter-by-city-form`)
const typeOptions = document.querySelector(`#filter-by-type`)
const pageDisplay = document.querySelector(`.page-display`)
const visitList = document.querySelector(`.visit-list`)
const numberPerPage = 10
let pageNumber = 1
let numberOfPages = 1
let firstItem = 0
let lastItem = 10
let visitTest = []

// function getToVisit() {
//     fetch(`http://localhost:3000/visit`)
//     .then(function (response) {
//         return response.json()
//     })
//     .then(function (data) {
//         state.toVisit = data
//     })
// }

// EXTRACTS SEARCH TERM, FETCHES DATA USING THAT TERM, CHECKS BREWERY TYPE AND WRITES VALID
// BREWERIES TO STATE AND ADDS VISIBLE PROPERTY
function searchSubmit() {
    const searchText = searchField[`select-state`].value
    if (searchText === ``) {
        alert(`Search Cannot Be Empty - Please Enter a State`)
        return
    }
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchText}&per_page=500`)
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
    typeOptions.selectedIndex = 0
    resetPageNumbers()
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

// CLEARS THE CITY FILTERS
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
    numberOfPages = Math.ceil(arr.length / numberPerPage)
    pageDisplay.innerText = `Page ${pageNumber} of ${numberOfPages}`
    breweryList.innerHTML = ``
    arr = arr.slice(firstItem, lastItem)    
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
          ${brewery.phone ? `<p>${brewery.phone}</p>` : `<p>No Phone Number</p>`}
        </section>
        <section class="link">
          <a href="${brewery.website_url}" target="_blank">Visit Website</a>
          <button class="visit-button">Add to Visit List</button>
        </section>
        `
        visitEventListener(brewery, li)
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
    resetPageNumbers()
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

// ADDS EVENT LISTENERS TO PREV/NEXT PAGE BUTTONS
function paginationEventListener() {
    const prev = document.querySelector('.prev');
    prev.addEventListener('click', (e) => {
       e.preventDefault();
       if (pageNumber > 1) {
          pageNumber--;
          firstItem -= 10
          lastItem -= 10
          renderCards(state.displayedData);
       }
    });
    const next = document.querySelector(".next");
    next.addEventListener("click", (e) => {
        e.preventDefault();
        if (pageNumber < numberOfPages) {
            pageNumber++;
            firstItem += 10
            lastItem += 10
            renderCards(state.displayedData);
        }
    });
}

function resetPageNumbers() {
    pageNumber = 1
    firstItem = 0
    lastItem = 10
}

function visitEventListener(brewery, li) {
    const visitButton = li.querySelector(`.visit-button`)
    visitButton.addEventListener(`click`, () => {
        addVisit(brewery)
    })
}

function fetchVisitList() {
    fetch(`http://localhost:3000/toVisit`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {        
        state.toVisit = data
    })
}

function addVisit(brewery) {
    const newVisit = {
        name: brewery.name,
        address_1: brewery.address_1,
        city: brewery.city,
        phone: brewery.phone,
        brewery_type: brewery.brewery_type,
        website_url: brewery.website_url
    }

    const alreadyExists = state.toVisit.some(brewery => brewery.name === newVisit.name)

    if (alreadyExists) {
        return
    }

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newVisit)
    }

    fetch(`http://localhost:3000/toVisit`, options)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        state.toVisit.push(data)
    })
}

function visitListEventListener() {
    const showVisitButton = document.querySelector(`.show-visit-list`)
    showVisitButton.addEventListener(`click`, () => {
        const header = document.querySelector(`#brewery-list-header`)
        if (showVisitButton.id === "inactive") {
            breweryList.classList.add(`hidden`)
            visitList.classList.remove(`hidden`)
            showVisitButton.innerText = `Hide Visit List`
            showVisitButton.setAttribute(`id`, `active`)
            header.innerText = `List of Breweries to Visit`
            resetPageNumbers()
            renderVisitList(state.toVisit)
        } else {
            breweryList.classList.remove(`hidden`)
            visitList.classList.add(`hidden`)
            showVisitButton.innerText = `Show Visit List`
            showVisitButton.setAttribute(`id`, `inactive`)
            header.innerText = `List of Breweries`
            resetPageNumbers()
            displayedData(state.breweries)
        }
    })
}

function renderVisitList(arr) {
    numberOfPages = Math.ceil(arr.length / numberPerPage)
    pageDisplay.innerText = `Page ${pageNumber} of ${numberOfPages}`
    visitList.innerHTML = ``
    arr = arr.slice(firstItem, lastItem)    
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
          ${brewery.phone ? `<p>${brewery.phone}</p>` : `<p>No Phone Number</p>`}
        </section>
        <section class="link">
          <a href="${brewery.website_url}" target="_blank">Visit Website</a>
          <button class="delete-button">Visited?</button>
        </section>
        `
        deleteEventListener(brewery, li)
        visitList.append(li)
    })
}

function deleteEventListener(brewery, li) {
    const deleteButton = li.querySelector(`.delete-button`)
    deleteButton.addEventListener(`click`, () => {
        if (deleteButton.innerText === `Visited?`) {
            deleteButton.innerText = `Click to Remove From Your List`
        } else {
            const options = {
                method: "DELETE"
            }
            fetch(`http://localhost:3000/toVisit/${brewery.id}`, options)
            .then(function (response) {
                return response.json
            })
            .then( () => {
                fetchVisitList()
            })           
        }
        setTimeout(() => {
            renderVisitList(state.toVisit)
        }, "1000")
    })
}

function pageLoad() {
    searchEventListener()
    filterEventListener()
    brewerySearchEventListener()
    paginationEventListener()
    visitListEventListener()
    fetchVisitList()
}


pageLoad()

// RUN THIS IN TERMINAL TO LAUNCH JSON SERVER
// npx json-server --watch db/visit.json
// GO TO THIS IN BROWSER TO SEE STATUS US VISIT.JSON
// http://localhost:3000/toVisit