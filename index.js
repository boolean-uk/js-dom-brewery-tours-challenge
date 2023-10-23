const state = {
    breweries: []
}

const root = 'https://api.openbrewerydb.org/v1/breweries'

const form = document.querySelector('#select-state-section')
const searchInput = document.querySelector('#select-state')
const breweryList = document.querySelector('#breweries-list')
const filter = document.querySelector('#filter-by-type')


// Build a fetch function that works based on the state entered in search. Filter out all breweries that aren't Micro, Regional or Brewpub.

form.addEventListener('submit', search)

function searchFunc(event) {
    event.preventDefault()
    const stateSearch = searchInput.value
    retrieveData(byState)
    form.reset()
}

function retrieveData(state) {
    const url = `${$root}by_state=${byState}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      state.breweries = data.filter((brewery) => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type))
      renderCard(state.breweries)
    })
    .catch((error) => {
      console.error(error)
    })
}

function renderCard(breweries) {

    const carList = document.createElement('li')

    const cardTitle = document.createElement('h3')

    const breweryDiv = document.createElement('div')

    const addressSec = document.createElement('section')

    const addressTitle = document.createElement('h3')

    const addressBody = document.createElement('p')

    const addressBodyTwo =  document.createElement('p')

    const phoneSection = document.createElement('section')

    const phoneTitle = document.createElement('h3')

    const phoneNumber = document.createElement('p')

    const linkSection = document.createElement('section')

    const linkAnchor = document.createComment('a')


}



// Add a filter