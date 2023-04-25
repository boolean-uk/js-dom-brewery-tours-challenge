// Variables:
const listOfBreweries = document.querySelector('#breweries-list')
const inputs = document.querySelectorAll('input')
const form = document.querySelector('form')
const filterSelect = document.querySelector('#filter-by-type')
const findPositions = (first, second) => {
    const indicies = [];
    first.forEach((element, index) => {
        if(second.includes(element)){
            indicies.push(index);
        };
    });
    return indicies;
};
let searchRecord = []

// write a function using fetch that uses a get request to fetch the JSON files and store it in a state array.

const state = {
    breweryList: []
}



function getBreweryList(stateSearch) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${stateSearch}&per_page=100`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data){
        
        state.breweryList = data
        

        state.breweryList.forEach(object => {
            deleteIncorrectBrewery(object) 
        })
        
        renderBreweryList()
        filterSelect.addEventListener('change', () => {
            renderBreweryList()

        })
        
    })
    
    
}



//The list should only shows the types of breweries that offer brewery tours:
// Micro
// Regional
// Brewpub
function deleteIncorrectBrewery(object){
    if (object.brewery_type !== 'micro' && object.brewery_type !== 'regional' && object.brewery_type !== 'brewpub'){
        
        state.breweryList.splice(state.breweryList.indexOf(object), 1)
    }
    
}




// write a function that renders the list on the page.
function renderBreweryList() {
    listOfBreweries.innerHTML = ''
    
    state.breweryList.forEach(object => {
        deleteIncorrectBrewery(object) 
    })
    state.breweryList.forEach(object => {
        // Create the list item that will contain all the elements that will render the brewery information.
        const listItem = document.createElement('li')
        listOfBreweries.append(listItem)

        // Create the name of the brewery in an h2 element and nest it in the list item.
        const breweryName = document.createElement('h2')
        breweryName.innerText = object.name
        listItem.append(breweryName)

        // create a div element that will display the type of brewery.
        const breweryType = document.createElement('div')
        breweryType.setAttribute('class', 'type')
        breweryType.innerText = object.brewery_type
        listItem.append(breweryType)

        // Create the section that will contain all the information of each brewery and append it to the list item.
        const addressSection = document.createElement('section')
        addressSection.setAttribute('class', 'address')
        listItem.append(addressSection)

        // Create a title using an h3 element that will show the text (Address:), then append it to the address section.
        const addressTitle = document.createElement('h3')
        addressTitle.innerText = 'Address:'
        addressSection.append(addressTitle)

        // Create a p tag that will contain the street of the brewery and append it the the address section. 
        const breweryAddress = document.createElement('p')
        breweryAddress.innerText = object.address_1
        addressSection.append(breweryAddress)

        // create a p tag and a strong tag. Inside the inner text will be the city and zip code of each brewery. The strong tag will be appended in the p tag, and the p tag will be appended in the address section. 
        const breweryCityPostal = document.createElement('p')
        const boldCityPostal = document.createElement('strong')
        boldCityPostal.innerText = `${object.city}, ${object.postal_code}`
        addressSection.append(breweryCityPostal)
        breweryCityPostal.append(boldCityPostal)

        // Create a new section that will contain all the elements that will display the information about the brewery phone number and append it in the list item. 
        const phoneSection = document.createElement('section')
        phoneSection.setAttribute('class', 'phone')
        listItem.append(phoneSection)

        // Create an h3 element that will show the text (Phone:), then append it to the phone section. 
        const phoneTitle = document.createElement('h3')
        phoneTitle.innerText = 'Phone:'
        phoneSection.append(phoneTitle)

        // Create a p tag that will show the brewery phone number, then append it to the phone section. 
        const breweryPhoneNumber = document.createElement('p')
        breweryPhoneNumber.innerText = `${object.phone}`
        phoneSection.append(breweryPhoneNumber)

        // Create a section that will contain the anchor tag and will allow the user to visit the webiste of each brewery, then append it in the list item.
        const sectionLink = document.createElement('section')
        sectionLink.setAttribute('class', 'link')
        listItem.append(sectionLink)

        // Create the anchor tag that will have the text (Visit Website), with the proper attributes that allow the user to visit the website, then append it to the link section.
        const breweryWebsite = document.createElement('a')
        breweryWebsite.setAttribute('href', `${object.website_url}`)
        breweryWebsite.setAttribute('target', '_blank')
        breweryWebsite.innerText = 'Visit Website'
        sectionLink.append(breweryWebsite)


    })
    
   
}

// Add a submit event listener to the form, upon submit the render function will display the list of breweries on the page

form.addEventListener('submit', (event) => {
    event.preventDefault()
    searchRecord.push(inputs[0].value.replace(' ', '_').toLowerCase())
    getBreweryList(searchRecord[searchRecord.length-1])
    
    form.reset()

    

    
})

// - From the 'filter by type of brewery' section, a user can filter by type of brewery.



filterSelect.addEventListener('change', (event) => {
    
    
    // Get the current original state array
    if (state.breweryList.length === 0){
        event.target.value = ''
    } else {
        
        // Use the filter function
        

        filterBrewpub(event.target.value)
        console.log(state.breweryList)

        if (state.breweryList.length === 0){
            fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchRecord[searchRecord.length-1]}&per_page=100`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data){
        
                state.breweryList = data
        

                state.breweryList.forEach(object => {
                    deleteIncorrectBrewery(object) 
                })
                state.breweryList.forEach(object => {
                    deleteIncorrectBrewery(object) 
                })
        
                filterBrewpub(event.target.value)
                renderBreweryList()
                console.log(state.breweryList)

            })
            


        }
        
        // listOfBreweries.innerHTML = ''

        // rerender the list
        renderBreweryList()
    
    }
})

// Function that takes the brewery type and puts it in an array
function breweryArr() {
    let brewTypeArr = []
    state.breweryList.forEach(object => {
        brewTypeArr.push(object.brewery_type)
    })
    return brewTypeArr
}


// Function that filters brewery
function filterBrewpub(value){
    let filterArr = ['micro', 'brewpub', 'regional']
    const removeIdx = filterArr.indexOf(value)
    filterArr.splice(removeIdx, 1)
    
    for (let i = findPositions(breweryArr(), filterArr).length - 1; i >= 0; i--){
        state.breweryList.splice(findPositions(breweryArr(), filterArr)[i], 1)
    }

}




