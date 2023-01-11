// USER ENTERS A STATE IN THE SEARCH FIELD:
//     - Add a SUBMIT event listener to the submit button
//     - Prevent page from refreshing
//     - Store the input value of #select-state
//     - Check if the the number of characters is > 0
//     - If state has 2 words, replace spaces with an underscore '_'
//     - Call function that sends GET request: fetchBreweriesByState(STATE_NAME)

//    MAKE A GET REQUEST: fetchBreweriesByState(STATE_NAME):
//     - Use FETCH and THEN to receive the data from server
//     - Server documentation: https://www.openbrewerydb.org/documentation    -
//     - fetch: https://api.openbrewerydb.org/breweries?by_state=STATE_NAME&per_page=50
//     - No need to specify OPTIONS
//     - Convert response to JSON object
//     - Use forEach to filter out breweries that doesn't have a type of Micro, Regional or Brewpub
//     - Push the JSON object to state.breweries
//     - Call function to render the breweries

//     FILTER BREWERIES BY TYPE:
//         - call renderMicroBreweries() if micro is selected
//         - call renderRegionalBreweries() if regional is selected
//         - call renderBrewpubBreweries() if brewpub is selected

//    RENDER BREWERIES: renderBreweries()
//     - Create HTML elements and set attributes
//         - Follow the template in templates/standard-list-items.html
//     - Append the elements

// STATE
const state = {
  breweries: [], // state.breweries
  // microBreweries: [],
  // regionalBreweries: [],
  // brewpubBreweries: [],
};
// EXISTING ELEMENTS QUERY SELECTORS
const searchButton = document.querySelector("#select-state-form");

function fetchBreweriesByState(stateName) {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((stateData) => {
      console.log("stateData: ", stateData);
      // Use forEach to filter out breweries that doesn't have a type of Micro, Regional or Brewpub
      // If type matches, push the JSON object to state.breweries
      stateData.forEach((brewery) => {
        if (brewery.brewery_type === "micro") {
          state.breweries.push(brewery);
        } else if (brewery.brewery_type === "regional") {
          state.breweries.push(brewery);
        } else if (brewery.brewery_type === "brewpub") {
          state.breweries.push(brewery);
        }
      });

      console.log(state.breweries);
      stateData.forEach((item) => {
        console.log(item.id, "======", item.brewery_type.toUpperCase());
      });
      console.log("=================================");
      console.log("FILTERED DATA IN STATE.BREWERIES: ");
      console.log("=================================");

      state.breweries.forEach((item) => {
        console.log(item.id, "======", item.brewery_type.toUpperCase());
      });

      // Call function to render the breweries
      renderBreweries();
    });
}

searchButton.addEventListener("submit", (event) => {
  // Stop page from refreshing on submit
  event.preventDefault();

  // Read the text that the user inputs and store it in a variable
  // event.target[0] is the first <input> in the form
  const stateName = event.target[0].value;

  // Check if the the number of characters is > 0

  // If state has 2 words, replace spaces with an underscore '_'

  // Call function that sends GET request: fetchBreweriesByState(STATE_NAME)
  fetchBreweriesByState(stateName);
});

function renderBreweries() {}
