const state = {
  breweries: []
}

const listRender = document.getElementById("breweries-list")

// API consts
const protocol = "https"
const baseURL = "api.openbrewerydb.org"

const USStates = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "conneticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachussets",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oaklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south dakota",
  "south carolina",
  "texas",
  "tennessee",
  "utah",
  "vermont",
  "virginia",
  "west virginia",
  "wyoming",
  "wisconsin",
  "washington"
]

const entryForm = document.querySelector("form")
const searchField = document.querySelector("input#select-state")
entryForm.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log(searchField.value)

  if (USStates.includes(searchField.value.toLowerCase()) === false) {
    alert(`${searchField.value} is not a US state!`)
    return
  }

  loadBreweriesByState(searchField.value)
})

const loadBreweriesByState = (stateNameStr) => {
  fetch(`${protocol}://${baseURL}/v1/breweries?by_state=${stateNameStr}&per_page=200`)
    .then(response => response.json())
    .then(data => state.breweries = data)
    .then(() => renderList())
}

let filterArr = ["micro", "regional", "brewpub"]
const generalFilter = (filterArr) => state.breweries.filter(brewery => filterArr.includes(brewery.brewery_type.toLowerCase()))

const triggerFilter = document.querySelector("#filter-by-type")
triggerFilter.addEventListener("change", (event) => {
  filterArr = [event.target.value]
  clearRenderList()
  renderList()
})

const renderList = () => {
  const filteredByType = generalFilter(filterArr)
  filteredByType.forEach(val => listRender.appendChild(createListItem(val)))
}

const clearRenderList = () => {
  const listEntries = document.querySelectorAll("#breweries-list li")
  listEntries.forEach(entry => entry.remove())
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
  strong.innerText = item.state + ", " + item.postal_code
  addressCity.appendChild(strong)
  sectionAddress.appendChild(addressCity)

  listentry.appendChild(sectionAddress)
  
  const sectionPhone = document.createElement("section")
  sectionPhone.setAttribute("class", "phone")
  
  const titlePhone = document.createElement("h3")
  titlePhone.innerText = "Phone:"
  sectionPhone.appendChild(titlePhone)
  
  const phoneNum = document.createElement("p")
  phoneNum.innerText = item.phone
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