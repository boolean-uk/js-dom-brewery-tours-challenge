// HTML imports 
const selectStateForm = document.querySelector('#select-state-form')
const selectStateInput = document.querySelector('#select-state')
const breweryUl = document.querySelector('#breweries-list')
const selectBreweryType = document.querySelector('#filter-by-type')
const filterTypeForm = document.querySelector('#filter-by-type-form')
const listOfBreweries = document.querySelector('#list-of-breweries')
const searchBreweriesForm = document.querySelector('#search-breweries-form')
const searchBreweries = document.querySelector('#search-breweries')
const filterByCityForm = document.querySelector('#filter-by-city-form')
const clearAllButton = document.querySelector('.clear-all-btn')
const pagination = document.querySelector('#pagination')
const page = document.querySelector('.page')
const previousButton = document.querySelector('.previous-button')
const nextButton = document.querySelector('.next-button')

// Global Variables
let checkedCities = []
let totalPages = 0
const itemsPerPage = 10
let currentPage = 1
const jsonUrl = `http://localhost:3000/breweries/`

// Get breweries from API
async function getAllBreweries() {
    if (selectBreweryType.value === undefined || selectBreweryType.value === '') {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${selectStateInput.value}&by_name=${searchBreweries.value}`)
        const data = await response.json()
    
        const filteredData = data.filter((brewery) => {
            if (brewery.brewery_type === 'micro'|| brewery.brewery_type === 'brewpub' || brewery.brewery_type === 'regional') return brewery
        })
        const filteredByCity = filteredData.filter((brew) => {
            if (checkedCities.includes(brew.city)) return brew
        })
    
        if (filteredByCity.length === 0) {
            renderBreweryCards(filteredData)
            createUniqueCityList(filteredData)
            totalPages = Math.ceil(filteredData.length / itemsPerPage)
        } else {
            renderBreweryCards(filteredByCity)
            totalPages = Math.ceil(filteredByCity.length / itemsPerPage)
        }
        renderPagination()
    } else {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${selectStateInput.value}&by_type=${selectBreweryType.value}&by_name=${searchBreweries.value}`)
        const data = await response.json()
        const filteredByCity = data.filter((brew) => {
            if (checkedCities.includes(brew.city)) return brew
        })
        if (filteredByCity.length === 0) {
            renderBreweryCards(data)
            createUniqueCityList(data)
            totalPages = Math.ceil(data.length / itemsPerPage)
        } else {
            renderBreweryCards(filteredByCity)
            totalPages = Math.ceil(filteredByCity.length / itemsPerPage)
        }

        renderPagination()
    }

}
async function getVisitListBreweries() {
    const response = await fetch(jsonUrl)
    const data = await response.json()
    return data
}
// Event listeners
selectStateForm.addEventListener('submit', (event) => {
    event.preventDefault()
    getAllBreweries()
    currentPage = 1
})
filterTypeForm.addEventListener('change', () => {
    getAllBreweries()
    currentPage = 1
})
searchBreweries.addEventListener('keyup', () => {
    getAllBreweries(selectBreweryType.value)
    currentPage = 1
})
clearAllButton.addEventListener('click', () => {
    checkedCities = []
    getAllBreweries()
})
filterByCityForm.addEventListener('change', () => {
    getAllBreweries()
})

previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--
        renderPagination()
        getAllBreweries()
    }
})

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++
        renderPagination()
        getAllBreweries()
    }
})

// Render lists
async function renderBreweryCards(data) {
    breweryUl.innerHTML = ''
    const visitBreweriesList = await getVisitListBreweries()
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
            if (visitBreweriesList.find((item) => item.id === data[i].id)) {
                visitListButton.innerText = 'Remove from visit list'
            
                visitListButton.addEventListener('click', () => {
                    deleteBreweryFromVisitList(data[i])            
                })
            } else {
                visitListButton.innerText = 'Add to visit list'
                visitListButton.addEventListener('click', () => {
                    addBreweriesToVisitList(data[i])            
                })
            }
        };
    }
}
function renderCities(uniqueCities) {
    filterByCityForm.innerHTML = ''
    uniqueCities.forEach((city) => {
        const checkbox = document.createElement('input')
        const checkboxLabel = document.createElement('label')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('name', city)
        checkbox.setAttribute('value', city)
        checkboxLabel.innerText = city
        checkboxLabel.setAttribute('for', city)
        filterByCityForm.append(checkbox)
        filterByCityForm.append(checkboxLabel)
        clearAllButton.addEventListener('click', () => {
            checkbox.checked = false
        })
        filterByCityForm.addEventListener('change', () => {
            if (checkbox.checked && checkedCities.indexOf(city) === -1) {
                checkedCities.push(city)
            } else if (!checkbox.checked && checkedCities.indexOf(city) >= 0) {
                checkedCities.splice(checkedCities.findIndex(cityItem => cityItem === city), 1)
            }
        })
    })
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

// Create unique cities list
function createUniqueCityList(data) {
    let uniqueCities = [...new Set(data.map((item) => item.city))]
    renderCities(uniqueCities)
}
// Add breweries to visit list
async function addBreweriesToVisitList(data) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        },
    }
    await fetch(jsonUrl, options)
    getAllBreweries()
}

// Remove brewery from visit list
async function deleteBreweryFromVisitList(data) {
    const deleteUrl = jsonUrl + `${data.id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    }
    await fetch(deleteUrl,options)
    getAllBreweries()
}
// Call functions
getAllBreweries()