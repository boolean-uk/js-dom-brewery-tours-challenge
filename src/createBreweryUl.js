import createBreweryLi from "./createBreweryLi.js";

const createBreweryUl = (targetBreweries) => {
  const breweryUl = document.querySelector("#breweries-list");
  breweryUl.innerHTML = "";
  targetBreweries.forEach((brewery) => {
    if (
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
    )
      breweryUl.append(createBreweryLi(brewery));
  });
};

export default createBreweryUl;
