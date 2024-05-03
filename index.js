

  const url = 'https://api.openbrewerydb.org/v1/breweries'

  // const list = document.createElement('li')

  const breweriesList = document.querySelector('#breweries-list')

  const stateInput = document.querySelector('#select-state-form')

  const typeSelect = document.querySelector('#filter-by-type-form')



  async function fetchBreweries() { 
    const response = await fetch(url); 
    const data = await response.json();

    function renderList(breweries) {
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
        breweriesList.innerHTML = breweryDetails
    }

    stateInput.addEventListener('submit', (e) => {
      const searchTerm = e.target.value.toLowerCase()
      const filteredBreweries = data.filter((brewery) => brewery.state.toLowerCase() === searchTerm)
      breweriesList.innerHTML = ''
      renderList(filteredBreweries)
    })

    typeSelect.addEventListener('click', (e) => {
      const searchTerm = e.target.value
      const filteredBreweries = data.filter((brewery) => brewery.brewery_type === searchTerm)
      breweriesList.innerHTML = ''
      renderList(filteredBreweries)
      if(searchTerm === "") {
        renderList(data)
      }
    })

    

    renderList(data)
    
  }

  fetchBreweries()
