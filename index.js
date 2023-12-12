const appState = {
  breweries: []
}

const selectStateForm = document.querySelector('#select-state-form')
const selectStateInput = document.querySelector('#select-state')
const breweriesList = document.querySelector('#breweries-list')
const filterByType = document.querySelector('#filter-by-type')

selectStateForm.addEventListener('submit', event => {
  event.preventDefault()
  const stateToFetch = selectStateInput.value
  fetchData(stateToFetch)
  selectStateForm.reset()
})

function fetchData(state) {
  const apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_state=${state}`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      appState.breweries = data.filter(brewery => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type))
      renderBreweries(appState.breweries)
    })
}

function renderBreweries(breweries) {
  breweriesList.innerHTML = ''
  breweries.forEach(brewery => {
    const breweryListItem = document.createElement('li')
    breweriesList.append(breweryListItem)

    const breweryTitle = document.createElement('h3')
    breweryTitle.innerText = brewery.name
    breweryListItem.append(breweryTitle)

    const breweryType = document.createElement('div')
    breweryType.setAttribute('class', 'type')
    breweryType.innerText = brewery.brewery_type
    breweryListItem.append(breweryType)

    const addressSection = document.createElement('section')
    addressSection.setAttribute('class', 'address')
    breweryListItem.append(addressSection)

    const addressTitle = document.createElement('h3')
    addressTitle.innerText = 'Address:'
    addressSection.append(addressTitle)

    const addressLine1 = document.createElement('p')
    addressLine1.innerText = brewery.address_1
    addressSection.append(addressLine1)

    const addressLine2 = document.createElement('p')
    addressSection.append(addressLine2)

    const addressDetails = document.createElement('strong')
    addressDetails.innerText = `${brewery.city}, ${brewery.postal_code}`
    addressLine2.append(addressDetails)

    const phoneSection = document.createElement('section')
    phoneSection.setAttribute('class', 'phone')
    breweryListItem.append(phoneSection)

    const phoneTitle = document.createElement('h3')
    phoneTitle.innerText = 'Phone:'
    phoneSection.append(phoneTitle)

    const phoneNumber = document.createElement('p')
    phoneNumber.innerText = brewery.phone
    phoneSection.append(phoneNumber)

    const linkSection = document.createElement('section')
    linkSection.setAttribute('class', 'link')
    breweryListItem.append(linkSection)

    const websiteLink = document.createElement('a')
    websiteLink.setAttribute('href', `${brewery.website_url}`)
    websiteLink.setAttribute('target', '_blank')
    websiteLink.innerText = 'Visit Website'
    linkSection.append(websiteLink)
  })
}

filterByType.addEventListener('change', event => {
  const selectedType = filterByType.value
  if (selectedType === 'no_filter') {
    renderBreweries(appState.breweries)
  } else {
    const filteredBreweries = appState.breweries.filter(brewery => brewery.brewery_type === selectedType)
    renderBreweries(filteredBreweries)
  }
})