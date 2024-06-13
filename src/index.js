// Always fetch 200 results
const API_URL = 'https://api.openbrewerydb.org/v1/breweries/?per_page=200'

const state = {
    // All the breweries from the API
    breweries: [],
    // All cities in breweries
    cities: [],
    // The current city filter
    cityFilter: [],
    // Filter by type
    typeFilter: '',
    // Filter by US state
    stateFilter: '',
    // Filter by brewery name (search-bar)
    nameFilter: '',
}

// Fetch the breweries from the API
async function getBreweries() {
    try {
        // Fetch the default if there is no US state filter
        if (!state.stateFilter) {
            const response = await fetch(API_URL)
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            // Fetch the results matching the selected US state
            const response = await fetch(
                `${API_URL}&by_state=${state.stateFilter}`
            )
            const jsonResponse = await response.json()
            return jsonResponse
        }
    } catch (err) {
        // Report error if fetching fails, and stop execution
        throw new Error('ERROR: Could not load breweries: ', err)
    }
}

async function render() {
    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = ''

    state.breweries = await getBreweries()

    // Apply filter by brewery type
    if (!state.typeFilter) {
        // Apply default filters if there is no selected filter
        const defaultFilters = ['micro', 'regional', 'brewpub']

        state.breweries = state.breweries.filter((brewery) =>
            defaultFilters.includes(brewery.brewery_type)
        )
    } else {
        // Apply the selected filter
        state.breweries = state.breweries.filter(
            (brewery) => brewery.brewery_type === state.typeFilter
        )
    }

    // Apply filter from the search bar
    if (state.nameFilter) {
        state.breweries = state.breweries.filter((brewery) =>
            brewery.name.toLowerCase().includes(state.nameFilter.toLowerCase())
        )
    }

    // Display error message if no results are found
    if (state.breweries.length === 0) {
        breweriesList.innerText = 'No matching results found.'
    } else {
        // Generate the list with the matching results
        state.breweries.forEach((brewery) =>
            breweriesList.appendChild(generateCard(brewery))
        )
    }

    // Reset / populate the city list
    filterByCity()
}

// Render from a cached list in state
// Used for the city filters
function renderFromState(list) {
    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = ''
    list.forEach((brewery) => breweriesList.appendChild(generateCard(brewery)))
}

// Generate the cards
function generateCard(brewery) {
    const listItem = document.createElement('li')

    const breweryName = document.createElement('h2')
    breweryName.innerText = brewery.name

    const breweryType = document.createElement('div')
    breweryType.classList.add('type')
    breweryType.innerText = brewery.brewery_type

    const address = document.createElement('section')
    address.classList.add('address')
    address.innerHTML = `
        <h3>Address:</h3>
        <p>${brewery.address_1}</p>
        <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
    `

    const phone = document.createElement('section')
    phone.classList.add('phone')
    phone.innerHTML = `
        <h3>Phone:</h3>
        <p>${brewery.phone}</p>
    `

    const link = document.createElement('section')
    link.classList.add('link')
    link.innerHTML = `
        <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    `

    listItem.appendChild(breweryName)
    listItem.appendChild(breweryType)
    listItem.appendChild(address)
    listItem.appendChild(phone)
    listItem.appendChild(link)

    return listItem
}

// Create a filter for the brewery types
function createTypeFilter() {
    const form = document.getElementById('filter-by-type-form')
    form.addEventListener('input', (e) => {
        e.preventDefault()
        const filters = document.getElementById('filter-by-type')
        state.typeFilter = filters.value
        render()
    })
}

// Create a filter for US states
// (this fetches the API with the filter applied)
function createStateFilter() {
    const form = document.getElementById('select-state-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const filters = document.getElementById('select-state')
        state.stateFilter = filters.value
        render()
    })
}

// Create a filter for the search bar
function createNameSearch() {
    const form = document.getElementById('search-breweries-form')
    form.addEventListener('input', (e) => {
        e.preventDefault()
        const searchBar = document.getElementById('search-breweries')
        state.nameFilter = searchBar.value
        render()
    })
}

// Create the city filter
function filterByCity() {
    const form = document.getElementById('filter-by-city-form')

    // Clear the list
    form.innerHTML = ''
    state.cities = []

    const clearAllBtn = document.querySelector('.clear-all-btn')
    clearAllBtn.addEventListener('click', clearAllCities)

    // Check for duplicate cities
    for (brewery of state.breweries) {
        if (!state.cities.includes(brewery.city)) {
            state.cities.push(brewery.city)
        }
    }

    // Sort cities alphabetically
    state.cities = state.cities.sort()

    // Generate the city list
    for (let i = 0; i < state.cities.length; ++i) {
        const city = state.cities[i]

        const cityCheckbox = document.createElement('input')
        cityCheckbox.type = 'checkbox'
        cityCheckbox.id = city
        cityCheckbox.name = 'city'
        cityCheckbox.value = city
        form.appendChild(cityCheckbox)

        const cityName = document.createElement('label')
        cityName.htmlFor = city
        cityName.innerText = `${city[0].toUpperCase() + city.slice(1)}\n`
        form.appendChild(cityName)

        cityCheckbox.addEventListener('click', updateSelectedCities)
    }
}

function updateSelectedCities() {
    // Clear the filter as we loop through
    // all the checkbox every time anyways
    state.cityFilter = []

    // Loop through the checkboxes to check if they are ticked
    document
        .querySelectorAll('#filter-by-city-form input[type="checkbox"]')
        .forEach((checkbox) => {
            if (checkbox.checked) {
                const newFilteredBreweries = state.breweries.filter(
                    (brewery) => brewery.city === checkbox.value
                )
                state.cityFilter = state.cityFilter.concat(newFilteredBreweries)
            }
        })

    // If there is no filter, return the default list
    if (state.cityFilter.length === 0) {
        return render()
    }

    // Render only the selected cities
    renderFromState(state.cityFilter)
}

function clearAllCities() {
    // Clear the actual filter
    state.cityFilter = []

    // Untick all the checkboxes
    document
        .querySelectorAll('#filter-by-city-form input[type="checkbox"]')
        .forEach((checkbox) => {
            if (checkbox.checked) {
                checkbox.checked = false
            }
        })

    // Render the default list
    render()
}

window.onload = () => {
    createNameSearch()
    createTypeFilter()
    createStateFilter()
    render()
}
