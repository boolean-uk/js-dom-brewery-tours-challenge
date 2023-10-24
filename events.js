
//FILTER BY STATE (core)
selectStateForm.addEventListener('submit', event => {
    event.preventDefault()
    const stateName = spacesToUnderscores(event.target[0].value) 
    state.selectedState = stateName.toLowerCase()  
    getBreweriesByState(state.selectedState )

})


const getBreweriesByState = (usState) => {

fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${usState}`)
.then(r => r.json())
.then(d => {
    state.filteredByState = d 
    filterByPageChosen(state.filteredByState)
    displayPage(1)
    getAndRenderCities(state.filteredByState)
})
}




//FILTER BY TYPE OR BY STATE AND TYPE (core)

const getBreweriesByStateAndType = (t) => {

     if(state.selectedState) {
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${state.selectedState}&&by_type=${t}`)
        .then(r => r.json())
        .then(d => {
            state.filteredByStateAndType = d 
            filterByPageChosen(state.filteredByStateAndType)
            displayPage(1)
        })
     } else {
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${t}`)
        .then(r => r.json())
        .then(d => {
            state.filteredByType = d 
            filterByPageChosen(state.filteredByType)
            displayPage(1)
        })
     }
}

chooseFilter.addEventListener('change', change => {
  
    if (change.target.value === "micro") {
        getBreweriesByStateAndType("micro")
    } 
    if (change.target.value === "regional") {
        getBreweriesByStateAndType("regional")
    }
    if (change.target.value === "brewpub") {
        getBreweriesByStateAndType("brewpub")
    }
    if (change.target.value === "") {
        filterByPageChosen(state.filteredByState)
        displayPage(1)
    }
})


//EXTENSION 1
//SEARCH BY NAME - THE LIST UPDATES AS THE USER TYPES

    const searchBreweries =  document.querySelector('#search-breweries')

    searchBreweries.addEventListener('input', event => {

        event.preventDefault()
        const searchParameter = event.target.value

        fetch(`https://api.openbrewerydb.org/v1/breweries/search?query={${searchParameter}}`)
        .then(r => r.json())
        .then(d => {
            state.filteredByName = d 
            filterByPageChosen(state.filteredByName)
            displayPage(1)
        })

    })
    
//EXTENSION 2
//FILTER BY CITY

const filterByCity = (selectedCity) => {
    if (state.filteredByStateAndType) {
        return state.filteredByStateAndType.filter(brewery => brewery.city === selectedCity)
    } else {
        return state.filteredByState.filter(brewery => brewery.city === selectedCity)
    }
}
state.filteredByCities = []

const addEventToCheckbox = (cityCheckbox) => {
    cityCheckbox.addEventListener('change', event => {
        event.preventDefault()
        if (cityCheckbox.checked === true) {
            //when a city is first selected, add its breweris to state.filteredByCities, then render all the breweries stored there
            state.filteredByCities = state.filteredByCities.concat(filterByCity(event.target.value))
            filterByPageChosen(state.filteredByCities)
            displayPage(currentPage)

        } else {
            //if a city is then unselected, filter through state.filterdByCities and only keep the breweries that are NOT located in the un-selected city
            state.filteredByCities = state.filteredByCities.filter(brewery => brewery.city !== cityCheckbox.value)

            //handles cases where unselecting that one city results in no cities at all being selected
            if (state.filteredByCities.length === 0) {
                renderBreweriesByStateOrByStateAndType()
            } else {   
                filterByPageChosen(state.filteredByCities)
                displayPage(currentPage)          
            }
        } 
    })
}

const renderBreweriesByStateOrByStateAndType = () => {
    if (state.filteredByStateAndType){
        filterByPageChosen(state.filteredByStateAndType)
    } else {
        filterByPageChosen(state.filteredByState)
    }
    displayPage(currentPage)
}



const addClearAllEvent = (cityCheckbox) => {
    const clearAllButton = document.querySelector(".clear-all-btn")
    clearAllButton.addEventListener('click', () => {
        cityCheckbox.checked = false
        removeCurrentList()
        renderBreweriesByStateOrByStateAndType()
    })
}

//EXTENSION 3
//ensures that only the search results belonging to one page appear as said page number is selected

const filterByPageChosen = (breweriesArray) => {
    state.byPage = []
    for (let i = 0; i < breweriesArray.length; i+=10) {
        const filteredArray = breweriesArray.slice(i, i + 10) 
        state.byPage.push(filteredArray)
    }
}



//EXTENSION 4
const addToVisitListButtonEvent = (addToVisitListButton, brewery) => {
    addToVisitListButton.addEventListener('click', () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(brewery)
        }
    
        fetch("http://localhost:3000/myList", options)
    })  

}
 