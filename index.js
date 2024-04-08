const selectStateForm = document.querySelector('#select-state-form')
const selectStateInput = document.querySelector('#select-state')

async function getAllBreweries() {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${selectStateInput.value}`)
    const data = await response.json()

    console.log(data)
}

selectStateForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await getAllBreweries()
})

