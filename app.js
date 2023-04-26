const form = document.querySelector('#select-state-form')
const stateInput = document.querySelector('#select-state')
const breweryList = document.querySelector('.breweries-list')
const type = document.querySelector('#filter-by-type')
const typeInput = document.querySelector('option')
const searchInput = document.querySelector('#search-breweries')
const cityForm = document.querySelector('#filter-by-city-form')

const brew = {
    brewerys: [],
}

let cityArray = []


// form submit

form.addEventListener('submit', function handle(event) {
    event.preventDefault()
    const state = stateInput.value;
    const updateState = state.toLowerCase().replaceAll(' ', '_')
    form.reset()

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${updateState}&per_page=10`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            brew.brewerys = data
            
            renderBrewerys()
            renderCityFilter()
        })
})

function renderBrewerys(filteredBreweries) {
    breweryList.innerHTML = ''

    const typeOfBrew = type.value
    const breweriesToRender = filteredBreweries || brew.brewerys;

    // filter function to make 

    const filteredBreweriesByType  = breweriesToRender.filter(function (brewery) {
        if (typeOfBrew === '') {
            return brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub'
        } else {
            return brewery.brewery_type === typeOfBrew
        }
    })

    filteredBreweriesByType.forEach(function (brewery) {
        // create elements
        const li = document.createElement('li')
        const h2name = document.createElement('h2')
        const divType = document.createElement('div')
        const sectionAddress = document.createElement('section')
        const h3Address = document.createElement('h3')
        const pTagAddress = document.createElement('p')
        const pTagAddressTwo = document.createElement('p')
        const sectionContact = document.createElement('section')
        const h3Contact = document.createElement('h3')
        const pTagContact = document.createElement('p')
        const sectionLinks = document.createElement('section')
        const aTagLink = document.createElement('a')
        const strong = document.createElement('strong')

        // set attributes
        divType.setAttribute('class', 'type')
        sectionAddress.setAttribute('class', 'address')
        sectionContact.setAttribute('class', 'phone')
        sectionLinks.setAttribute('class', 'link')
        aTagLink.setAttribute('href', `${brewery.website_url}`)
        aTagLink.setAttribute('target', '_blank')

        // content
        h2name.innerText = `${brewery.name}`
        divType.innerText = `${brewery.brewery_type}`
        h3Address.innerText = 'Address:'
        pTagAddress.innerText = `${brewery.street}`
        strong.innerText = `${brewery.city}, ${brewery.postal_code.slice(0, 5)}`

        h3Contact.innerText = 'Phone:'
        if (brewery.phone) {
            pTagContact.innerText = `${brewery.phone}`
        } else {
            pTagContact.innerText = 'N/A'
        }
        aTagLink.innerText = 'Visit Website'

        // appending
        pTagAddressTwo.append(strong)
        sectionAddress.append(h3Address, pTagAddress, pTagAddressTwo)
        sectionContact.append(h3Contact, pTagContact)
        sectionLinks.append(aTagLink)
        li.append(h2name, divType, sectionAddress, sectionContact, sectionLinks)
        breweryList.append(li)
    })
}

type.addEventListener('change', function typeSelect(event) {
    renderBrewerys()

})

searchInput.addEventListener('input', function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredBreweries = brew.brewerys.filter(brewery => {
    const breweryName = brewery.name.toLowerCase();
    return breweryName.includes(searchTerm);
  });
  
  renderBrewerys(filteredBreweries);
});

renderBrewerys()

// Extension 2

//     Add a new 'filter by city' section to the filter menu
//     The cities list should be populated based on the results of the search. Each city should only appear once.

function renderCityFilter() {
cityForm.innerHTML = '' 

    brew.brewerys.forEach(brewery => {
        const city = brewery.city

    // skip over cities that have already been rendered
    if (cityArray.includes(city)) {
        return;
      }
       // mark this city as rendered
       cityArray.push(city);

        // create elements 
    
        const cityInput = document.createElement('input')
        const cityLabel = document.createElement('label')

        // set attributes
        cityInput.setAttribute('type', 'checkbox')
        cityInput.setAttribute('name', city)
        cityInput.setAttribute('value', city)
        cityLabel.setAttribute('for', city)
        // content
        cityLabel.innerText = city
        // appending    
        cityForm.append(cityInput, cityLabel)
    })

}



renderCityFilter()

