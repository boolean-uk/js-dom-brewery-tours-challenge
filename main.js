const state = {
  breweries: [], // all breweries by state
  renderedBreweries: [] // this is to be able to reset to all loaded breweries by state
}
const USStates = [
  "alabama","alaska","arizona","arkansas",
  "california", "colorado", "conneticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho", "illinois", "indiana", "iowa",
  "kansas", "kentucky",
  "louisiana",
  "maine", "maryland", "massachussets", "michigan", "minnesota", "mississippi", "missouri", "montana",
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
let filterArr = ["micro", "regional", "brewpub"]
let textStr = ""
// these are filters that will only affect the display
let pageIndex = 1
let citiesFilter = []

// result counter – I found this helpful when programming for checking the current results in the state object

entryForm.addEventListener("submit", (event) => {
  event.preventDefault()

  if (USStates.includes(searchField.value.toLowerCase()) === false) {
    alert(`${searchField.value} is not a US state!`)
    return
  }

  loadBreweriesByState(searchField.value)
})

const updateResultCount = () => {
  resultCount.innerText = `displaying ${state.renderedBreweries.length} matches out of ${state.breweries.length} found breweries in ${searchField.value}`
}

// filter

triggerFilter.addEventListener("change", (event) => {
  event.target.value !== "" ? filterArr = [event.target.value] : filterArr = ["micro", "regional", "brewpub"]
  renderList()
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
  form.addEventListener("input", () => textStr = liveSearchByText(input.value))

  header.appendChild(form)
  heading.append(header)
}

const liveSearchByText = (inputStr) => {
  textStr = inputStr
  renderList()
}


// EXTENSION 2: city sidebar

const compileCityArr = () => {
  const listOfCities = []

  state.renderedBreweries.forEach(brewery => {
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

const capitalizeCityStr = (str) => {
  const wordArr = str.split(" ")
  wordArr.forEach(val => val[0].toUpperCase() + val.slice(1).toLowerCase())
  return wordArr.join(" ")
}

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
  form.appendChild(button)

  const allCities = compileCityArr()
  for (let i = 0; i < allCities.length; i++) {
    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")  
    input.setAttribute("name", allCities[i].toLowerCase())  
    input.setAttribute("value", allCities[i].toLowerCase())

    input.addEventListener("click", (event) => console.log(event.target.checked))

    const label = document.createElement("label")
    label.setAttribute("for", allCities[i].toLowerCase())
    label.innerText = capitalizeCityStr(allCities[i])

    form.appendChild(input)
    form.appendChild(label)
  }

  aside.appendChild(form)
}

const addCityToFilter = (city) => {
  if (citiesFilter.includes(city) === false) citiesFilter.push(city)
}

const removeCityFromFilter = (city) => {
  if (citiesFilter.includes(city) === true) citiesFilter.slice(citiesFilter.indexOf(city), 1)
}

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
    .then(data => state.breweries = data.filter(item => ["micro", "regional", "brewpub"].includes(item.brewery_type.toLowerCase())))
    .then(() => compileCityArr())
    .then(() => compileRenderedList()) // note that the previous settings of FilterArr and textStr still apply
    .then(() => renderList())
}

const compileRenderedList = () => {
  const filteredForType = state.breweries.filter(brewery => filterArr.includes(brewery.brewery_type.toLowerCase()))
  const filteredForString = filteredForType.filter(brewery => brewery.name.match(textStr))
  const filteredForCity = filteredForString.filter(brewery => citiesFilter.includes(brewery.city))
  // slotting the results into pages
  const calcPage = (index) => Math.ceil((index + 1) / 10)
  filteredForString.forEach((brewery, index) => brewery.page = calcPage(index))
  state.renderedBreweries = filteredForString
}

// render main portion

const renderList = () => {
  clearRenderList()
  
  compileRenderedList()
  const pageResults = state.renderedBreweries.filter(brewery => brewery.page === pageIndex)
  
  pageResults.forEach(val => listRender.appendChild(createListItem(val)))
  
  renderCityFilters()
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

createFreetextSearch()