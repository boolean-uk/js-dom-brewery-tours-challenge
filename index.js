//STATE
const state = {
    breweries: [],
  };

//SELECT ELEMENTS
const listOfBreweriesUL = document.querySelector('#breweries-list')
const inputField = document.querySelector('#select-state-form')
inputField.addEventListener('submit', function(event){
    event.preventDefault()
    // Get input data from form and save to state
    const stateName = "Ohio"
    console.log(state)
    // Check if anything has been typed
    if(state.length > 0){
        // Call Function
        getBreweriesByStateFromAPI(stateName)

    }
})


//NETWORK

function getBreweriesByStateFromAPI(stateName){

}



//RENDERING

// -- LOGIC --
// 1.) Create State object and include breweries
// 2.) Create Event Listener on the <form> #select-state-form
//  - REMEMBER 'SUBMIT'
//  - Prevent default behabviour to stop the page reloading and messing with the request
//  - check the state length (input.innertext > 0)
//  - Call function that will deal with the fetch request getBreweriesByStateFromAPI(stateName)
//  - COMMIT TO GITHUB

// 3.) Create function to fetch breweries by state
//  - If state has 2 words replace "" with "_" (start with one word first then do this bit) 
//  - from resource - https://api.openbrewerydb.org/breweries?by_state=US_STATE_NAME&per_page=50
//  - Can we use ${STATENAME} here?? (REMEMBER `)
//  - On response, save data to local state.breweries (do we need all info here? we can deal with that in render)
//  - Call render renderAllBreweries()
//  COMMIT TO GITHUB

// 4.) Render Function - renderAllBreweries
//  - Clear list (innerHTML = "")
//  - For Each loop state.breweries (REMEMBER PLURALS AND SINGULAR HERE)
//      - Creat li (const li) document.createElement ('li")
//      - Store ID, Name, Address (.address), Phone Number (.phone), Type (.breweries-list li .type), and website (.link) in li
//      - Append li to Ul
//  COMMIT TO GITHUB

// 5.) Filter Section (This might need to be in the renderAllBreweries)
//  - If submit innertext === micro call function - RenderMicro
//  - If submit innertext === regional call function - renderRegional
//  - If submit innertext === brewpub call function - renderBrewpub

// 6.) Functions for each type
//  - clear list
//  - Filter state.breweries
//      - state.breweries.filter(.type === "micro")
//  - Render 

