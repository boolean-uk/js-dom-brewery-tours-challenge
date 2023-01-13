// PLAN:

// SELECT EXISTING HTML ELEMENTS
// selecting selecting state
const selectedStateValue = document.querySelector('#select-state')
const searchButton = document.querySelector('#select-state-form')
// selecting filters section
const filteredTypeOption = document.querySelector('#filter-by-type')

// STATE
const state = {
    breweries: [],
    filter: ['brewpub', 'micro', 'region'],
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
const stateTypedByUser = selectedStateValue.value // want to get the value which is what the user typed exactly
// - add a listener for the search form submission which triggers the GET request
searchButton.addEventListener('submit', (event) => { // listen to this search button when it is submitted with event parameter
    event.preventDefault() // so we do  not lose data when we refresh by submitting it
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateTypedByUser}&per_page=3`) // made a fetch GET request to display to me which one the user typed which is why i put the variable in the url to get what the user typed
        .then((response) => {
            return response.json() // this is apparently stayed as it is always because it changes to the json of that url to a js object so we can do stuff to it
        })
        .then((data) => { // i do another .then to get the data which is in the url
            state.breweries = data // and i make my empty array equal to the data in the url from the GET request
            // checked if i got the data working
            RenderBreweries() // once i do i get the breweries for what the user typed which includes the info about it
        })

    function RenderBreweries() { // thought id make a function with an index to display the one the user selected and a for loop to make the html elements for each list
        // ul where the whole list will be appended to  
        const breweriesUL = document.querySelector('#breweries-list')
        breweriesUL.innerHTML = '' // set it to blank so i get the searched ones without duplicates of the previously searched states
        for (let i = 0; i < state.breweries.length; i++) {
            const stateInformation = state.breweries[i] // got my states
            // list of breweries
            const brewerieLI = document.createElement('li')
            // h2 for the brewerie in the list
            const AreaH2 = document.createElement('h2')
            AreaH2.innerText = state.breweries[i].name // i specified the h2 to be the name of the brewery the user typed
            // AreaH2.innerText = // not sure how to include the state brewerie infor and which one if it is index 'i' of the for loop or the parameter 'index' 
            // div
            const div = document.createElement('div')
            div.setAttribute('class', 'type')
            div.innerText = state.breweries[i].brewery_type
            // section for address
            const sectionAddress = document.createElement('section')
            sectionAddress.setAttribute('class', 'address')
            // adress h3
            const addressTitle = document.createElement('h3')
            addressTitle.innerText = 'Address:'
            // adress p
            const addressRoad = document.createElement('p')
            addressRoad.innerText = state.breweries[i].street
            // address postcode
            const addressCode = document.createElement('p')
            const city = state.breweries[i].city
            const postcode = state.breweries[i].postal_code
            addressCode.innerText = `${city}, ${postcode}` // getting the city and postcode
            addressCode.style.fontWeight = 'bold'

            // section for phone
            const sectionPhone = document.createElement('section')
            sectionPhone.setAttribute('class', 'phone')
            // phone title
            const phoneTitle = document.createElement('h3')
            phoneTitle.innerText = 'Phone:'
            // phone from the brewerie
            const breweriePhone = document.createElement('p')
            breweriePhone.innerText = state.breweries[i].phone
            // section for link
            const sectionLink = document.createElement('section')
            sectionLink.setAttribute('class', 'link')
            // link
            const link = document.createElement('a')
            link.setAttribute('href', state.breweries[i].website_url)
            link.setAttribute('target', state.breweries[i].updated_at) // not sure how to get the target
            link.innerText = 'Visit Website'

            // appending these info to the list and will render when i submit
            console.log('22', AreaH2, div)
            if (div.innerText === 'brewpub' || div.innerText === 'micro' || div.innerText === 'regional') {
                brewerieLI.append(AreaH2)
                brewerieLI.append(div)
                brewerieLI.append(sectionAddress)
                sectionAddress.append(addressTitle)
                sectionAddress.append(addressRoad)
                sectionAddress.append(addressCode)
                brewerieLI.append(sectionPhone)
                sectionPhone.append(phoneTitle)
                sectionPhone.append(breweriePhone)
                sectionLink.append(link)
                brewerieLI.append(sectionLink)
                breweriesUL.append(brewerieLI)
                console.log('2', AreaH2, div)
            } else return false
            filteredTypeOption.addEventListener('change', function (event) {
                event.preventDefault()
                console.log('event', event.target.value)
                breweriesUL.innerHTML = ''
                if (event.target.value === 'brewpub') {
                } else if (event.target.value === 'micro') {
                } else if (event.target.value === 'regional') {
                }
            })
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

