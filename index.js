const state = {
    breweries: []
}

const rootByState = 'https://api.openbrewerydb.org/breweries?by_state='
const rootByType = 'https://api.openbrewerydb.org/v1/breweries?by_type='
const rootByName = 'https://api.openbrewerydb.org/v1/breweries?by_name='
const rootByCity = 'https://api.openbrewerydb.org/v1/breweries?by_city='

const breweriesUl = document.querySelector('#breweries-list')
const headerForm = document.querySelector("#select-state-form")

const select = document.querySelector('#filter-by-type')

const searchInput = document.querySelector('#search-breweries')

const cityForm = document.querySelector('#filter-by-city-form')

headerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const headerFormValue = e.target[0].value
    getAndRender(headerFormValue)

})

select.addEventListener('change', (e) => {
    e.preventDefault()

    const typeValue = e.target.value  
    fetchByType(typeValue)
})

searchInput.addEventListener('input', (e) => {
    e.preventDefault()

    const searchValue = e.target.value
    fetchByName(searchValue)
})

const getAndRender = (states) => {
    fetch(`${rootByState}${states}`)
    .then((res) => res.json())
    .then((data) => {
        const findType = data.filter((data) => data.brewery_type === 'micro' || data.brewery_type === 'regional' || data.brewery_type === 'brewpub')
        state.breweries = findType
        clearCurrentList()
        renderBreweyLists()
    })
}


const fetchByType = (type) => {
    fetch(`${rootByType}${type}`)
    .then((res) => res.json())
    .then((data) => {
        state.breweries = data
        clearCurrentList()
        renderBreweyLists()
    })
}

const fetchByName = (name) => {
    fetch(`${rootByName}${name}`)
    .then((res) => res.json())
    .then((data) => {
        state.breweries = data
        clearCurrentList()
        renderBreweyLists()
    })
}

const renderBreweyLists = () => {
    
    state.breweries.forEach(brewery => {
        const li = document.createElement('li')

        const h2 = document.createElement('h2')
        h2.innerText = brewery.name

        const div = document.createElement('div')
        div.className = 'type'
        div.innerText = brewery.brewery_type

        // -------------- Address section   ---------------------
        const sectionAddress = document.createElement('section')
        sectionAddress.className = 'address'

        const h3Address = document.createElement('h3')
        h3Address.innerText = 'Address:'

        const streetP = document.createElement('p')
        streetP.innerText = brewery.street

        const p = document.createElement('p')
        const strong = document.createElement('strong')
        strong.innerText = `${brewery.city} ${brewery.postal_code}`
        p.append(strong)
        
        sectionAddress.append(h3Address, streetP, p)

        // --------------- Phone Section ----------------------------
        const sectionPhone = document.createElement('section')
        sectionPhone.className = 'phone'

        const h3Pohone = document.createElement('h3')
        h3Pohone.innerText = 'Phone:'

        const pPhone = document.createElement('p')
        pPhone.innerText = brewery.phone

        sectionPhone.append(h3Pohone, pPhone)

        // ---------------- Visit Web Section -----------------------
        const sectionVisitWeb = document.createElement('section')
        sectionVisitWeb.className = 'link'

        const link = document.createElement('a')
        link.href = brewery.website_url
        link.target = '_target'
        link.innerText = 'Visit Website'

        sectionVisitWeb.append(link)

        li.append(h2, div, sectionAddress, sectionPhone, sectionVisitWeb)
        breweriesUl.append(li)

    })
}



const clearCurrentList = () => {
    const lists = breweriesUl.querySelectorAll('*')
    lists.forEach((list) => list.remove())
}

// const removeDupCities = () => {
//     const uniqCity = []

//     state.breweries.forEach()
// }




getAndRender()