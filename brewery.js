// 1. i got comfortable with the data looking at i
// on insomnia
// 2. i created this empty Brews array
// in a state object to put data inside
const state = {
    Brews: [],
    Cities: ['Cincinnati', 'Mason', 'Whitehall', 'Defiance', 'Columbus', 'Akron', 'Cleveland', 'Mount Orab', 'Lorain', 'Austintown', 'Columbiana', 'Toledo', 'Holland', 'Holland', 'Lakewood', 'Bowling Green', 'Dayton', 'Wilmington', 'Cleveland Heights', 'Strongsville', 'Canal Winchester', 'Logan', 'Willoughby', 'Buckeye Lake', 'Newark', 'Canton', 'Port Clinton', 'Mentor', 'Warren'],
    pages: 0,
    pageNum: 0
}

// 3. a function to fetch all the breweries from API
const getBreweries = (array) => {
    if (filter.value === ""){
        fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=200&by_state=${searchValue}`)
        .then(function (response) {
            return response.json()
        })
        .then((data) => {
            // 4. stores the data into Brews and console
            // logged to double check to see how data 
            // is presented
            state.Brews = data
            renderBrews(array, searchValue)
        })
    }
    else {
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${filter.value}&by_state=${searchValue}`)
        .then(function (response) {
            return response.json()
        })
        .then((data) => {
            // 14. stores the data into Brews based on brew type 
            state.Brews = data
            renderBrews(array, searchValue)
        })
    }
}
// 5. using the template provided i will create a 
// rendering function for the breweries
// - created queryselector to append breweries to
const ul = document.querySelector('.breweries-list')
// 12. i will select the search button and add an event
// listener then hold the value of the submit button
// in a varialbe so the user can search brews by state
const search = document.querySelector('#select-state-form')
const input = document.querySelector('#select-state')
let searchValue = ""
search.addEventListener(('submit'), (event) => {
    event.preventDefault()
    searchValue = input.value.toLowerCase()
    getBreweries(state)
    console.log(searchValue)
    console.log(filter.value)
    // 13. on line 89 i created an if statement to only
    // append li when state name and searched name are
    // the same
    // search.reset() > decided looks better without
})
const pageButtContainer = document.createElement('div')

const renderBrews = (array, searchValue) => {
    // clear inner html to start with a blank canvas
    ul.innerHTML = ''
    state.pages = 0
    // 6. loop through Brews array to append data into
    // visible stuff on my page
    for (let i = 0; i < array.Brews.length; i++) {
        // 7. create all the tags i know i will need
        // in this function
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const div = document.createElement('div')
        const addressSection = document.createElement('section')
        const adrsH3 = document.createElement('h3')
        const adrsP = document.createElement('p')
        const strong = document.createElement('strong')
        const strongP = document.createElement('p')
        const phoneSection = document.createElement('section')
        const phoneH3 = document.createElement('h3')
        const phoneP = document.createElement('p')
        const linkSection = document.createElement('section')
        const link = document.createElement('a')

        // 8. apply corresponding class/id/attr's
        div.classList.add('type')
        addressSection.classList.add('address')
        phoneSection.classList.add('phone')
        linkSection.classList.add('link')
        link.target = '_blank'
        // 9. i decide to contain the website url (href)
        // in a variable for easier readability
        let url = array.Brews[i].website_url
        link.href = `${url}`
        // 10. i will input corresponding innerText
        h2.innerText = `${array.Brews[i].name}`
        div.innerText = `${array.Brews[i].brewery_type}`
        adrsH3.innerText = 'Address:'
        adrsP.innerText = `${array.Brews[i].address_1}`
        strong.innerText = `${array.Brews[i].city}, ${array.Brews[i].postal_code}`
        phoneH3.innerText = 'Phone:'
        phoneP.innerText = `${array.Brews[i].phone}`
        link.innerText = 'Visit Website'

        // 11. (12 on line 26)now to append each tag in appropriate place
        strongP.append(strong)
        // any section that has it's own child i will do those first
        addressSection.append(adrsH3, adrsP, strongP)
        phoneSection.append(phoneH3, phoneP)
        linkSection.append(link)
        // now append all into my li then li into the ul
        li.append(h2, div, addressSection, phoneSection, linkSection)
        for(let j = 0; j <= checkboxValHolder.length; j++) {
            if (array.Brews[i].state.toLowerCase() === searchValue && checkboxValHolder.length === 0) {
                ul.append(li)
                state.pages += 1
            }
            else if (array.Brews[i].state.toLowerCase() === searchValue && checkboxValHolder[j] === array.Brews[i].city){
                ul.append(li)
                state.pages += 1
            }
        }
    }
    console.log('pages is now 2: ', state.pages)
    h1.insertAdjacentElement('beforeend', pageButtContainer)
    pageButtContainer.innerHTML = ''
    const currentPage = {
        Brews: []
    }
    const createButtons = () => {
        for ( let k = 0; k < Math.floor(state.Brews.length / 10); k++){
            const pageButt = document.createElement('button')
            pageButt.innerText = `${k + 1}`
            pageButtContainer.append(pageButt)
            pageButt.addEventListener('click', () => {
                currentPage.Brews = state.Brews.filter((brew, idx) => {
                    if (k * 10 <= idx && idx < k * 10 + 10) return brew
                })
                state.pageNum = k + 1
                getBreweries(currentPage)
                console.log(currentPage)
                console.log(state)
            })
        }
    }
    createButtons()
}
// 15. targetted filter options to get the value and applied
// it to my getBreweries function on line 25
const filter = document.querySelector('#filter-by-type')
const filterChanger = document.querySelector('#filter-by-type-form')
filterChanger.addEventListener('input', (event) => {
    event.preventDefault()
    if(ext1Input.value === ''){
        getBreweries(state)
    }
    else {
        getBreweries(arraySearchedByName)
        ext1Input.value = ''
    }
})
// 16. Updated all rendering functions to take an extra arg
// which is an array arg so instead of just rendering state
// it can render any array it takes
// EXTENSION 1
// 17. create search form with template provided 
const ext1Header = document.createElement('header')
const ext1Form = document.createElement('form')
const ext1Label = document.createElement('label')
const ext1Input = document.createElement('input')
const ext1H2 = document.createElement('h2')

