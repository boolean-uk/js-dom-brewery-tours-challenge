
//FILTER BY TYPE

// const getBreweriesByType = (t) => {

//     // fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${type}`)
//     // .then(r => r.json())
//     // .then(d => {
//     //     state.filtered = d 
//     //     removeCurrentList()
//     //     renderBreweries(state.filtered)
//     state.filteredByStateAndType = state.filteredByState.filter(brewery => brewery.brewery_type === t)
//     removeCurrentList()
//     renderBreweries(state.filteredByStateAndType)
// }

const getBreweriesByStateAndType = (t) => {

     if(state.selectedState) {
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${state.selectedState}&&by_type=${t}`)
        .then(r => r.json())
        .then(d => {
            state.filteredByStateAndType = d 
            renderBreweries(state.filteredByStateAndType)
        })
     } else {
        console.log('no state chosen')
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${t}`)
        .then(r => r.json())
        .then(d => {
            state.filteredByType = d 
            console.log(state.filteredByType)
            renderBreweries(state.filteredByType)
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
        state.selectedState = event.target[0].value  
        getBreweriesByState(state.selectedState )
    
})


const getBreweriesByState = (usState) => {
    
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${usState}`)
    .then(r => r.json())
    .then(d => {
        state.filteredByState = d 
        renderBreweries(state.filteredByState)
    })
}
