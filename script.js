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
        breweryHeader.innerText = eachBrewery.name
        breweryLi.append(breweryHeader)

        // 3. Div
        const breweryDiv = document.createElement('div')
        breweryDiv.setAttribute("class", "type")
        breweryDiv.innerText = 'micro'
        breweryLi.append(breweryDiv)

        //4. Address Section
        const breweryAddressSection = document.createElement('section')
        breweryAddressSection.setAttribute("class", "address")
        breweryLi.append(breweryAddressSection)

        //5. Within section: create elements
        // 5a. h3 tag
        const addressh3 = document.createElement('h3')
        addressh3.innerText = "Address:"
        breweryAddressSection.append(addressh3)

        //5b. p tag
        const addressP = document.createElement('p')
        addressP.innerText = eachBrewery.street
        breweryAddressSection.append(addressP)

        //5c. p tag2
        const addressPTwo = document.createElement('p')
        breweryAddressSection.append(addressPTwo)
        const strongAddressP = document.createElement('strong')
        addressPTwo.append(strongAddressP)
        strongAddressP.innerText = `${eachBrewery.city }, ${eachBrewery.postal_code}`
        
        // 6. Phone Section
        const phoneSection = document.createElement('section')
        phoneSection.setAttribute("class", "phone")
        breweryLi.append(phoneSection)

        // 6a. h3 tag phone section
        const phoneSectionh3 = document.createElement('h3')
        phoneSectionh3.innerText = 'Phone:'
        phoneSection.append(phoneSectionh3)

        // 6b. p tag phone section
        const phoneSectionP = document.createElement('p')
        phoneSectionP.innerText = eachBrewery.phone
        phoneSection.append(phoneSectionP)

        // 7. Link Section
        const linkSection = document.createElement('section')
        linkSection.setAttribute('class', 'link')
        breweryLi.append(linkSection)

        // 7a. Link a tag
        const aSection = document.createElement('a')
        aSection.setAttribute('href', 'null')
        aSection.setAttribute('target', '_blank')
        aSection.innerText = 'Visit Website'
        linkSection.append(aSection)
        
    })
}