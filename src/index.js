import { fetchFromAPI } from "./handlePage.js";
import {
  filterByType,
  filterByName,
  filterByCity,
  clearFilter,
} from "./filters.js";

const breweriesListUL = document.querySelector("#breweries-list");
const searchState = document.querySelector("#select-state-form");
const filter = document.querySelector("#filter-by-type");
const searchBreweries = document.querySelector("#search-breweries-form");
const cityListForm = document.querySelector("#filter-by-city-form");
const hiddenButton = document.querySelector(".hidden");
const buttonShow = document.querySelector("#buttonShow");
const clearButton = document.querySelector(".clear-all-btn");
const pageButtons = document.querySelector(".page-buttons");

let breweriesInCurrentState = [];
let breweriesByType = [];
let breweriesByCity = [];

searchState.addEventListener("submit", (event) => {
  event.preventDefault();
  const state = event.target[0].value;
  breweriesInCurrentState = [];
  fetchFromAPI(state);
});

filter.addEventListener("change", () => {
  const chosenType = filter.value;
  filterByType(chosenType);
});

searchBreweries.addEventListener("input", (event) => {
  const input = event.target.value.toLowerCase();
  filterByName(input);
});

buttonShow.addEventListener("click", () => {
  filterByCity();
});

clearButton.addEventListener("click", () => {
  clearFilter();
});

export {
  breweriesInCurrentState,
  breweriesListUL,
  breweriesByType,
  breweriesByCity,
  cityListForm,
  hiddenButton,
  pageButtons,
};
