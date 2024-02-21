import { getBreweriesByState } from "./api/BreweryAPI.js";
import renderBreweries from "./breweries.js";

const selectStateFormElement = document.getElementById("select-state-form");
const selectStateInputElement = document.getElementById("select-state");

let currentBreweries = [];

selectStateFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = selectStateInputElement.value;
  filterByTypeElement.value = "";
  currentBreweries = await getBreweriesByState(value);
  renderBreweries(currentBreweries);
});

const filterByTypeElement = document.getElementById("filter-by-type");
filterByTypeElement.addEventListener("change", () => {
  const value = filterByTypeElement.value;
  const filtered = currentBreweries.filter((x) => x.brewery_type === value);
  renderBreweries(filtered);
});
