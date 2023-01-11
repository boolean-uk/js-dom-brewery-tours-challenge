//STATE- container for all the variables of data

const state = {
    brewries: [],
    filterByMicro: "micro",
    filterByBrewpub: "brewpub",
    filterByRegional: "regional",
    filterAllThree: ["micro", "brewpub", "regional"],
};

//REQUIREMENT 1: show a list of brewries for a US state

//SELECT EXISTING HTML ELEMENTS
const brewriesUL = document.querySelector("#breweries-list")
const searchForm = document.querySelector("#select-state-form")
const searchState = document.querySelector("#select-state")
const inputState = document.querySelector("#select-state")

//EVENT LISTENER: SEARCH
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    brewriesUL.innerHTML = "";
    inputState.setAttribute("value", "")
    const stateName = inputState.value

    console.log(stateName)

    console.log("event", event)

    if (stateName.length > 0) {
        //call function that will call the brewries by that state
        getBrewries(stateName)
    }
    //else {
    //     alert("Please type in the state you are visiting first then try again")
    // }
})


//NETWORK REQUESTS
function getBrewries(stateName) {
    //GET by name
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`
    ) // send a Request *******
        .then((response) => {
            // response = the Response from the server
            return response.json();
        })
        .then((responseData) => {
            // we have received all todo items
            console.log("Received brewries list", responseData);

            //then filter so you only get micro, brewpub and regional

            // update local STATE with fetched people
            state.brewries = responseData;

            // render each RELEVANT brewry
            // renderThreeBreweryTypes()
            ; //renderBrewries after the filter
            renderBrewery()
        });
    // state.brewries = filteredBrewries
}


//RENDERING
function renderBrewery() {
    // const breweryInfo = state.brewries
    //generate list of filtered breweries
    state.brewries.forEach((brewery) => {
        if (brewery.brewery_type === "micro" 
        || brewery.brewery_type === "regional"
        || brewery.brewery_type === "brewpub" 
        ) {
            //create elements
            const li = document.createElement("li")
            brewriesUL.append(li)

            const h2 = document.createElement("h2")
            h2.innerText = brewery.name
            li.append(h2)

            const div = document.createElement("div")
            div.setAttribute("class", "type")
            div.innerText = brewery.brewery_type
            li.append(div)

            const section = document.createElement("section")
            section.setAttribute("class", "address")
            li.append(section)

            const h3 = document.createElement("h3")
            h3.innerText = "Address:"
            section.append(h3)

            const p = document.createElement("p")
            p.innerText = brewery.street //"street"": <p>9511 Kile Rd</p>
            section.append(p)

            const p2 = document.createElement("p")
            p2.innerHTML = `<strong> ${brewery.city} + ${brewery.postal_code}</strong>`
            section.append(p2)

            const sectionPhone = document.createElement("section")
            sectionPhone.setAttribute("class", "phone")
            li.append(sectionPhone)

            const h3Phone = document.createElement("h3")
            h3Phone.innerText = "Phone:"
            sectionPhone.append(h3Phone)

            const pPhone = document.createElement("p")
            pPhone.innerText = brewery.phone //(object key:) "phone"
            sectionPhone.append(pPhone)

            const sectionLinkToBrewry = document.createElement("section")
            sectionLinkToBrewry.setAttribute("class", "link")
            li.append(sectionLinkToBrewry)

            const a = document.createElement("a")
            a.innerText = "Visit Website"
            a.setAttribute("href", brewery.website_url)
            a.setAttribute("target", "_blank")
            sectionLinkToBrewry.append(a)
        }
    })
    console.log(state.brewries)
}

// function renderMicroBrewery() {
//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "micro") {
//             renderBrewery()
//         }
//     })
// }

// function renderBrewPubBrewery() {
//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "brewpub") {
//             renderBrewery()
//         }
//     })
// }

// function renderRegionalBrewery() {
//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "regional") {
//             renderBrewery()
//         }
//     })
// }

//START

//FILTER BY TYPE ASIDE

//  - clear list
//  - Filter state.breweries
//      - state.breweries.filter(.type === "micro")

//click/checked event micro - call function to render micro list x3 (2. regional, 3. brewpub)
// const dropdownMicro = document.querySelector("option")
// dropdownMicro.addEventListener("click", (event) => {

//     filterMicroBrews()

// })
// function filterMicroBrews() {

// }

