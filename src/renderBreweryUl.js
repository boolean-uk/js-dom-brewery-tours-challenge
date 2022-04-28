import createBreweryUl from "./createBreweryUl.js";

const renderBreweryUl = (breweries, stateInput) => {
  const targetBreweries = breweries.filter(
    (brewery) => brewery.state === stateInput
  );
  createBreweryUl(targetBreweries);
};

export default renderBreweryUl;
