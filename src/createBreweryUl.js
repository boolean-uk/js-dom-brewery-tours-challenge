import createBreweryLi from "./createBreweryLi.js";

const createBreweryUl = (breweries) => {
  const breweryUl = document.querySelector("#breweries-list");
  breweryUl.innerHTML = "";
  const breweryTypes = ["micro", "regional", "brewpub"];

  breweries.forEach((brewery) => {
    if (breweryTypes.includes(brewery.brewery_type))
      breweryUl.append(createBreweryLi(brewery));
  });
};

export default createBreweryUl;
