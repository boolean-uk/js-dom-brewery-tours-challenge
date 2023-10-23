
//FILTER BY TYPE OR BY STATE AND TYPE

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
        console.log('no state chosen')
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
})


//FILTER BY STATE


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
    

//FILTER BY CITY

const filterByCity = (selectedCity) => {
    return state.filteredByState.filter(brewery => brewery.city === selectedCity)
}
let filteredByCities = []

const addEventToCheckbox = (cityCheckbox) => {
    cityCheckbox.addEventListener('change', event => {     
        filteredByCities = filteredByCities.concat(filterByCity(event.target.value))
        filterByPageChosen(filteredByCities)
        displayPage(1)
    })
}

//TODO:CLEAR ALL FILTERS

const addClearAllEvent = (cityCheckbox) => {
    const clearAllButton = document.querySelector(".clear-all-btn")
    clearAllButton.addEventListener('click', event => {
        cityCheckbox.checked = false
        removeCurrentList()
    })
}

//TODO: PAGINATION: get the arrow back and arrow next working


const filterByPageChosen = (breweriesArray) => {
    state.byPage = []
    console.log(breweriesArray.length)
    for (let i = 0; i < breweriesArray.length; i+=10) {
        const filteredArray = breweriesArray.slice(i, i + 10) 
        state.byPage.push(filteredArray)
    }
}

//TODO: myBreweries cart (list)

