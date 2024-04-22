let state = []
const searchContainer = document.querySelector("#select-state")
const searchButton = document.querySelectorAll("input")[1]
const searchForm = document.getElementById("select-state-form")
const by_state = "https://api.openbrewerydb.org/v1/breweries?by_state="
const breweryList = document.getElementById("breweries-list")




// search value used when the submit button is clicked
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const location = searchContainer.value

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${location}`)
        .then((response) => response.json())
        .then((data) => {
            
            // reset state for each search
            state = []
            data.forEach(element => {
                if (element.brewery_type === "micro" || element.brewery_type === "regional" || element.brewery_type === "brewpub") {

                    // this filters only the desired type of brewerys
                    state.push(element)
                }

            });
            searchContainer.value = ""
            // remove current displayed list items
            clearList()
            // render current list items
            render(state)

        })

})

// create functions for rendering state and removing li items
function clearList () {
    const listElements = breweryList.querySelectorAll("*")
    listElements.forEach((item) => item.remove())
}

function render (array) {
    array.forEach((brewery) => {
        const container = document.createElement("li")

        const title = document.createElement("h2")
        title.innerText = brewery.name

        const div = document.createElement("div")
        div.classList.add("type")
        div.innerText = brewery.brewery_type

        const section = document.createElement("section")
        section.classList.add("address")

        const address = document.createElement("h3")
        address.innerText = "Address:"

        const road = document.createElement("p")
        road.innerText = brewery.street

        const strong = document.createElement("strong")
        strong.innerText = `${brewery.state}, ${brewery.postal_code}`

        const postCode = document.createElement("p")
        postCode.append(strong)


        section.append(address, road, postCode)

        const phoneSection = document.createElement("section")
        phoneSection.classList.add("phone")

        const phoneTitle = document.createElement("h3")
        phoneTitle.innerText = "Phone:"

        const phoneNumber = document.createElement("p")
        phoneNumber.innerText = brewery.phone

        phoneSection.append(phoneTitle, phoneNumber)

        const link = document.createElement("section")
        link.classList.add("link")

        const a = document.createElement("a")
        a.href = brewery.website_url
        a.target = "_blank"
        a.innerText = "Visit Website"

        link.append(a)


        container.append(title, div, section, phoneSection, link)
        breweryList.append(container)
    })
}


// look at the filter section on the webpage
// when select box has an option chose show that type only
// select select box
const filter = document.querySelector("select")

// check value


// if value micro .... below
filter.addEventListener("change", () => {
    // console.log(filter.value)
    clearList()
    let filteredArray = []

    if (filter.value === "") {
        render(state)
    }
    else if (filter.value === "micro") {
        filteredArray = filterState(filter.value)
        render(filteredArray)
    }
    else if (filter.value === "regional") {
        filteredArray = filterState(filter.value)
        render(filteredArray)
    }
    else if (filter.value === "brewpub") {
        filteredArray = filterState(filter.value)
        render(filteredArray)
    }

})



// second stage is filtering state array then only displaying correct criteria
// 
// then delete and render

function filterState (brewery_type) {
    const filteredArray = state.filter(typeOfBrewery)

    function typeOfBrewery(brewery) {
        return brewery.brewery_type === brewery_type
    }

    return filteredArray
}
