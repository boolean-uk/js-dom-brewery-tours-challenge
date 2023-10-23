//EXTENSION 4


const removeCurrentList = () => {
    const currentList = breweriesList.querySelectorAll('li')
    currentList.forEach(e => e.remove())
}

const backToHomePageButton = () => {
    const selectStateSection = document.querySelector(".select-state-section")
    const backHomeButton = document.createElement('a')
    selectStateSection.prepend(backHomeButton)
    backHomeButton.innerText = "Home"
    backHomeButton.setAttribute('href', './index.html')
}
backToHomePageButton()


const renderSelectedBreweriesList = () => {
    const breweriesList = document.querySelector("#breweries-list")
    state.myList.forEach(brewery => {
        const breweriesListItem = document.createElement('li')
        breweriesList.append(breweriesListItem)

        const breweryName = document.createElement('h2')
        breweryName.innerText = `${brewery.name}`
        breweriesListItem.append(breweryName)

        const deleteBreweryButton = document.createElement('button')
        deleteBreweryButton.setAttribute('class', 'delete-brewery-button breweries-list')
        breweriesListItem.append(deleteBreweryButton)
        deleteBreweryButton.innerText = "delete"
        deleteBreweryButton.setAttribute('value', `${brewery.name}`)
    })
}


const deleteBreweryButtonEvent = () => {
    state.myList.forEach(brewery => {
    const deleteBreweryButton = document.querySelector('.delete-brewery-button')
    deleteBreweryButton.addEventListener('click', event => {
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(brewery)
        }
        if (event.target.value === brewery.name){
            fetch(`http://localhost:3000/myList/${brewery.id}`, options)
            .then( r =>{
                removeCurrentList()
                fetch("http://localhost:3000/myList")
                .then(r => r.json())
                .then(data => {
                state.myList = data
                renderSelectedBreweriesList()
                deleteBreweryButtonEvent()
                })
            })
                 
        }
    })
})
}






fetch("http://localhost:3000/myList")
.then(r => r.json())
.then(data => state.myList = data)
.then(d => { 
    renderSelectedBreweriesList()
    deleteBreweryButtonEvent()
})
    


