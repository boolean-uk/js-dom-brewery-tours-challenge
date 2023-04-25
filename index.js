const state = {
  userInput: "",
  filterByType: "",
  searchResults: [],
};

const selectStateForm = document.getElementById("select-state-form");

selectStateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedState = document.getElementById("select-state").value;
  state.userInput = selectedState;
  searchBreweriesByState(state);
  renderSearchResults(state);
});

const filterByTypeForm = document.getElementById("filter-by-type-form");

filterByTypeForm.addEventListener("change", (event) => {
  const selectedFilter = event.target.value;
  state.filterByType = selectedFilter;
  renderSearchResults(state);
});

const searchBreweriesByState = async (state) => {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userInput}`;
  const response = await fetch(url);
  const data = await response.json();
  const filteredResults = data.filter(
    (brewery) =>
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
  );
  state.searchResults = filteredResults;
  if (state.searchResults.length === 0) {
    const breweriesList = document.getElementById("breweries-list");
    breweriesList.innerHTML = "<p>No breweries found</p>";
  } else {
    renderSearchResults(state);
  }
};

const searchBreweriesByName = async (name) => {
  const url = `https://api.openbrewerydb.org/breweries?by_name=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  const filteredResults = data.filter(
    (brewery) =>
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
  );
  state.searchResults = filteredResults;
  if (state.searchResults.length === 0) {
    const breweriesList = document.getElementById("breweries-list");
    breweriesList.innerHTML = "<p>No breweries found</p>";
  } else {
    renderSearchResults(state);
  }
};

const searchBreweriesForm = document.getElementById("search-breweries-form");

searchBreweriesForm.addEventListener("input", (event) => {
  const searchedName = event.target.value;
  searchBreweriesByName(searchedName);
});

const renderSearchResults = (state) => {
  const breweriesList = document.getElementById("breweries-list");
  breweriesList.innerHTML = "";

  state.searchResults.forEach((brewery) => {
    if (!state.filterByType || state.filterByType === brewery.brewery_type) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${brewery.street}</p>
          <p><strong>${brewery.city}, ${brewery.state} ${
        brewery.postal_code
      }</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${brewery.phone || "N/A"}</p>
        </section>
        <section class="link">
          <a href="${
            brewery.website_url || "#"
          }" target="_blank">Visit Website</a>
        </section>
      `;
        breweriesList.appendChild(listItem);
      }
    });
  };
  