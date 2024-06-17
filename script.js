// state for events on click submit button
const state = {
  breweries: [],
  currentUsStateFilter: "",
  currentBreweryTypeFilter: "",
  searchQuery: "",
  searchResults: [],
  searchBreweryInput: "",
};

// Get the element from the html
const searchButton = document.querySelector('input[type="submit"]');
const selectStateInput = document.querySelector("#select-state");
const filterByTypeSelect = document.querySelector("#filter-by-type");
const breweryListElement = document.querySelector("#breweries-list");
const main = document.querySelector("main");
const searchBreweryInput = document.querySelector("#search-breweries");

// async function to fetch the beweries data from api
async function fetchBreweries() {
  if (state.currentUsStateFilter) {
    try {
      let apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_state=${state.currentUsStateFilter}&per_page=200`;
      if (state.currentBreweryTypeFilter) {
        apiUrl += `&by_type=${state.currentBreweryTypeFilter}`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      state.breweries = data;
      return state.breweries;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
}

async function fetchSearchResults(query) {
  if (query) {
    try {
      const apiUrl = `https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${query}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      state.searchResults = data;
      // renderSearchResults();
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  } else {
    state.searchResults = [];
    //   renderSearchResults();
  }
}

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Get the state from input value
  state.currentUsStateFilter = selectStateInput.value;

  // Get the brewery type filter option
  state.currentBreweryTypeFilter = filterByTypeSelect.value;

  // Await fetchBreweries before rendering the breweries list
  await fetchBreweries();

  // Rendering the breweries list
  renderBreweries();

  // Clear input fields
  selectStateInput.value = "";
  filterByTypeSelect.value = "";

  // only render header if search ipnut or filter exit
  if (state.currentBreweryTypeFilter || state.currentUsStateFilter) {
    renderSearchHeader();
  }
});
// if (searchBreweryInput) {
    // when search/filter on the search input
    searchBreweryInput.addEventListener("input", () => {
        // input is save in the state for easy access
        state.searchQuery = searchBreweryInput.value;
        console.log("search input:", state.searchQuery);
        fetchSearchResults(state.searchQuery);
        console.log("auto search results", fetchSearchResults);
    });
// }
// rendering breweries with html template
function renderBreweries() {
  // clear the page innerhtml
  breweryListElement.innerHTML = "";

  // loop through the list of the breweris
  for (let i = 0; i < state.breweries.length; i++) {
    const brewery = state.breweries[i];
    const li = document.createElement("li");
    breweryListElement.appendChild(li);

    const listH2 = document.createElement("h2");
    listH2.textContent = brewery.name;
    li.appendChild(listH2);

    const typeDiv = document.createElement("div");
    typeDiv.classList = "type";
    typeDiv.textContent = brewery.brewery_type;
    li.appendChild(typeDiv);

    const addSection = document.createElement("section");
    addSection.classList = "address";
    li.appendChild(addSection);

    const addH3 = document.createElement("h3");
    addH3.textContent = "Address:";
    addSection.appendChild(addH3);

    const addParagrph_1 = document.createElement("p");
    addParagrph_1.textContent = brewery.address_1;
    addSection.appendChild(addParagrph_1);

    const addParagrph_2 = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${brewery.city}, ${brewery.postal_code}`;
    addParagrph_2.appendChild(strong);
    addSection.appendChild(addParagrph_2);
    li.appendChild(addSection);

    const phoneSection = document.createElement("section");
    li.appendChild(phoneSection);
    const phoneH3 = document.createElement("h3");
    phoneH3.textContent = "Phone:";
    phoneSection.appendChild(phoneH3);
    const phoneParagraph = document.createElement("p");
    phoneParagraph.textContent = brewery.phone || "N/A";
    phoneSection.appendChild(phoneParagraph);

    const linkSection = document.createElement("section");
    const link = document.createElement("a");
    link.href = brewery.website_url;
    link.target = "_blank";
    link.textContent = "Visit Website";
    linkSection.appendChild(link);
    li.appendChild(linkSection);
  }
}

// render search header with html template/
function renderSearchHeader() {
  const SearchBarHeader = document.createElement("header");
  SearchBarHeader.classList = "search-bar";
  main.appendChild(SearchBarHeader);
  const searchForm = document.createElement("form");
  searchForm.autocomplete = "off";
  searchForm.id = "search-breweries-form";
  SearchBarHeader.appendChild(searchForm);
  const searchLabel = document.createElement("label");
  searchLabel.attributes = ("for", "search-breweries");
  searchForm.appendChild(searchLabel);
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.name = "search-breweries";
  searchInput.id = "search-breweries";
  searchForm.appendChild(searchInput);
  console.log(state.search, "test");
}


