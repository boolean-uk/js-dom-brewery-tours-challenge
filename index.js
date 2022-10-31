// targeting
const breweriesList = document.querySelector('.breweries-list')

// Local state
const state = {
  types: ['regional', 'micro', 'brewpub'],
  breweries: [],
  filterByType: ''
}

// RENDERING

// function to trigger all rendering needed
function render() {
  renderBreweries()

  // call Ext. 2 render function
}

// Breweries function
function renderBreweries() {
  // clear html
  breweriesList.innerHTML = ''

  // apply filters function
  const breweries = applyFilters()
  // for each brewery create a card (point to card rendering function)
  breweries.forEach(renderBreweryCard)
  // function end
}

// Filters function
function applyFilters() {
  // variable for state.breweries
  let filteredBreweries = state.breweries

  // filter breweries by type
  if(state.filterByType !== null) {
    filteredBreweries = filteredBreweries.filter(brewery => brewery.type === state.filterByType)
  }

  // Ext. 1 - filter breweries by name

  // Ext. 2 - filter breweries by city

  return filteredBreweries
  // function end
}

// Card rendering function
function renderBreweryCard(brewery) {
  // create li
  const li = document.createElement('li')
  li.innerText = 'hello'
  // create h2 for title
  const h2 = document.createElement('h2')
  // create div .type
  const div = document.createElement('div')
  div.setAttribute('class', 'address')

  // create section for address
  const sectionAddress = document.createElement('section')
  // h3 for address title
  const h3Address = document.createElement('h3')
  // p for address line 1
  const pAddressL1 = document.createElement('p')
  // p for address line 2 /w strong
  const pAddressL2 = document.createElement('p')
  sectionAddress.appendChild(h3Address, pAddressL1, pAddressL2)

  // create section for phone number
  const sectionNumber = document.createElement('section')
  // h3 for phone title
  const h3Phone = document.createElement('h3')
  // p for number
  const pPhone = document.createElement('p')
  sectionNumber.appendChild(h3, pPhone)

  // section for website .link
  const sectionSite = document.createElement('section')
  // anchor link to brewery site
  const a = document.createElement('a')
  sectionSite.appendChild(a)

  // append everything to where they should be
  breweriesList.appendChild(li)
  li.appendChild(h2, div, sectionAddress, sectionNumber, sectionSite)

  // function end
}

// EVENT LISTENERS

// Event listener for when website button is clicked
  // anchor link to button?
// EL end

// Event listener for when state search is submitted
  // create variable from the entered state
  // fetch from the brewery api using the above state (also 50 items per page)
  // extract JSON from the response and convert into a JS object
  // trigger render functions
// EL end

// Event listener for filtering by brwery type
  // update city filter within state
// EL end


// Ext. 1
// function to search by name


// Ext. 2

// cityFilter function
  // create cities array
  // search through the array for the requested cities
  // make sure it only finds micro, regional or brewpub breweries
// function end

// Ext. 3


//Ext. 4