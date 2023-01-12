//IGNORE EVERYTHING HERE PLEASE ---> SPARE CODE IN CASE i NEED TO GET SOMETHING FROM THE  ATTEMPTS BACK

//attempt 1
{//STATE- container for all the variables of data
//not really going the way I'd like 
const state = {
    brewries: [],
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
            renderBreweryList()
        });
}


//RENDERING
function renderBreweryList() {
    //generate list of filtered breweries
    state.brewries.forEach((brewery) => {
        if (brewery.brewery_type === "micro"
            || brewery.brewery_type === "regional"
            || brewery.brewery_type === "brewpub"
        ) {
            createLiElements()
        }
    })
}

//works when called in the renderbrewries but not when filtering
function createLiElements() {
    let brewery = state.brewries
    for (let i = 0; i < brewery.length; i++) {
//create elements
const li = document.createElement("li")
brewriesUL.append(li)

const h2 = document.createElement("h2")
h2.innerText = brewery[i].name
li.append(h2)

const div = document.createElement("div")
div.setAttribute("class", "type")
div.innerText = brewery[i].brewery_type
li.append(div)

const section = document.createElement("section")
section.setAttribute("class", "address")
li.append(section)

const h3 = document.createElement("h3")
h3.innerText = "Address:"
section.append(h3)

const p = document.createElement("p")
p.innerText = brewery[i].street //"street"": <p>9511 Kile Rd</p>
section.append(p)

const p2 = document.createElement("p")
p2.innerHTML = `<strong> ${brewery[i].city} + ${brewery[i].postal_code}</strong>`
section.append(p2)

const sectionPhone = document.createElement("section")
sectionPhone.setAttribute("class", "phone")
li.append(sectionPhone)

const h3Phone = document.createElement("h3")
h3Phone.innerText = "Phone:"
sectionPhone.append(h3Phone)

const pPhone = document.createElement("p")
pPhone.innerText = brewery[i].phone //(object key:) "phone"
sectionPhone.append(pPhone)

const sectionLinkToBrewry = document.createElement("section")
sectionLinkToBrewry.setAttribute("class", "link")
li.append(sectionLinkToBrewry)

const a = document.createElement("a")
a.innerText = "Visit Website"
a.setAttribute("href", brewery[i].website_url)
a.setAttribute("target", "_blank")
sectionLinkToBrewry.append(a)
    }
    
}

// //FILTER BY TYPE ASIDE
// const dropdownMicro = document.querySelector("option[value = micro]")
// dropdownMicro.addEventListener("click", (event) => {                          //or in selected state
//     console.log("congrats, you selected the element dropdownMicro properly")
//     brewriesUL.innerHTML = "";

//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "micro"
//         ) {
//             createLiElements()
//         }
//     })
//     console.log("micro ones:", state.brewries)
// })

// const dropdownBrewpub = document.querySelector("option[value = brewpub]")
// dropdownBrewpub.addEventListener("click", (event) => {
//     console.log("congrats, you selected the element dropdownBrewpub properly")

//     brewriesUL.innerHTML = "";

//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "brewpub") {
//             createLiElements()
//         }
//     })
// })

// const dropdownRegional = document.querySelector("option[value = regional]")
// dropdownRegional.addEventListener("click", (event) => {
//     console.log("congrats, you selected the element dropdownRegional properly")

//     brewriesUL.innerHTML = "";

//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "regional") {
//             createLiElements()
//         }
//     })
// })
}

//attempt 2
{
const state = {
    brewries: [],
    micro: [],
    brewpub: [],
    regional: [],
};

//REQUIREMENT 1: show a list of brewries for a US state

//SELECT EXISTING HTML ELEMENTS
const brewriesUL = document.querySelector("#breweries-list")
const searchForm = document.querySelector("#select-state-form")
const searchState = document.querySelector("#select-state")
const inputState = document.querySelector("#select-state")
const selectToFilter = document.querySelector("#filter-by-type")
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
    else {
        alert("Please type in the state you are visiting first then try again")
    }
})


//NETWORK REQUESTS
function getBrewries(stateName) {
    //GET by name
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            console.log("Received brewries list", responseData);
            // update local STATE with fetched people
            state.brewries = responseData;

            brewriesUL.innerHTML = ""
            organizeBreweriesByType()
        });
}


//RENDERING
function organizeBreweriesByType() {
    state.brewries.forEach((brewery) => {
        if (brewery.brewery_type === "micro") {
            state.micro.push(brewery)
        }
        else if (brewery.brewery_type === "brewpub") {
            state.brewpub.push(brewery)
        }
        else if (brewery.brewery_type === "regional") {
            state.regional.push(brewery)
        }
    })
    console.log("micro array:", state.micro)
    console.log("brewpub array:", state.brewpub)
    console.log("regional array:", state.regional)
}

function renderBreweryList(brewery) {
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

    console.log(state.brewries)
}



//FILTER BY TYPE ASIDE
selectToFilter.addEventListener("change", () => {
    if (selectToFilter.value === "micro") {
        console.log("congrats, you selected the element dropdownMicro properly")

    }
    else if (selectToFilter.value === "brewpub") {
        console.log("congrats, you selected the element dropdownBrepub properly")

    }
    else if (selectToFilter.value === "regional") {
        console.log("congrats, you selected the element dropdownregional properly")

    }
});


// const dropdownMicro = document.querySelector("option[value = micro]")
// dropdownMicro.addEventListener("click", (event) => {                          //or in selected state
//     console.log("congrats, you selected the element dropdownMicro properly")
//     brewriesUL.innerHTML = "";

//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "micro") {
//             //create elements
//             const li = document.createElement("li")
//             brewriesUL.append(li)

