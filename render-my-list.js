//EXTENSION 4


const removeCurrentList = () => {
    const currentList = breweriesList.querySelectorAll('li')
    currentList.forEach(e => e.remove())
}

const renderBackToHomePageButton = () => {
    const selectStateSection = document.querySelector(".select-state-section")
    const backHomeButton = document.createElement('a')
    selectStateSection.prepend(backHomeButton)
    backHomeButton.innerText = "Home"
    backHomeButton.setAttribute('href', './index.html')
}

renderBackToHomePageButton()

//I've tried to refactor this - any attempt to put some of the code that generates part or all of the elements for each brewery into a smaller function, and to call said function, resulted in the oddest bugs (eg the right number of delete buttons appearing, but all of them appending themselves to the first brewery only, or - my personal favourite, the event listener only existing for the delete button contained within the first li item. I'm pretty sure it's something to do with sync VS async, but have come nowhere near solving it (or narrowing it down to a questin clear enough to be answered, hence my leaving this comment here). It works fine as is, but it is one chunky function)
const renderSelectedBreweriesList = () => {
    const breweriesList = document.querySelector("#breweries-list")
    state.myList.forEach(brewery => {

        const breweriesListItem = document.createElement('li')
        breweriesList.append(breweriesListItem)

        const breweryName = document.createElement('h2')
        breweryName.innerText = `${brewery.name}`
        breweriesListItem.append(breweryName)

        const a = document.createElement('a')
        a.setAttribute('href', `${brewery.website_url}`)
         a.setAttribute('target', 'blank')
         a.innerText = 'Visit Website'
        breweriesListItem.append(a)
    
        const deleteBreweryButton = document.createElement('button')
        deleteBreweryButton.setAttribute('class', 'delete-brewery-button breweries-list')
        breweriesListItem.append(deleteBreweryButton)
        deleteBreweryButton.innerText = "delete"
  
        deleteBreweryButton.setAttribute('value', `${brewery.name}`)
        deleteBreweryButton.addEventListener('click', event => {
            if (event.target.value === brewery.name){

                const options = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(brewery)
                }
    
                fetch(`http://localhost:3000/myList/${brewery.id}`, options)
                .then( r =>{
                    removeCurrentList()
                    fetch("http://localhost:3000/myList")
                    .then(r => r.json())
                    .then(data => state.myList = data)
                    .then(d => { 
                        renderSelectedBreweriesList()
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
})

