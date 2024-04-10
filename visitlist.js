// HTML imports 
const breweryUl = document.querySelector('#breweries-list')
const pagination = document.querySelector('#pagination')

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
        };
    }
}

function renderPagination() {
    pagination.innerHTML = ''
    
    const previousButton = document.createElement('button')
    const nextButton = document.createElement('button')
    const page = document.createElement('p')

    previousButton.innerText = 'Previous'
    previousButton.classList.add('pagination-button')
    previousButton.classList.add('previous-button')
    nextButton.innerText = 'Next'
    nextButton.classList.add('pagination-button')
    nextButton.classList.add('next-button')
    page.innerText = currentPage
    page.classList.add('page')

    if (currentPage === 1) {
        previousButton.classList.add('hidden')
    }

    if (currentPage === totalPages) {
        nextButton.classList.add('hidden')
    }

    pagination.append(previousButton)
    pagination.append(page)
    pagination.append(nextButton)

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
}

// Call functions
getVisitListBreweries()