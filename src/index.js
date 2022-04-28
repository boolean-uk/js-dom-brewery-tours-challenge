import renderBreweryUl from "./renderbreweryUl.js";

const selectStateForm = document.querySelector("#select-state-form");

selectStateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const stateInput = e.target[0].value;

  fetch("https://api.openbrewerydb.org/breweries")
    .then((res) => res.json())
    .then((breweries) => {
      renderBreweryUl(breweries, stateInput);
    });

  e.target.reset();
});
