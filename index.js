// REQUIREMENT 1: show a list of breweries for a US state
// - note: only show micro, regional and brewpub
// ACTIONS
// - add a listener for the search form submission which triggers the GET request
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

// STATE

// GENERAL UI FLOW:
// 1. user makes interaction with page
// 2. interaction updates local state OR sends a network request for state change
// 3. if network request was OK, then we update local state
// 4. when local state is updated, we then re-render the page

const state = {
    breweries: [],
    filterByType: "",
    filterByName: ""
};
  
  
  // SELECT EXISTING HTML ELEMENTS
  const breweriesList = document.querySelector(".breweries-list")
  const searchByStateForm = document.querySelector("#select-state-form")
  const filterByTypeForm = document.querySelector("#filter-by-type-form")
  const search = document.querySelector("#select-state")
  const selectByType = document.querySelector("#filter-by-type")
  const mainarticle = document.querySelector("article")
  const searchByNameForm = document.querySelector("#search-breweries-form")
  const searchName = document.querySelector("search-breweries")
  // NETWORK REQUESTS
//   - make get request that uses user input to search by state
//      - GET https://api.openbrewerydb.org/breweries?by_state=${US_STATE_NAME}&per_page=50
//      - if a state has two words, then " " should be rplaced with "_" use the replace():
//      - https://www.w3schools.com/jsref/jsref_replace.asp
//      - on fetch repsonse: save the fetched datat into the local state.
//      

  // RENDERING
  //   - add a listener for the search form submission which triggers the GET request
  //      - listener gets added to the <form> element on the 'submit' event
  //      - prevent default form submission
  //      - read the US-State from the <input> #select state
  //      - filter input: check length > 0, 
  //      - call function (stateName) as the parameter
//        - on render filter data by type: to keep micro, regional and brewpub
//        - when rendering show; 
//          - name: name of brewery, 
//          - brewery_type: type of brewery
//          - adress of brewery;         
//              - street:, city:, postal_code:
//          - phone: the phone number 
//          - set .innertext of <a> to the website_url: of object
//        - set filter by type of brewery section to filter by brewery_type:
            // -if brewry type === "micro" render the object and repeat 
  // START

searchByStateForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const US_STATE_NAME = search.value 
    
    if(US_STATE_NAME.length < 0 ){
        return
    }
    US_STATE_NAME.replace(" ", "_")

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${US_STATE_NAME}&per_page=50`)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((responseData) => {
            console.log("Received brewery list", responseData)
            state.breweries = responseData;
            console.log("brewerys added to the state", state.breweries)

           renderBreweryList(state.breweries);
           return
        })
    })

selectByType.addEventListener('change', () => {
    // set array to empty
    // push the value from the form to the empty filters array
    state.filterByType = selectByType.value
    // if(state.filterByType === ""){
    //     return
    // }
    console.log(" filterd by type string",state.filterByType)
    renderBreweryList(state.breweries)
})
// get this to work

// searchByNameForm.addEventListener('keyup', (event) => {
//     let searchValue = event.target.value;
    
//     searchValue.toLocaleLowerCase()
//     findBreweryByName(searchValue)
// })

// function findBreweryByName (searchValue){
//     breweries = state.breweries.name
//     console.log(searchValue)
//     let filterdBrewerys = []
//     filterdBrewerys = state.breweries.filter(() => {
//         state.breweries.includes(searchValue)
        
//         console.log("this is the breweries array", state.breweries)
//         console.log("this is the filterd array",filterdBrewerys)
//         // console.log(brewery.name)
//         renderBreweryList(state.filterSelected)
//     })
//     // console.log(filterSelected)
// }

function renderBreweryList() {
    breweriesList.innerHTML = ""
    let filterdByType = state.filterByType
    let filterdList = state.breweries.filter((brewery) => {
        if (filterdByType === ""){
            return true
        }
        if(brewery.brewery_type === filterdByType) {
            return true
        }
        else{
            return false
        }
    })    
    console.log("this is the filterd list", filterdList)
    
    

    filterdList.forEach((brewery) => {
        // const brewery = state.breweries
        
        const listItem = document.createElement("li")
        breweriesList.append(listItem)
        
        const breweryName = document.createElement("h2")
        breweryName.innerText = brewery.name

        const breweryType = document.createElement("div")
        breweryType.setAttribute("class", "type")
        breweryType.innerText = brewery.brewery_type

        const addressContainer = document.createElement("section")
        addressContainer.setAttribute("class", "adress")

        const addressHeading = document.createElement("h3")
        addressHeading.innerText = "Address"

        const streetAddress = document.createElement("p")
        streetAddress.innerText = brewery.street

        const cityAndPostcode = document.createElement("p")
        const cityAndPostcodeB = document.createElement("strong")
        cityAndPostcodeB.innerHTML = `${brewery.city}, ${brewery.postal_code}`
        
        const contactContainer = document.createElement("section")
        contactContainer.setAttribute("class", "phone")

        const contactHeading = document.createElement("h3")
        contactHeading.innerText = "Phone"

        const phoneNumber = document.createElement("p")
        phoneNumber.innerText = brewery.phone

        const websiteContainer = document.createElement("section")
        websiteContainer.setAttribute("class", "link")

        const weblink = document.createElement("a")
        weblink.setAttribute("href", brewery.website_url)
        weblink.setAttribute("target", "_blank")
        weblink.innerText = "Visit Website"

        listItem.append(
            breweryName, 
            breweryType, 
            addressContainer,
            contactContainer,
            websiteContainer
            )
        addressContainer.append(
            addressHeading,
            streetAddress,
            cityAndPostcode,
        )
        cityAndPostcode.append(cityAndPostcodeB)
        contactContainer.append(
            contactHeading,
            phoneNumber
        )
        websiteContainer.append(weblink)
    })   
}

