const state = {
    breweries: []
}

const root = 'https://api.openbrewerydb.org/v1/breweries?'

const form = document.querySelector('#select-state-form')
const searchInput = document.querySelector('#select-state')
const breweryList = document.querySelector('#breweries-list')
const filter = document.querySelector('#filter-by-type')

form.addEventListener('submit', searchFunc => {
    event.preventDefault()
    const stateSearch = searchInput.value
    retrieveData(stateSearch)
    form.reset()
})

function retrieveData(byState) {
    const url = `${root}by_state=${byState}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            state.breweries = data.filter((brewery) => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type))
            renderCard(state.breweries)
        })
        .catch((error) => {
            console.error('An error occurred')
            alert('An error occurred')
        })
}

function renderCard(breweries) {
    breweryList.innerHTML = ''

    breweries.forEach((brewery) => {
        const cardList = document.createElement('li')
        breweryList.append(cardList)

        const cardTitle = document.createElement('h3')
        cardTitle.innerText = brewery.name
        cardList.append(cardTitle)

        const breweryDiv = document.createElement('div')
        breweryDiv.setAttribute('class', 'type')
        breweryDiv.innerText = brewery.brewery_type
        cardList.append(breweryDiv)

        const addressSec = document.createElement('section')
        addressSec.setAttribute('class', 'address')
        cardList.append(addressSec)

        const addressTitle = document.createElement('h3')
        addressTitle.innerText = 'Address: '
        addressSec.append(addressTitle)

        const addressBody = document.createElement('p')
        addressBody.innerText = brewery.address_1
        addressSec.append(addressBody)

        const addressBodyTwo = document.createElement('p')
        addressBodyTwo.innerText = `${brewery.city}, ${brewery.postal_code}`
        addressSec.append(addressBodyTwo)

        const phoneSection = document.createElement('section')
        phoneSection.setAttribute('class', 'phone')
        cardList.append(phoneSection)

        const phoneTitle = document.createElement('h3')
        phoneTitle.innerText = 'Phone:'
        phoneSection.append(phoneTitle)

        const phoneNumber = document.createElement('p')
        phoneNumber.innerText = brewery.phone
        phoneSection.append(phoneNumber)

        const linkSection = document.createElement('section')
        linkSection.setAttribute('class', 'link')
        cardList.append(linkSection)

        const linkAnchor = document.createElement('a')
        linkAnchor.setAttribute('href', `${brewery.website_url}`)
        linkAnchor.setAttribute('target', '_blank')
        linkAnchor.innerText = 'Visit Website'
        linkSection.append(linkAnchor)
    })
}

filter.addEventListener('change', breweryChangeMenu)
function breweryChangeMenu() {
    const type = filter.value
    if (type === 'brew_type') {
        renderCard(state.breweries)
    } else {
        const filtered = state.breweries.filter((brewery) => brewery.brewery_type === type)
        renderCard(filtered)
    }
}
