//US state input field -> on enter, refresh the list and only render those that are located in the state that was typed. MUST HANDLE ERRORS! ( state not found)


//select => use the api


//TODO: get this to work!

const getBreweriesByType = (type) => {

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${type}`)
    .then(r => r.json())
    .then(d => {
        state.filtered = d 
        removeCurrentList()
        renderBreweries(state.filtered)
})
}

chooseFilter.addEventListener('change', change => {
    if (change.target.value === "micro") {
        removeCurrentList()
        getBreweriesByType("micro")
    } 
    if (change.target.value === "regional") {
        removeCurrentList()
        getBreweriesByType("regional")
    }
    if (change.target.value === "brewpub") {
        removeCurrentList()
        getBreweriesByType("brewpub")
    }
})
//filterOption


