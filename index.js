// state object
const state = {
  breweries: []
}

// query selectors
const searchForm = document.querySelector('#select-state-form')
const searchInput = document.querySelector('#select-state')
const brewUl = document.querySelector('#breweries-list')
const filter = document.querySelector('#filter-by-type')

// event listener for search
searchForm.addEventListener('submit', search)

function search(event) {
  event.preventDefault()
  const byState = searchInput.value
  fetchData(byState)
  searchForm.reset()
}

function fetchData(byState) {
  const url = `https://api.openbrewerydb.org/v1/breweries?by_state=${byState}`

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      state.breweries = data.filter((brewery) =>
        ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
      )
      renderBreweries(state.breweries)
    })
}
// // Template
// /* <li>
//   <h2>Snow Belt Brew</h2>
//   <div class="type">micro</div>
//   <section class="address">
//     <h3>Address:</h3>
//     <p>9511 Kile Rd</p>
//     <p><strong>Chardon, 44024</strong></p>
//   </section>
//   <section class="phone">
//     <h3>Phone:</h3>
//     <p>N/A</p>
//   </section>
//   <section class="link">
//     <a href="null" target="_blank">Visit Website</a>
//   </section>
// </li> */
function renderBreweries(breweries) {
  brewUl.innerHTML = ''
  breweries.forEach((brewery) => {
    const brewerysLi = document.createElement('li')
    brewUl.append(brewerysLi)

    const brewerysH3 = document.createElement('h3')
    brewerysH3.innerText = brewery.name
    brewerysLi.append(brewerysH3)

    const breweryDiv = document.createElement('div')
    breweryDiv.setAttribute('class', 'type')
    breweryDiv.innerText = brewery.brewery_type
    brewerysLi.append(breweryDiv)

    const brewerySectionAddress = document.createElement('section')
    brewerySectionAddress.setAttribute('class', 'address')
    brewerysLi.append(brewerySectionAddress)

    const sectionAddressH3 = document.createElement('h3')
    sectionAddressH3.innerText = 'Address:'
    brewerySectionAddress.append(sectionAddressH3)

    const sectionAddress1 = document.createElement('p')
    sectionAddress1.innerText = brewery.address_1
    brewerySectionAddress.append(sectionAddress1)

    const sectionAddress2 = document.createElement('p')
    brewerySectionAddress.append(sectionAddress2)

    const strong = document.createElement('strong')
    strong.innerText = `${brewery.city},${brewery.postal_code}`
    sectionAddress2.append(strong)

    const brewerySectionPhone = document.createElement('section')
    brewerySectionPhone.setAttribute('class', 'phone')
    brewerysLi.append(brewerySectionPhone)

    const sectionPhoneH3 = document.createElement('h3')
    sectionPhoneH3.innerText = 'Phone:'
    brewerySectionPhone.append(sectionPhoneH3)

    const sectionPhone = document.createElement('p')
    sectionPhone.innerText = brewery.phone
    brewerySectionPhone.append(sectionPhone)

    const brewerySectionLink = document.createElement('section')
    brewerySectionLink.setAttribute('class', 'link')
    brewerysLi.append(brewerySectionLink)

    const sectionLinkAnchor = document.createElement('a')
    sectionLinkAnchor.setAttribute('href', `${brewery.website_url}`)
    sectionLinkAnchor.setAttribute('target', '_blank')
    sectionLinkAnchor.innerText = 'Visit Website'
    brewerySectionLink.append(sectionLinkAnchor)
  })
}

filter.addEventListener('change', TypeChange)

function TypeChange() {
  const type = filter.value
  if (type === 'no_filter') {
    renderBreweries(state.breweries)
  } else {
    const filtered = state.breweries.filter(
      (brewery) => brewery.brewery_type === type
    )
    renderBreweries(filtered)
  }
}
