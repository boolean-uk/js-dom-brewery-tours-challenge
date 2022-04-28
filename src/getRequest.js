import renderBreweryUl from "./renderbreweryUl.js";

const getRequest = (stateInput, targetBreweryType = "") => {
  fetch("https://api.openbrewerydb.org/breweries")
    .then((res) => res.json())
    .then((breweries) => {
      renderBreweryUl(breweries, stateInput, targetBreweryType);
    });
};

export default getRequest;
