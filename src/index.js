const API_URL = 'https://api.openbrewerydb.org/v1/breweries/?per_page=200'

const state = {
    breweries: [],
    typeFilter: '',
    stateFilter: '',
    cities: [],
    cityFilter: [],
}

async function getBreweries() {
    try {
        if (!state.stateFilter) {
            const response = await fetch(API_URL)
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            const response = await fetch(
                `${API_URL}&by_state=${state.stateFilter}`
            )
            const jsonResponse = await response.json()
            return jsonResponse
        }
    } catch (err) {
        throw new Error('ERROR: Could not load breweries: ', err)
    }
}

async function render() {
    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = ''

    state.breweries = await getBreweries()

    if (!state.typeFilter) {
        const defaultFilters = ['micro', 'regional', 'brewpub']

        state.breweries = state.breweries.filter((brewery) =>
            defaultFilters.includes(brewery.brewery_type)
        )
    } else {
        state.breweries = state.breweries.filter(
            (brewery) => brewery.brewery_type === state.typeFilter
        )
    }

    if (state.breweries.length === 0) {
        breweriesList.innerText = 'No matching results found.'
    } else {
        state.breweries.forEach((brewery) =>
            breweriesList.appendChild(generateCard(brewery))
        )
        filterByCity()
    }
}

function renderLocal(list) {
    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = ''
    list.forEach((brewery) => breweriesList.appendChild(generateCard(brewery)))
}

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

function createTypeFilter() {
    const form = document.getElementById('filter-by-type-form')
    form.addEventListener('input', (e) => {
        e.preventDefault()
        const filters = document.getElementById('filter-by-type')
        state.typeFilter = filters.value
        render()
    })
}

function createStateFilter() {
    const form = document.getElementById('select-state-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const filters = document.getElementById('select-state')
        state.stateFilter = filters.value
        render()
    })
}

function filterByCity() {
    const form = document.getElementById('filter-by-city-form')

    for (brewery of state.breweries) {
        if (!state.cities.includes(brewery.city)) {
            state.cities.push(brewery.city)
        }
    }

    state.cities = state.cities.sort()

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
    const checkboxes = document.querySelectorAll(
        '#filter-by-city-form input[type="checkbox"]'
    )

    state.cityFilter = []

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const newFilteredBreweries = state.breweries.filter(
                (brewery) => brewery.city === checkbox.value
            )
            state.cityFilter = state.cityFilter.concat(newFilteredBreweries)
        } else if (state.cityFilter.includes(checkbox.value)) {
        }
    })

    renderLocal(state.cityFilter)
}

window.onload = () => {
    createTypeFilter()
    createStateFilter()
    render()
}
