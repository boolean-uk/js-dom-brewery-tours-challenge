// create state object of breweries
state = {
    breweries:[],
// add filters to state
    filterByBrewType: ['micro', 'brewpub', 'regional']
}
// query select-state & submit & breweries-list
const stateInput = document.getElementsByTagName("input")[0]
const submit = document.getElementsByTagName("input")[1]
const breweryUl = document.querySelector('.breweries-list')

// add eventlistener on submit 
submit.addEventListener('click', (event)=>{
    event.preventDefault()
// click interpolates url & users input at select-state
    const uri = 
    `https://api.openbrewerydb.org/breweries?by_state=${stateInput.value}`
// fetch to get list of breweries by given state
    fetch(uri)
    .then((response) => {
        return response.json()
    })
    .then((breweries) =>{
// update state with list of breweries        
        state.breweries = breweries
// render brewery cards
    renderStateSearch()
    })
    }
)
function renderStateSearch (){
    breweryUl.innerHTML = ''
// implement type filter
    let typeFilteredList = state.breweries.filter((brew)=> {
        if (state.filterByBrewType.includes(brew.brewery_type)){
            return brew
        }
    })
// render filtered list
    typeFilteredList.forEach((brew)=> {

        const brewCard = document.createElement('li')
        breweryUl.appendChild(brewCard)

        const brewName = document.createElement('h2')
        console.log(brew)
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
    })
}

