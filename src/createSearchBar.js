const createSearchBar = () => {
  const header = document.createElement("header");
  header.classList.add("search-bar");

  const searchForm = document.createElement("form");
  searchForm.setAttribute("id", "search-breweries-form");
  searchForm.autocomplete = "off";

  const searchFormLabel = document.createElement("label");
  searchFormLabel.for = "search-breweries";
  searchFormLabel.innerHTML = "<h2>Search breweries</h2>";

  const searchFormInput = document.createElement("input");
  searchFormInput.setAttribute("id", "search-breweries");
  searchFormInput.name = "search-breweries";
  searchFormInput.type = "text";

  searchForm.append(searchFormLabel, searchFormInput);
  header.append(searchForm);

  return header;
};

export default createSearchBar;
