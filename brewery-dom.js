const article = document.querySelector('article')
const breweryList = document.querySelector('.breweries-list')
const form = document.querySelector('form')
const searchInput = document.querySelector('input')

let searchQuery = ""

const state = {
    breweryArray: []
}

function getBreweryList() {

    console.log("sending get request to server")

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchQuery}`)

    .then(function (response) {

    console.log('response returned..', response)
    console.log('response body', response.body)

    return response.json()
    })

    .then(function (data) {

    console.log("Brewery data:", data)

    state.breweryArray = []

    data.filter(currentBrewery => {
        if (currentBrewery.brewery_type === `micro` || currentBrewery.brewery_type === `regional` || currentBrewery.brewery_type === `brewpub`) {
            state.breweryArray.push({...currentBrewery, visible: true})                
            return true
        } else {
            return false
        }})


    // state.breweryArray = data

        renderCards ()
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('creating post request')
    searchQuery = searchInput.value
    console.log(searchQuery)
  
    getBreweryList()
    form.reset()
  })

function renderCards() {

    breweryList.innerHTML = ""
    state.breweryArray.forEach(list => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const div = document.createElement('div')
        const section = document.createElement('section')
        const h3 = document.createElement('h3')
        const address1 = document.createElement('p')
        const address2 = document.createElement('p')
    
        h2.innerText = list.name
        div.setAttribute("class", "type")
        div.innerText = list.brewery_type
        section.setAttribute("class", "address")
        h3.innerText = ("Address:")
        address1.innerText = list.address_1
        address2.innerText = list.city

        section.append(h3, address1, address2)
        li.append(h2, div, section)
        breweryList.append(li)
    })  
}

renderCards()