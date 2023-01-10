const state = {
    selectedState: '',
    breweries: [],
    selectedFilters: []
}

// Selectors 
const form = document.querySelector('#select-state-form')
const dropDown = document.querySelector('#filter-by-type')
const breweryUL = document.querySelector('#breweries-list')


// EVENT LISTENERS 

// Search Event
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#select-state').value.replace(' ', '_')
    state.selectedState = input
    fetchDataForState()
})

// Filter event
dropDown.addEventListener('change', () => {
    state.selectedFilters = []
    state.selectedFilters.push(dropDown.value)
    console.log(state.selectedFilters)
    fetchDataForState()
})

// Fetches data from the API
const fetchDataForState = () => {
    
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.selectedState}&per_page=50`)
        .then((res) => {return res.json()})
        .then((breweries) => {
            state.breweries = breweries
            // console.log('filtered by state', state.breweries)
            displayBreweries()
        })
}


// LOGIC 

// Display List of Breweries
const displayBreweries = () => {
    breweryUL.innerHTML = ''
    const filteredBreweries = filterBreweriesByType()
    console.log('Filterd by selected filters', filteredBreweries)
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
            pPhone.innerText = brewery.phone
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