//             const h2 = document.createElement("h2")
//             h2.innerText = brewery.name
//             li.append(h2)

//             const div = document.createElement("div")
//             div.setAttribute("class", "type")
//             div.innerText = brewery.brewery_type
//             li.append(div)

//             const section = document.createElement("section")
//             section.setAttribute("class", "address")
//             li.append(section)

//             const h3 = document.createElement("h3")
//             h3.innerText = "Address:"
//             section.append(h3)

//             const p = document.createElement("p")
//             p.innerText = brewery.street //"street"": <p>9511 Kile Rd</p>
//             section.append(p)

//             const p2 = document.createElement("p")
//             p2.innerHTML = `<strong> ${brewery.city} + ${brewery.postal_code}</strong>`
//             section.append(p2)

//             const sectionPhone = document.createElement("section")
//             sectionPhone.setAttribute("class", "phone")
//             li.append(sectionPhone)

//             const h3Phone = document.createElement("h3")
//             h3Phone.innerText = "Phone:"
//             sectionPhone.append(h3Phone)

//             const pPhone = document.createElement("p")
//             pPhone.innerText = brewery.phone //(object key:) "phone"
//             sectionPhone.append(pPhone)

//             const sectionLinkToBrewry = document.createElement("section")
//             sectionLinkToBrewry.setAttribute("class", "link")
//             li.append(sectionLinkToBrewry)

//             const a = document.createElement("a")
//             a.innerText = "Visit Website"
//             a.setAttribute("href", brewery.website_url)
//             a.setAttribute("target", "_blank")
//             sectionLinkToBrewry.append(a)
//         }
//     })
//     console.log("micro ones:", state.brewries)
// })

// const dropdownBrewpub = document.querySelector("option[value = brewpub]")
// dropdownBrewpub.addEventListener("click", (event) => {
//     console.log("congrats, you selected the element dropdownBrewpub properly")

//     brewriesUL.innerHTML = "";

//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "brewpub") {
//             //create elements
//             const li = document.createElement("li")
//             brewriesUL.append(li)

//             const h2 = document.createElement("h2")
//             h2.innerText = brewery.name
//             li.append(h2)

//             const div = document.createElement("div")
//             div.setAttribute("class", "type")
//             div.innerText = brewery.brewery_type
//             li.append(div)

//             const section = document.createElement("section")
//             section.setAttribute("class", "address")
//             li.append(section)

//             const h3 = document.createElement("h3")
//             h3.innerText = "Address:"
//             section.append(h3)

//             const p = document.createElement("p")
//             p.innerText = brewery.street //"street"": <p>9511 Kile Rd</p>
//             section.append(p)

//             const p2 = document.createElement("p")
//             p2.innerHTML = `<strong> ${brewery.city} + ${brewery.postal_code}</strong>`
//             section.append(p2)

//             const sectionPhone = document.createElement("section")
//             sectionPhone.setAttribute("class", "phone")
//             li.append(sectionPhone)

//             const h3Phone = document.createElement("h3")
//             h3Phone.innerText = "Phone:"
//             sectionPhone.append(h3Phone)

//             const pPhone = document.createElement("p")
//             pPhone.innerText = brewery.phone //(object key:) "phone"
//             sectionPhone.append(pPhone)

//             const sectionLinkToBrewry = document.createElement("section")
//             sectionLinkToBrewry.setAttribute("class", "link")
//             li.append(sectionLinkToBrewry)

//             const a = document.createElement("a")
//             a.innerText = "Visit Website"
//             a.setAttribute("href", brewery.website_url)
//             a.setAttribute("target", "_blank")
//             sectionLinkToBrewry.append(a)
//         }
//     })
// })

// const dropdownRegional = document.querySelector("option[value = regional]")
// dropdownRegional.addEventListener("click", (event) => {
//     console.log("congrats, you selected the element dropdownRegional properly")

//     brewriesUL.innerHTML = "";

//     state.brewries.forEach((brewery) => {
//         if (brewery.brewery_type === "regional") {
//             //create elements
//             const li = document.createElement("li")
//             brewriesUL.append(li)

//             const h2 = document.createElement("h2")
//             h2.innerText = brewery.name
//             li.append(h2)

//             const div = document.createElement("div")
//             div.setAttribute("class", "type")
//             div.innerText = brewery.brewery_type
//             li.append(div)

//             const section = document.createElement("section")
//             section.setAttribute("class", "address")
//             li.append(section)

//             const h3 = document.createElement("h3")
//             h3.innerText = "Address:"
//             section.append(h3)

//             const p = document.createElement("p")
//             p.innerText = brewery.street //"street"": <p>9511 Kile Rd</p>
//             section.append(p)

//             const p2 = document.createElement("p")
//             p2.innerHTML = `<strong> ${brewery.city} + ${brewery.postal_code}</strong>`
//             section.append(p2)

//             const sectionPhone = document.createElement("section")
//             sectionPhone.setAttribute("class", "phone")
//             li.append(sectionPhone)

//             const h3Phone = document.createElement("h3")
//             h3Phone.innerText = "Phone:"
//             sectionPhone.append(h3Phone)

//             const pPhone = document.createElement("p")
//             pPhone.innerText = brewery.phone //(object key:) "phone"
//             sectionPhone.append(pPhone)

//             const sectionLinkToBrewry = document.createElement("section")
//             sectionLinkToBrewry.setAttribute("class", "link")
//             li.append(sectionLinkToBrewry)

//             const a = document.createElement("a")
//             a.innerText = "Visit Website"
//             a.setAttribute("href", brewery.website_url)
//             a.setAttribute("target", "_blank")
//             sectionLinkToBrewry.append(a)
//         }
//     })
// })
}