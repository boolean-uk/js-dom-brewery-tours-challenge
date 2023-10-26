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


const root = `https://api.openbrewerydb.org/v1/breweries`


// For rendering breweries - select the unordered list
// '#breweries-list' --> html page
const breweriesListContainer = document.querySelector('#breweries-list')


// READ - GET REQUEST

function usState(baseUrl) {
    fetch(`${baseUrl}`)
    .then((reponse) => reponse.json())
    .then((data)=> {
        console.log("Data:",data)
        state.breweries = data;
        renderBreweries()
    })
}
usState(root)

// Render breweries
function renderBreweries() {
    // Reset Container
    breweriesListContainer.innerText = ""

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
        breweryDiv.innerText = eachBrewery.brewery_type
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
        aSection.setAttribute('href', eachBrewery.website_url)
        aSection.setAttribute('target', '_blank')
        aSection.innerText = 'Visit Website'
        linkSection.append(aSection)
        
    })
}

// Search by State
// When you search by US state, the type of brewery gets filtered by Micro, Regional and Brewpub 

//Search by State
// Example, type in "new-york", all the breweries in new-york should come up.



// Select the search input --> When you enter a state
const searchButton = document.querySelector('#select-state-form > input[type=submit]:nth-child(3)')
const typeOfBrewInput = document.querySelector('#filter-by-type')
const searchInput = document.querySelector('#select-state')

searchButton.addEventListener("click", (e)=> {
    e.preventDefault()
    stateAndTypeAPIs() 
})

//Filter breweries that offer brewery tours by:
// 1. Micro
// 2. Regional
// 3. Brewpub

typeOfBrewInput.addEventListener('change', stateAndTypeAPIs)

function stateAndTypeAPIs() {
    // Get the value for the state
    const stateValue = searchInput.value
    // Get the value for the type of brew
    const brewTypeValue = typeOfBrewInput.value

    const searchURL = root+`?by_state=${stateValue}&by_type=${brewTypeValue}`
    // API call and render
    usState(searchURL)
}