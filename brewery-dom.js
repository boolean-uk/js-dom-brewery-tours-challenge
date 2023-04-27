const article = document.querySelector('article')
const breweryList = document.querySelector('.breweries-list')
const form = document.querySelector('#select-state-form')
const searchInput = document.querySelector('input')
const dropDown = document.getElementById('filter-by-type')
const regionalOption = document.querySelector('#regional')
const brewpubOption = document.querySelector('#brewpub')


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


  dropDown.addEventListener('click', function(event) { 
    event.preventDefault()
    console.log(event.target.value) 

    const originalItems = state.breweryArray

    if (event.target.value === "micro") {

        const filteredItems = originalItems.filter((item) => {
            if(item.brewery_type === "micro") return true
            return false 
          })
          state.breweryArray = filteredItems
          renderCards ()
}
    else if (event.target.value === "regional") {
        console.log("real")
        const filteredItems2 = originalItems.filter((item) => {
            if(item.brewery_type === "regional") return true
            return false
          })
          state.breweryArray = filteredItems2
          renderCards ()
    }
    if (event.target.value === "brewpub") {
        console.log("real")
        const filteredItems3 = originalItems.filter((item) => {
            if(item.brewery_type === "brewpub") return true 
            return false
          })
          state.breweryArray = filteredItems3
          renderCards ()
    }

    form.reset()
    renderCards()
  }) 



function renderCards() {

    breweryList.innerHTML = ""
    state.breweryArray.forEach(list => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const div = document.createElement('div')
        const section1 = document.createElement('section')
        const h3 = document.createElement('h3')
        const address1 = document.createElement('p')
        const address2 = document.createElement('p')
        const pnContainer = document.createElement('section')
        const pnTemplate = document.createElement('h3')
        const pn = document.createElement('p')
        const webContainer = document.createElement('section')
        const webLink = document.createElement('a')
    
        h2.innerText = list.name
        div.setAttribute("class", "type")
        div.innerText = list.brewery_type
        section1.setAttribute("class", "address")
        h3.innerText = ("Address:")
        address1.innerText = list.address_1
        address2.innerHTML = `<strong>${list.city}, ${list.postal_code}</strong>`
        pnContainer.setAttribute("class", "phone")
        pnTemplate.innerText = ("Phone:")
        pn.innerText = list.phone
        webContainer.setAttribute("class", "link")
        webLink.setAttribute("href", `${list.website_url}`)
        webLink.setAttribute("target", "_blank")
        webLink.innerText = "Visit Website"


        section1.append(h3, address1, address2)
        pnContainer.append(pnTemplate, pn)
        webContainer.append(webLink)
        li.append(h2, div, section1, pnContainer, webContainer)
        breweryList.append(li)
    })  
}

renderCards()