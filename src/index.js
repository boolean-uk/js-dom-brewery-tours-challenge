import { getBreweries } from "./api/BreweryAPI.js";
import renderBreweries from "./breweries.js";

console.log(await getBreweries("Alabama"));
const selectStateFormElement = document.getElementById("select-state-form");
const selectStateInputElement = document.getElementById("select-state");
selectStateFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = selectStateInputElement.value;
  renderBreweries(await getBreweries(value));
});
