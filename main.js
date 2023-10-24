// const { response } = require("express")

const state = {
  breweries: [], // all breweries by state
  renderedBreweries: [] // this is to be able to reset to all loaded breweries by state
}
const USStates = [
  "alabama","alaska","arizona","arkansas",
  "california", "colorado", "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho", "illinois", "indiana", "iowa",
  "kansas", "kentucky",
  "louisiana",
  "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana",
  "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota",
  "ohio", "oaklahoma", "oregon",
  "pennsylvania",
  "rhode island",
  "south dakota", "south carolina",
  "texas", "tennessee",
  "utah",
  "vermont", "virginia",
  "west virginia", "wyoming", "wisconsin", "washington"
]

// API consts
const protocol = "https"
const baseURL = "api.openbrewerydb.org"

// important page sections 
const listRender = document.getElementById("breweries-list")
const aside = document.querySelector("aside.filters-section aside.filters-section")
const entryForm = document.querySelector("form")
const searchField = document.querySelector("input#select-state")
const resultCount = document.querySelector("#resultCount p")
const triggerFilter = document.querySelector("#filter-by-type")

// these are the volatile values for the possible filtering by the user
const filterTypeDefault = ["micro", "regional", "brewpub"]
let loadedUSState = ""
let filterArr = filterTypeDefault
let textStr = ""
// these are filters that will only affect the display
let pageIndex = 1
let citiesFilter = []
let markedForVisitArr

// result counter – I found this helpful when programming for checking the current results in the state object

entryForm.addEventListener("submit", (event) => {
  event.preventDefault()

  if (USStates.includes(searchField.value.toLowerCase()) === false) {
    alert(`${searchField.value} is not a US state!`)
    return
  }

  loadedUSState = capitalizeCityStr(searchField.value)
  loadBreweriesByState(loadedUSState)
})

const updateResultCount = () => {
  state.renderedBreweries.length > 0 ? resultCount.innerText = `displaying ${state.renderedBreweries.length} matches out of ${state.breweries.length} found breweries in ${loadedUSState}` : resultCount.innerText = `That's a bummer. This combination of filters has no matches.`
}

// filter

triggerFilter.addEventListener("change", (event) => {
  event.target.value !== "" ? filterArr = [event.target.value] : filterArr = filterTypeDefault
  compileRenderList()
})

// EXTENSION 1: interactive search elements

const createFreetextSearch = () => {
  // it should be following the "list of breweries"
  const heading = document.querySelector("main h1")

  const header = document.createElement("header")
  header.setAttribute("class", "search-bar")

  const form = document.createElement("form")
  form.setAttribute("id", "search-breweries-form")
  form.setAttribute("autocomplete", "off")

  const label = document.createElement("label")
  label.setAttribute("for", "search-breweries")

  const h2 = document.createElement("h2")
  h2.innerText = "Search breweries:"
  label.appendChild(h2)
  form.appendChild(label)
  
  const input = document.createElement("input")
  
  input.setAttribute("id", "search-breweries")
  input.setAttribute("name", "search-breweries")
  input.setAttribute("type", "text")
  form.appendChild(input)
  form.addEventListener("input", () => {
    textStr = input.value
    compileRenderList()
  })

  header.appendChild(form)
  heading.append(header)
}

// EXTENSION 2: city sidebar

const compileCityArr = () => {
  const listOfCities = []

  state.breweries.forEach(brewery => {
    if (listOfCities.includes(brewery.city) === false) listOfCities.push(brewery.city)
  })

  // let's sort this alphabetically
  listOfCities.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    if (a = b) return 0
  })
  
  return listOfCities
}

const capitalize = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()

const capitalizeCityStr = (str) => str.split(" ").map(val => capitalize(val)).join(" ")

const deleteCityFilters = () => {
  const form = document.querySelector("form#filter-by-city-form")
  if (!!form === true) form.remove()
}

