// *** PLANNING

/*

Extension 3

1 - Add pagination to the list; 
    if the list of breweries is greater than 10 a user can 
    go to the next page to view more breweries.

2 - The user can also go back a page.


* TO DO:

- have the checkbox ticks display


*/

// *** CODE

// * STATE

const state = {
    breweryList: [],
    breweryTypeFilter: '',
    brewerySearchFilter: '',
    breweryCityFilter: []
}

// * QUERY SELECTORS

const whichStateForm = document.querySelector('#select-state-form')
const whichStateInput = document.querySelector('#select-state')
const breweriesUL = document.querySelector('#breweries-list')
const typeOfBrewerySelect = document.querySelector('#filter-by-type')
const searchBreweriesForm = document.querySelector('#search-breweries-form')
const searchBreweriesInput = document.querySelector('#search-breweries')
const filterByCityForm = document.querySelector('#filter-by-city-form')
const clearAllFiltersButton = document.querySelector('.clear-all-btn')

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

clearAllFiltersButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('clear all clicked')
    state.breweryTypeFilter = ''
    state.brewerySearchFilter = ''
    state.breweryCityFilter = ''
    console.log(state)
    checkRenderConditions()
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
    console.log('here are all the micro, regional & brewpub breweries:', filtered)
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
    renderBreweryList(list)
    checkCityDuplicates(list)
}

//check the rendering conditions
function checkRenderConditions() {
    console.log('applying TYPE FILTER logic')

    let appliedTypeFilter
    let appliedSearchFilter
    let appliedCityFilter

    //filter the state based on the type filter selected
    appliedTypeFilter = state.breweryList.filter((brewery) => {
        //if type filter is empty - render all
        if(state.breweryTypeFilter === '') return true
        //if the brewery type does not match state, don't render
        else if(brewery.brewery_type !== state.breweryTypeFilter) return false
        return true
    })
    console.log('appliedTypeFilter', appliedTypeFilter.length)

    //once filter by type state has been checked, begin state search check
    console.log('applying SEARCH FILTER logic')
    appliedSearchFilter = appliedTypeFilter.filter((brewery) => {
        //if name search is empty - render all
        if(state.brewerySearchFilter === '') return true
        //if the brewery name does not match what's in the search, don't render
        else if(!brewery.name.toLowerCase().includes(`${state.brewerySearchFilter}`)) return false
        return true
    })
    console.log('appliedSearchFilter', appliedSearchFilter.length)



    //if the city matches any of the elements in state.breweryCityFilter array
    let cityContainer = []
    // for each of the checked items, filter out any unchecked city match results
    console.log('applying CITY FILTER logic')
    //if city search is empty - render all
     if(state.breweryCityFilter === '') {
        cityContainer = appliedSearchFilter
     } else {


    for (i = 0; i < state.breweryCityFilter.length; i++) {

        //filter through breweries list looking for a match
        appliedCityFilter = appliedSearchFilter.filter((brewery) => {

            //if the brewery city matches, add to cityContainer
            if (brewery.city === state.breweryCityFilter[i]) {
                cityContainer.push(brewery)
            }
            //if the brewery city does not match the state city, don't render
            else if (brewery.city !== state.breweryCityFilter[i]) return false
        })
        console.log('state.breweryCityFilter:', state.breweryCityFilter)
        console.log('cityContainer', cityContainer)
        console.log('cityContainer.length', cityContainer.length)
    }

}
    // call to render based on the sorted data
    renderBreweryList(cityContainer)
}


// * RENDER CITIES FILTER LOGIC
//check for duplicate cities 
function checkCityDuplicates(allCities) {
    console.log('called: checkCityDuplicates')
    const singleCities = []
    allCities.forEach((brewery) => {
        if (singleCities.filter(e => e.city === brewery.city).length > 0) {
            console.log('already in list')
        }
        else {
                singleCities.push(brewery)
            }
    }) 
    console.log('what is singleCities AFTER', singleCities)
    renderCityCheckboxes(singleCities)
}

//render the city checkboxes
function renderCityCheckboxes(presentCities) {
    console.log('called: renderCityCheckboxes')
    filterByCityForm.innerHTML = ''

    presentCities.forEach((brewery) => {

        const cityInput = document.createElement('input')
            cityInput.setAttribute('type', 'checkbox')
            cityInput.setAttribute('name', `${brewery.city}`)
            cityInput.setAttribute('value', `${brewery.city}`)
        filterByCityForm.appendChild(cityInput)

      

        // event listener to update state when checkbox clicked
        cityInput.addEventListener('change', () => {
            if (cityInput.checked === undefined) {
            state.breweryCityFilter.push(`${brewery.city}`)
            console.log('state city filter updated:', state.breweryCityFilter)
            } 
            // console.log('cityInput'. cityInput)
            // console.log('cityInput'. cityInput.value)
            // console.log('cityInput'. cityInput.name)
            // console.log('cityInput'. cityInput.type)
            // console.log('brewery.city'. brewery.city)
            // console.log('cityInput.checked'. cityInput.checked)
            checkRenderConditions()
        })
    
        const cityLabel = document.createElement('label')
            cityLabel.setAttribute('for', `${brewery.city}`)
            cityLabel.innerText = `${brewery.city}`
        filterByCityForm.appendChild(cityLabel)

    })
}


// * RENDER RESULTS LOGIC
//render the breweries based on state.breweryList array
function renderBreweryList(whichBreweries) {
    console.log('called: renderBreweryList')

    breweriesUL.innerHTML = ''

    whichBreweries.forEach((brewery) => {

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
        state.breweryTypeFilter = typeSelected
            if (typeSelected === 'all') {
                state.breweryTypeFilter = ''
            }
        const filteredByType = state.breweryList.filter((item) => {
            if (item.brewery_type === typeSelected) {
                return item
            }
        })
        checkRenderConditions()
    })
}


// * SEARCH BREWERIES LOGIC
// listen for when a user is typing in search breweries
function searchBreweriesByName() {
    console.log('called: searchBreweriesByName')
    // read what the user is inputting
    searchBreweriesForm.addEventListener('input', (event) => {
        event.preventDefault()
        //add to the state
        state.brewerySearchFilter = searchBreweriesInput.value
        checkRenderConditions()
    })
}


// * INIT
// run event listeners on page load
function init() {
    console.log('callled: init')
    typeOfBreweryFilter()
    searchBreweriesByName()
    
}

init()