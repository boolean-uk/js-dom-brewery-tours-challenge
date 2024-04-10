const breweryList = document.querySelector("#breweries-list")
const typeFilter = document.querySelector("#filter-by-type")
const stateSearch = document.querySelector("#select-state")
const stateSearchForm = document.querySelector("#select-state-form")
const nameSearch = document.querySelector("#name-search")
const cityList = document.querySelector("#filter-by-city")
const clearCity = document.querySelector("#clear-city")
const pageBack = document.querySelector("#page-back")
const pageForward = document.querySelector("#page-forward")
const pageNum = document.querySelector("#page-num")

const stateObj = {rendered:{}}

const page = 1

pageForward.addEventListener("click", () => {
    page++
    render()
})

pageBack.addEventListener("click", () => {
    page--
    render()
})

async function render() {
    stateObj.rendered = {}
    
    const currentFilter = typeFilter.value.toLowerCase()

    const state = stateSearch.value.toLowerCase()

    const pageSize = 8

    breweryList.innerHTML = ""
    cityList.innerHTML = ""
    pageNum.innerHTML = `Page ${page}`

    if (page < 2) {
        pageBack.setAttribute("disabled", true)
    } else {
        pageBack.removeAttribute("disabled")
    }

    const name = nameSearch.value

    let filterQuery = ""

    if (currentFilter) {
        filterQuery = `by_type=${currentFilter}&`
    }


    let breweries

    let apiReq = `https://api.openbrewerydb.org/v1/breweries?${filterQuery}&by_state=${state}&by_name=${name}&page=${page}`

    const citiesToFilter = Object.keys(stateObj)

    citiesToFilter.forEach((item) => {
        isChecked = stateObj[item] === true
        if (isChecked) {
            apiReq += `&by_city=${item}`
        }
    })

    

    console.log(name==false)

    if(name) {
        apiReq += `/search?query=&by_name=${name}`
    }

    try {
        breweries = await fetch(apiReq)
    } catch (err) {
        alert("An error has occured, please contact the system administrator")
        throw err
    }

    const breweriesData = await breweries.json()

    breweriesData.forEach((item) => {
        const isValidBrewery =
            item.brewery_type === "micro" ||
            item.brewery_type === "regional" ||
            item.brewery_type === "brewpub"

        const isDisplayed = isValidBrewery

        if (isDisplayed) {
            createListItem(item)
        }
        if (isValidBrewery) {
            createCityFilter(item)
        }
    })
}

function createListItem(obj) {
    const breweryName = document.createElement("h2")
    breweryName.innerHTML = obj.name

    const breweryType = document.createElement("h3")
    breweryType.innerHTML = obj.brewery_type.toUpperCase()
    breweryType.className = "type"

    const addressBlock = document.createElement("div")
    addressBlock.style.display = "flex"
    addressBlock.style.flexDirection = "column"
    addressBlock.className = "address"

    const addressTitle = document.createElement("h3")
    addressTitle.innerHTML = "Address:"

    const addressStreet = document.createElement("p")
    addressStreet.innerHTML = obj.address_1

    const addressCity = document.createElement("p")
    addressCity.innerHTML = obj.city + ", " + obj.postal_code
    addressCity.style.fontWeight = "700"

    addressBlock.append(addressTitle)
    addressBlock.append(addressStreet)
    addressBlock.append(addressCity)

    const phoneBlock = document.createElement("div")
    phoneBlock.className = "phone"

    const phoneTitle = document.createElement("h3")
    phoneTitle.innerHTML = "Phone:"

    const phoneNumber = document.createElement("p")
    phoneNumber.innerHTML = "+" + obj.phone

    phoneBlock.append(phoneTitle)
    phoneBlock.append(phoneNumber)

    const websiteButton = document.createElement("a")
    websiteButton.className = "link"
    websiteButton.innerHTML = "VISIT WEBSITE"
    websiteButton.href = obj.website_url
    websiteButton.target = "_blank"

    const breweryItem = document.createElement("li")
    breweryItem.className = "brewery--list"

    breweryItem.append(breweryName)
    breweryItem.append(breweryType)
    breweryItem.append(addressBlock)
    breweryItem.append(phoneBlock)
    breweryItem.append(websiteButton)

    breweryList.append(breweryItem)
}

function createCityFilter(item) {
    
    
    const isRendered = item.city in stateObj.rendered
    
    if (!isRendered) {
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.name = item.city

        if (!stateObj[item.city]) {
            stateObj[item.city] = false
        }

        checkbox.checked = stateObj[item.city]

        checkbox.addEventListener("change", (e) => {
            stateObj[item.city] = !stateObj[item.city]
            render()
        })

        const checkboxLabel = document.createElement("label")
        checkboxLabel.for = item.city
        checkboxLabel.innerHTML = item.city

        const checkboxContainer = document.createElement("li")
        checkboxContainer.style.display = "flex"
        checkboxContainer.style.flexDirection = "rows"

        checkboxContainer.append(checkbox)
        checkboxContainer.append(checkboxLabel)

        cityList.append(checkboxContainer)

        stateObj.rendered[item.city] = true
    }
}

typeFilter.addEventListener("change", render)

stateSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    stateObj.page = 1

    render()
})

nameSearch.addEventListener("input", render)

clearCity.addEventListener("click", () => {
    Object.keys(stateObj).forEach((item) => {
        stateObj[item] = false
    })

    stateObj.page = 1

    render()
})

render()
