const state = {
    breweries: []
}

// Stop page refresh on search submit
// Write search term to variable

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
                state.breweries.push({...currentBrewery, visible: true})                
                return true
            } else {
                return false
            }
        })
    renderCards()
    return state.breweries
    })
}
// RENDER BREWERY CARDS
function renderCards() {
    breweryList.innerHTML = ``
    state.breweries.forEach(brewery => {
        const li = document.createElement(`li`)
        if (brewery.address_1 === null) {
            brewery.address_1 = `No Given Address`
        }
        if (brewery.address_2 === null) {
        li.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${brewery.address_1}</p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${brewery.phone}</p>
        </section>
        <section class="link">
          <a href="${brewery.website_url}" target="_blank">Visit Website</a>
        </section>
        `
    } else {
        li.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${brewery.address_1}</p>
          <p><strong>${brewery.address_2}</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${brewery.phone}</p>
        </section>
        <section class="link">
          <a href="${brewery.website_url}" target="_blank">Visit Website</a>
        </section>
        `
    }
        breweryList.append(li)
    })
}

function print() {
    setTimeout(() => {
        console.log(state.breweries)
    }
    ,1000) 
}

// SEARCH BUTTON - PREVENTS PAGE REFRESH AND FUNS SEARCHSUBMIT FUNCTION
function searchEventListener() {
    searchField.addEventListener('submit', (event) => {
        event.preventDefault()
        searchSubmit()
        // print ()
    })
}

searchEventListener()