const renderCityFilters = () => {

  deleteCityFilters()

  const form = document.createElement("form")
  form.setAttribute("id", "filter-by-city-form")

  const h3 = document.createElement("h3")
  h3.innerText = "Cities"
  form.appendChild(h3)

  const button = document.createElement("button")
  button.setAttribute("class", "clear-all-btn")
  button.innerText = "clear all"
  button.addEventListener("click", (event) => {
    event.preventDefault()
    resetAllCityFilters()
    form.reset()
  })
  form.appendChild(button)

  const allCities = compileCityArr()

  for (let i = 0; i < allCities.length; i++) {
    const city = allCities[i]
    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")  
    input.setAttribute("name", city.toLowerCase())  
    input.setAttribute("value", city.toLowerCase())

    input.addEventListener("click", (event) => {
      const cityName = event.target.value
      event.target.checked ? addCityToFilter(cityName) : removeCityFromFilter(cityName)
    })

    const label = document.createElement("label")
    label.setAttribute("for", city.toLowerCase())
    label.innerText = capitalizeCityStr(city)

    form.appendChild(input)
    form.appendChild(label)
  }

  aside.appendChild(form)
}

const addCityToFilter = (city) => {
  if (citiesFilter.includes(city) === false) citiesFilter.push(city)
  compileRenderList()
}

const removeCityFromFilter = (city) => {
  const indexToDelete = citiesFilter.indexOf(city)
  if (citiesFilter.includes(city) === true) citiesFilter.splice(indexToDelete, 1)
  compileRenderList()
}

const resetAllCityFilters = () => citiesFilter = []

// EXTENSION 3: pagination

const clearPageNavigation = () => {
  const navInnerElements = document.querySelectorAll("nav *")
  if (!!navInnerElements === true) navInnerElements.forEach(element => element.remove())
}

const renderPageNavigation = () => {
  
  clearPageNavigation()

  const nav = document.querySelector("nav")

  const article = document.createElement("article")
  
  for (let i = 0; i < Math.ceil(state.renderedBreweries.length / 10); i++) {
    const buttonPage = document.createElement("button")
    if (i+1 === pageIndex) buttonPage.setAttribute("id", "active")
    buttonPage.innerText = i+1
    buttonPage.addEventListener("click", () => choosePage(i+1))
    article.appendChild(buttonPage)
  }
  
  nav.appendChild(article)
}

const choosePage = (num) => {
  pageIndex = num
  renderList()
}

// data fetching and processing

const loadBreweriesByState = (stateNameStr) => {
  fetch(`${protocol}://${baseURL}/v1/breweries?by_state=${stateNameStr}&per_page=200`)
    .then(response => response.json())
    .then(data => state.breweries = data.filter(item => filterTypeDefault.includes(item.brewery_type.toLowerCase())))
    .then(() => compileCityArr())
    .then(() => renderCityFilters())
    .then(() => compileRenderList()) // note that the previous settings of FilterArr and textStr still apply
}

const filterForType = (arr) => {
  return arr.filter(brewery => filterArr.includes(brewery.brewery_type.toLowerCase()))
}

const filterForStr = (arr) => {
  if (textStr !== "") return arr.filter(brewery => brewery.name.match(textStr))
  return arr
}

const filterForCity = (arr) => {
  if (citiesFilter.length > 0) return arr.filter(brewery => citiesFilter.includes(brewery.city.toLowerCase()))
  return arr
}

const compileRenderList = () => {
  
  let finalRenderList = state.breweries
  
  finalRenderList = filterForType(finalRenderList)
  finalRenderList = filterForStr(finalRenderList)
  finalRenderList = filterForCity(finalRenderList)

  // slotting the results into pages
  const calcPage = (index) => Math.ceil((index + 1) / 10)
  finalRenderList.forEach((brewery, index) => brewery.page = calcPage(index))
  
  state.renderedBreweries = finalRenderList
  renderList()
}

// render main portion

const renderList = () => {
  clearRenderList()

  const pageResults = state.renderedBreweries.filter(brewery => brewery.page === pageIndex)
  pageResults.forEach(val => listRender.appendChild(createListItem(val)))
  updateResultCount()
  renderPageNavigation()
}

const clearRenderList = () => {
  const listEntries = document.querySelectorAll("#breweries-list li")
  if (!!listEntries.length === true) listEntries.forEach(entry => entry.remove())
}

