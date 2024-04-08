const selectStateForm = document.querySelector('#select-state-form')
const selectStateInput = document.querySelector('#select-state')
const breweryUl = document.querySelector('#breweries-list')
const selectBreweryType = document.querySelector('#filter-by-type')
const filterTypeForm = document.querySelector('#filter-by-type-form')

async function getAllBreweries(filter) {
    if (filter === undefined) {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${selectStateInput.value}`)
        const data = await response.json()

        renderBreweryCards(data)
    } else {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${selectStateInput.value}&by_type=${filter}`)
        const data = await response.json()

        renderBreweryCards(data)
    }
    
}

selectStateForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await getAllBreweries()
})

function renderBreweryCards(data) {
    breweryUl.innerHTML = ''

    data.forEach((brewery) => {
        const li = document.createElement('li')
        const breweryName = document.createElement('h2')
        const div = document.createElement('div')
        const addressSection = document.createElement('section')
        const addressH3 = document.createElement('h3')
        const adressP = document.createElement('p')
        const cityP = document.createElement('p')
        const strong = document.createElement('strong')
        const phoneSection = document.createElement('section')
        const phoneH3 = document.createElement('h3')
        const phoneP = document.createElement('p')
        const websiteSection = document.createElement('section')
        const websiteLink = document.createElement('a')

        breweryName.innerText = brewery.name
        div.classList.add('type')
        div.innerText = brewery.brewery_type
        addressSection.classList.add('address')
        addressH3.innerText = 'Address:'
        adressP.innerText = brewery.address_1
        strong.innerText = brewery.city + ', ' + brewery.postal_code
        phoneSection.classList.add('phone')
        phoneH3.innerText = 'Phone:'
        phoneP.innerText = brewery.phone
        websiteSection.classList.add('link')
        websiteLink.setAttribute('href', brewery.website_url)
        websiteLink.setAttribute('target', '_blank')
        websiteLink.innerText = 'Visit Website'

        li.append(breweryName)
        li.append(div)
        li.append(addressSection)
        li.append(phoneSection)
        li.append(websiteSection)

        addressSection.append(addressH3)
        addressSection.append(adressP)
        addressSection.append(cityP)
        cityP.append(strong)

        phoneSection.append(phoneH3)
        phoneSection.append(phoneP)

        websiteSection.append(websiteLink)

        breweryUl.append(li)
    });
}

filterTypeForm.addEventListener('change', () => {
    getAllBreweries(selectBreweryType.value)
})
