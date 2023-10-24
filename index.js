
const state = {
    breweries: []
  }
  const form = document.querySelector('#select-state-form')
  const input = document.querySelector('#select-state')

  const breweryUl = document.querySelector('#breweries-list')
  const filter = document.querySelector('#filter-by-type')

// creating the button 
  form.addEventListener('submit', event => { 
      event.preventDefault()
      const byState = input.value
      fetchData(byState)
      form.reset()
  })

  // Fetching the API:
  function fetchData(byState) {
    const url = `https://api.openbrewerydb.org/v1/breweries?by_state=${byState}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        state.breweries = data.filter((brewery) =>
          ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
        )
        renderBreweries(state.breweries)
      })
  }

// Get rid of any previous content and creating forEach element
function renderBreweries(breweries) {
  breweryUl.innerHTML = ''
  breweries.forEach((brewery) => {

    // Create list item within breweryUl
    const breweryLi = document.createElement('li')
    breweryUl.append(breweryLi)

    // Creating the title of each brewery
    const breweryTitle = document.createElement('h3')
    breweryTitle.innerText = brewery.name
    breweryLi.append(breweryTitle)

    // Creating div for the 'type' of brewery
    const breweryDiv = document.createElement('div')
    breweryDiv.setAttribute('class', 'type')
    breweryDiv.innerText = brewery.brewery_type
    breweryLi.append(breweryDiv)

    // Creating the address section of the brewery within the state
    const breweryAddressSection = document.createElement('section')
    breweryAddressSection.setAttribute('class', 'address')
    breweryLi.append(breweryAddressSection)

    // Creating the h3 tag containing "Address:"
    const addressSectionH3 = document.createElement('h3')
    addressSectionH3.innerText = 'Address:'
    breweryAddressSection.append(addressSectionH3)

    // Creating the p tag that contains the 1st address 
    const addressSection1 = document.createElement('p')
    addressSection1.innerText = brewery.address_1
    breweryAddressSection.append(addressSection1)

    // Creating the p tag for the 2nd Address
    const addressSection2 = document.createElement('p')
    breweryAddressSection.append(addressSection2)

    // Creates a strong tag with the city and post code inside
    const strongAddress = document.createElement('strong')
    strongAddress.innerText = `${brewery.city },${brewery.postal_code}`
    addressSection2.append(strongAddress)

    // Creating the phone number of the brewery
    const phoneSection = document.createElement('section')
    phoneSection.setAttribute('class', 'phone')
    breweryLi.append(phoneSection)

    //the h3 tag saying with the 'Phone attribute'
    const phoneH3 = document.createElement('h3')
    phoneH3.innerText = 'Phone:'
    phoneSection.append(phoneH3)

    // P tag for the phone number itself
    const phoneP = document.createElement('p')
    phoneP.innerText = brewery.phone
    phoneSection.append(phoneP)

    // Section for the link to the brewery site
    const linkSection = document.createElement('section')
    linkSection.setAttribute('class', 'link')
    breweryLi.append(linkSection)

    // Anchor link for the website
    const anchorLink = document.createElement('a')
    anchorLink.setAttribute('href', `${brewery.website_url}`)
    anchorLink.setAttribute('target', '_blank')
    anchorLink.innerText = 'Visit Website'
    linkSection.append(anchorLink)
  })
 }

  // Filter by type of brewery
filter.addEventListener('change', event => {
  const type = filter.value
  if (type === 'no_filter') {
      renderBreweries(state.breweries)
  } else {
    const filtered = state.breweries.filter((brewery) => brewery.brewery_type === type)
  renderBreweries(filtered)
}})
