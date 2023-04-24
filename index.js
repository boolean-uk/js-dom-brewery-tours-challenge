// *** PLANNING

/*

1 - use insomnia to ensure I can access the data from the API
    - get familiar with the data structure returned, and which parts I might need
        - state.brewery_type

2 - create a local state array in my JS that I can store brewery information in
    - think about paths to getting to the parts of the data I want for rendering later
    - think about how I can filter by brewery types for rendering specified types

3 - be able to take the user input from the search bar
    - prevent default submit behaviour to avoid page reloading
        -set up an event listener for when the form is submitted 
    - use the user input to construct the FETCH GET for data that matches this
    - check the links using insomnia and console.log() what is returned to check it

4 - saving the fetched data to my local state
    - ensure the state is cleared for each search
    - push the retrieved data into my local state array

5 - render the state on the page
    - use the templates for the format of the HTML components to create dynamically
    - create a function that will make a list item forEach of the matching data in the local state

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
    renderBreweryList()
}


// * RENDER LOGIC

//render the breweries based on state.breweryList array
function renderBreweryList() {
    console.log('called: renderBreweryList')
    breweriesUL.innerHTML = ''

    state.breweryList.forEach((brewery) => {
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







