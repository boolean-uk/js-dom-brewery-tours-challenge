import { renderList } from "./renderList.js";
import { filterByType, filterByName } from "./filter.js";
import { renderCheckboxes } from "./renderCheckboxes.js";

const breweriesListUL = document.querySelector("#breweries-list");
const searchState = document.querySelector("#select-state-form");
const filter = document.querySelector("#filter-by-type");
const searchBreweries = document.querySelector("#search-breweries-form");
const cityListForm = document.querySelector("#filter-by-city-form");

let breweriesInCurrentState = [];
let filteredBreweries = [];

searchState.addEventListener("submit", (event) => {
  event.preventDefault();
  const state = event.target[0].value;
  breweriesInCurrentState = [];
  //render the list AND render the filter city list
  renderList(state);
  renderCheckboxes();
});

filter.addEventListener("change", () => {
  const chosenType = filter.value;
  filterByType(chosenType);
});

searchBreweries.addEventListener("input", (event) => {
  const input = event.target.value;
  filterByName(input);
});

// TODO: make sure the input text works for capital or small letters too, and make sure double barrel state names would be accepted too, eg new york, New YORK, NEW_york...

export {
  breweriesInCurrentState,
  breweriesListUL,
  filteredBreweries,
  cityListForm,
};
