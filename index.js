const state = {}

const searchForm = document.querySelector('#select-state-form')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const userInput = document.querySelector('#select-state').value
  console.log('user input:', userInput)
  state.userInput = userInput

  let filter = 'Micro'
  const filterDropdown = document.querySelector('#filter-by-type')
  console.log('dropdown: ', filterDropdown)
  state.filter = filterDropdown.value
  console.log('filter:', state.filter)
  getBreweriesByState(state.userInput)
})

const breweries = [
  {
    address_2: null,
    address_3: null,
    brewery_type: "large",
    city: "San Diego",
    country: "United States",
    county_province: null,
    created_at: "2018-07-24T00:00:00.000Z",
    id: 8041,
    latitude: "32.714813",
    longitude: "-117.129593",
    name: "10 Barrel Brewing Co",
    obdb_id: "10-barrel-brewing-co-san-diego",
    phone: "6195782311",
    postal_code: "92101-6618",
    state: "California",
    street: "1501 E St",
    updated_at: "2018-08-23T00:00:00.000Z",
    website_url: "http://10barrel.com"
  }
];

function getBreweriesByState(state) {
  let queryResult 
  fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${state}`)
  .then(res => queryResult = res.json())
  .then((json) => {
      addBreweriesToState(json)
      console.log('response:', json)
      renderBreweries()
    })
}

function addBreweriesToState(arrOfBreweries) {
  state.breweries = arrOfBreweries
}

const breweryUl = document.querySelector('#breweries-list')

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

function filterMatchesType(stateFilter, breweryType) {
  if (stateFilter === '') {
    return true
  }
  else if (stateFilter === breweryType) {
    return true
  }
  return false
}

function renderBreweries() {
  breweryUl.innerHTML = ''
  // console.log('rendering with filter', state.filter)

  state.filter

  for (let i = 0; i < state.breweries.length; i++) {
    console.log(`state.filter: ${state.filter}\nBrewery type: ${state.breweries[i].brewery_type}`)
    console.log(`filters match: ${filterMatchesType(state.filter, state.breweries[i].brewery_type)}`)
    if (!(filterMatchesType(state.filter, state.breweries[i].brewery_type))) continue
    breweryUl.append(createBreweryLi(state.breweries[i]))
  }
}


// getBreweriesByState('California')

