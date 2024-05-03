
const state = {
  selectedState: '',
  selectedType: '',
  breweries: []
}

let url = `https://api.openbrewerydb.org/v1/breweries?by_state=${state.selectedState}`

const list = document.createElement('li')

const stateInput = document.querySelector('#select-state-form')

const typeSelect = document.querySelector('#filter-by-type-form')



async function fetchBreweries() {
  const response = await fetch(url)
  const data = await response.json()
  
  state.breweries.push(data)
  console.log(state.breweries)

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
    .join('')
    
  breweriesList.innerHTML = breweryDetails
}




stateInput.addEventListener('submit', async (e) => {
  e.preventDefault()
  const searchTerm = document.querySelector('#select-state').value.toLowerCase()
  // searchTerm.value

  console.log(searchTerm.value)

  state.selectedState = searchTerm
  await fetchBreweries()

  console.log(state.breweries[20].state)
  
  if (searchTerm === "") {
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



typeSelect.addEventListener('change', (e) => {
  const searchTerm = e.target.value
  state.selectedType = searchTerm
  
  const filteredBreweries = state.breweries.filter((brewery) => 
    brewery.brewery_type === searchTerm
  )
  
  if (searchTerm === "") {
    renderList(state.breweries)
  } else {
    renderList(filteredBreweries)
  }
})


fetchBreweries()
