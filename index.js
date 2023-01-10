const state = {
    breweries: [],
}





function fetchData() {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${US_STATE}`)
        .then((response) => {return response.json()})
        .then((responseData) => {
            console.log("Breweries receives", responseData)
            state.breweries = responseData
        })
}

