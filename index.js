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

function renderCard(breweries) {
    
    document.createElement('li')

    document.createElement('h3')

    document.createElement('div')

    document.createElement('section')

    document.createElement('h3')

    document.createElement('p')

    document.createElement('p')

    document.createElement('section')

    document.createElement('h3')

    document.createElement('p')

    document.createElement('section')

    document.createComment('a')


}



// Add a filter