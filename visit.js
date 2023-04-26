const state = {
    selectedState: '',
    breweries: [],
    states: [],
    types: [],
    cities: [],
    filters: {
        state: '',
        type: '',
        cities: [],
        search: ''
    }
}


const breweryUL = document.querySelector('#breweries-list')
const stateSelect = document.querySelector('#filter-by-state')
const typeSelect = document.querySelector('#filter-by-type')
const citiesForm = document.querySelector('#filter-by-city-form')
const searchNameForm = document.querySelector('#search-breweries')


stateSelect.addEventListener('change', () => {
    state.filters.state = stateSelect.value
    handleFilters()
})

typeSelect.addEventListener('change', () => {
    state.filters.type = typeSelect.value
    handleFilters()
})

citiesForm.addEventListener('change', () => {
    const citiesList = citiesForm.querySelectorAll('input')
    state.filters.cities = []
    citiesList.forEach((city) => {
        if (city.checked) state.filters.cities.push(city.value)
    })
    handleFilters()
})

searchNameForm.addEventListener('input', () => {
    state.filters.search = searchNameForm.value.toLowerCase()
    handleFilters()
})

const fetchUserData = () => {
    fetch(`http://localhost:3000/wanttovisit`)
        .then((res) => res.json())
        .then((data) => {
            state.breweries = data
            init()
        })
}


const init = () => {
    populateStateOptions()
    populateTypeOptions()
    populateCities()
    displayBreweries()
}


const populateStateOptions = () => {
    stateSelect.innerHTML = ''
    state.states = []

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.innerText = 'Select a state...'
    stateSelect.append(defaultOption)

    state.breweries.forEach((brewery) => {
        if (!state.states.includes(brewery.brewery.state)) {
            state.states.push(brewery.brewery.state)

            const option = document.createElement('option')
            option.value = brewery.brewery.state
            option.innerText = brewery.brewery.state
            stateSelect.append(option)
        }
    })
}

const populateTypeOptions = () => {
    typeSelect.innerHTML = ''
    state.types = []

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.innerText = 'Select a type...'
    typeSelect.append(defaultOption)

    state.breweries.forEach((brewery) => {
        if (!state.types.includes(brewery.brewery.brewery_type)) {
            state.types.push(brewery.brewery.brewery_type)

            const option = document.createElement('option')
            option.value = brewery.brewery.brewery_type
            option.innerText = brewery.brewery.brewery_type
            typeSelect.append(option)
        }
    })
}


const populateCities = () => {
    citiesForm.innerHTML = ''
    state.cities = []

    state.breweries.forEach((breweryEntry) => {
        if (!state.cities.includes(breweryEntry.brewery.city)) {
            state.cities.push(breweryEntry.brewery.city)

            const input = document.createElement('input')
            input.type = 'checkbox'
            input.name = breweryEntry.brewery.city
            input.value = breweryEntry.brewery.city

            const label = document.createElement('label')
            label.innerText = breweryEntry.brewery.city
            label.for = breweryEntry.brewery.city

            citiesForm.append(input, label)
        }
    })
}


const displayBreweries = () => {
    breweryUL.innerHTML = ''

    state.breweries.forEach((breweryEntry) => {
        const brewery = breweryEntry.brewery

        const li = document.createElement('li')
        li.className = brewery.state

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

        const removeBtn = document.createElement('button')
        removeBtn.innerText = "Remove"
        removeBtn.addEventListener('click', () => {
            removeItem(breweryEntry)
        })
        li.append(removeBtn)

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


const handleFilters = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((element) => {
        element.style.display = 'grid'
    })
    if (state.filters.state !== '') filterByState()
    if (state.filters.type !== '') filterByType()
    if (state.filters.cities.length > 0) filterByCity()
    if (state.filters.search.length > 0) filterByName()
}


const filterByState = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((brewery) => {
       if (brewery.className !== state.filters.state) {
        brewery.style.display = 'none'
       }
    })
}


const filterByType = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((brewery) => {
        if (brewery.querySelector('div.type').innerText.toLowerCase() !== state.filters.type) {
            brewery.style.display = 'none'
        }
    })
}


const filterByCity = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((brewery) => {
        const city = brewery.querySelector('strong').innerText.split(",")[0]
        if (!state.filters.cities.includes(city)) {
            brewery.style.display = 'none'
        }
    })
}


const filterByName = () => {
    const listOfCurrentBreweries = document.querySelectorAll('li')
    listOfCurrentBreweries.forEach((brewery) => {
        const name = brewery.querySelector('h2').innerText.toLowerCase()
        if (!name.includes(state.filters.search)) {
            brewery.style.display = 'none'
        }
    })
}


const removeItem = (item) => {
    const fetchOptions = {
        method: "DELETE"
    }
    fetch(`http://localhost:3000/wanttovisit/${item.id}`, fetchOptions)
        .then(() => fetchUserData())
}

fetchUserData()
