//FLOW
//1. user makes interaction with page
//2. interaction updates local state QR sends a network request for state change
//3. if network request was OOK, then we update local state
//4. when local state is  updated, we then re-render the page



//REQUIREMENT-1: show a list of breweries for USA state
//note- only show micro, regional and brewpub
// ACTIONS
// - add a listener for the search form submission which triggers the GET request ✔
//    - the HTML element to listen for submission:|||| <form> #select-state-form✔
//    - don't forget to prevent default form behaviour on submit event ✔
//    - read the us state name from ||||<input> #select-state 
//    - check the us state name length > 0
//    - call getBreweriesByState(stateName)
// - make a GET request to fetch breweries, by state (this is the one the user typed)✔
//   GET https://api.openbrewerydb.org/breweries?by_state=US_STATE_NAME&per_page=50✔
//   if a us state has 2 words, then the " " should be replaced with "_"
//   replace(): https://www.w3schools.com/jsref/jsref_replace.asp
// - on FETCH response: save the fetched data into local state: state.breweries✔
// - render list of breweries✔
// - during render of list, filter out by type to keep micro, regional

//STATE
const state ={

    breweries: [],
    filterState:"",
    filteredType: "",
    city: [],
}

//SELECT EXISTING HTML ELEMENTS
const searchForm = document.querySelector('#select-state-form')
const breweriesList = document.querySelector('#breweries-list')
const typeSelector = document.querySelector("#filter-by-type")
const selectStateInput = document.querySelector(`#select-state`)
const mainSection = document.querySelector('main')
const labelForState = document.querySelector('label')
const submitButton = document.querySelector('input[type="submit"]')
const filterSection = document.querySelector('.filters-section')
const filterForm = document.querySelector('#filter-by-type-form')

//NETWORK REQUEST
function getAllBrewery () {
    //send a GET request to receive all breweries list
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.filterState}&per_page=50`) // send a request
    .then((response)=> {
        //response = the response from the server
        return response.json();
    })
    .then((responseList)=> {
        //responseList = response.json()
        // we have received all list
        console.log("received list", responseList);
        //update local state with fetched list
        state.breweries = responseList;
        //render each list
        renderingList();
        
    })
}




//RENDERING
function renderingList () {
    //clear my list before re-rendering
    breweriesList.innerHTML = " ";

    //state.breweries.forEach((brewery) => {
        state.breweries.filter((brewery) => {
            if(brewery.brewery_type === "micro" 
            || brewery.brewery_type === "regional" 
            || brewery.brewery_type === "brewpub") {
         
                  
       ///convert list JS object to a <li>
        const li = document.createElement('li')
        //li.innerText=`${brewery.name}`
       // li.innerText= `${brewery.phone}`
        breweriesList.append(li)

        const h2 = document.createElement('h2')
        h2.innerHTML=`${brewery.name}`
        li.append(h2)

        const div = document.createElement("div")
        div.setAttribute('class', 'type')
        div.innerHTML= `${brewery.brewery_type}`
        li.append(div)

        const section1 = document.createElement('section')
        section1.setAttribute('class', 'address')
        li.append(section1)

        const h3Address =document.createElement('h3')
        h3Address.innerText ="Address:"
        section1.append(h3Address)

        const para1 = document.createElement('p')
        para1.innerHTML= `${brewery.street}`
        section1.append(para1)

        const para2 = document.createElement('p')
        para2.innerHTML = `<strong>${brewery.state}, ${brewery.postal_code}</strong>`
        section1.append(para2)

        const section2 = document.createElement('section')
        section2.setAttribute('class', 'phone')
        li.append(section2)

        const h3Phone = document.createElement('h3')
        h3Phone.innerText = "Phone:"
        section2.append(h3Phone)

        const paraPhone = document.createElement('p')
        paraPhone.innerHTML = `${brewery.phone}`
        section2.append(paraPhone)

        const section3 = document.createElement('section')
        section3.setAttribute('class', 'link')
        li.append(section3)

        const breweryLink = document.createElement('a')
        breweryLink.innerHTML = `${brewery.website_url}`
        breweryLink.innerText = "Visit Website"
        section3.append(breweryLink)
        
        }
       
    }) 

}

getAllBrewery()


//addEventListener for search button
searchForm.addEventListener('submit', (event)=>{
  
    event.preventDefault()
    
    const stateInput = document.querySelector('#select-state').value.replace(" ", "_").toLowerCase();
    if(stateInput.length >3 ) {
       
        state.filterState = stateInput;
    
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.filterState}&per_page=50`)
        .then((respond) => {
         return respond.json();
         })
        .then((respondList) =>{
        console.log("received list for filter by state", respondList)
         state.breweries = respondList
        renderingList(stateInput)
        })

        //extension-1
        function viewForm () {
            //div for form
            const formDivForMain = document.createElement('div')
            mainSection.append(formDivForMain)

            //move form to div
            formDivForMain.appendChild(searchForm)

            //change label name
            labelForState.innerText= "Search breweries:"
            
            //remove submit button
            submitButton.remove()
           
        }
         viewForm()
       
    } else {
        return alert("Please enter at least 4 characters long")
        }
    
})


// addEventListener for sidebar
typeSelector.addEventListener('change', (event) =>{
    event.preventDefault();
    state.filteredType = typeSelector.value
   
   fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.filterState}&by_type=${state.filteredType}&per_page=50`)
   .then((response) => {
    return response.json()
   })
   .then((breweries) => {
    state.breweries = breweries
    console.log("filtered by type", breweries)
    renderingList()
   })
 
})


