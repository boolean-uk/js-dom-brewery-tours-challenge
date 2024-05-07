
const state = {
  selectedState: '',
  selectedType: '',
  selectedName: '',
  breweries: []
}

const stateInput = document.querySelector('#select-state-form')

const typeSelect = document.querySelector('#filter-by-type-form')


async function fetchBreweries() {
  let url = `https://api.openbrewerydb.org/v1/breweries?by_state=${state.selectedState}`
  if (state.selectedType) {
    url += `&by_type=${state.selectedType}`
  }
  const response = await fetch(url)
  const data = await response.json()


  state.breweries = data.filter(brewery => 
    ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
  )
  
  renderList(state.breweries)

}


function renderList(breweries) {
  const breweriesList = document.querySelector('#breweries-list')
  breweriesList.innerHTML = ''
  const breweryDetails = breweries
   .map(
      item => `
        <li>
          <h2>${item.name}</h2>
          <div class="type">${item.brewery_type}</div>
          <section class="address">
            <h3>Address:</h3>
            <p>${item.street}</p>
            <p><strong>${item.city}, ${item.state}</p>
          </section>
          <section class="phone">
            <h3>Phone:</h3>
            <p>${item.phone}</p>
          </section>
          <section class="link">
            <a href="${item.website_url}" target="_blank">Visit Website</a>
          </section>
        </li>`
    )
    .join(`<br>`)
    
  breweriesList.innerHTML = breweryDetails
  renderSearchByName()
}




stateInput.addEventListener('submit', async (e) => {
  e.preventDefault()
  let searchTerm = document.querySelector('#select-state').value.toLowerCase()

  state.selectedState = searchTerm
  
  await fetchBreweries()
  
  if (searchTerm === '') {
    renderList(state.breweries)
    return
  }

  const filteredBreweriesState = state.breweries
    .filter(brewery => brewery.state.toLowerCase() === searchTerm)
    .map(brewery => ({
      address_2: null,
      address_3: null,
      brewery_type: brewery.brewery_type,
      city: brewery.city,
      country: brewery.country,
      county_province: null,
      created_at: brewery.created_at,
      id: brewery.id,
      latitude: brewery.latitude,
      longitude: brewery.longitude,
      name: brewery.name,
      obdb_id: brewery.obdb_id,
      phone: brewery.phone,
      postal_code: brewery.postal_code,
      state: brewery.state,
      street: brewery.street,
      updated_at: brewery.updated_at,
      website_url: brewery.website_url
    }))

  
  renderList(filteredBreweriesState)
})



typeSelect.addEventListener('change', async (e) => {
  let searchTerm = e.target.value
 
  state.selectedType = searchTerm
  

  const filteredBreweries = state.breweries.filter((brewery) => 
    brewery.brewery_type === searchTerm
  )
  
  if (searchTerm === 'Select a type...') {
    renderList(state.breweries)
    return
  } else {
    renderList(filteredBreweries)
  }
  await fetchBreweries()
})


function renderSearchByName() {

  const siblingElem = document.getElementById('article')

  const header = document.createElement('header')

  const searchForm = document.createElement('form')
  searchForm.setAttribute ('id', 'search-breweries-form')
  searchForm.setAttribute ('autocomplete', 'off')
  header.append(searchForm)

  const formLabel = document.createElement('label')
  formLabel.setAttribute('for', 'search-breweries')

  const heading = document.createElement('h2')
  heading.textContent = 'Search breweries:'
  formLabel.append(heading)

  const input = document.createElement('input')
  input.setAttribute('id', 'search-breweries')
  input.setAttribute('name', 'search-breweries')
  input.setAttribute('type', 'text')
  searchForm.append(formLabel, input)

  const parentElem = siblingElem.parentNode

  parentElem.insertBefore(header, siblingElem)

}

{/* <header class="search-bar">
  <form id="search-breweries-form" autocomplete="off">
    <label for="search-breweries"><h2>Search breweries:</h2></label>
    <input id="search-breweries" name="search-breweries" type="text">
  </form>
</header> */}




fetchBreweries()
