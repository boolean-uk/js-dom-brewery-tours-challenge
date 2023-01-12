const state = {
    brewries: [],
    //filteredByName: []
};

//SELECT EXISTING HTML ELEMENTS
const brewriesUL = document.querySelector("#breweries-list")
const searchForm = document.querySelector("#select-state-form")
const searchState = document.querySelector("#select-state")
const inputState = document.querySelector("#select-state")

const dropdownSelectAType = document.querySelector("option")
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

    // if (stateName.length > 0): if typed !(a US state), nothing will render
    if (stateName.length > 0) {
        //call function that will call the brewries by that state
        getBrewries(stateName)
    }
    //if empty
    else if (stateName.length === 0) {
        alert("Please type in the state you are visiting first then try again")
    }
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
    //Generate list of breweries
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
//ideally a function would be called to render the relevant breweries but it hasnt worked irl yet
dropdownSelectAType.addEventListener("click", (event) => {
    brewriesUL.innerHTML = "";
    renderBreweryList()
})

dropdownMicro.addEventListener("click", (event) => {
    // console.log("congrats, you selected the element dropdownMicro properly")
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
})

dropdownBrewpub.addEventListener("click", (event) => {
    // console.log("congrats, you selected the element dropdownBrewpub properly")
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
    // console.log("congrats, you selected the element dropdownRegional properly")
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


//EXTENSION 1--> status: kinda works
const listOfBreweriesH1 = document.querySelector("h1")

//create search bar
const renderBrewerySearchBar = () => {

    const breweriesSearch = document.createElement("header")
    breweriesSearch.setAttribute("class", "search-bar")

    const form = document.createElement("form")
    form.setAttribute("id", "search-breweries-form")
    // form.setAttribute("auto complete", off)

    const label = document.createElement("label")
    label.setAttribute("for", "search-breweries")
    label.innerHTML = "<h2>Search breweries:</h2>"

    const input = document.createElement("input")
    input.setAttribute("id", "search-breweries")
    input.setAttribute("name", "search-breweries")
    input.setAttribute("type", "text")
    input.setAttribute("oninput", "searchBrewEvent()")

    //appends
    listOfBreweriesH1.after(breweriesSearch)
    breweriesSearch.append(form)
    form.append(label)
    form.append(input)
}

renderBrewerySearchBar()

//upon input, loop through rendered breweries (works but does not go back to original list: 
//therefore  can only search what is rendered)
// if state.brewries[i].name includes newBrewName, maybe push into filteredByName and then console.log(filteredByName)??
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

    //atm only searching what is already on the page so retyping a new name doesn't work. have to re-search
    //the state to get the whole list back up. Also doesn't work when teh list is filtered by type (the
    // micro, brewpub and regional):
    for (let i = 0; i < state.brewries.length; i++) {
        //filter through state.breweries.name: use includes
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
        } else {
            console.log("updated BrewName returned false", updatedBrewName)
            return false
        }
    }
}