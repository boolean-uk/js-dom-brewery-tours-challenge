const state = {}

const searchForm = document.querySelector('#select-state-form')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const userInput = document.querySelector('#select-state').value
  console.log(userInput)
  state.userInput = userInput
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

state.breweries = breweries
const templateBrewery = state.breweries[0]

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

const breweryUl = document.querySelector('#breweries-list')

function renderBeweries() {
  breweryUl.append(createBreweryLi(templateBrewery))
}

renderBeweries()
