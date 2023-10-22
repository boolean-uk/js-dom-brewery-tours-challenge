
// removes the current breweries list
const removeCurrentList = () => {
    const currentList = breweriesList.querySelectorAll('li')
    currentList.forEach(e => e.remove())
}

//RENDERS THE LIST WHERE THE BREWERIES ARE DISPLAYED

const renderBrewery = (brewery) => {
    const breweryContainer = document.createElement('li')
    breweriesList.append(breweryContainer)
    renderBreweryLayout(breweryContainer, brewery)
}

const renderBreweryLayout = (breweryContainer, brewery) => {

    const h2 = document.createElement('h2')
    breweryContainer.append(h2)
    h2.innerText = brewery.name

    const div = document.createElement('div')
    div.setAttribute('class', 'type')
    div.innerText = brewery.brewery_type
    breweryContainer.append(div)

    const sectionTypes = ["address", "phone", "link"]
    sectionTypes.forEach(sectionClass => {
        const section = document.createElement('section')
        section.setAttribute('class', `${sectionClass}`)
        breweryContainer.append(section)
        renderSectionContent(sectionClass, section, brewery)
    })
}

const renderSectionContent = (sectionClass, section, brewery) => {

    if (sectionClass === "address") {
         
        const h3 = document.createElement('h3')
        h3.innerText = 'Address:'
        section.append(h3)
        const p1 = document.createElement('p')
        p1.innerText = brewery.street
        section.append(p1) 
        const p2 = document.createElement('p')
        section.append(p2)        
        const strong = document.createElement('strong')
        p2.append(strong)
        strong.innerText = `${brewery.city}, ${brewery.postal_code}` 
    }
    if (sectionClass === "phone") {
        const h3 = document.createElement('h3')
        section.append(h3)
        h3.innerText = 'Phone:'
        const p = document.createElement('p')
        section.append(p)
        p.innerText = brewery.phone
    }
    if (sectionClass === "link") {
        const a = document.createElement('a')
        a.setAttribute('href', `${brewery.website_url}`)
         a.setAttribute('target', 'blank')
         a.innerText = 'Visit Website'
        section.append(a)
    }
}


const renderBreweries = (breweriesArray) => {
    removeCurrentList()
    breweriesArray.forEach(brewery => {
        //only show the breweries that offer tours
        if (brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub') {   
            renderBrewery(brewery)  
        } 
    })
}


//RENDERS THE NEWLY ADDED SEARCH BAR (SEARCH BY NAME)

const renderSearchByNameSearchBar = () => {

    const header = document.createElement('header')
        header.setAttribute('class', 'search-bar')
        main.insertBefore(header, breweriesListContainer)
    const searchByNameForm = document.createElement('form')
        searchByNameForm.setAttribute('id', 'search-breweries-form')
        searchByNameForm.setAttribute('autocomplete', 'off')
        header.append(searchByNameForm)
    const searchByNamelabel = document.createElement('label')
        searchByNamelabel.setAttribute('for', 'search-breweries')
        searchByNameForm.append(searchByNamelabel)
    const h2 = document.createElement('h2')
        h2.innerText = "Search Breweries:"
        searchByNamelabel.append(h2)
    const searchByNameInput = document.createElement('input')
        searchByNameInput.setAttribute('name', 'search-breweries')
        searchByNameInput.setAttribute('type', 'text')
        searchByNameInput.setAttribute('id', 'search-breweries')
        searchByNameForm.append(searchByNameInput)
}





//RENDERS THE LIST OF CITIES TO CHOOSE FROM 

const renderCityList = (cities) => {

    //div
    const filterByCityHeading = document.createElement('div')
    filterByCityHeading.setAttribute('class','filter-by-city-heading')
    filtersSection.append(filterByCityHeading)

    //div > h3
    const filterByCityH3 = document.createElement('h3')
    filterByCityH3.innerText = 'Cities'
    filterByCityHeading.append(filterByCityH3)

    //div > button
    const filterByCityButton = document.createElement('button')
    filterByCityHeading.append(filterByCityButton)
    filterByCityButton.setAttribute('class', 'clear-all-btn')
    filterByCityButton.innerText = "clear all"

    //form
    const filterByCityForm = document.createElement('form')
    filterByCityForm.setAttribute('id', 'filter-by-city-form')
    filtersSection.append(filterByCityForm)

    cities.forEach(city => {
        const cityCheckbox = document.createElement('input')
        cityCheckbox.setAttribute('type', 'checkbox')
        cityCheckbox.setAttribute('name', `${city}`)
        cityCheckbox.setAttribute('value', `${city}`)
        filterByCityForm.append(cityCheckbox)
        addEventToCheckbox(cityCheckbox)

        const cityLabel = document.createElement('label')
        cityLabel.setAttribute('for', `${city}`)
        cityLabel.innerText = city
        filterByCityForm.append(cityLabel)
    })   
}
 
const removeCurrentCityList = () => {
    const filterByCityForm = document.querySelector('#filter-by-city-form')
    const filterByCityHeading = document.querySelector('.filter-by-city-heading')

    if (filterByCityForm !== null) {
    filterByCityForm.remove()
    filterByCityHeading.remove()
    }
}


const getAndRenderCities = (array) => {
    state.cities = []
    array.forEach(brewery => {
        if(!state.cities.includes(brewery.city)) {
            state.cities.push(brewery.city)
        }
    })
    removeCurrentCityList()
    renderCityList(state.cities)
}


renderSearchByNameSearchBar()
