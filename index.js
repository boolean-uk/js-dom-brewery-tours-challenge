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
        deleteIncorrectBrewery()
        renderBreweryList()
        filterSelect.addEventListener('change', () => {
            renderBreweryList()

        })
        
    })
    
    
}

// Function that takes the brewery type and puts it in an array
function breweryArr() {
    let brewTypeArr = []
    state.breweryList.forEach(object => {
        brewTypeArr.push(object.brewery_type)
    })
    return brewTypeArr
}


//The list should only shows the types of breweries that offer brewery tours:
// Micro
// Regional
// Brewpub

// Write a function that will filter out the breweries that are not wanted
function deleteIncorrectBrewery(){
    let filterArr = ['micro', 'brewpub', 'regional']

    newState = []
    for (let i = findPositions(breweryArr(), filterArr).length - 1; i >= 0; i--){
       
       newState.push(state.breweryList.splice(findPositions(breweryArr(), filterArr)[i], 1)[0])
    }
    
    state.breweryList = newState
}




// write a function that renders the list on the page.
function renderBreweryList() {
    listOfBreweries.innerHTML = ''
    
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
    filterSelect.value = ''
    

    
})

// - From the 'filter by type of brewery' section, a user can filter by type of brewery.

filterSelect.addEventListener('change', (event) => {

    // If statement ensures that if the form was nto submitted then the select resets and the user cannot filter
    if (state.breweryList.length === 0){
        event.target.value = ''

        // Else proceeds with filtering the list only after the form has beenn submitted.
    } else {
        

        // Filters the state array
        filterBrewpub(event.target.value)
        
        // Another if statement, here if the user selects another option in the drop down menu the filter function filters all the elements and the state array gets self depleted. This second if statement re-fetches the data and puts it in the state array. 
        if (state.breweryList.length === 0){
            fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchRecord[searchRecord.length-1]}&per_page=100`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data){
        
                state.breweryList = data
        
                // Refilters the unwanted breweries
                deleteIncorrectBrewery()
        
                // Refilters the state array to the selected type of brewery
                filterBrewpub(event.target.value)

                //Rerenders the list
                renderBreweryList()
                
                // Third if statement, if it is the case that a user searches for a state that does not have one of the three brewery types from the drop down menu, then the state array goes empty. Thus, this re-fethces the data, but this time does not re-render the state array on the page, this way the user can understand that the state has no breweries that was selected by the filter, and if the user selects a different brewery type then the state array is not empty. 
                if (state.breweryList.length === 0){
                    
                    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${searchRecord[searchRecord.length-1]}&per_page=100`)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data){
        
                        state.breweryList = data
        

                        deleteIncorrectBrewery()
        
                    })

                }   
            
            })

        }
        
        // rerender the list
        renderBreweryList()
    
    }

    // If the user wants to go back and see the origional list he can. 
    if (event.target.value === ''){
        getBreweryList(searchRecord[searchRecord.length-1])
    }
})




// Function that filters brewery
function filterBrewpub(value){
    // The 4 values from the select tag
    let filterArr = ['micro', 'brewpub', 'regional', '']

    // Here the value argument that will be passed is the value of the brewery type that the user selects from the drop down menu
    const removeIdx = filterArr.indexOf(value)

    // What remains in the filter array is an array that includes all the values of the select tag except the wanted value that was passed throuhg as an argument. 
    filterArr.splice(removeIdx, 1)

    // Using the find positions function, it is an array that shows all the indexes of the brewery array (breweryArr()) that are present in the filter array (filterArr). 
    for (let i = findPositions(breweryArr(), filterArr).length - 1; i >= 0; i--){
        // Takes the state array and removes all the indexes from the findPositions() function using splice, the loop counts down so that the indexes don't get shifted as the array elements get removed. 
        state.breweryList.splice(findPositions(breweryArr(), filterArr)[i], 1)
    }

}




