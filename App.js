//State Management Aims
// We need a way to store the fetched breweries.
//This state object will hold the list of breweries.
const state = {
    breweries: [] // Initialize with an empty array
  }
  
  //API Endpoint
  // Define the base URL for the Open Brewery DB API.
  const root = "https://api.openbrewerydb.org/v1/breweries"
  
  // DOM Elements:
  // Cache frequently used DOM elements for better performance.
  const breweryList = document.querySelector('.breweries-list') // List container
  const selectStateForm = document.querySelector('#select-state-form') // Form for state selection
  const filterByType = document.querySelector('#filter-by-type') // Dropdown for brewery type
  const selectState = document.querySelector('#select-state') // Dropdown for state selection
  
  //Brewery Element Creation:
  //Define a function to create HTML elements for displaying brewery details.
  function createBreweryElement(brewery) {
    // Create elements for brewery details
    const li = document.createElement('li')
    const breweryName = document.createElement('h2')
    const breweryType = document.createElement('div')
    const sectionAddress = document.createElement('section')
    const sectionPhone = document.createElement('section')
    const sectionLink = document.createElement('section')
    
    // Populate elements with brewery data
    breweryName.innerText = brewery.name
    breweryType.classList.add('type')
    breweryType.innerText = brewery.brewery_type
    sectionAddress.classList.add('address')
    sectionAddress.innerHTML = `<h3>Address:</h3><p>${brewery.street}</p><p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>`
    sectionPhone.classList.add('phone')
    sectionPhone.innerHTML = `<h3>Phone:</h3><p>${brewery.phone || 'N/A'}</p>`
    sectionLink.classList.add('link')
    const link = document.createElement('a')
    link.href = brewery.website_url
    link.target = '_blank'
    link.innerText = 'Visit Website'
    sectionLink.appendChild(link)
    
    // Append elements to list item
    li.append(breweryName, breweryType, sectionAddress, sectionPhone, sectionLink)
    
    return li
  }
  
  // Render Brewery List:
  // Define a function to render the list of breweries.
  function renderBreweryList() {
    // Clear existing list
    breweryList.innerHTML = ''
    // Filter breweries by type and render each one
    state.breweries
      .filter(brewery => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type))
      .forEach(brewery => {
        const breweryElement = createBreweryElement(brewery)
        breweryList.appendChild(breweryElement)
      })
  }
  
  //Fetch Breweries from API
  //Define an async function to fetch breweries from the API.
  async function fetchBreweries(query = '') {
    // Fetch data from API
    const response = await fetch(`${root}${query}`)
    // Parse JSON response
    const data = await response.json()
    // Update state with fetched data
    state.breweries = data
    // Render the updated list
    renderBreweryList()
  }
  
  //Remove Existing List:
  //Define a function to remove existing brewery list items.
  function remove() {
    breweryList.innerHTML = '' // Clear existing list
  }
  
  //Filter Breweries:
  //Define an async function to filter breweries based on state and type.
  async function filter() {
    const stateValue = selectState.value
    const typeValue = filterByType.value
    let query = `?by_state=${stateValue}` // Construct query with state
    if (typeValue) {
      query += `&by_type=${typeValue}` // Add type filter to the query if selected
    }
    await fetchBreweries(query) // Fetch and update list
  }
  
  // Event Listeners:
  // Add event listeners for form submission and type filter change.
  selectStateForm.addEventListener('submit', async (event) => {
    event.preventDefault() // Prevent default form submission
    remove() // Clear current list
    await filter() // Fetch and display filtered list
  })
  
  filterByType.addEventListener('change', async () => {
    remove() // Clear current list
    await filter() // Fetch and display filtered list
  })
  
  // Initial Fetch:
  //Perform an initial fetch of breweries when the page loads.
  (async function main() {
    await fetchBreweries()
  })()
  