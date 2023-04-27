const selectStateForm = document.getElementById('select-state-form')
const ul = document.getElementById('breweries-list')
const filterList = document.getElementById('filter-by-type')
const getBreweriesAmount = 20

const state = {
  breweries: [],
  filteredBy: 'none'
}

// API Code

function getBreweriesByState(currState) {
  fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${currState}&per_page=${getBreweriesAmount}`)
  .then(response => {
    console.log('Response Recieved...')
    return response.json()
  })
  .then(data => {
    state.breweries = data
    console.log('Updated State...', data)
    console.log('Updated State...', state.breweries)
    render()
  })
}

// Create Elements on the page

function createListItem(brewery) {
  if (
  brewery.brewery_type != 'micro' &&
  brewery.brewery_type != 'brewpub' && 
  brewery.brewery_type != 'regional') {
    return
  }

  if (state.filteredBy === 'micro' && brewery.brewery_type != 'micro') {
    return
  }

  if (state.filteredBy === 'brewpub' && brewery.brewery_type != 'brewpub') {
    return
  }

  if (state.filteredBy === 'regional' && brewery.brewery_type != 'regional') {
    return
  }
  

  
  console.log('In createListItem')
  const li = document.createElement('li')
  const h2 = document.createElement('h2')
  const div = document.createElement('div')
  div.classList = 'type'
  div.innerText = brewery.brewery_type

  const addressSection = document.createElement('section')
  addressSection.classList = 'address'

  const addressSectionTitle = document.createElement('h3')
  addressSectionTitle.innerText = 'Address:'

  const addressSectionParagraph = document.createElement('p')
  addressSectionParagraph.innerText = brewery.address_1

  const addressSectionParagraph2 = document.createElement('p')
  const addressSectionParagraphStrong = document.createElement('strong')
  addressSectionParagraphStrong.innerText = `${brewery.city}, ${brewery.postal_code}`

  addressSectionParagraph2.append(addressSectionParagraphStrong)
  addressSection.append(addressSectionTitle, addressSectionParagraph, addressSectionParagraph2)
  
  
  const phoneSection = document.createElement('section')
  const phoneSectionTitle = document.createElement('h3')
  phoneSectionTitle.innerText = 'Phone:'

  const phoneSectionParagraph = document.createElement('p')
  phoneSectionParagraph.innerText = brewery.phone

  phoneSection.append(phoneSectionTitle, phoneSectionParagraph)


  const linkSection = document.createElement('section')
  const linkSectionLink = document.createElement('a')
  linkSectionLink.href = brewery.website_url
  linkSectionLink.target = '_blank'
  linkSectionLink.innerText = 'Visit Website'

  linkSection.append(linkSectionLink)

  li.append(h2, div, addressSection, phoneSection, linkSection)
  ul.append(li)
}

function render() {
  console.log('In Render')
  ul.innerHTML = ''
  state.breweries.forEach(brewery => {
    createListItem(brewery)
  })
}

function init() {
  selectStateForm.addEventListener('submit', event => {
    event.preventDefault()
    const data = document.getElementById('select-state').value
    const searchQuery = data.toLowerCase().split(' ').join('_')
    getBreweriesByState(searchQuery)
  })

  filterList.addEventListener('change', () => {
    
    const selectedFilter = filterList.selectedOptions[0].innerText.toLowerCase()
    if(selectedFilter === 'select a type...') {
      state.filteredBy = 'none'
    } else {
      state.filteredBy = selectedFilter
    }
    render()
  })
  render()
}

init()