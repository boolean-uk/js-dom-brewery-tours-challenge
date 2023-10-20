const state = {
  breweries: []
}

const listRender = document.getElementById("breweries-list")

// API consts
const protocol = "https"
const baseURL = "api.openbrewerydb.org"

const loadBreweriesByState = (stateNameStr) => {
  fetch(`${protocol}://${baseURL}/v1/breweries?by_state=${stateNameStr}`)
    .then(response => response.json())
    .then(data => state.breweries = data)
    .then(() => renderList())
    // .then(() => console.log(state.breweries))
}

const renderList = () => {
  state.breweries.forEach(val => listRender.appendChild(createListItem(val)))
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
  return listentry
}


loadBreweriesByState("ohio")
renderList()