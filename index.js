const state = {
    selectedState: '',
    page: 1,
    breweries: [],
    cities: [],
    filters: {
        type: '',
        cities: [],
        search: ''
    },
    userData: []
}




// Selectors 
const searchByStateForm = document.querySelector('#select-state-form')
const dropDown = document.querySelector('#filter-by-type')
const searchNameForm = document.querySelector('#search-breweries-form')
const breweryUL = document.querySelector('#breweries-list')
const filterByCity = document.querySelector('#filter-by-city-form')
const cityFilterClear = document.querySelector('.clear-all-btn')
const loadMoreBtn = document.querySelector('#load-more')




// EVENT LISTENERS 

// Search by state Event
searchByStateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#select-state').value.replace(' ', '_')
    state.selectedState = input
    fetchDataForState()
    document.querySelector('#search-breweries').value = ''
    handleFilters()
    loadMoreBtn.style.display = 'flex'
})


// Filter by type Event
dropDown.addEventListener('change', () => {
    filterByType()
    fetchDataForStateAndType()
    handleFilters()
})


// Search by name form Event
searchNameForm.addEventListener('input', (e) => {
    state.filters.search = document.querySelector('#search-breweries').value.toLowerCase()
    handleFilters()
})


// Cities filter gets updated
filterByCity.addEventListener('change', () => {
    handleFilters()
})


// Clear all button click eventlistener
cityFilterClear.addEventListener('click', () => {
    filterByCity.reset()
    handleFilters()
})


// Load more data from the API
loadMoreBtn.addEventListener('click', () => {
    ++state.page
    fetchMorePages()
})




// HTTP REQUESTS

// Fetches data from the API
const fetchDataForState = () => {
    state.page = 1
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.selectedState}&per_page=20`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            state.breweries = breweries           
            displayBreweries()
            displayCities()
        })
}


const fetchDataForStateAndType = () => {
    state.page = 1
    if (state.filters.type !== '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.selectedState}&by_type=${state.filters.type}&per_page=20`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            state.breweries = breweries 
            displayBreweries()
            displayCities()
        })
    } else {
        fetchDataForState()
    }
}


const fetchMorePages = () => {
    if (state.filters.type !== '') {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.selectedState}&by_type=${state.filters.type}&per_page=20&page=${state.page}`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            breweries.forEach((brewery) => {
                state.breweries.push(brewery)
            })
            console.log(state.breweries)
            displayBreweries()
            displayCities()
        })
    } else {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.selectedState}&per_page=20&page=${state.page}`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            breweries.forEach((brewery) => {
                state.breweries.push(brewery)
            })
            displayBreweries()
            displayCities()
        })
    }
}


const fetchRandomData = () => {
    fetch(`https://api.openbrewerydb.org/breweries/random?size=20`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            breweries.forEach((brewery) => {
                state.breweries.push(brewery)
            })
            fetchUserData()
            displayBreweries()
            displayCities()
        })
}


const fetchUserData = () => {
    fetch(`http://localhost:3000/wantToVisit`)
        .then((res) => res.json())
        .then((data) => {
            state.userData = data
        })
}

// LOGIC 

// Filter by type 
const filterByType = () => {
    state.filters.type = dropDown.value
    if (dropDown.value === "") state.filters.type = ''
}


// Display List of Breweries
const displayBreweries = () => {
    breweryUL.innerHTML = ''
    const filteredBreweries = filterBreweriesByType()
    const listH1 = document.querySelector('#list-head')
    listH1.innerText = `List of Breweries in ${capatalize(state.selectedState)}`
    if (state.selectedState === '') listH1.innerText = `List of Random Breweries`
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

        const displayInfo = document.createElement('button')
        displayInfo.addEventListener('click', (e) => {
            addToUserList(brewery, e)
        })
        displayInfo.innerText = "want to visit"
        state.userData.forEach((item) => {
            if (item.brewery.id === brewery.id) {
                displayInfo.className = "tracked"
                displayInfo.innerText = "planing to visit"
            }
        })
        li.append(displayInfo)

        breweryUL.append(li)
    })
}


// Filters the breweries by type - Called by displayBreweries()
const filterBreweriesByType = () => {
    let filterdList = []
    if (state.filters.type === '') {
        const defaultFilters = ['micro', 'regional', 'brewpub']
        filterdList = state.breweries.filter((brewery) => defaultFilters.includes(brewery.brewery_type))
    } else {
        filterdList = state.breweries.filter((brewery) => brewery.brewery_type === state.filters.type)
    }
    console.log(filterdList)
    return filterdList
}


const includesSearchedName = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((brewery) => {
        if (!brewery.querySelector('h2').innerText.toLowerCase().includes(state.filters.search)) {
            brewery.style.display = "none"
        } 
    })
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
    const  filter = document.querySelector('#filter-by-city-form').querySelectorAll('input')
    state.filters.cities = []
    filter.forEach((city) => {
        if (city.checked) state.filters.cities.push(city.value)
    })
    if (state.filters.cities.length > 0) {
        const listOfCurrentBreweries = document.querySelectorAll('li')
        listOfCurrentBreweries.forEach((brewery) => {
            const city = brewery.querySelector('strong').innerText.toLowerCase().split(',')[0]
            if (!state.filters.cities.includes(city)) brewery.style.display = 'none'
        })
    }
}


const handleFilters = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((element) => {
        element.style.display = 'grid'
    })
    filterOutCities()
    includesSearchedName()
} 

const capatalize = (input) => {
    let output = []
    input.split('_').forEach((word) => {
        output.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    })
    return output.join(' ')
}

const addToUserList = (brewery, e) => {
    let foundDeleteTarget = false
    state.userData.forEach((element) => {
        if (element.brewery.id === brewery.id) {
            removeBreweryFromUserData(element)
            e.target.className = ""
            e.target.innerText = "want to visit"
            return foundDeleteTarget = true
        }
    })
    if (!foundDeleteTarget) {
        const fetchBody = {brewery: brewery}
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        }
        console.log(fetchOptions)
        fetch(`http://localhost:3000/wantToVisit`, fetchOptions)
            .then(() => fetchUserData())
            e.target.className = "tracked"
            e.target.innerText = "planing to visit"
    }
}

const removeBreweryFromUserData = (element) => {
    const target = element.id
    const fetchOptions = {
        method: "DELETE"
    }
    console.log(`http://localhost:3000/wantToVisit/${target}`)
    fetch(`http://localhost:3000/wantToVisit/${target}`, fetchOptions)
        .then(() => {
            fetchUserData()
        })
}

fetchRandomData()