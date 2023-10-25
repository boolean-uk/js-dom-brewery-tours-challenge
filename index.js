//PLAN
// 1.  -Import/fetch data of breweries from the api and list them 
//     -put an event listener that on submit shows the user what they searched for
//     -filter the data so that it ONLY shows THE TYPE of breweries THAT OFFERS TOURS
//     -Every brewery shoud contain the following details:
//          + NAME
//          + TYPE OF BREWERY
//          + ADRESS
//          + PHONE NUMBER
//
// 2. From the list of breweries a user can visit their website
// 3. From the "filter by type" section, a user can filter by type a brewery

const state = {
    breweries : []
}

const data = state.breweries

const form = document.querySelector('#select-state-form')
const searchInput = document.querySelector('#select-state')
const brewUl = document.querySelector('#breweries-list')
const filter = document.querySelector('#filter-by-type')

//EVENT LISTENER TO SEARCH
form.addEventListener('submit', search)

function search(event) {
  event.preventDefault()
  const byState = searchInput.value
  fetchData(byState)
  form.reset()
}

//FETCH AND FILTER THE DATA
function fetchData(byState) {
  const url = `https://api.openbrewerydb.org/v1/breweries?by_state=${byState}`

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    state.breweries = data.filter((brewery) =>
      ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type))
      renderListOfBreweries(state.breweries)
    })
}

//LIST OF BREWERIES
function renderListOfBreweries(breweries) {
    brewUl.innerHTML = ''

    state.breweries.forEach((brewery) => {
        const li = document.createElement('li')
        const breweryName = document.createElement('h2')
        breweryName.innerText = brewery.name
        li.append(breweryName)

        const breweryType = document.createElement('div')
        breweryType.setAttribute('class', 'type')
        breweryType.innerText = brewery.brewery_type
        li.append(breweryType)

        const section1 = document.createElement('section')
        section1.setAttribute('class', 'adress')
        const breweryAdress = document.createElement('h3')
        breweryAdress.innerText = 'Adress:'
        const brewerySreet = document.createElement('p')
        brewerySreet.innerText = brewery.street 
        const postalCode = document.createElement('strong')
        postalCode.innerText = brewery.city + ', ' + brewery.postal_code
        section1.append(breweryAdress, brewerySreet, postalCode)
        li.append(section1)

        const section2 = document.createElement('section')
        section2.setAttribute('class', 'phone')
        const breweryPhoneNumber = document.createElement('h3')
        breweryPhoneNumber.innerText = 'Phone:'+ brewery.phone
        section2.append(breweryPhoneNumber)
        li.append(section2)

        const section3 = document.createElement('section')
        section3.setAttribute('class', 'link')
        const breweryWebsiteLink = document.createElement('a')
        breweryWebsiteLink.href = brewery.website_url
        breweryWebsiteLink.innerText = 'VISIT WEBSITE'
        section3.append(breweryWebsiteLink)
        li.append(section3)

        brewUl.append(li)


    })
}

//EVENT LISTENER TO FILTER
filter.addEventListener('change', event => {
  const type = filter.value
  if (type === 'no_filter') {
    renderListOfBreweries(state.breweries)
  } else {
    const filtered = state.breweries.filter(
      (brewery) => brewery.brewery_type === type
    )
    renderListOfBreweries(filtered)
  }
})
