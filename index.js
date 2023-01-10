const state = {
    selectedState: '',
    breweries: [],
    cities: [],
    selectedFilters: []
}

// Selectors 
const searchByStateForm = document.querySelector('#select-state-form')
const dropDown = document.querySelector('#filter-by-type')
const searchNameForm = document.querySelector('#search-breweries-form')
const breweryUL = document.querySelector('#breweries-list')
const filterByCity = document.querySelector('#filter-by-city-form')
const cityFilterClear = document.querySelector('.clear-all-btn')


// EVENT LISTENERS 

// Search by state Event
searchByStateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#select-state').value.replace(' ', '_')
    state.selectedState = input
    fetchDataForState()
})


// Filter by type Event
dropDown.addEventListener('change', () => {
    filterByType()
    displayBreweries()
    displayCities()
})


// Search by name form Event
searchNameForm.addEventListener('input', (e) => {
    const nameSearch = document.querySelector('#search-breweries').value.toLowerCase()
    includesSearchedName(nameSearch)
})


// Cities filter gets updated
filterByCity.addEventListener('change', () => {
    filterOutCities()
})


// Clear all button click eventlistener
cityFilterClear.addEventListener('click', () => {
    filterByCity.reset()
    filterOutCities()
})

// HTTP REQUESTS

// Fetches data from the API
const fetchDataForState = () => {
    
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.selectedState}&per_page=50`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            state.breweries = breweries
            // console.log('filtered by state', state.breweries)
            displayBreweries()
            displayCities()
        })
}


// LOGIC 

// Filter by type 
const filterByType = () => {
    state.selectedFilters = []
    state.selectedFilters.push(dropDown.value)
    if (dropDown.value === "") state.selectedFilters = []
}


// Display List of Breweries
const displayBreweries = () => {
    breweryUL.innerHTML = ''
    const filteredBreweries = filterBreweriesByType()
    filteredBreweries.forEach((brewery) => {
        const li = document.createElement('li')

        const h2 = document.createElement('h2')
        h2.innerText = brewery.name
        li.append(h2)

        const div = document.createElement('div')
        div.className = 'type'
        div.innerText = brewery.brewery_type
        li.append(div)

        const sectionAddress = document.createElement('section')
        sectionAddress.className = 'address'
            const h3Address = document.createElement('h3')
            h3Address.innerText = 'Address:'
            sectionAddress.append(h3Address)

            const pAddressStreet = document.createElement('p')
            pAddressStreet.innerText = brewery.street
            sectionAddress.append(pAddressStreet)

            const pAddressCity = document.createElement('p')
            const pAddressCityStrong = document.createElement('strong')
            pAddressCityStrong.innerText = `${brewery.city}, ${brewery.postal_code.split("-")[0]}`
            pAddressCity.append(pAddressCityStrong)
            sectionAddress.append(pAddressCity)
        li.append(sectionAddress)

        const sectionPhone = document.createElement('section')
        sectionPhone.className = 'phone'
            const h3Phone = document.createElement('h3')
            h3Phone.innerText = 'Phone:'
            sectionPhone.append(h3Phone)

            const pPhone = document.createElement('p')
            if (brewery.phone !== null) {
                pPhone.innerText = brewery.phone
            } else {
                pPhone.innerText = 'Not provided'
            }
            sectionPhone.append(pPhone)
        li.append(sectionPhone)

        const sectionWebsite = document.createElement('section')
        sectionWebsite.className = 'link'
            const a = document.createElement('a')
            a.href = brewery.website_url
            a.target = '_blank'
            a.innerText = 'visit Website'
            sectionWebsite.append(a)
        li.append(sectionWebsite)

        breweryUL.append(li)
    })
}


// Filters the breweries by type - Called by displayBreweries()
const filterBreweriesByType = () => {
    let filterdList = []
    if (state.selectedFilters.length === 0) {
        const defaultFilters = ['micro', 'regional', 'brewpub']
        filterdList = state.breweries.filter((brewery) => defaultFilters.includes(brewery.brewery_type))
        // console.log('filtered by type', filterdList)
    } else {
        filterdList = state.breweries.filter((brewery) => state.selectedFilters.includes(brewery.brewery_type))
    }
    return filterdList
}

const includesSearchedName = (search) => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    if (search=== '') {
        listOfCurrentBreweries.forEach((brewery) => {
            brewery.style.display = "grid"
        })
    } else {
        listOfCurrentBreweries.forEach((brewery) => {
            if (!brewery.querySelector('h2').innerText.toLowerCase().includes(search)) {
                brewery.style.display = "none"
            } else {
                brewery.style.display = "grid"
            }
        })
    }
}


const displayCities = () => {
    filterByCity.innerHTML = ''
    state.cities = []
    getCities()
    state.cities.forEach((city) => {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = city
        checkbox.value = city
        const label = document.createElement('label')
        label.htmlFor = city
        label.innerText = city
        filterByCity.append(checkbox, label)
    })
}

const getCities = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((brewery) => {
        const city = brewery.querySelector('strong').innerText.toLowerCase().split(',')[0]
        if (!state.cities.includes(city)) state.cities.push(city)
    })
}

const filterOutCities = () => {
    state.cities = []
    const  filterCities = document.querySelector('#filter-by-city-form').querySelectorAll('input')
    filterCities.forEach((city) => {
        if (city.checked) state.cities.push(city.value)
    })
    if (state.cities.length > 0) {
        const listOfCurrentBreweries = document.querySelectorAll('li')
        listOfCurrentBreweries.forEach((brewery) => {
            const city = brewery.querySelector('strong').innerText.toLowerCase().split(',')[0]
            !state.cities.includes(city) ? brewery.style.display = 'none' : brewery.style.display = 'grid'
        })
    } else {
        const listOfCurrentBreweries = document.querySelectorAll('li')
        listOfCurrentBreweries.forEach((brewery) => {
            const city = brewery.querySelector('strong').innerText.toLowerCase().split(',')[0]
            brewery.style.display = 'grid'
        })
    }
}