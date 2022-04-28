import renderBreweryUl from "./renderbreweryUl.js";

const getRequest = (selectState, selectBreweryType = "") => {
  fetch("https://api.openbrewerydb.org/breweries")
    .then((res) => res.json())
    .then((breweries) => {
      renderBreweryUl(breweries, selectState, selectBreweryType);
    });
};

export default getRequest;
