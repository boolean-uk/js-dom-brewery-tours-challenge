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
const type = document.querySelector('#filter-by-type')
const typeInput = document.querySelector('option')

const brew = {
    brewerys: [],

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
            const strong = document.createElement('strong')

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
            strong.innerText = `${brewery.city}, ${brewery.postal_code.slice(0, 5)}`
            h3Contact.innerText = 'Phone:'
            if (brewery.phone) {
                pTagContact.innerText = `${brewery.phone}`
            }
            else {
                pTagContact.innerText = 'N/A'
            }
            aTagLink.innerText = 'Visit Website'
            if (brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub') {
                // appending
                pTagAddressTwo.append(strong)
                sectionAddress.append(h3Address, pTagAddress, pTagAddressTwo)
                sectionContact.append(h3Contact, pTagContact)
                sectionLinks.append(aTagLink)
                li.append(h2name, divType, sectionAddress, sectionContact, sectionLinks)
                breweryList.append(li)
  type.selectedIndex = 0
            }
        
        })

}




function listenToTypeOfBrewery() { 
    type.addEventListener('change', function typeSelect(event) {

        const typeOfBrew = event.target.value
        console.log(typeOfBrew);
if(typeOfBrew === 'micro') 
        {
            rendertypeBrewerys(typeOfBrew)
   
        }
        if(typeOfBrew === 'brewpub') 
        {

            rendertypeBrewerys(typeOfBrew)
         
        }
        if(typeOfBrew === 'regional') 
        {
        
            rendertypeBrewerys(typeOfBrew)
        }
        if(typeOfBrew === '') 
        {
            renderBrewerys()
            
        }


  

     }) 
}




renderBrewerys()
listenToTypeOfBrewery()



function rendertypeBrewerys(type) {
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
            const strong = document.createElement('strong')

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
            strong.innerText = `${brewery.city}, ${brewery.postal_code.slice(0, 5)}`
            h3Contact.innerText = 'Phone:'
            if (brewery.phone) {
                pTagContact.innerText = `${brewery.phone}`
            }
            else {
                pTagContact.innerText = 'N/A'
            }
            aTagLink.innerText = 'Visit Website'
            if (brewery.brewery_type === type) {
                // appending
                pTagAddressTwo.append(strong)
                sectionAddress.append(h3Address, pTagAddress, pTagAddressTwo)
                sectionContact.append(h3Contact, pTagContact)
                sectionLinks.append(aTagLink)
                li.append(h2name, divType, sectionAddress, sectionContact, sectionLinks)
                breweryList.append(li)
  type.selectedIndex = 0
            }
        
        })

}
