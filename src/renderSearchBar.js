import createSearchBar from "./createSearchBar.js";

const renderSearchBar = (breweries) => {
  const breweryTitle = document.querySelector("h1");
  breweryTitle.insertAdjacentElement("afterend", createSearchBar(breweries));
};

export default renderSearchBar;
