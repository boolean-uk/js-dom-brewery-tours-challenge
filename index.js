const root = "https://api.openbrewerydb.org/v1/breweries?by_state"
const form = document.querySelector('#select-state-form')
const dropDown = document.querySelector('#filter-by-type')
const cardContainer = document.querySelector('#breweries-list')

const state = {
    selectedFilters: [],
    breweries: []
}

const render = () => {
    formState()
    renderCardBrewery()
    

}

const formState = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        removeCurrentList()
        const stateToSearch = e.target[0].value
        getBreweriesInfo(stateToSearch)
        
    })
}   

dropDown.addEventListener('change', () => {
    state.selectedFilters = []
    state.selectedFilters.push(dropDown.value)
    console.log(state.selectedFilters)
    getBreweriesInfo()
})

const removeCurrentList = () => {    
    state.breweries = []
}


const getBreweriesInfo = (stateToSearch) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`${root}=${stateToSearch}` , options)
    .then(response => response.json())
    .then(data => {state.breweries = data
        console.log(state.breweries)
        renderCardBrewery()
    })
}

const filterBreweriesByType = () => {
    let filteredListArr = []
    if (state.selectedFilters.length === 0) {
        const defaultFilters = ['micro', 'regional', 'brewpub']
        filteredListArr = state.breweries.filter((brewery) => defaultFilters.includes(brewery.brewery_type))
    } else {
        filteredListArr = state.breweries.filter((brewery) => state.selectedFilters.includes(brewery.brewery_type))
    }
    return filteredListArr
}


const renderCardBrewery = () => {
    cardContainer.innerHTML = '';
    const filteredList = filterBreweriesByType()

    filteredList.forEach(brewery => {
        const card = document.createElement('li')
        const h2 = document.createElement('h2')
        h2.innerText = brewery.name
        card.append(h2)

        const div = document.createElement('div')
        div.className = 'type'
        div.innerText = brewery.brewery_type
        card.append(div)

        const sectionAddress = document.createElement('section')
        sectionAddress.className = 'address'
        
        const h3Address = document.createElement('h3')
        h3Address.innerText = 'Address:'
        sectionAddress.append(h3Address)

        const addressStreet = document.createElement('p')
        addressStreet.innerText = brewery.street

        const pAddressCity = document.createElement('p')
        const pAddressCityStrong = document.createElement('strong')
        pAddressCityStrong.innerText = `${brewery.city}, ${brewery.postal_code.split("-")[0]}`
        pAddressCity.append(pAddressCityStrong)
        sectionAddress.append(pAddressCity)
        card.append(sectionAddress)

        const sectionPhone = document.createElement('section')
        sectionPhone.className = 'phone'

        const h3Phone = document.createElement('h3')
        h3Phone.innerText = 'Phone:'
        sectionPhone.append(h3Phone)

        const pPhone = document.createElement('p')
        pPhone.innerText = brewery.phone
        sectionPhone.append(pPhone)
        card.append(sectionPhone)

        const sectionWebsite = document.createElement('section')
        sectionWebsite.className = 'link'
        const a = document.createElement('a')
        a.href = brewery.website_url
        a.target = '_blank'
        a.innerText = 'visit Website'
        sectionWebsite.append(a)
        
        card.append(sectionWebsite)
        
        cardContainer.append(card)

    })
};



render()