import createSearchBar from "./createSearchBar.js";

const renderSearchBar = (breweries, selectBreweryType) => {
  const breweryTitle = document.querySelector("h1");
  breweryTitle.insertAdjacentElement(
    "afterend",
    createSearchBar(breweries, selectBreweryType)
  );
};

export default renderSearchBar;
