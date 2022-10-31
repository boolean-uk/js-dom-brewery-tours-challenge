const state = {
  types: ['micro', 'regional', 'brewpub'],
  breweries: [],
  filterByType: ''
}
const renderBreweryList = document.querySelector('#breweries-list')
const uri = 'https://api.openbrewerydb.org/breweries'
// Set up Fetch function to get my data from the correct url/uri

function getBreweryData() {
  //
  //
  fetch(uri)
    .then((response) => {
      return response.json() // turns the respone into a Json format
    })
    .then((breweries) => {
      state.breweries = breweries

      renderedBreweyInfo()
    })
}

//
//  - get insomnia working and able to show the breweries FileList.
//  - have a detailed plan of the things that you will need to do.
//  - break down the steps as much as possible
//  - dont cry
//  - open a file that you can post questions to as they arise.

// link that data to my renderBreweryyList
// querySelect the UL in the html

// step 1:
// implement my lists and render them

// set function
// withtin function
// --
function renderedBreweyInfo() {
  renderBreweryList.innerText = ''
  console.log('hello')

  state.breweries.forEach((brewery) => {
    const li = document.createElement('li')
    renderBreweryList.appendChild(li)

    const h2 = document.createElement('h2')
    h2.innerText = brewery.name
    li.appendChild(h2)

    const div = document.createElement('div')
    div.setAttribute('class', 'type')
    div.innerText = brewery.brewery_type
    li.appendChild(div)

    const section1 = document.createElement('section')
    section1.setAttribute('class', 'address')
    li.appendChild(section1)

    const h3address = document.createElement('h3')
    h3address.innerText = 'Address:'
    section1.appendChild(h3address)

    const p1 = document.createElement('p')
    p1.innerText = brewery.street
    section1.appendChild(p1)

    const p2 = document.createElement('p')
    p2.innerText = brewery.city + ' ' + brewery.postal_code
    p2.setAttribute('style', ' bold')
    section1.appendChild(p2)

    const section2 = document.createElement('section')
    section2.setAttribute('class', 'phone')
    li.appendChild(section2)

    const h3phone = document.createElement('h3')
    h3phone.innerText = 'Phone:'
    section2.appendChild(h3phone)

    const p3 = document.createElement('p')
    p3.innerText = brewery.phone
    section2.appendChild(p3)

    const section3 = document.createElement('section')
    section3.setAttribute('class', 'link')
    li.appendChild(section3)

    const a = document.createElement('a')
    a.setAttribute('href', '')
    a.setAttribute('target', '_blank')
    a.innerText = 'Visit Website'
    section3.appendChild(a)

    renderBreweryList.appendChild(li)
    console.log('test')
  })
}
renderedBreweyInfo()
// ensure li is linked to the Json files and 'getting' the correct data.
// link the search button to the li above.
// get to the point where a search will render a list in the above format.
//

// begin filter research
// list will be filtered by the state
// Micro
// Regional
// Brewpub
// if brewery not among those then do not show!

// filter data that a user can see and ensure it isthe following Name
// Type of brewery
// Address
// Phone Number
// From the list of breweries, a user can visit the website of a brewery
// From the 'filter by type of brewery' section, a user can filter by type of brewery.

// do not cry
// get it finished and drink a beer
getBreweryData()
