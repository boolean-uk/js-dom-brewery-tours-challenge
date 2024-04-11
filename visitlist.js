// HTML imports 
const breweryUl = document.querySelector('#breweries-list')
const pagination = document.querySelector('#pagination')
const page = document.querySelector('.page')
const previousButton = document.querySelector('.previous-button')
const nextButton = document.querySelector('.next-button')

// Global Variables
let totalPages = 0
const itemsPerPage = 10
let currentPage = 1
const jsonUrl = 'http://localhost:3000/breweries/'

// Get breweries visit list from API
async function getVisitListBreweries() {
    const response = await fetch(jsonUrl)
    const data = await response.json()

    totalPages = Math.ceil(data.length / itemsPerPage)

    renderVisitBreweryCards(data)
    renderPagination()
}

// Event listeners
previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--
        renderPagination()
        getVisitListBreweries()
    }
})

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++
        renderPagination()
        getVisitListBreweries()
    }
})

// Render lists
function renderVisitBreweryCards(data) {
    breweryUl.innerHTML = ''

    for (let i = 0; i < data.length; i++) {
        if (i >= (currentPage -1) * itemsPerPage && i < currentPage *itemsPerPage) {
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
            const visitListButton = document.createElement('button')
            const visitListButtonSection = document.createElement('section')

            breweryName.innerText = data[i].name
            div.classList.add('type')
            div.innerText = data[i].brewery_type
            addressSection.classList.add('address')
            addressH3.innerText = 'Address:'
            adressP.innerText = data[i].address_1
            strong.innerText = data[i].city + ', ' + data[i].postal_code
            phoneSection.classList.add('phone')
            phoneH3.innerText = 'Phone:'
            phoneP.innerText = data[i].phone
            websiteSection.classList.add('link')
            websiteLink.setAttribute('href', data[i].website_url)
            websiteLink.setAttribute('target', '_blank')
            websiteLink.innerText = 'Visit Website'
            visitListButton.classList.add('visit-list-button')
            visitListButtonSection.classList.add('visit-list-section')
            visitListButton.innerText = 'Remove from visit list'

            li.append(breweryName)
            li.append(div)
            li.append(addressSection)
            li.append(phoneSection)
            li.append(websiteSection)
            li.append(visitListButtonSection)

            addressSection.append(addressH3)
            addressSection.append(adressP)
            addressSection.append(cityP)
            cityP.append(strong)

            phoneSection.append(phoneH3)
            phoneSection.append(phoneP)

            websiteSection.append(websiteLink)

            visitListButtonSection.append(visitListButton)

            breweryUl.append(li)

            visitListButton.addEventListener('click', () => {
                deleteBreweryFromVisitList(data[i])            
            })
        };
    }
}

function renderPagination() {
    page.innerText = currentPage

    if (currentPage === 1) {
        previousButton.classList.add('hidden')
    } else {
        previousButton.classList.remove('hidden')
    }

    if (currentPage === totalPages || totalPages === 0) {
        nextButton.classList.add('hidden')
    } else {
        nextButton.classList.remove('hidden')
    }
}

// Delete brewery from visit list
async function deleteBreweryFromVisitList(data) {
    const deleteUrl = jsonUrl + `${data.id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    }

    await fetch(deleteUrl,options)

    getVisitListBreweries()
}

// Call functions
getVisitListBreweries()