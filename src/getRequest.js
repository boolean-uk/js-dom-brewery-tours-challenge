import renderBreweryUl from "./renderbreweryUl.js";

const getRequest = (stateInput) => {
  fetch("https://api.openbrewerydb.org/breweries")
    .then((res) => res.json())
    .then((breweries) => {
      renderBreweryUl(breweries, stateInput);
    });
};

export default getRequest;
