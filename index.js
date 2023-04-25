const state = {}

const searchForm = document.querySelector('#select-state-form')
const breweryUl = document.querySelector('#breweries-list')

// Event listener for submit button
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const userInput = document.querySelector('#select-state').value
  console.log('user input:', userInput)
  state.userInput = userInput

  const filterDropdown = document.querySelector('#filter-by-type')
  // console.log('dropdown: ', filterDropdown)
  state.filter = filterDropdown.value
  // console.log('filter:', state.filter)

  getBreweriesByState(state.userInput)
})

// GET request based on user input
function getBreweriesByState(state) {
  fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${state}`)
  .then(res => res.json())
  .then((json) => {
      addBreweriesToState(json)
      // console.log('response:', json)
      renderBreweries()
    })
}

// For some reason adding this line directly to getBreweriesByState() causes an error
function addBreweriesToState(arrOfBreweries) {
  state.breweries = arrOfBreweries
}

// Filter logic for rendering the list
function filterMatchesType(stateFilter, breweryType) {
  if (stateFilter === '') {
    return true
  }
  else if (stateFilter === breweryType) {
    return true
  }
  return false
}

// Rendering the entire list
function renderBreweries() {
  breweryUl.innerHTML = ''
  for (let i = 0; i < state.breweries.length; i++) {
    // console.log(`state.filter: ${state.filter}\nBrewery type: ${state.breweries[i].brewery_type}`)
    // console.log(`filters match: ${filterMatchesType(state.filter, state.breweries[i].brewery_type)}`)
    if (!(filterMatchesType(state.filter, state.breweries[i].brewery_type))) continue
    breweryUl.append(createBreweryLi(state.breweries[i]))
  }
}

// Create the brewery cards
function createBreweryLi(breweryObj) {
  const li = document.createElement('li')

  const breweryNameH2 = document.createElement('h2')
  breweryNameH2.innerHTML = breweryObj.name

  const typeDiv = document.createElement('div')
  typeDiv.classList.add('type')
  typeDiv.innerText = breweryObj.brewery_type

  const addressSection = document.createElement('section')
  addressSection.classList.add('address')
  const addressH3 = document.createElement('h3')
  addressH3.innerText = 'Address:'

  const addressStreetP = document.createElement('p')
  addressStreetP.innerText = breweryObj.street

  const addressCityPostcodeP = document.createElement('p')
  const addressStrong = document.createElement('strong')
  addressStrong.innerText = `${breweryObj.city}, ${breweryObj.postal_code}`
  addressCityPostcodeP.append(addressStrong)
  addressSection.append(addressH3, addressStreetP, addressCityPostcodeP)

  const phoneSection = document.createElement('section')
  phoneSection.classList.add('phone')
  const phoneH3 = document.createElement('h3')
  phoneH3.innerText = 'Phone:'
  const phoneP = document.createElement('p')
  phoneP.innerText = breweryObj.phone
  phoneSection.append(phoneH3, phoneP)

  const linkSection = document.createElement('section')
  linkSection.classList.add('link')
  const linkA = document.createElement('a')
  linkA.innerText = 'VISIT WEBSITE'
  linkA.href = breweryObj.website_url
  linkSection.append(linkA)

  li.append(breweryNameH2, typeDiv, addressSection, phoneSection, linkSection)

  return li
}
