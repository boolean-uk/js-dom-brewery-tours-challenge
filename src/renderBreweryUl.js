import createBreweryUl from "./createBreweryUl.js";

const renderBreweryUl = (breweries, selectState, selectBreweryType = "") => {
  const targetBreweries = breweries.filter(
    (brewery) => brewery.state === selectState
  );
  if (!selectBreweryType) {
    createBreweryUl(targetBreweries);
  } else {
    const targetBreweriesByType = targetBreweries.filter(
      (brewery) => brewery.brewery_type === selectBreweryType
    );
    createBreweryUl(targetBreweriesByType);
  }
};

export default renderBreweryUl;
