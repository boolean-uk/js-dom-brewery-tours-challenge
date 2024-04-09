
const mainHeader = document.querySelector('.main-header')
const selectStateSection = document.querySelector('.select-state-section')
const selectStateFormId = document.querySelector('#select-state-form')
const selectStateId = document.querySelector('#select-state')
const filterSection = document.querySelector('.filters-section')
const filterByTypeForm = document.querySelector('#filter-by-type-form')
const filterByTpyeId = document.querySelector('#filter-by-type')
const breweriesListUl = document.querySelector('#breweries-list')

const getUrl = 'https://api.openbrewerydb.org/v1/breweries'

selectStateFormId.addEventListener('submit',(event) => {
  event.preventDefault()
  const state = selectStateId.value
  breweriesListUl.innerHTML = ''
  getFetch(state)
})

filterByTpyeId.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.value === 'micro' || event.target.value === 'regional' ||event.target.value === 'brewpub') {
    const selectedType = event.target.value;
    if (selectedType) {
      breweriesListUl.innerHTML = '';
      getFetchByType(selectedType);
    }
  }
})

function getFetchByType(type){
  fetch(getUrl)
    .then(res => res.json())
    .then(json => {
      const filteredByType = json.filter(brewer => {
        return [type].includes(brewer.brewery_type)
      })
      console.log(filteredByType)
      filteredByType.forEach(item => listOfBreweries(item))
    })
}
function getFetch(searchState) {
  fetch(getUrl)
    .then(res => res.json())
    .then(json => {
        const filteredBreweries = json.filter(brewer => {
            return (!searchState || brewer.state === searchState) &&
                ['micro', 'brewpub', 'regional'].includes(brewer.brewery_type);
        });
        console.log(filteredBreweries)
        filteredBreweries.forEach(item => listOfBreweries(item));
    });
}

function render(){
  getFetch()
}

function listOfBreweries(brewery){
  const liBreweries = document.createElement('li')
  const h2Name = document.createElement('h2')
  h2Name.innerText = brewery.name

  const divType = document.createElement('div')
  divType.classList.add('type')
  divType.innerText = brewery.brewery_type

  const addressSection = document.createElement('section')
  addressSection.classList.add('address')
  const h3Address = document.createElement('h3')
  h3Address.innerText = 'Address:'
  const p1 = document.createElement('p')
  p1.innerText = brewery.address_1
  const p2 = document.createElement('p')
  const strongP = document.createElement('strong')
  strongP.innerText = `${brewery.city}, ${brewery.postal_code}`
  p2.append(strongP)
  addressSection.append(h3Address, p1, p2)

  const phoneSection = document.createElement('section')
  phoneSection.classList.add('phone')
  const h3Phone = document.createElement('h3')
  h3Phone.innerText = 'Phone:'
  const p3 = document.createElement('p')
  p3.innerText = brewery.phone
  phoneSection.append(h3Phone, p3)

  const linkSection = document.createElement('section')
  linkSection.classList.add('link')
  const aLink = document.createElement('a')
  aLink.setAttribute('href', brewery.website_url)
  aLink.setAttribute('target', '_blank')
  aLink.innerText = 'Visit Website'

  linkSection.append(aLink)
  liBreweries.append(h2Name,divType,addressSection, phoneSection, linkSection )

  breweriesListUl.append(liBreweries)
}

render()