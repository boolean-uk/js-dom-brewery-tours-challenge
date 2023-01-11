// PLAN:

// SELECT EXISTING HTML ELEMENTS
// selecting selecting state
const selectedStateValue = document.querySelector('#select-state')
const searchButton = document.querySelector('#select-state-form')
// selecting filters section
const filteredType = document.querySelector('#filter-by-type-form')

// STATE
const state = {
    breweries: [],
};


// GENERAL UI FLOW:
// 1. user makes interaction with page
// 2. interaction updates local state OR sends a network request for state change
// 3. if network request was OK, then we update local state
// 4. when local state is updated, we then re-render the page

// NETWORK REQUESTS


// REQUIREMENT 1: show a list of breweries for a US state
// - note: only show micro, regional and brewpub
// ACTIONS
// - add a listener for the search form submission which triggers the GET request
searchButton.addEventListener('submit', (event) => { // listen to this search button when it is submitted with event parameter
    event.preventDefault() // so we do  not lose data when we refresh by submitting it
    const stateTypedByUser = selectedStateValue.value // want to get the value which is what the user typed exactly
    console.log('check', stateTypedByUser) // checked if i get the value when i hit submit

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateTypedByUser}&per_page=3`) // made a fetch GET request to display to me which one the user typed which is why i put the variable in the url to get what the user typed
        .then((response) => {
            return response.json() // this is apparently stayed as it is always because it changes to the json of that url to a js object so we can do stuff to it
        })
        .then((data) => { // i do another .then to get the data which is in the url
            state.breweries = data // and i make my empty array equal to the data in the url from the GET request
            console.log('check', state) // checked if i got the data working
            RenderAllBreweries(i) // once i do i get the breweries for what the user typed which includes the info about it
        })

    function RenderAllBreweries(index) { // thought id make a function with an index to display the one the user selected and a for loop to make the html elements for each list 

        for (let i = 0; i < state.length; i++) {
            const stateInformation = state[i] // got my states
            console.log('check', stateInformation)
            // ul where the whole list will be appended to 
            const breweriesUL = document.querySelector('#breweries-list')
            // list of breweries
            const brewerieLI = document.createElement('li')
            // h2 for the brewerie in the list
            const AreaH2 = document.createElement('h2')
            AreaH2.innerText = // not sure how to include the state brewerie infor and which one if it is index 'i' of the for loop or the parameter 'index' 
            // div
            const div = document.createElement('div')
            div.setAttribute('class', 'type')
            div.innerText = 'micro'
            // section
            const section = document.createElement('section')
            section.setAttribute('class', 'address')
            // adress h3
            const addressTitle = documet.createElement('h3')
            addressTitle.innerText = 'Address:'
            // adress p
            const addressRoad = document.createElement('p')
            addressRoad.innerText = state
        }

    }
})
//    - the HTML element to listen for submission: <form> #select-state-form
//    - don't forget to prevent default form behaviour on submit event
//    - read the us state name from <input> #select-state
//    - check the us state name length > 0
//    - call getBreweriesByState(stateName)

// - make a GET request to fetch breweries, by state (this is the one the user typed)
//   GET https://api.openbrewerydb.org/breweries?by_state=US_STATE_NAME&per_page=50
//   if a us state has 2 words, then the " " should be replaced with "_"
//   replace(): https://www.w3schools.com/jsref/jsref_replace.asp
// - on FETCH response: save the fetched data into local state: state.breweries
// - render list of breweries
// - during render of list, filter out by type to keep micro, regional and brewpub


// RENDERING
// - Select and clear inner.HTML <ul> #breweries-list
// - Create elements to show:
//  -- Name
//  -- Brewery type
//  -- Address
//  -- Phone number
//  -- Link to brewery: <a> 

