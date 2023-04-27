const state = {
  types: ['micro', 'regional', 'brewpub'],
  breweries: [],
  filterByType: '',
  search: ''
}
const renderBreweryList = document.querySelector('#breweries-list')
const byType = document.querySelector('#filter-by-type')
const input = document.querySelector('#select-state')
const stateForm = document.querySelector('#select-state-form')

stateForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const searchInput = input.value.toLowerCase().trim()
  state.search = searchInput
  searchInput.value = ''
  console.log(state.search)
  getBreweryData()
})

function getBreweryData() {
  const uri = `https://api.openbrewerydb.org/breweries?by_state=${state.search}`
  fetch(uri)
    .then((response) => {
      return response.json() // turns the respone into a Json format
    })
    .then((breweries) => {
      breweries.forEach((brewery) => {
        if (
          brewery.brewery_type === 'brewpub' ||
          brewery.brewery_type === 'micro' ||
          brewery.brewery_type === 'regional'
        ) {
          state.breweries.push(brewery)
        }
        if (byType.value !== '') {
          state.filterByType = state.breweries.filter((brewery) => {
            return byType.value === brewery.brewery_type
          })
          console.log('test1', state.filterByType)
          renderedBreweyInfo(state.filterByType)
        } else {
          console.log('test2', state.breweries)
          renderedBreweyInfo(state.breweries)
        }
        console.log('filtered list:', state.breweries) // filter function is working but the render is not.
      })
    })

  state.breweries = []
}

byType.addEventListener('change', (event) => {
  state.filterByType = state.breweries.filter((brewery) => {
    return byType.value === '' || brewery.brewery_type === byType.value
  })
  console.log('by type:', state.filterByType)
  renderedBreweyInfo(state.filterByType)
})

//

function renderedBreweyInfo(breweries) {
  renderBreweryList.innerText = ''

  console.log('this is the breweries:', breweries)
  // had to change my forEach()
  breweries.forEach((brewery) => {
    const li = document.createElement('li')
    renderBreweryList.appendChild(li)

    const h2 = document.createElement('h2')
    h2.innerText = brewery.name
    li.appendChild(h2)

    const div = document.createElement('div')
    div.setAttribute('class', 'type')
    div.innerText = brewery.brewery_type
    li.appendChild(div)

    const section1 = document.createElement('section')
    section1.setAttribute('class', 'address')
    li.appendChild(section1)

    const h3address = document.createElement('h3')
    h3address.innerText = 'Address:'
    section1.appendChild(h3address)

    const p1 = document.createElement('p')
    p1.innerText = brewery.street
    section1.appendChild(p1)

    const p2 = document.createElement('p')
    p2.innerText = brewery.city + ' ' + brewery.postal_code
    p2.setAttribute('style', ' bold')
    section1.appendChild(p2)

    const section2 = document.createElement('section')
    section2.setAttribute('class', 'phone')
    li.appendChild(section2)

    const h3phone = document.createElement('h3')
    h3phone.innerText = 'Phone:'
    section2.appendChild(h3phone)

    const p3 = document.createElement('p')
    p3.innerText = brewery.phone
    section2.appendChild(p3)

    const section3 = document.createElement('section')
    section3.setAttribute('class', 'link')
    li.appendChild(section3)

    const a = document.createElement('a')
    a.setAttribute('href', brewery.website_url)
    a.setAttribute('target', '_blank')
    a.innerText = 'Visit Website'
    section3.appendChild(a)

    renderBreweryList.appendChild(li)
  })
  console.log('is rendering:2')
}

renderedBreweyInfo()
