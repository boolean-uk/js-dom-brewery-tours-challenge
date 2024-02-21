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

const searchByNameElement = document.getElementById("search-breweries");
searchByNameElement.addEventListener("input", () => {
  const value = searchByNameElement.value;
  const filtered = currentBreweries.filter((x) => x.name.includes(value));
  renderBreweries(filtered);
});

const filterByCityFormElement = document.getElementById("filter-by-city-form");
filterByCityFormElement.addEventListener("change", () => {
  const cityElements = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  const cities = [];
  cityElements.forEach((cityElement) => {
    cities.push(cityElement.value);
  });
  const filtered = currentBreweries.filter((x) => cities.includes(x.city));
  if (filtered.length === 0) {
    renderBreweries(currentBreweries, false);
    return;
  }
  renderBreweries(filtered, false);
});
