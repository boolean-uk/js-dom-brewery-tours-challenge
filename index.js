// create state object of breweries
state = {
    breweries:[],
// add filters to state
    acceptedBrewType: ['micro', 'brewpub', 'regional'],
    filterByBrewType: [],
    filterByName: [],
    filterByCity: [],
    cities: [],
    citiesChecked:[]
}
// search by name 
function createSearchByName(){
const article = document.querySelector('article')
let theFirstChild = article.firstChild

const searchByName = document.createElement('header')
searchByName.setAttribute('class', 'search-bar')
const searchByNameForm = document.createElement('form')
searchByNameForm.id = 'search-breweries-form'
searchByNameForm.autocomplete = 'off'
searchByNameLabel = document.createElement('label')
searchByNameLabel.for = 'search-breweries'
searchByNameHeading = document.createElement('h2')
searchByNameHeading.innerText = 'Search breweries'
searchByNameInput = document.createElement('input')
searchByNameInput.id = 'search-breweries'
searchByNameInput.name = 'search-breweries'
searchByNameInput.type = 'text'

searchByNameLabel.appendChild(searchByNameHeading)
searchByNameForm.appendChild(searchByNameLabel)
searchByNameForm.appendChild(searchByNameInput)
searchByName.appendChild(searchByNameForm)
article.insertBefore(searchByName, theFirstChild)
}
createSearchByName()
// filter by city
const aside = document.getElementsByTagName('aside')[1]
const cityFilter = document.createElement('div')

cityFilter.innerHTML = 
`<div class="filter-by-city-heading">
<h3>Cities</h3>
<button class="clear-all-btn">clear all</button>
</div>
<form id="filter-by-city-form">
`
aside.appendChild(cityFilter)

const form = document.getElementById('filter-by-city-form')

// query select-state & submit & breweries-list
const stateInput = document.getElementsByTagName("input")[0]
const submit = document.getElementsByTagName("input")[1]
const breweryUl = document.querySelector('.breweries-list')

// target select options
const select = document.getElementsByTagName("select")[0]

// add eventlistener on submit 
submit.addEventListener('click', (event)=>{
    event.preventDefault()

// click interpolates url & users input at select-state
    const uri = 
    `https://api.openbrewerydb.org/breweries?by_state=${stateInput.value}`
    currentState = stateInput.value
// fetch to get list of breweries by given state
    fetch(uri)
    .then((response) => {
        return response.json()
    })
    .then((breweries) =>{
// update state with list of breweries        
        state.breweries = breweries
// render brewery cards
    checkFilters()
    })
    }
)
function renderBrews (brew){
    const brewCard = document.createElement('li')
        breweryUl.appendChild(brewCard)

        const brewName = document.createElement('h2')
        brewName.innerText = brew.name
        brewCard.appendChild(brewName)

        const brewType = document.createElement('div')
        brewType.setAttribute('class', 'type')
        brewType.innerText = brew.brewery_type
        brewCard.appendChild(brewType)

        const addSec = document.createElement('section')
        addSec.setAttribute('class', 'address')
        brewCard.appendChild(addSec)
        const add = document.createElement('h3')
        add.innerText = 'Address'
        addSec.appendChild(add)
        const street = document.createElement('p')
        street.innerText = brew.street
        addSec.appendChild(street)
        const city = document.createElement('p')
        city.setAttribute('style', 'font-weight: bold')
        city.innerText = `${brew.city}, ${brew.postal_code}`
        addSec.appendChild(city)

        const phoneSec = document.createElement('section')
        brewCard.appendChild(phoneSec)
        const phone = document.createElement('h3')
        phone.innerText = 'Phone'
        phoneSec.appendChild(phone)
        const phoneNum = document.createElement('p')
        phoneNum.innerText = brew.phone
        phoneSec.appendChild(phoneNum)

        const linkSec = document.createElement('section')
        linkSec.setAttribute('class', 'link')
        brewCard.appendChild(linkSec)
        const link = document.createElement('a')
        link.innerText = 'Visit Website'
        link.href = brew.website_url
        linkSec.appendChild(link)
// create city list with possible duplicates
        state.cities.push(brew.city)
}
function checkFilters (){
    breweryUl.innerHTML = ''
    form.innerHTML = ''
    // state.cities = []
// implement initial type filter
    let filteredList = state.breweries.filter((brew)=> {
        if (state.acceptedBrewType.includes(brew.brewery_type)){
            return brew
        }
    })
// implement other filters
    if (state.filterByBrewType.length > 0){
        filteredList = state.filterByBrewType
    }
    if (state.filterByName.length > 0){
        filteredList = state.filterByName
    }

    if (state.filterByCity.length > 0){
        console.log(state.filterByCity)

        filteredList = state.filterByCity
    }
// create filtered state brewery list
    filteredList.forEach((brew)=> {

        renderBrews(brew)
    })
// render city list without duplicates
    let filteredCities = state.cities.filter((element, index) => {
            return state.cities.indexOf(element) === index;
        });
        filteredCities.forEach((city)=>{

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.name = city
            checkbox.value = city
            const label = document.createElement('label')
            label.for = city
            label.innerText = city

            form.appendChild(checkbox)
            form.appendChild(label)

            if (state.citiesChecked.includes(city)){
                checkbox.checked = true
            }
            else {
                checkbox.checked = false
            }

            checkbox.addEventListener('change',() => {

                state.filterByCity = state.breweries.filter((brew)=>{
                if (checkbox.checked === true) {
                    
                    if (brew.city === checkbox.name){
                        state.citiesChecked.push(brew.city)
                        // console.log(state.citiesChecked.indexOf(brew.city))
                        // console.log(state.citiesChecked)
                        return brew
                    }

                    checkFilters()
                }
                else {
                    const index = state.citiesChecked.indexOf(brew.city)
                    state.citiesChecked.splice(index, 1)
                }
                    checkFilters()
              })
            })
        })
}

//                          ---- filters -----

// filter by type
select.addEventListener('change', ()=>{

    state.filterByBrewType = state.breweries.filter((brew)=>{
        if (select.value === brew.brewery_type){
        return brew
    }
    })
            checkFilters()
})
// filter by name
searchByNameInput.addEventListener('keyup', ()=>{
    state.breweries.forEach((brew)=>{
        brew.name = brew.name.toLowerCase()
    })
    searchByNameInput.value = searchByNameInput.value.toLowerCase()
    state.filterByName = state.breweries.filter((brew) => {
    let searchChar = searchByNameInput.value

            if (brew.name.includes(searchChar)){
                console.log(brew)
                return brew
            }
        })
            checkFilters()
})
