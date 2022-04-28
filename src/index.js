import createBreweryLi from "./createBreweryLi.js";

const selectStateForm = document.querySelector("#select-state-form");

selectStateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const stateInput = e.target[0].value;

  fetch("https://api.openbrewerydb.org/breweries")
    .then((res) => res.json())
    .then((breweries) => {
      const targetBreweries = breweries.filter(
        (brewery) => brewery.state === stateInput
      );

      const breweriesUl = document.querySelector("#breweries-list");
      targetBreweries.forEach((brewery) => {
        breweriesUl.append(createBreweryLi(brewery));
      });
    });
});
