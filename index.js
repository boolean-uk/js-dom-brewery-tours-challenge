let breweries = []

const url = "https://api.openbrewerydb.org/v1/breweries"

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    showBrewery(json)
  })

const breweriesList = document.querySelector("#breweries-list")

function renderBreweries(product) {
  const itemList = document.createElement("li")
  const nameofBrewery = document.createElement("h2")
  nameofBrewery.innerText = product.name
  itemList.append(nameofBrewery)
  const breweryType = document.createElement("div")

  breweryType.classList.add("type")
  breweryType.innerText = product.brewery_type
  itemList.append(breweryType)

  const breweryAddress = document.createElement("section")
  breweryAddress.classList.add("address")
  const addressLine = document.createElement("h3")
  addressLine.innerText = "Address:"
  breweryAddress.append(addressLine)

  const breweryStreet = document.createElement("p")
  breweryStreet.innerText = product.street
  breweryAddress.append(breweryStreet)
  const fullAddress = document.createElement("p")
  const boldText = document.createElement("strong")
  boldText.innerText = ` ${product.postal_code}, ${product.city} `
  fullAddress.append(boldText)
  breweryAddress.append(fullAddress)
  itemList.append(breweryAddress)
  const breweryPhone = document.createElement("section")
  breweryPhone.classList.add("phone")
  const phoneLine = document.createElement("h3")
  phoneLine.innerText = "Phone:"
  breweryPhone.append(phoneLine)
  const phoneofBrewery = document.createElement("p")
  phoneofBrewery.innerText = product.phone
  breweryPhone.append(phoneofBrewery)
  itemList.append(breweryPhone)

  const urlOfbrewery = document.createElement("section")
  urlOfbrewery.classList.add("link")
  const breweryLink = document.createElement("a")
  breweryLink.href = product.website_url
  breweryLink.target = "_blank"
  breweryLink.innerText = "Visit Website"
  urlOfbrewery.append(breweryLink)
  itemList.append(urlOfbrewery)
  breweriesList.append(itemList)
}
const findingBrewery = document.querySelector("#filter-by-type")
function showBrewery(product) {
  const filterBreweries = product.filter(
    (brewery) => !brewery.brewery_type.includes(["micro", "regional", ""])
  )
  breweries = render(filterBreweries)

  newItemList()
}

const filterByTypeForm = document.querySelector("#filter-by-type-form")

findingBrewery.addEventListener("change", (event) => {
  filterSelection(event)
})

function filterSelection(event) {
  event.preventDefault()
  const chosenBrewery = event.target.value

  const filterBreweries = breweries.filter(
    (brewery) => brewery.brewery_type === chosenBrewery
  )
  breweriesList.innerHTML = ""

  filterBreweries.forEach((brewery) => renderBreweries(brewery))
}
function newItemList() {
  breweries.forEach((brewery) => renderBreweries(brewery))
}

const chosenState = document.querySelector("#select-state-form")

const selectState = document.querySelector("#select-state")

chosenState.addEventListener("submit", (event) => {
  filterStates(event)
})

function filterStates(event) {
  event.preventDefault()
  const searchedBrewery = selectState.value

  fetch(`https://api.openbrewerydb.org/breweries?by_state=${searchedBrewery}`)
    .then((response) => response.json())
    .then((json) => {
      (breweriesList.innerHTML = ""),
        json.forEach((brewery) => renderBreweries(brewery))
    })
}
const searchBreweries = document.querySelector("#search-breweries")

searchBreweries.addEventListener("input", (event) => searchBrewery(event))

function searchBrewery(event) {
  event.preventDefault()
  const searchedBrewery = searchBreweries.value
  fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchedBrewery}`)
    .then((response) => response.json())
    .then((json) => {
      (breweriesList.innerHTML = ""),
        json.forEach((brewery) => renderBreweries(brewery))
    })
}
const brewerySearchForm = document.querySelector("#search-breweries-form")

function errorMessage() {
  const itemList = document.createElement("li")
  const nameofBrewery = document.createElement("h2")
  nameofBrewery.innerText =
    "Oops, sorry, no brewery matching your search request"
  itemList.append(nameofBrewery)
  breweriesList.innerHTML = ""
  breweriesList.append(itemList)
}
