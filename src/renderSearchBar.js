import createSearchBar from "./createSearchBar.js";

const renderSearchBar = () => {
  const breweryTitle = document.querySelector("h1");
  breweryTitle.insertAdjacentElement("afterend", createSearchBar());
};

export default renderSearchBar;
