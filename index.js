fetch("https://api.openbrewerydb.org/v1/breweries")
.then(r => r.json())
.then(d => {
    state.breweries = d 
})
.then(d => {
    console.log(state.breweries.length)
    filterByPageChosen(state.breweries)
})
.then(() => {
    displayPage(1)
})





