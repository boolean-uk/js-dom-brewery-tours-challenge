// create state object of breweries
// add filters to state
state = {
    breweries:[]
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
// add method dealing with states of more than one word

// fetch to get list of breweries by given state
    fetch(uri)
    .then((response) => {
        return response.json()
    })
    .then((breweries) =>{
// update state with list of breweries        
        state.breweries = breweries
// render brewery cards
    })
    }
)

