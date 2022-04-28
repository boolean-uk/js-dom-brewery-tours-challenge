import createBreweryUl from "./createBreweryUl.js";

const renderBreweryUl = (breweries, selectBreweryType = "") => {
  if (!selectBreweryType) {
    createBreweryUl(breweries);
  } else {
    const breweriesByType = breweries.filter(
      (brewery) => brewery.brewery_type === selectBreweryType
    );
    createBreweryUl(breweriesByType);
  }
};

export default renderBreweryUl;
