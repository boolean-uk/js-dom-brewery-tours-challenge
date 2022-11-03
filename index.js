const uri = "https://api.openbrewerydb.org/breweries"
const breweriesList = document.querySelector(".breweries-list")
const typeSelector = document.querySelector("#filter-by-type")
const stateSearch = document.querySelector("#select-state-form")
const searchInput = document.querySelector("#select-state")

const state = {
    breweries: [],
    userStateSearch : "",
    selectedType : ""
}



function filterBreweries (breweries) {
    const types = ['micro', 'regional', 'brewpub']
    return breweries.filter((breweries) =>
    types.includes(breweries.brewery_type)
    )
  }



function loadBreweryData () {

    fetch(uri)
    .then((response) => {
        return response.json()

    })
    .then(() => {
        state.breweries = []
      
    })

}


function renderBreweries() {
    breweriesList.innerHTML = ""

    state.breweries.forEach((brewery) => {
        const li = document.createElement("li") 
        breweriesList.appendChild(li)

        const h2 = document.createElement("h2")
        h2.innerText= brewery.name
        li.appendChild(h2)

        const div = document.createElement("div")
        div.setAttribute("class","type")
        div.innerText = brewery.brewery_type

        li.appendChild(div)

        const section1 = document.createElement("section")
        section1.setAttribute("class","address")
        li.appendChild(section1)

        const addressH3 = document.createElement("h3")
        addressH3.innerText = "Address:"
        section1.appendChild(addressH3)

        const p1 = document.createElement("p")
        p1.innerText = brewery.street
        section1.appendChild(p1)

        const p2 = document.createElement("p")
        p2.innerText = brewery.city + "  " + brewery.postal_code 
        p2.setAttribute("style","font-weight : bold")
        section1.appendChild(p2)

        const section2 = document.createElement("section")
        section2.setAttribute("class","phone")
        li.appendChild(section2)

        const phoneH3 = document.createElement("h3")
        phoneH3.innerText = "Phone:"
        section2.appendChild(phoneH3)

        const p3 = document.createElement("p")
        p3.innerText = brewery.phone
        section2.appendChild(p3)

        const section3 = document.createElement("section")
        section3.setAttribute("class","link")
        li.appendChild(section3)

        const a = document.createElement("a")
        a.setAttribute("href", brewery.website_url)
        a.setAttribute("target","_blank")
        a.innerText = "Visit Website"
        section3.appendChild(a)

    })

}


stateSearch.addEventListener("submit", (event) =>{

     event.preventDefault()

     const search = searchInput.value.toLowerCase().trim()
     state.userStateSearch = search

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.userStateSearch}&per_page=5`)
    .then((response) => {
        return response.json()

    })
    .then((breweries) => {
        state.breweries = filterBreweries(breweries)
        renderBreweries()
    
    })
   
    searchInput.value = ""
    

})


typeSelector.addEventListener("change", (event) => {

    event.preventDefault()
    state.selectedType = typeSelector.value

    fetch(`https://api.openbrewerydb.org/breweries?by_type=${state.selectedType}&per_page=5`)
    .then((response) => {
        return response.json()

    })
    .then((breweries) => {
        state.breweries = filterBreweries(breweries)
        renderBreweries()
      
    })

})

loadBreweryData()
