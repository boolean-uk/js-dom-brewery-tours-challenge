// Brewery - plan 

// play around with insomnia to look at the get and make sure it's working
// move on to the search bar and get to work and get input and store it 
// fetch the information from the brewery for that input
// render it using the given template
// look at some past exercises using filter function
console.log('this');
// app.js is connected to the page

const form = document.querySelector('#select-state-form')
const stateInput = document.querySelector('#select-state')
const breweryList = document.querySelector('.breweries-list')

const brew = {
    brewerys: []
}

form.addEventListener('submit', function handle (event) {
    event.preventDefault()
    const state = stateInput.value;
    console.log('value of state is', state);
    const updateState = state.toLowerCase().replaceAll(' ', '_')
    console.log('updateState', updateState);
    form.reset()


// fetch the json

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${updateState}&per_page=10`)
    .then(function (response) {
        console.log('response returned..', response);
        console.log('response body', response.body)
        return response.json()
    })
    .then(function (data) {
        console.log('List of brewerys', data);
        brew.brewerys = data
        console.log('End of getBrewerys', brew);
        renderBrewerys()
    })
  

    
})


// render brewerys

function renderBrewerys() {
    breweryList.innerHTML = ''
    brew.brewerys.forEach(brewery => {
       
            // create elements for
            const li = document.createElement('li')
            const h2name = document.createElement('h2')
            const divType = document.createElement('div')
            const sectionAddress = document.createElement('section')
            const h3Address = document.createElement('h3')
            const pTagAddress = document.createElement('p')
            const pTagAddressTwo = document.createElement('p')
            const sectionContact = document.createElement('section')
            const h3Contact = document.createElement('h3')
            const pTagContact = document.createElement('p')
            const sectionLinks = document.createElement('section')
            const aTagLink = document.createElement('a')

            // set attributes
            divType.setAttribute('class', 'type')
            sectionAddress.setAttribute('class', 'address')
            sectionContact.setAttribute('class', 'phone')
            sectionLinks.setAttribute('class', 'link')
            aTagLink.setAttribute('href', `${brewery.website_url}`)
            aTagLink.setAttribute('target', '_blank')
   

            // innerText
            h2name.innerText = `${brewery.name}`
            divType.innerText = `${brewery.brewery_type}`
            h3Address.innerText = 'Address:'
            pTagAddress.innerText = `${brewery.street}`
            pTagAddressTwo.innerText = `${brewery.city}, ${brewery.postal_code.slice(0, 5)}`
            h3Contact.innerText = 'Phone:'
            pTagContact.innerText = `${brewery.phone}`
            aTagLink.innerText = 'Visit Website'

            // appending
            sectionAddress.append(h3Address, pTagAddress, pTagAddressTwo)
            sectionContact.append(h3Contact, pTagContact)
            sectionLinks.append(aTagLink)
            li.append(h2name, divType, sectionAddress, sectionContact, sectionLinks)
            breweryList.append(li)
        
    })


}




renderBrewerys()