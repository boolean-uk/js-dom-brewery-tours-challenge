const state = {
    breweries: []
}

// Select the required elements. Form, Input and Select
const searchForm = document.querySelector('#select-state-form')
const searchInput = document.querySelector('#select-state')
const selectFilter = document.querySelector('#filter-by-type')

// Submit search event listener
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submittedValue = searchInput.value
    console.log('submitted:', submittedValue)
    fetchBreweries(submittedValue)
    searchForm.reset()
})

// fetch data function
function fetchBreweries(stateSubmitted) {
    state.breweries = [];
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${stateSubmitted}`)
    .then(response => response.json())
    // filter through the fetched data to check that one of the values
    // is included in the brewery type. if true then push the brewery
    // into the state.breweries array.
    .then(data => {
        state.breweries.push(...data.filter(brewery => [
            'micro',
            'regional',
            'brewpub'
        ].includes(brewery.brewery_type)))
        breweryRender()
    })
}


// filter by type
// add event listener to select filter, create a variable
// with the selected option and then run the render function
// with the selected type
selectFilter.addEventListener('change', (event) => {
    const selectedType = event.target.value;
    breweryRender(selectedType)
})

// function to render the filtered breweries 
function breweryRender(selectedType = '') {

    // create a variable that will filter the selected type and return
    // each brewery that matches
    // used a ternary operator for this
    // if the selectedType from the filter on line 36 is defined
    // then filteredBreweries is equal to the filtered type
    // otherwise it will return state.breweries (all of them)
    const filteredBreweries = selectedType
    ? state.breweries.filter((brewery) => brewery.brewery_type === selectedType)
    : state.breweries;

    // select the unordered list
    const ul = document.querySelector('#breweries-list')
    
    // clear the list every time the function is called
    // to avoid duplicates
    ul.innerHTML = '';

    // keeping it oldschool with the for loop
    // instead of using forEach
    for (let i = 0; i < filteredBreweries.length; i++) {


    // create the list element
        const li = document.createElement('li')

    // create, class and populate each element seperately
    // h2 
        const h2 = document.createElement('h2')
        h2.innerText = `${filteredBreweries[i].name}`

    // type div
        const div = document.createElement('div')
        div.setAttribute('class', 'type')
        div.innerText = `${filteredBreweries[i].brewery_type}`

    // address section
        const addressSection = document.createElement('section')
        addressSection.setAttribute('class', 'address')

        // h3
        const adressH3 = document.createElement('h3')
        adressH3.innerText = 'Address:'

        // p first line
        const pFirstLine = document.createElement('p')
        pFirstLine.innerText = `${filteredBreweries[i].street}`

        // p second line
        const pSecondLine = document.createElement('p')
        pSecondLine.innerHTML = `<strong>${filteredBreweries[i].postal_code}</strong>`

        // append the elements to the address section
        addressSection.append(adressH3, pFirstLine, pSecondLine)


    // phone section
        const phoneSection = document.createElement('section')
        phoneSection.setAttribute('class', 'phone')

        // h3
        const phoneH3 = document.createElement('h3')
        phoneH3.innerText = 'Phone:'

        // p
        const phoneP = document.createElement('p')
        phoneP.innerText = `${filteredBreweries[i].phone}`

        // append the elements to the phone section
        phoneSection.append(phoneH3, phoneP)


    // link section
        const linkSection = document.createElement('section')
        linkSection.setAttribute('class', 'link')

        // a tag
        const a = document.createElement('a')
        a.setAttribute('href', `${filteredBreweries[i].website_url}`)
        a.setAttribute('target', 'blank')
        a.innerText = 'Visit Website'

        // append the element to the link section
        linkSection.append(a)
        
    // append each element/section to the li
        li.append(h2, div, addressSection, phoneSection, linkSection)
    // then append the li to the ul
        ul.append(li)
    }
}
