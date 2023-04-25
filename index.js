// *** PLANNING

/*

Extension 2

1 - Add a new 'filter by city' section to the filter menu

        <div class="filter-by-city-heading">
        <h3>Cities</h3>
        <button class="clear-all-btn">clear all</button>
        </div>
        <form id="filter-by-city-form">
        <!-- 
            POPULATE CITIES HERE
        -->
        </form>

2 - For each city, generate a checkbox and label like below:

                <input type="checkbox" name="chardon" value="chardon" />
                <label for="chardon">Chardon</label>

                <input type="checkbox" name="cincinnati" value="cincinnati" />
                <label for="cincinnati">Cincinnati</label>

3 - The cities list should be populated based on the 
results of the search. Each city should only appear once.

 - logic to check if a city has already been included in the list
    - if YES - ignore
    - if NO - add new item

4 - From the 'filter by city' section, the user can filter by 
city by selecting a checkbox beside the city name

 - logic to update state for checked box
    - if city name of brewery matches that of a checked item
        - render it on the page

5 - From the 'filter by city' section, a user can clear all filters

 - listen for clear all click
    - remove all checked TRUE instances
    - render the page for all items in state

*/

// *** CODE

// * STATE

const state = {
    breweryList: []
}

// * QUERY SELECTORS

const whichStateForm = document.querySelector('#select-state-form')
const whichStateInput = document.querySelector('#select-state')
const breweriesUL = document.querySelector('#breweries-list')
const typeOfBrewerySelect = document.querySelector('#filter-by-type')
const searchBreweriesForm = document.querySelector('#search-breweries-form')
const searchBreweriesInput = document.querySelector('#search-breweries')



// * EVENT HANDLERS

//when search is clicked, don't reload the page
whichStateForm.addEventListener('submit', (event) => {
    console.log('search clicked')
    event.preventDefault()
    // take the user input - save to variable
    const newInput = whichStateInput.value
    console.log('what was inputted?', newInput)
    getData(newInput)
    whichStateForm.reset()
})

// * SERVER LOGIC

const homeURL = 'https://api.openbrewerydb.org/v1/breweries?by_state='

// use that URL for the fetch GET
function getData(searchedForState) {
    console.log('called: getData')
// use that variable to interpolate into URL
    const link = `${homeURL}${searchedForState}`
    console.log('what is link?', link)
fetch(link)
    .then(res => res.json())
    .then(data => {
        console.log('fetched:', data)
        // store the data fetched in the local state
        state.breweryList = data
        console.log('what is in the state?', state)
        filterBreweryListForType()
    })
    .catch(error => {
        console.log('fetch error:', error)
    })
}

// * FILTERED BY BREWERY TYPE LOGIC

function filterBreweryListForType() {
    console.log('called: filterBreweryListForType')
    const filtered = state.breweryList.filter(checkType)
    console.log('here are all the breweries with matching types:', filtered)
    //update the state so it only contains filtered items
    updateState(filtered)
}

// check for brewery types we want to display
function checkType(breweryObj){
    console.log('called: checkType')
    if (breweryObj.brewery_type === 'micro') {
        return breweryObj
    }
    if (breweryObj.brewery_type === 'regional') {
        return breweryObj
    }
    if (breweryObj.brewery_type === 'brewpub') {
        return breweryObj
    }
}

// * STATE MANIPULATION LOGIC

// update the state 
function updateState(list) {
    console.log('called: updateState')
    state.breweryList = ''
    state.breweryList = list
    renderBreweryList(state.breweryList)
}

// * RENDER RESULTS LOGIC

//render the breweries based on state.breweryList array
function renderBreweryList(whichToRender) {
    console.log('called: renderBreweryList')
    breweriesUL.innerHTML = ''

    whichToRender.forEach((brewery) => {
        const li = document.createElement('li')
            breweriesUL.append(li)

        const h2 = document.createElement('h2')
            h2.innerText = `${brewery.name}`
            li.appendChild(h2)

        const div = document.createElement('div')
            div.setAttribute('class', 'type')
            div.innerText = `${brewery.brewery_type}`
            li.appendChild(div)

        const firstSection = document.createElement('section')
            firstSection.setAttribute('class', 'address')
            li.appendChild(firstSection)

            const addressH3 = document.createElement('h3')
                addressH3.innerText = 'Address:'
                firstSection.appendChild(addressH3)

            const firstP = document.createElement('p')
                firstP.innerText = `${brewery.address_1}`
                firstSection.appendChild(firstP)

            const secondP = document.createElement('p')
                firstSection.appendChild(secondP)

            const strong = document.createElement('strong')
                strong.innerText = `${brewery.city} ${brewery.postal_code}`
                secondP.append(strong)

        const secondSection = document.createElement('section')
            secondSection.setAttribute('class', 'phone')
            li.appendChild(secondSection)

            const secondH3 = document.createElement('h3')
                secondH3.innerText = 'Phone:'
                secondSection.appendChild(secondH3)

            const thirdP = document.createElement('p')
                thirdP.innerText = `${brewery.phone}`
                secondSection.appendChild(thirdP)
        
        const thirdSection = document.createElement('section')
            thirdSection.setAttribute('class', 'link')
            li.appendChild(thirdSection)

            const anchor = document.createElement('a')
                anchor.setAttribute('href', `${brewery.website_url}`)
                anchor.setAttribute('target', '_blank')
                anchor.innerText = 'Visit Website'
                thirdSection.appendChild(anchor)

    })
}

// * FILTER TYPE OF BREWERY LOGIC

function typeOfBreweryFilter() {
    console.log('called: typeOfBreweryFilter')
    // listen for type of brewery selection being made
    typeOfBrewerySelect.addEventListener('change', () => {
        // based on the option selected
        const typeSelected = typeOfBrewerySelect.value
        console.log('what is typeSelected?', typeSelected)
        if (typeSelected === 'all') {
                return renderBreweryList(state.breweryList)
            }
        //filter the state array based on which menu item has been selected
        const filteredBreweries = state.breweryList.filter((stateObj) => {
            if (stateObj.brewery_type === `${typeSelected}`) {
                return stateObj
            }
        })
        console.log('what is filteredBreweries?', filteredBreweries)
        // render only brewery types that match selected
        renderBreweryList(filteredBreweries)
    })
}

// * SEARCH BREWERIES LOGIC

// listen for when a user is typing in search breweries
function searchBreweriesByName() {
    console.log('called: searchBreweriesByName')
    // read what the user is inputting
    searchBreweriesForm.addEventListener('input', (event) => {
        event.preventDefault()
        const newSearch = searchBreweriesInput.value
        console.log('what is being searched for?', newSearch )
        //call the search filter
        breweryNameSearchFilter(newSearch)
    })
}

// filter the state based on matching brewery names
function breweryNameSearchFilter(searchInput) {
    console.log('called: breweryNameSearchFilter')
    //filter the state array based on which name matches
    const filteredBreweriesByName = state.breweryList.filter((stateObj) => {
        if (stateObj.name.toLowerCase().includes(`${searchInput}`)) {
            return stateObj
        }
    })
    // render the list that contains only matching brewery names
    renderBreweryList(filteredBreweriesByName)
}

// run event listeners on page load
function init() {
    console.log('callled: init')
    typeOfBreweryFilter()
    searchBreweriesByName()
}

init()