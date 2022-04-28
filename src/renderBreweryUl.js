import createBreweryLi from "./createBreweryLi.js";

const renderBreweryUl = (breweries, stateInput) => {
  const targetBreweries = breweries.filter(
    (brewery) => brewery.state === stateInput
  );

  const breweryUl = document.querySelector("#breweries-list");
  targetBreweries.forEach((brewery) => {
    if (
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
    )
      breweryUl.append(createBreweryLi(brewery));
  });
};

export default renderBreweryUl;
