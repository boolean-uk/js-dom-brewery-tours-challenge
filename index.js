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
    citys: [],
    filterByCity: [],
    filterByType: "",
    filterByName: "",
    CurrentPage: 1
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
const filterByCityForm = document.querySelector("#filter-by-city-form")
const clearAllBtn = document.querySelector(".clear-all-btn")
const pageForward = document.querySelector("#next-button")
const pageBack = document.querySelector("#prev-button")
const pageNumbers = document.querySelector("#pagination-numbers")
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

// Function calls performs GET request for data by state
searchByStateForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const US_STATE_NAME = search.value

    if (US_STATE_NAME.length < 0) {
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
        .then(() => {
            state.citys = []
            state.breweries.forEach((brewery) => {
                if (state.citys.includes(brewery.city)) {
                    return
                }
                else {
                    state.citys.push(brewery.city)
                }
            })
            console.log("citys array", state.citys)
            renderCityList()
            return
        })
})
// event listener to re-render the brewery list and intiate filter for type 
selectByType.addEventListener('change', () => {
    state.filterByType = selectByType.value
    console.log(" filterd by type string", state.filterByType)
    renderBreweryList()
})
// event listner for search by name which re render the brewery initiate filter by name
searchByNameForm.addEventListener('keyup', (event) => {
    state.filterByName = event.target.value;

    renderBreweryList()
})
// event listener that clears the filter by city and rerenders the brewery list and the city list
clearAllBtn.addEventListener("click", () => {
    state.filterByCity = []
    renderBreweryList()
    renderCityList()
})
pageForward.addEventListener("click", () => {
    state.CurrentPage = state.CurrentPage + 1
    if(state.CurrentPage === 5){
        state.CurrentPage -1
        console.log("current page3", state.CurrentPage)
     return renderBreweryList()
    }
    console.log("current page4", state.CurrentPage)
   return renderBreweryList()
})
pageBack.addEventListener("click", () => {
    state.CurrentPage = state.CurrentPage - 1
    if (state.CurrentPage === 0){
        state.CurrentPage + 1
        console.log("current page1", state.CurrentPage)
        return renderBreweryList()
    }
    console.log("current page2", state.CurrentPage)
    return renderBreweryList()
})
// mamoth function that performs all filtering and renders the brewery list
function renderBreweryList() {
    breweriesList.innerHTML = ""

    let filterdByType = state.filterByType
    let filterByName = state.filterByName

    // filter by type
    let filterdList = state.breweries.filter((brewery) => {
        if (filterdByType === "") {
            return true
        }
        if (brewery.brewery_type === filterdByType) {
            return true
        }
        else {
            return false
        }
    })

    // filter by name
    filterdList = filterdList.filter((brewery) => {
        if (filterByName === "") {
            return true
        }
        if (brewery.name.includes(filterByName)) {
            return true
        }
        else {
            return false
        }
    })
    filterdList = filterdList.filter((brewery) => {
        if (state.filterByCity.length < 1) {
            return true
        }
        if (state.filterByCity.includes(brewery.city)) {
            return true
        }
        else {
            return false
        }

    })
    if (filterdList.length > 10) {
        let rows = 10;
        state.CurrentPage--;

        let start = rows * (state.CurrentPage)
        let end = start + rows
        filterdList = filterdList.slice(start, end);
        
        state.CurrentPage++;
        console.log("this is the state", state.breweries)
    }
    


    filterdList.forEach((brewery) => {

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
        // city list render

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
// function the renders the city list
function renderCityList() {
    filterByCityForm.innerHTML = ""

    state.citys.forEach((city) => {
        if (state.breweries.city === city) {
            return
        }
        else {
            const checkBox = document.createElement("input")
            checkBox.setAttribute("type", "checkbox")
            checkBox.setAttribute("name", `${city}`)
            checkBox.setAttribute("value", `${city}`)

            const cityLabel = document.createElement("label")
            cityLabel.setAttribute("for", `${city}`)
            cityLabel.innerText = city

            filterByCityForm.append(checkBox, cityLabel)

            checkBox.addEventListener('change', () => {
                console.log(checkBox.value)
                if (checkBox.checked === true) {
                    state.filterByCity.push(checkBox.value)
                }
                if (checkBox.checked === false) {
                    indexOfCityName = state.filterByCity.indexOf(checkBox.value);
                    removedItem = state.filterByCity.splice(indexOfCityName, 1)
                }
                console.log("check box filter value", state.filterByCity)
                renderBreweryList()
            })
        }
    })
}
function renderPageNumbers(){

}
