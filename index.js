document.addEventListener("DOMContentLoaded"),
  () => {
    const stateForm = document.getElementById("select-state-form");
    const filterForm = document.getElementById("filter-by-type-form");
    const searchForm = document.getElementById("search-breweries-form");
    const breweriesList = document.getElementById("breweries-list");

    let state = "";
    let breweries = [];
    let filteredBreweries = [];

    stateForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      state = event.target["select-state"].value;
      await fetchBreweriesByState(state);
      renderBreweries();
    });

    searchForm.addEventListener("input", () => {
      filterBreweries();
      renderBreweries();
    });

    filterForm.addEventListener("change", () => {
      filterBreweries();
      renderBreweries();
    });
  };
