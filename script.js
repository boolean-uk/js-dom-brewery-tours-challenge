console.log('testing console')

//In this challenge we explore a common scenario in eCommerce and booking sites, using filters and search to modify what we render from the state. You'll apply all the skills you've learned in the JS DOM unit: dynamic DOM creation, event listeners, state and requesting data from a server.

// Criteria

// A user can enter a US state and view a list of breweries in that state
// -The list should only shows the types of breweries that offer brewery tours:
// -- Micro
// -- Regional
// -- Brewpub
// -Do not show the other types of breweries
// -From the list of breweries, a user can view the following details about each brewery:
// --Name
// --Type of brewery
// --Address
// --Phone Number
// - From the list of breweries, a user can visit the website of a brewery
// - From the 'filter by type of brewery' section, a user can filter by type of brewery.

// A user can enter a US state and view a list of breweries in that state.

const state = {
    breweries: [],
};


const root = ' https://api.openbrewerydb.org/v1/breweries?by_name=cooper&per_page=3'
console.log(root, " this is root")

// For rendering breweries - select the unordered list
// '#breweries-list' --> html page
const breweriesListContainer = document.querySelector('#breweries-list')
console.log(breweriesListContainer)

// READ - GET REQUEST

function usState() {
    fetch(`${root}`)
    .then((reponse) => reponse.json())
    .then((data)=> {
        state.breweries = data;
renderBreweries()
    })
}
usState()

// Render breweries
function renderBreweries() {
    // Render
    state.breweries.forEach((eachBrewery)=> {
        // 1. LIs - Now create the elements within the brewery list, li elements
        const breweryLi = document.createElement("li")
        breweriesListContainer.append(breweryLi)

        // 2. Header
        const breweryHeader = document.createElement("h2")

        // 3. Div

    })
}