ext1Header.classList.add('search-bar')
ext1Form.setAttribute('id', 'search-breweries-form')
ext1Form.setAttribute('autocomplete', 'off')
ext1Form.setAttribute('onsubmit', 'return false')
ext1Label.setAttribute('for', 'search-breweries')
ext1H2.innerText = 'Search breweries:'
ext1Input.setAttribute('id', 'search-breweries')
ext1Input.setAttribute('name', 'search-breweries')
ext1Input.setAttribute('type', 'text')

ext1Label.append(ext1H2)
ext1Form.append(ext1Label, ext1Input)
ext1Header.append(ext1Form)

const h1 = document.querySelector('h1')
h1.insertAdjacentElement("afterend", ext1Header)


// 18. create an event listener to handling creating a new array
// with each input based on whether the current value can be found
// in any parts of an element and rendering the list
const arraySearchedByName = {
    Brews: []
}
ext1Form.addEventListener('input', (event) => {
    event.preventDefault()
    arraySearchedByName.Brews = []
    let name = ext1Input.value
    // 19. capitalise first letter of each word, same as 
    // the name of the breweries
    name = name.charAt(0).toUpperCase() + name.slice(1)
    for(let i = 0; i < name.length; i++){
        if (name.charAt(i) === ' ') {
            name = name.slice(0, i + 1) + name.charAt(i+1).toUpperCase() + name.slice(i+2)
        }
    }
    // 20. look for brewers who's names include the users input
    // and store it in a new array on line 152
    state.Brews.filter((brew) => {
        let brewer = brew.name
        if(brewer.includes(name)){
            return arraySearchedByName.Brews.push(brew)
        }
    })
    console.log(name)
    // render with the new array
    getBreweries(arraySearchedByName)
})

// EXTENSION 2
// 21. create elements for EXT.2 template
const ext2div = document.createElement('div')
const ext2h3 = document.createElement('h3')
const ext2button = document.createElement('button')
const ext2form = document.createElement('form')

ext2div.classList.add('filter-by-city-heading')
ext2h3.innerText = 'Cities'
ext2button.classList.add('clear-all-btn')
ext2button.innerText = 'clear all'
ext2form.setAttribute('id', 'filter-by-city-form')

const checkboxValHolder = []
ext2div.append(ext2h3, ext2button)
// 22. (23 on line 111) Added city names in the state to create the checkboxes
for(let i = 0; i < state.Cities.length; i++) {
    const ext2input = document.createElement('input')
    ext2input.setAttribute('type', 'checkbox')
    ext2input.setAttribute('name', `${state.Cities[i]}`)
    ext2input.setAttribute('value', `${state.Cities[i]}`)
    const ext2label = document.createElement('label')
    ext2label.setAttribute('for', `${state.Cities[i]}`)
    ext2label.innerText = `${state.Cities[i]}`
    ext2input.addEventListener('change', () => {
        if (checkboxValHolder.includes(ext2input.value)){
            let index = checkboxValHolder.indexOf(ext2input.value)
            checkboxValHolder.splice(index, 1)
        }
        else {
            checkboxValHolder.push(ext2input.value)
        }
    })
    ext2form.append(ext2input, ext2label)
}
getBreweries(state)
filterChanger.insertAdjacentElement('beforeend', ext2div)
ext2div.insertAdjacentElement('afterend', ext2form)

