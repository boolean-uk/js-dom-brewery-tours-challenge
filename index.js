const state = {
    breweries: []
  }
  
// Selecting necessary elements for the future:
  const form = document.querySelector('#select-state-form')
  const input = document.querySelector('#select-state')

  const breweryUl = document.querySelector('#breweries-list')
  const filter = document.querySelector('#filter-by-type')

// Submit button function when clicked:
  form.addEventListener('submit', event => { 
      event.preventDefault()
      const byState = input.value
      fetchData(byState)
      form.reset()
  })
  
  // Fetch the API from the brewery database:
  function fetchData(byState) {
    const url = `https://api.openbrewerydb.org/v1/breweries?by_state=${byState}`
  
    fetch(url)
      .then((resource) => resource.json())
      .then((data) => {
        state.breweries = data.filter((brewery) =>
          ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
        )
        renderBreweries(state.breweries)
      })
  }

// Empty out any existing "search" content and create each element
function renderBreweries(breweries) {
  breweryUl.innerHTML = ''
  breweries.forEach((brewery) => {

    // Create list item within breweryUl
    const breweryLi = document.createElement('li')
    breweryUl.append(breweryLi)
  
    // Create h3; the title of each brewery
    const breweryH3 = document.createElement('h3')
    breweryH3.innerText = brewery.name
    breweryLi.append(breweryH3)
  
    // Create div for the 'type' of brewery
    const breweryDiv = document.createElement('div')
    breweryDiv.setAttribute('class', 'type')
    breweryDiv.innerText = brewery.brewery_type
    breweryLi.append(breweryDiv)
  
    // Create section for the address of the brewery within the state
    const brewerySectionAddress = document.createElement('section')
    brewerySectionAddress.setAttribute('class', 'address')
    breweryLi.append(brewerySectionAddress)
  
    // Create h3 which just says "Address:"
    const sectionAddressH3 = document.createElement('h3')
    sectionAddressH3.innerText = 'Address:'
    brewerySectionAddress.append(sectionAddressH3)
  
    // Create p tag for the address itself
    const sectionAddress1 = document.createElement('p')
    sectionAddress1.innerText = brewery.address_1
    brewerySectionAddress.append(sectionAddress1)
  
    // Creates another p tag for the 'address 2'
    const sectionAddress2 = document.createElement('p')
    brewerySectionAddress.append(sectionAddress2)
  
    // Creates a strong tag with the city and post code inside
    const strongAddress = document.createElement('strong')
    strongAddress.innerText = `${brewery.city },${brewery.postal_code}`
    sectionAddress2.append(strongAddress)
  
    // Create a section for the phone number of the brewery
    const phoneSection = document.createElement('section')
    phoneSection.setAttribute('class', 'phone')
    breweryLi.append(phoneSection)
  
    //Create a h3 saying 'Phone:'
    const sectionPhoneH3 = document.createElement('h3')
    sectionPhoneH3.innerText = 'Phone:'
    phoneSection.append(sectionPhoneH3)
  
    // Create a p tag for the phone number itself
    const phoneP = document.createElement('p')
    phoneP.innerText = brewery.phone
    phoneSection.append(phoneP)
  
    // Create a section for the link to the brewery site
    const breweryLinkSection = document.createElement('section')
    breweryLinkSection.setAttribute('class', 'link')
    breweryLi.append(breweryLinkSection)
  
    // Create an anchor link for the website
    const sectionLinkA = document.createElement('a')
    sectionLinkA.setAttribute('href', `${brewery.website_url}`)
    sectionLinkA.setAttribute('target', '_blank')
    sectionLinkA.innerText = 'Visit Website'
    breweryLinkSection.append(sectionLinkA)
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

// The page seems to load many breweries 