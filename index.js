const state = {
    breweries: []
}

// Stop page refresh on search submit
// Write search term to variable

const searchField = document.querySelector(`#select-state-form`)


// EXTRACTS SEARCH TERM AND WRITES IT TO A VARIABLE
function searchSubmit() {
    const searchText = searchField[`select-state`].value
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchText}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        state.breweries = data
        state.breweries = state.breweries.filter(currentBrewery => {
            if (currentBrewery.brewery_type === `micro` || currentBrewery.brewery_type === `regional` || currentBrewery.brewery_type === `brewpub`) {
                return true
            } else {
                return false
            }
        })
    return state.breweries
    })
}

function print() {
    setTimeout(() => {
        console.log(state.breweries)
    }
    ,3000) 
}

// SEARCH BUTTON - PREVENTS PAGE REFRESH AND FUNS SEARCHSUBMIT FUNCTION
function searchEventListener() {
    searchField.addEventListener('submit', (event) => {
        event.preventDefault()
        searchSubmit()
        print ()
    })
}

searchEventListener()