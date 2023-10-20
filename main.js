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
    .then(() => console.log(state.breweries))
}

const renderList = () => {
  state.breweries.forEach(val => listRender.appendChild(createListItem(val)))
}

const createListItem = (item) => {
  const listentry = document.createElement("li")
  const title = document.createElement("h2")
  title.innerText = item.stateNameStr
  listentry.appendChild(title)

  const sectionAddress = document.createElement("section")
  sectionAddress.setAttribute("class", "address")

  const h3 = document.createElement("h3")
  h3.innerText = "Address:"
  sectionAddress.appendChild(h3)

  const addressStreet = document.createElement("p")
  addressStreet.innerText = item.street
  sectionAddress.appendChild(addressStreet)

  const addressCity = document.createElement("p")
  addressCity.innerText = item.state + ", " + item.postal_code
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
  console.log(listentry)
  return listentry
}


loadBreweriesByState("ohio")
renderList()