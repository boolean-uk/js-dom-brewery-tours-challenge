const url = 'https://api.openbrewerydb.org/v1/breweries'
const breweriesList = document.getElementById('breweries-list')
const breweriesFilterByType = document.getElementById('filter-by-type')
const breweriesFilterByState = document.getElementById('select-state-form')
const breweriesFilterInput = document.getElementById('select-state')

function createBreweryEl(name, type, street, city, phoneNumber, website_url, state) {
    const breweryEl = document.createElement('li')
    breweryEl.setAttribute('value', state)
    breweryEl.setAttribute('type', type)
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
    breweryStrongAddressCity.innerText = city
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

    json.forEach(brewery => createBreweryEl(brewery.name, brewery.brewery_type, brewery.street, `${brewery.city}, ${brewery.postal_code}`, brewery.phone, brewery.website_url, brewery.state))
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

getAllBreweries()