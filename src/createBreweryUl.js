import createBreweryLi from "./createBreweryLi.js";

const createBreweryUl = (targetBreweries) => {
  const breweryUl = document.querySelector("#breweries-list");
  breweryUl.innerHTML = "";
  const breweryTypes = ["micro", "regional", "brewpub"];

  targetBreweries.forEach((brewery) => {
    if (breweryTypes.includes(brewery.brewery_type))
      breweryUl.append(createBreweryLi(brewery));
  });
};

export default createBreweryUl;
