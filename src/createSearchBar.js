// import searchBrewery from "./searchBrewery.js";
import searchBrewery from "./searchBrewery.js";
import state from "./index.js";

const createSearchBar = (breweries) => {
  // header
  const header = document.createElement("header");
  header.classList.add("search-bar");

  // search form
  const searchForm = document.createElement("form");
  searchForm.setAttribute("id", "search-breweries-form");
  searchForm.autocomplete = "off";

  // label
  const searchFormLabel = document.createElement("label");
  searchFormLabel.setAttribute("for", "search-breweries");
  searchFormLabel.innerHTML = "<h2>Search breweries</h2>";

  // input
  const searchFormInput = document.createElement("input");
  searchFormInput.setAttribute("id", "search-breweries");
  searchFormInput.name = "search-breweries";
  searchFormInput.type = "text";

  // append
  searchForm.append(searchFormLabel, searchFormInput);
  header.append(searchForm);

  searchFormInput.addEventListener("input", (e) => {
    searchBrewery(e, breweries, state.selectBreweryType);
  });
  return header;
};

export default createSearchBar;
