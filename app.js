const state = {
    breweries: [],
    breweriesInputSearch: [],
    userInputState: '',
    userInputSearch: '',
}

init()

function init() {
    mainStateSearch()
    filterListening()
    breweriesSearch()
}

function mainStateSearch(){
    const mainSearchForm = document.querySelector("#select-state-form")
    const mainInputField = document.querySelector("#select-state")
    mainSearchForm.addEventListener("submit", (event) =>{
        event.preventDefault()
        state.userInputState = mainInputField.value
        sendAPICall() 
    })
}

function sendAPICall() {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.userInputState}&per_page=50`)
        .then((response) =>  {
            return response.json();
        })
        .then((breweries) => {
            state.breweries = breweries
            filterToMicroRegionalBrewpub()
            renderPage(state.breweries)
        })
}

function filterToMicroRegionalBrewpub() {
    state.breweries = state.breweries.filter((brewery) => {
        if (brewery.brewery_type !== "micro" && brewery.brewery_type && "regional" && brewery.brewery_type !== "brewpub") {
            return false
        }
        else {
          return true
        }
    })
}

function renderPage(listToRender) {
    breweriesUL = document.querySelector("#breweries-list")
    breweriesUL.innerHTML = ''
    listToRender.forEach((brewery) => {
        renderCards(brewery)
    })
}

function renderCards(brewery) {
    li = document.createElement('li')
    breweriesUL.appendChild(li)

    h2 = document.createElement('h2')
    h2.innerText = brewery.name
    li.appendChild(h2)

    div = document.createElement('div')
    div.setAttribute('class', 'type')
    div.innerText = brewery.brewery_type
    li.appendChild(div)

    section = document.createElement('section')
    section.setAttribute('class', 'address')
    li.appendChild(section)

    h3 = document.createElement('h3')
    h3.innerText = "Address:"
    section.appendChild(h3)

    p1 = document.createElement('p')
    p1.innerText = brewery.street
    section.appendChild(p1)

    p2 = document.createElement('p')
    section.appendChild(p2)

    strong = document.createElement('strong')
    strong.innerText = `${brewery.city}, ${brewery.postal_code}`
    p2.appendChild(strong)

    section2 = document.createElement('section')
    section2.setAttribute('class', 'phone')
    li.appendChild(section2)

    h3Phone = document.createElement('h3')
    h3Phone.innerText = "Phone"
    section2.appendChild(h3Phone)

    pPhone = document.createElement('p')
    pPhone.innerText = brewery.phone || "N/A"
    section2.appendChild(pPhone)

    section3 = document.createElement('section')
    section3.setAttribute('class', 'link')
    li.appendChild(section3)

    a = document.createElement('a')
    a.setAttribute('href', brewery.website_url)
    a.setAttribute('target', '_blank')
    a.innerText = 'Visit Website'
    section3.appendChild(a)
}

function filterListening () {
    const filterForm = document.querySelector("#filter-by-type")
    filterForm.addEventListener("change", (event) => {
        event.preventDefault()
        if (filterForm.value) { newAPICallWithFilters(filterForm.value) }
        else {sendAPICall()}
    })
}

function newAPICallWithFilters(filter) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.userInputState}&per_page=50&by_type=${filter}`)
        .then((response) =>  {
            return response.json();
        })
        .then((breweries) => {
            state.breweries = breweries
            renderPage(state.breweries)
        })
    console.log(state)
}

function breweriesSearch() {
    breweriesSearchForm = document.querySelector("#search-breweries")
    breweriesSearchForm.addEventListener('keydown', (event) => {

        if (event.key === "Backspace") {
            state.userInputSearch = state.userInputSearch.slice(0, -1)
        } else if (event.key === "Shift" || event.key === "Control" || event.key === "Enter" || event.key === "Alt") {
        } else {
            state.userInputSearch += event.key
        }

        state.breweriesInputSearch = state.breweries.filter((brewery) => {
            if (brewery.name.toLowerCase().includes(state.userInputSearch.toLowerCase())) {
                return true
            }
            else {
                return false
            }
        })

        renderPage(state.breweriesInputSearch)
    })
}



// ACCEPTANCE CRITERIA:
// 1. Connect to Open Brewery DB using Insomnia to figure out how to get the data
// 2. Add an event listener to the search button that:
// 3.  – Calls a function that imports relevant brewery data into local state based on state entered into search
// 4.  – And removes everything other than "Micro", "Regional" or "Brewpub"
// 5.  – Calls another function that renders the page from the local state as found in "standard-list-items.html"
// 6. Add an event listener to the filter dropdown that:
// 7.  – Calls a function that filters the state into another variable accordingly
// 8.  – Calls the render function
// 
// EXTENSION #1:
// 1. Add search section to index.html
// 2. Add event listener to each keyboard stroke in the input field that:
// 3.  – Calls a function that filters the state into another variable accordingly
// 4.  – Calls the render function
//
// EXTENSION #2:
// 1. Add cities outline into index.html
// 2. For each city, create a new tickbox in JS with its own event listener that: 
// 3.  – Calls a function that filters the state into another variable accordingly
// 4.  – Calls the render function
// 5. Add clear all button that re-runs the for each in point #2 (hopefully this will work)
//
// EXTENSION #3:
// 1. No idea about the pagination yet. Maybe filter and display breweries by index?
//
// EXTENSION #4:
// 1. If I ever get here, do something similar to the to-do-list...?