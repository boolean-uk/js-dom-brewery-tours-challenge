// *** PLANNING

/*

Extension 1
- A new 'search' section should be added under the List of Breweries heading
- From the 'search' section, a user can search for breweries by name
- As the user types, the brewery list should be updated automatically

1 - find where to add the search breweries input
    - after the List of Breweries header, before the UL
        - check for relevant CSS written to indicate class/ID names to use

2 - code for adding in the new search bar
    - think about how to handle what the user inputs

3 - create the logic for handling the user input to compare with brewery names
    - comparing to the state array by the brewery.name
        - update what is rendered based on filtering of the state array

4 - check that rendering is occuring as the user is typing
    - think about when the filter function should be running 

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


// * RENDER LOGIC

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

// * FILTER DROPDOWN LOGIC

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

// run event listeners on page load
function init() {
    console.log('callled: init')
    typeOfBreweryFilter()
}

init()