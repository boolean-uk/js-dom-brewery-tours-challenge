
// renderBreweries(state.breweries)

fetch("https://api.openbrewerydb.org/v1/breweries")
.then(r => r.json())
.then(d => {
    state.breweries = d 
    removeCurrentList()
    renderBreweries(state.breweries)
})


