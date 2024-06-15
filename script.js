// state for events on click submit button
const state = {
  breweries: [],
  currentUsStateFilter: "",
  currentBreweryTypeFilter: "",
};

// Get the element from the html
const searchButton = document.querySelector("#search-btn");
const selectStateInput = document.querySelector("#select-state");
const filterByTypeSelect = document.querySelector("#filter-by-type");
const breweryListElement = document.querySelector("#breweries-list");

// async function to fetch the beweries data from api
async function fetchBreweries() {
  if (state.currentUsStateFilter) {
    try {
      let apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${state.currentUsStateFilter}&per_page=200`;
      if (state.currentBreweryTypeFilter) {
        apiUrl = apiUrl + `&by_type=${state.currentBreweryTypeFilter}`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      state.breweries = data;
      console.log(state.breweries);
      return state.breweries;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
}

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  // Get us state by input value
  state.currentUsStateFilter = selectStateInput.value;
  // Get select filter option
  state.currentBreweryTypeFilter = filterByTypeSelect.value;

    // awit fetchBreweries before rendering the breweries list
    await fetchBreweries();
    //rendering the breweries list
  renderBreweries();

     // Clear input fields
  selectStateInput.value = "";
  filterByTypeSelect.value = "";
});

function renderBreweries() {
  breweryListElement.innerHTML = "";
  for (let i = 0; i < state.breweries.length; i++) {
    const brewery = state.breweries[i];
    const li = document.createElement("li");
    breweryListElement.appendChild(li);
    console.log("BREWERY : ", brewery);

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
    link.textContent = "Visit Website" || "null";
    linkSection.appendChild(link);
    li.appendChild(linkSection);
  }
}
