//STATE- container for all the variables of data

const state = {
    brewries: []
};

//REQUIREMENT 1: show a list of brewries for a US state

//SELECT EXISTING HTML ELEMENTS
const brewriesUL = document.querySelector("#breweries-list")
const searchForm = document.querySelector("#select-state-form")
const searchState = document.querySelector("#select-state")

searchForm.addEventListener("click", (event) => {
    event.preventDefault

    const searchForState = searchState.value
    if (searchForState > 0) {
        //call function that will call the brewries by that state
        getBrewries(stateName)
    } else {
        alert("Please type in the state you are visiting first then try again")
    }
})

//NETWORK REQUESTS
function getBrewries(stateName) {
    // capitalise input (so if user types "ohio" we get "Ohio" so that it matches brewries.name )
    // if "" -> "_"

    fetch("API") // send a Request *******
        .then((response) => {
            // response = the Response from the server
            return response.json();
        })
        .then((responseData) => {
            // responseData = response.json()

            // we have received all todo items
            console.log("Received brewries list", responseData);
            // update local STATE with fetched people
            state.brewries = responseData;
            // render each brewry
            renderBrewry(); //renderBrewries
        });
}


//RENDERING
function renderBrewry() {

}

//START
