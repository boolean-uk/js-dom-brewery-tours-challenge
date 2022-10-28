const breweriesList = document.querySelector("#breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const filterByType = document.querySelector("#filter-by-type");
const state = {
  breweries: [],
};

// PLANNING:
// - any code to select HTML from the page
// - any code to represent local state
// - any code to handle user actions/events
// - code that must run the first time we load the page
// - network code to send network requests, update state and re-render

stateSearch.addEventListener("click", () => {
  console.log("enter state");
});
