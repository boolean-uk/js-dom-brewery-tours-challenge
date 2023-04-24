const form = document.querySelector('#select-state-form')
const formInput = document.querySelector('input[type=text]')
const ul = document.querySelector('#breweries-list')
console.log(ul)


const state = {
    breweryArr: []
}

// adding an event listener to the form 
form.addEventListener('submit', (e)=>{
    e.preventDefault()

    let userInput = formInput.value.toLowerCase().split(' ').join('_')
    console.log(`userInput`, userInput)

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${userInput}`)
    .then((response) =>{
       return response.json()
    })
    .then((data) => {
        console.log(data)
      let filtered =  data.filter((brewery) =>  brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub')
        console.log(`filtered`,filtered)
        state.breweryArr = filtered
        console.log(`state.breweryArr`,state.breweryArr)
        renderBreweries()
        form.reset()
    })
})

// creating a function to render breweries
const renderBreweries = () => {
    ul.innerHTML = ''
    state.breweryArr.forEach((element) =>{
        const li = document.createElement('li')
        ul.append(li)
        const h2 = document.createElement('h2')
        h2.innerHTML = element.name
        const div = document.createElement('div')
        div.setAttribute('class', 'type')
        div.innerHTML = element.brewery_type

        // address section
        const addresSection = document.createElement('section')
        addresSection.setAttribute('class', 'address')
        const h3Address = document.createElement('h3')
        h3Address.innerHTML = 'Address:'
        const pAddressStrt = document.createElement('p')
        pAddressStrt.innerHTML = element.address_1
        const pAddressCity = document.createElement('p')
        pAddressCity.innerHTML = `<strong>${element.city}, ${element.postal_code}</strong>`
        addresSection.append(h3Address, pAddressStrt, pAddressCity)

        // phone section
        const phoneSection = document.createElement('section')
        phoneSection.setAttribute('class', 'phone')
        const h3Phone = document.createElement('h3')
        h3Phone.innerHTML = 'Phone:'
        const phoneNr = document.createElement('p')
        phoneNr.innerHTML = element.phone
        phoneSection.append(h3Phone,phoneNr)

        // link section
        const linkSection = document.createElement('section')
        linkSection.setAttribute('class', 'link')
        const website = document.createElement('a')
        website.setAttribute('href', `${element.website_url}`)
        website.innerHTML = 'Visit Website'
        website.setAttribute('target', '_blank')
        linkSection.append(website)

        li.append(h2,div,addresSection,phoneSection,linkSection)
    })
}

console.log(state.breweryArr)