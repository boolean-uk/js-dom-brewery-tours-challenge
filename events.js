
//FILTER BY TYPE

const getBreweriesByType = (t) => {

    // fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${type}`)
    // .then(r => r.json())
    // .then(d => {
    //     state.filtered = d 
    //     removeCurrentList()
    //     renderBreweries(state.filtered)
    state.filteredByStateAndType = state.filteredByState.filter(brewery => brewery.brewery_type === t)
    removeCurrentList()
    renderBreweries(state.filteredByStateAndType)
}

chooseFilter.addEventListener('change', change => {
    if (change.target.value === "micro") {
        getBreweriesByType("micro")
    } 
    if (change.target.value === "regional") {
        getBreweriesByType("regional")
    }
    if (change.target.value === "brewpub") {
        getBreweriesByType("brewpub")
    }
})


//FILTER BY STATE


selectStateForm.addEventListener('submit', event => {
        event.preventDefault()
        console.log(event.target[0].value)
        removeCurrentList()      
        getBreweriesByState(event.target[0].value)
    
})


const getBreweriesByState = (usState) => {
    
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${usState}`)
    .then(r => r.json())
    .then(d => {
        state.filteredByState = d 
        renderBreweries(state.filteredByState)
    })
}
