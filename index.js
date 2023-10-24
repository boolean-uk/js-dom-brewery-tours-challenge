const root = "https://api.openbrewerydb.org/v1/breweries?by_state"

const state = {
    breweries: []
}

const render = () => {
    formState()
}

const formState = () => {
    const form = document.querySelector('#select-state-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        removeCurrentList()
        const stateToSearch = e.target[0].value
        getBreweriesInfo(stateToSearch)
    })
}   

const removeCurrentList = () => {    
    state.breweries = []
}


const getBreweriesInfo = (stateToSearch) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`${root}=${stateToSearch}` , options)
    .then(response => response.json())
    .then(data => data.forEach(element => {
        state.breweries.push(element)    

    }));
    console.log(state.breweries)
    return state.breweries
}


    

render()