const url = 'https://api.openbrewerydb.org/v1/breweries'
const breweriesList = document.getElementById('breweries-list')
const breweriesFilter = document.getElementById('filter-by-type')

function createBreweryEl(name, type, street, address_1, phoneNumber, website_url) {
    const breweryEl = document.createElement('li')
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

    const breweryAddress_1 = document.createElement('p')
    breweryAddressSection.append(breweryAddress_1)

    const breweryAddress_1Strong = document.createElement('strong')
    breweryAddress_1Strong.innerText = address_1
    breweryAddress_1.append(breweryAddress_1Strong)

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
}

async function getAllBreweries() {
    const res = await fetch(url)
    const json = await res.json()

    json.forEach(brewery => createBreweryEl(brewery.name, brewery.brewery_type, brewery.street, brewery.address_1, brewery.phone, brewery.website_url))
}

getAllBreweries()