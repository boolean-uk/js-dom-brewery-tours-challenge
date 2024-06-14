// Initial state
const state = {
  breweries: [],
  selectedState: "",
  selectedType: "",
};

// Fetch breweries by state
async function fetchBreweriesByState(state) {
  const response = await fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state}`
  );
  return response.json();
}

// Create a new element with text content
function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

// Render the list of breweries
function renderBreweries(breweries) {
  const breweriesList = document.getElementById("breweries-list");
  breweriesList.textContent = ""; // Clear the list

  breweries.forEach((brewery) => {
    if (["micro", "regional", "brewpub"].includes(brewery.brewery_type)) {
      const li = document.createElement("li");

      const h2 = createElementWithText("h2", brewery.name);

      const typeDiv = createElementWithText("div", brewery.brewery_type);
      typeDiv.className = "type";

      const addressSection = document.createElement("section");
      addressSection.className = "address";
      const addressH3 = createElementWithText("h3", "Address:");
      const addressP1 = createElementWithText("p", brewery.street);
      const addressP2 = createElementWithText(
        "p",
        `${brewery.city}, ${brewery.state} ${brewery.postal_code}`
      );
      addressP2.style.fontWeight = "bold";
      addressSection.append(addressH3, addressP1, addressP2);

      const phoneSection = document.createElement("section");
      phoneSection.className = "phone";
      const phoneH3 = createElementWithText("h3", "Phone:");
      const phoneP = createElementWithText("p", brewery.phone || "N/A");
      phoneSection.append(phoneH3, phoneP);

      const linkSection = document.createElement("section");
      linkSection.className = "link";
      const linkA = document.createElement("a");
      linkA.href = brewery.website_url || "#";
      linkA.target = "_blank";
      linkA.textContent = "Visit Website";
      linkSection.appendChild(linkA);

      li.append(h2, typeDiv, addressSection, phoneSection, linkSection);
      breweriesList.appendChild(li);
    }
  });
}

// Filter the breweries based on the selected type
function filterBreweries() {
  const filteredBreweries = state.breweries.filter((brewery) => {
    return state.selectedType
      ? brewery.brewery_type === state.selectedType
      : true;
  });
  renderBreweries(filteredBreweries);
}

// Event listener for state selection form submission
document
  .getElementById("select-state-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const stateInput = document.getElementById("select-state").value.trim();
    if (stateInput) {
      state.selectedState = stateInput;
      const breweries = await fetchBreweriesByState(state.selectedState);
      state.breweries = breweries;
      filterBreweries();
    }
  });

// Event listener for type filter change
document
  .getElementById("filter-by-type")
  .addEventListener("change", (event) => {
    state.selectedType = event.target.value;
    filterBreweries();
  });
