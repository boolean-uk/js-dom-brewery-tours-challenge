const uri = "https://api.openbrewerydb.org/breweries"
const breweriesList = document.querySelector(".breweries-list")

const state = {
    breweries: []
}

function loadBreweryData () {

    fetch(uri)
    .then((response) => {
        return response.json()

    })
    .then((breweries) => {
        renderBreweries()
        state.breweries = breweries
      

    })

}

loadBreweryData()

function renderBreweries() {
    breweriesList.innerHTML = ""

    state.breweries.forEach((brewery) => {
        const li = document.createElement("li") 
        breweriesList.appendChild(li)

        const h2 = document.createElement("h2")
        h2.innerText= "Snow Belt Brew"
        li.appendChild(h2)

        const div = document.createElement("div")
        div.setAttribute("class","type")
        div.innerText = "Micro"
        li.appendChild(div)

        const section1 = document.createElement("section")
        section1.setAttribute("class","address")
        li.appendChild(section1)

        const addressH3 = document.createElement("h3")
        addressH3.innerText = "Address:"
        section1.appendChild(addressH3)

        const p1 = document.createElement("p")
        p1.innerText = "9511 Kile Rd"
        section1.appendChild(p1)

        const p2 = document.createElement("p")
        p2.innerText = "Chardon, 44024"
        // p1.setAttribute("style","strong") => need to re-check how to use style css in js
        section1.appendChild(p2)

        const section2 = document.createElement("section")
        section2.setAttribute("class","phone")
        li.appendChild(section2)

        const phoneH3 = document.createElement("h3")
        phoneH3.innerText = "Phone:"
        section2.appendChild(phoneH3)

        const p3 = document.createElement("p")
        p3.innerText = "N/A"
        section2.appendChild(p3)

        const section3 = document.createElement("section")
        section3.setAttribute("class","link")
        li.appendChild(section3)

        const a = document.createElement("a")
        a.setAttribute("href","null")
        a.setAttribute("target","_blank")
        a.innerText = "Visit Website"
        section3.appendChild(a)

        // HTML framework created + however is not currently dynamic 
    })

}
console.log(loadBreweryData())





