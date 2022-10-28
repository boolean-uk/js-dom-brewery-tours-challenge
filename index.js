// 1) Select form and set up submit event. Capture what user types and store in state
// 2) Perform GET request to https://api.openbrewerydb.org/breweries?by_state=[state]
// 3) Filter out anything not micro, regional or brewpub before passing into state
// 4) Call a render function that will generate HTML for each brewery in the state array
// 5) Make sure to link to website for each brewery - take URL from object

// State - userSearch, breweries, list of possible filters

// Second core requirement - From the 'filter by type of brewery' section, a user can filter by type of brewery.
// 1) Select second form- we need to know if the user has selected one of the filter options
// 2) In our render or separate function, we filter the currently displayed breweries to only include a selected type
// 3) We rerender the list

// Selections
const search = document.querySelector("#select-state");
const stateForm = document.querySelector("#select-state-form");
const mainList = document.querySelector(".breweries-list");

// State
const state = {
  userSearch: "",
  breweries: [],
};

// Event listeners
stateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.toLowerCase().trim();
  state.userSearch = searchTerm;
  search.value = "";
  getBreweries();
});

// Render
function renderBreweries() {
  mainList.innerHTML = "";
}

// Get breweries
function getBreweries() {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Basic error message if 0 items in array
      if (data.length < 1) {
        mainList.innerText = "Please enter a US state";
      }

      data.forEach((brewery) => {
        if (
          brewery.brewery_type === "brewpub" ||
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional"
        ) {
          state.breweries.push(brewery);
        } else {
          return;
        }
      });
    });
}
