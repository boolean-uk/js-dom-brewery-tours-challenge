fetch("https://api.openbrewerydb.org/v1/breweries")
.then(r => r.json())
.then(d => {
    state.breweries = d 
    // renderBreweries(state.breweries)
})
.then(d => {
    console.log(state.breweries.length)
    filterByPageChosen(state.breweries)
})
.then(() => {
    displayPage(1)
})



//TODO: PAGINATION: get the arrow back and arrow next working

//TODO: FILTER BY TYPE: add the possibility to filter by type one a city (or more) has(have) been selected (as of now, this only works with states)

//TODO: general refactor (especially for extension 4 code), aiming to 1) break longer streches of code into smaller functions, each of which has one clear job AND 2) ensure that code is not repeated unecessarily

