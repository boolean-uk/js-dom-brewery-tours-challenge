const url = 'https://api.openbrewerydb.org/v1/breweries'
const breweriesList = document.getElementById('breweries-list')
const breweriesFilterByType = document.getElementById('filter-by-type')
const breweriesFilterByState = document.getElementById('select-state-form')
const breweriesFilterInput = document.getElementById('select-state')
const mainList = document.getElementById('main-list')
const filterSection = document.querySelector('.filters-section')

function createBreweryEl(name, type, street, address, phoneNumber, website_url, state, city) {
    const breweryEl = document.createElement('li')
    breweryEl.setAttribute('value', state)
    breweryEl.setAttribute('type', type)
    breweryEl.setAttribute('name', name)
    breweryEl.setAttribute('city', city)
    breweriesList.append(breweryEl)

    const breweryName = document.createElement('h2')
    breweryName.innerText = name
    breweryEl.append(breweryName)

    const breweryType = document.createElement('div')
    breweryType.innerText = type
    breweryType.classList.add('type')
    breweryEl.append(breweryType)

    const breweryAddressSection = document.createElement('section')
    breweryAddressSection.classList.add('address')
    breweryEl.append(breweryAddressSection)

    const breweryAddress = document.createElement('h3')
    breweryAddress.innerText = 'Address:'
    breweryAddressSection.append(breweryAddress)

    const breweryAddressStreet = document.createElement('p')
    breweryAddressStreet.innerText = street
    breweryAddressSection.append(breweryAddressStreet)

    const breweryAddressCity = document.createElement('p')
    breweryAddressSection.append(breweryAddressCity)

    const breweryStrongAddressCity = document.createElement('strong')
    breweryStrongAddressCity.innerText = address
    breweryAddressCity.append(breweryStrongAddressCity)

    const breweryPhoneSection = document.createElement('section')
    breweryPhoneSection.classList.add('phone')
    breweryEl.append(breweryPhoneSection)

    const breweryPhone = document.createElement('h3')
    breweryPhone.innerText = 'Phone:'
    breweryPhoneSection.append(breweryPhone)

    const breweryPhoneNumber = document.createElement('p')
    breweryPhoneNumber.innerText = phoneNumber
    breweryPhoneSection.append(breweryPhoneNumber)

    const breweryLinkSection = document.createElement('section')
    breweryLinkSection.classList.add('link')
    breweryEl.append(breweryLinkSection)

    const breweryLink = document.createElement('a')
    breweryLink.setAttribute('href', website_url)
    breweryLink.setAttribute('target', '_blank')
    breweryLink.innerText = 'Visit Website'
    breweryLinkSection.append(breweryLink)

    checkBreweryType(type, breweryEl)

    breweriesFilterByState.addEventListener('submit', (e) => {
        e.preventDefault()
        
        if (
            breweryEl.getAttribute('value').toLowerCase() === breweriesFilterInput.value.toLowerCase() ||
            breweriesFilterInput.value === ''
        ) {
            breweryEl.style.display = ''
        } else {
            breweryEl.style.display = 'none'
        }
    })
}

function createSearchBreweriesByName() {
    const searchBar = document.createElement('div')
    searchBar.classList.add('search-bar')
    searchBar.setAttribute('id', 'search-breweries-form')
    searchBar.style.margin = '0 1rem 0 1rem'
    mainList.append(searchBar)

    const searchBarLabel = document.createElement('label')
    searchBarLabel.innerText = 'Search breweries:'
    searchBarLabel.style.fontWeight = 'bold'
    searchBarLabel.setAttribute('name', 'search-bar-label')
    searchBar.append(searchBarLabel)

    const searchBarInput = document.createElement('input')
    searchBarInput.setAttribute('name', 'search-bar-input')
    searchBar.append(searchBarInput)

    searchBarInput.addEventListener('input', () => {
        for (let i = 0; i < breweriesList.children.length; i++) {
            if (breweriesList.children[i].getAttribute('name').toLowerCase().includes(searchBarInput.value.toLowerCase()) || searchBarInput.value.toLowerCase() === '') {
                breweriesList.children[i].style.display = ''
            } else {
                breweriesList.children[i].style.display = 'none'
            }
        }
    })
}

function checkBreweryType(brewery_type, brewery_el) {
    if (
        brewery_type !== 'micro' &&
        brewery_type !== 'regional' &&
        brewery_type !== 'brewpub'
    ) brewery_el.remove()
}

async function getAllBreweries() {
    const res = await fetch(url)
    const json = await res.json()

    json.forEach(brewery => createBreweryEl(brewery.name, brewery.brewery_type, brewery.street, `${brewery.city}, ${brewery.postal_code}`, brewery.phone, brewery.website_url, brewery.state, brewery.city))
}

function onChange() {
    for (let i = 0; i < breweriesList.children.length; i++) {
        if (
            breweriesFilterByType.value ===  breweriesList.children[i].getAttribute('type') ||
            breweriesFilterByType.value === ''
        ) {
            breweriesList.children[i].style.display = ''
        } else {
            breweriesList.children[i].style.display = 'none'
        }
    }
}

breweriesFilterByType.addEventListener('change', onChange)

createSearchBreweriesByName()

getAllBreweries()