const createListItem = (item) => {
  const listentry = document.createElement("li")

  
  const title = document.createElement("h2")
  title.innerText = item.name

  const markForVisit = document.createElement("button")
  markForVisit.setAttribute("class", "visitList")
  // markForVisit.setAttribute("id", "marked")
  markForVisit.innerText = "🍺"
  markForVisit.addEventListener("click", () => markBreweryForVisit(item))

  title.prepend(markForVisit)

  listentry.appendChild(title)

  const divType = document.createElement("div")
  divType.setAttribute("class", "type")
  divType.innerText = item.brewery_type
  listentry.appendChild(divType)

  const sectionAddress = document.createElement("section")
  sectionAddress.setAttribute("class", "address")

  const h3 = document.createElement("h3")
  h3.innerText = "Address:"
  sectionAddress.appendChild(h3)

  const addressStreet = document.createElement("p")
  addressStreet.innerText = item.street
  sectionAddress.appendChild(addressStreet)

  const addressCity = document.createElement("p")
  const strong = document.createElement("strong")
  strong.innerText = item.city + ", " + item.postal_code
  addressCity.appendChild(strong)
  sectionAddress.appendChild(addressCity)

  listentry.appendChild(sectionAddress)
  
  const sectionPhone = document.createElement("section")
  sectionPhone.setAttribute("class", "phone")
  
  const titlePhone = document.createElement("h3")
  titlePhone.innerText = "Phone:"
  sectionPhone.appendChild(titlePhone)
  
  const cleanedUpPhoneNum = () => {
    if (!!item.phone === false) return "unknown"
    const cleanedStr = item.phone.replaceAll("/[^0-9]/gi")
    return cleanedStr.slice(0, 3) + "-" + cleanedStr.slice(3, 6) + "-" + cleanedStr.slice(7)
  }

  const phoneNum = document.createElement("p")
  phoneNum.innerText = cleanedUpPhoneNum()
  sectionPhone.appendChild(phoneNum)
  
  listentry.appendChild(sectionPhone)

  const sectionWebsite = document.createElement("section")
  sectionWebsite.setAttribute("class", "link")

  const websiteLink = document.createElement("a")
  websiteLink.setAttribute("href", item.website_url)
  websiteLink.setAttribute("target", "_blank")
  websiteLink.innerText = "Visit Website"
  sectionWebsite.appendChild(websiteLink)

  listentry.appendChild(sectionWebsite)
  
  return listentry
}



// EXTENSION 4
const isMarked = (id) => {

  // yes this a duplicate and not very clean. dw it doesn't properly work either! :D
  
  const headers = {
    "Content-Type": "application/json"
  }

  const options = {
      method: "GET",
      headers: headers
    }

  fetch("http://localhost:3000/markedbreweries", options)
    .then((response) => response.json())
    .then((data) => {
      markedForVisitArr = data.map(element => element.id)
    })
    .then(() => {
      if (!!markedForVisitArr === false) return false
      return markedForVisitArr.includes(id)
    })
  
}

const loadMarkedBreweries = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  const options = {
      method: "GET",
      headers: headers
    }

  fetch("http://localhost:3000/markedbreweries", options)
    .then((response) => response.json())
    .then((data) => {
      markedForVisitArr = data.map(element => element.id)
    })
}

// theoretically we'd only need the database-id because we can fetch a list of breweries from the API by comma separated values with e.g. GET https://api.openbrewerydb.org/v1/breweries?by_ids=701239cb-5319-4d2e-92c1-129ab0b3b440,06e9fffb-e820-45c9-b107-b52b51013e8f
// we'll do this properly though

const markBreweryForVisit = (brewery) => {
  // re-fresh the array of ids!
  loadMarkedBreweries()

  if (isMarked(brewery.id) === true) {
    alert("This brewery is already marked for visit!")
    return
  }

  const headers = {
    "Content-Type": "application/json"
  }

  const body = JSON.stringify(brewery)

  const options = {
    method: "POST",
    headers: headers,
    body: body
  }

  fetch("http://localhost:3000/markedbreweries", options)
    .then((response) => response.json())

}

createFreetextSearch()