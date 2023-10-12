const article = document.querySelector('article')
const breweryList = document.querySelector('.breweries-list')
const form = document.querySelector('#select-state-form')
const searchInput = document.querySelector('input')
const dropDown = document.getElementById('filter-by-type')
const regionalOption = document.querySelector('#regional')
const brewpubOption = document.querySelector('#brewpub')


// defines search query
let searchQuery = ""

let searchFilter = ""

//defines empty state to hold data
const state = {
    breweryArray: []
}


// function to retrieve the brewery list and input it into the state array
function getBreweryList() {

    console.log("sending get request to server")

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchQuery}`) // uses string interpolation to input the user's search bar input

    .then(function (response) {

    console.log('response returned..', response)
    console.log('response body', response.body)

    return response.json()
    })

    .then(function (data) {

    console.log("Brewery data:", data)

    state.breweryArray = []

// filters to ensure that results are only returned if they're a micro, regional or brewpub brewery
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

// listens for a search bar submit and stores the input as a variable to be used for the URL string interpolation
form.addEventListener('submit', (event) => {
    event.preventDefault()  // prevents the browser default of refreshing the page
    console.log('creating post request')
    searchQuery = searchInput.value
  
    getBreweryList()
    form.reset()
  })

// listens for a click on the filter dropdown
  dropDown.addEventListener('click', function(event) { 
    event.preventDefault()
    console.log(event.target.value) 

// conditional statement to retrieve where the user has clicked specifically and give different outcomes based on which list item they have clicked
    if (event.target.value === "micro") {
        searchFilter = "micro"
}
    if (event.target.value === "regional") {
        searchFilter = "regional"
    }
    if (event.target.value === "brewpub") {
        searchFilter = "brewpub"
  }

  console.log("sending get request to server")
  fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchQuery}&by_type=${searchFilter}`) // uses string interpolation to input the user's search bar input
  .then(function (response) {  
  return response.json()
  })
  .then(function (data) {
  state.breweryArray = []
// filters to ensure that results are only returned if they're a micro, regional or brewpub brewery
  data.filter(currentBrewery => {
      if (currentBrewery.brewery_type === `micro` || currentBrewery.brewery_type === `regional` || currentBrewery.brewery_type === `brewpub`) {
          state.breweryArray.push({...currentBrewery, visible: true})                
          return true
      } else {
          return false
      }})

      renderCards ()
  })



}) 



function renderCards() {

    breweryList.innerHTML = ""
    // uses a .forEach function to search through a list of data, similar to for loops, but simpler!
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