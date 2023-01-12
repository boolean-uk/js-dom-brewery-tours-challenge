const state = {
    brewries: [],
    filteredByName: []
    // usa: ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin"]
};

//SELECT EXISTING HTML ELEMENTS
const brewriesUL = document.querySelector("#breweries-list")
const searchForm = document.querySelector("#select-state-form")
const searchState = document.querySelector("#select-state")
const inputState = document.querySelector("#select-state")

const dropdownMicro = document.querySelector("option[value = micro]")
const dropdownBrewpub = document.querySelector("option[value = brewpub]")
const dropdownRegional = document.querySelector("option[value = regional]")


//EVENT LISTENER: SEARCH A  US STATE
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    brewriesUL.innerHTML = "";
    inputState.setAttribute("value", "")
    const stateName = inputState.value

    console.log(stateName)

    console.log("event", event)

    // if (stateName.length > 0) {
    //check user has typed a USA state
    if (stateName.length > 0) {
        //call function that will call the brewries by that state
        getBrewries(stateName)
    }
    //if empty
    else if (stateName.length === 0) {
        alert("Please type in the state you are visiting first then try again")
    }

    //  // apply filtering by type
    //   filteredTodos = filteredTodos.filter((todo) => {
    //     // if my array is empty, don't filter, keep all todos
    //     if (state.filterByType.length === 0) return true;

    //     // keep the todo item, if todo.type is a string inside state.filterByType array
    //     for (let i = 0; i < state.filterByType.length; i++) {
    //       if (todo.type === state.filterByType[i]) {
    //         return true; // todo.type matches ONE of the types in my array so keep this todo and just return
    //       }
    //     }
    //     // got to the end, haven't returned before, so there is no match
    //     return false;
    //   });
})


//NETWORK REQUESTS
function getBrewries(stateName) {
    //GET by name
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`
    )
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            // we have received all todo items
            console.log("Received brewries list", responseData);
            // update local STATE with fetched people
            state.brewries = responseData;

            renderBreweryList()
        });
}


//RENDERING
function renderBreweryList() {
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


//FILTER BY TYPE: ASIDE
dropdownMicro.addEventListener("click", (event) => {                          //or in selected state
    console.log("congrats, you selected the element dropdownMicro properly")
    brewriesUL.innerHTML = "";

    state.brewries.forEach((brewery) => {
        if (brewery.brewery_type === "micro") {
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
    console.log("micro ones:", state.brewries)
})

dropdownBrewpub.addEventListener("click", (event) => {
    console.log("congrats, you selected the element dropdownBrewpub properly")

    brewriesUL.innerHTML = "";

    state.brewries.forEach((brewery) => {
        if (brewery.brewery_type === "brewpub") {
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
})

dropdownRegional.addEventListener("click", (event) => {
    console.log("congrats, you selected the element dropdownRegional properly")

    brewriesUL.innerHTML = "";

    state.brewries.forEach((brewery) => {
        if (brewery.brewery_type === "regional") {
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
})

//EXTENSION 1

//create search bar
//upon input, loop through rendered breweries
//filter through state.breweries.name: use includes
//if input value contains same word --> render the breweries that match. 


// if state.brewries[i].name includes newBrewName, maybe push into filteredByName and then console.log(filteredByName)
const listOfBreweriesH1 = document.querySelector("h1")

// const renderBrewerySearchBar = () => {

//     const breweriesSearch = document.createElement("header")
//     breweriesSearch.setAttribute("class", "search-bar")
//     listOfBreweriesH1.after(breweriesSearch)

//     const form = document.createElement("form")
//     form.setAttribute("id", "search-breweries-form")
//     // form.setAttribute("auto complete", off)
//     breweriesSearch.append(form)

//     const label = document.createElement("label")
//     label.setAttribute("for", "search-breweries")
//     label.innerHTML = "<h2>Search breweries:</h2>"
//     form.append(label)

//     const input = document.createElement("input")
//     label.setAttribute("id", "search-breweries")
//     label.setAttribute("name", "search-breweries")
//     label.setAttribute("type", "text")
//     // label.setAttribute("value", "")

//     form.append(input)

//     input.addEventListener("oninput", () => {
//         console.log("input!!!")
//         // searchBrewEvent()
//         renderBreweryList()
//     })
// }
// renderBrewerySearchBar()

const searchBrewEvent = () => {
    brewriesUL.innerHTML = "";

    const input = document.querySelector("#search-breweries")
    let brewName = input.value
    let words = brewName.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let updatedBrewName = words.join(" ");

    console.log("updated Brew Name words:", updatedBrewName)

    if (state.brewries.length === 0) {
        renderBreweryList(stateName)
        return true
    }

    for (let i = 0; i < state.brewries.length; i++) {
        if (state.brewries[i].name.includes(updatedBrewName)) {
            console.log("updated BrewName returned true", updatedBrewName)

            //create elements
            const li = document.createElement("li")
            brewriesUL.append(li)

            const h2 = document.createElement("h2")
            h2.innerText = state.brewries[i].name
            li.append(h2)

            const div = document.createElement("div")
            div.setAttribute("class", "type")
            div.innerText = state.brewries[i].brewery_type
            li.append(div)

            const section = document.createElement("section")
            section.setAttribute("class", "address")
            li.append(section)

            const h3 = document.createElement("h3")
            h3.innerText = "Address:"
            section.append(h3)

            const p = document.createElement("p")
            p.innerText = state.brewries[i].street //"street"": <p>9511 Kile Rd</p>
            section.append(p)

            const p2 = document.createElement("p")
            p2.innerHTML = `<strong> ${state.brewries[i].city} + ${state.brewries[i].postal_code}</strong>`
            section.append(p2)

            const sectionPhone = document.createElement("section")
            sectionPhone.setAttribute("class", "phone")
            li.append(sectionPhone)

            const h3Phone = document.createElement("h3")
            h3Phone.innerText = "Phone:"
            sectionPhone.append(h3Phone)

            const pPhone = document.createElement("p")
            pPhone.innerText = state.brewries[i].phone //(object key:) "phone"
            sectionPhone.append(pPhone)

            const sectionLinkToBrewry = document.createElement("section")
            sectionLinkToBrewry.setAttribute("class", "link")
            li.append(sectionLinkToBrewry)

            const a = document.createElement("a")
            a.innerText = "Visit Website"
            a.setAttribute("href", state.brewries[i].website_url)
            a.setAttribute("target", "_blank")
            sectionLinkToBrewry.append(a)
            // return true
        } else {
            console.log("updated BrewName returned false", updatedBrewName)
            return false
        }
    }


}