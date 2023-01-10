//STATE
const state = {
    breweries: [],
  };

//SELECT ELEMENTS
const listOfBreweriesUL = document.querySelector('#breweries-list')
const inputField = document.querySelector('#select-state-form')
const searchThisState = document.querySelector(`#select-state`)
const filterSelector = document.querySelector(`#filter-by-type-form`)
const typeOfFilter = document.querySelector('#filter-by-type')

console.log(searchThisState.value)

filterSelector.addEventListener('change', function(event){
    event.preventDefault()
    listOfBreweriesUL.innerHTML = ""
    if(typeOfFilter.value == "micro"){
        const isMicro = state.breweries.filter(brewery => {
            return brewery.brewery_type === "micro"
        })
        isMicro.forEach((brewery) => {
            creatingBreweriesList(brewery)

        })
    }
    if(typeOfFilter.value == "regional"){
        const isRegional = state.breweries.filter(brewery => {
            return brewery.brewery_type === "regional"
        })
        isRegional.forEach((brewery) => {
            creatingBreweriesList(brewery)

        })
    }
    if(typeOfFilter.value == "brewpub"){
        const isBrewPub = state.breweries.filter(brewery => {
            return brewery.brewery_type === "brewpub"
        })
        console.log(isBrewPub)
        isBrewPub.forEach((brewery) => {
            creatingBreweriesList(brewery) 
        })
    }
    })


inputField.addEventListener('submit', function(event){
    event.preventDefault()
    const stateName = searchThisState.value
    if(stateName.length > 0){
        getBreweriesByStateFromAPI(stateName)
    } else {
        console.log("Please give us a state mate?")
    }
})


//NETWORK

function getBreweriesByStateFromAPI(stateName){
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`)
        .then((response) => {
            return response.json()
        })
        .then((breweriesDataFromServer) => {
            state.breweries = breweriesDataFromServer
            renderAllBreweries()
        })
}

//RENDERING

function creatingBreweriesList(brewery){
    const breweryDataLiConstainer = document.createElement("li")

        const breweryName = document.createElement('h2')
        breweryName.innerText = brewery.name

        const breweryAddressContainer = document.createElement('section')
        breweryAddressContainer.setAttribute("class", "address")
        const breweryAddressH3 = document.createElement('h3')
        breweryAddressH3.innerText = "Address:"
        const breweryAddressStreet = document.createElement('p')
        breweryAddressStreet.innerText = brewery.street
        const breweryAddressCity = document.createElement('p')
        breweryAddressCity.innerText = `${brewery.city}, ${brewery.state}, ${brewery.postal_code}`
        breweryAddressContainer.append(breweryAddressH3, breweryAddressStreet, breweryAddressCity)

        const breweryPhoneContainer = document.createElement('section')
        const breweryPhoneH3 = document.createElement('h3')
        breweryPhoneH3.setAttribute("class", "phone")
        breweryPhoneH3.innerText = `Phone:`
        const breweryPhoneNumber = document.createElement('p') 
        breweryPhoneNumber.innerText = brewery.phone
        breweryPhoneContainer.append(breweryPhoneH3, breweryPhoneNumber)


        const breweryType = document.createElement("span")
        breweryType.setAttribute("class", "type")
        breweryType.innerText = brewery.brewery_type

        const breweryLinkContainer = document.createElement("section")
        breweryLinkContainer.setAttribute("class", "link")
        const breweryLink = document.createElement("a")
        breweryLink.setAttribute("href", `${brewery.website_url}`)
        breweryLink.innerText = "Visit Website"
        breweryLinkContainer.append(breweryLink)
        
        breweryDataLiConstainer.append(breweryName, breweryAddressContainer, breweryPhoneContainer, breweryType, breweryLinkContainer)

        listOfBreweriesUL.append(breweryDataLiConstainer)
}

function renderAllBreweries(){
    listOfBreweriesUL.innerHTML = ""
    state.breweries.forEach((brewery) => {
        creatingBreweriesList(brewery)
    })
}

// -- LOGIC --
// 1.) Create State object and include breweries
// 2.) Create Event Listener on the <form> #select-state-form
//  - REMEMBER 'SUBMIT'
//  - Prevent default behabviour to stop the page reloading and messing with the request
//  - check the state length (input.innertext > 0)
//  - Call function that will deal with the fetch request getBreweriesByStateFromAPI(stateName)
//  - COMMIT TO GITHUB

// 3.) Create function to fetch breweries by state
//  - If state has 2 words replace "" with "_" (start with one word first then do this bit) 
//  - from resource - https://api.openbrewerydb.org/breweries?by_state=US_STATE_NAME&per_page=50
//  - Can we use ${STATENAME} here?? (REMEMBER `)
//  - On response, save data to local state.breweries (do we need all info here? we can deal with that in render)
//  - Call render renderAllBreweries()
//  COMMIT TO GITHUB

// 4.) Render Function - renderAllBreweries
//  - Clear list (innerHTML = "")
//  - For Each loop state.breweries (REMEMBER PLURALS AND SINGULAR HERE)
//      - Creat li (const li) document.createElement ('li")
//      - Store ID, Name, Address (.address), Phone Number (.phone), Type (.breweries-list li .type), and website (.link) in li
//      - Append li to Ul
//  COMMIT TO GITHUB

// 5.) Filter Section (This might need to be in the renderAllBreweries)
//  - If submit innertext === micro call function - RenderMicro
//  - If submit innertext === regional call function - renderRegional
//  - If submit innertext === brewpub call function - renderBrewpub

// 6.) Functions for each type
//  - clear list
//  - Filter state.breweries
//      - state.breweries.filter(.type === "micro")
//  - Render 

