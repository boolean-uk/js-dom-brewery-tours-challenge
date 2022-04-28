import createBreweryUl from "./createBreweryUl.js";

const renderBreweryUl = (breweries, stateInput, targetBreweryType = "") => {
  const targetBreweries = breweries.filter(
    (brewery) => brewery.state === stateInput
  );
  if (!targetBreweryType) {
    createBreweryUl(targetBreweries);
  } else {
    const targetBreweriesByType = targetBreweries.filter(
      (brewery) => brewery.brewery_type === targetBreweryType
    );
    createBreweryUl(targetBreweriesByType);
  }
};

export default renderBreweryUl;
