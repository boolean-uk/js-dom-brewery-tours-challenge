const state = {
  breweries: [],
  selectedState: "",
  selectedType: "",
  selectedCities: [],
  searchQuery: "",
  visitList: [],
  pagination: {
    currentPage: 1,
    perPage: 10,
  },
};

// Fetch breweries by state
async function fetchBreweriesByState(state) {
  const response = await fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state}`
  );
  return response.json();
}

// Fetch visit list from JSON server
async function fetchVisitList() {
  const response = await fetch("http://localhost:3000/visitList");
  return response.json();
}

// Add brewery to visit list
async function addToVisitList(brewery) {
  const response = await fetch("http://localhost:3000/visitList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brewery),
  });
  return response.json();
}

// Remove brewery from visit list
async function removeFromVisitList(id) {
  await fetch(`http://localhost:3000/visitList/${id}`, {
    method: "DELETE",
  });
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

  const startIndex =
    (state.pagination.currentPage - 1) * state.pagination.perPage;
  const paginatedBreweries = breweries.slice(
    startIndex,
    startIndex + state.pagination.perPage
  );

  paginatedBreweries.forEach((brewery) => {
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

      const visitButton = createElementWithText(
        "button",
        isInVisitList(brewery.id)
          ? "Remove from Visit List"
          : "Add to Visit List"
      );
      visitButton.addEventListener("click", async () => {
        if (isInVisitList(brewery.id)) {
          await removeFromVisitList(brewery.id);
        } else {
          await addToVisitList(brewery);
        }
        await updateVisitList();
        filterBreweries();
      });

      li.append(
        h2,
        typeDiv,
        addressSection,
        phoneSection,
        linkSection,
        visitButton
      );
      breweriesList.appendChild(li);
    }
  });

  updatePaginationControls(breweries.length);
}

// Update pagination controls
function updatePaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / state.pagination.perPage);
  document.getElementById(
    "page-info"
  ).textContent = `Page ${state.pagination.currentPage} of ${totalPages}`;

  document.getElementById("prev-page").disabled =
    state.pagination.currentPage === 1;
  document.getElementById("next-page").disabled =
    state.pagination.currentPage === totalPages;
}

// Render city filters
function renderCityFilters() {
  const cityFilterForm = document.getElementById("filter-by-city-form");
  cityFilterForm.textContent = ""; // Clear the form

  const cities = [...new Set(state.breweries.map((brewery) => brewery.city))];

  cities.forEach((city) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = city;
    checkbox.value = city;
    checkbox.checked = state.selectedCities.includes(city);
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        state.selectedCities.push(city);
      } else {
        state.selectedCities = state.selectedCities.filter(
          (selectedCity) => selectedCity !== city
        );
      }
      filterBreweries();
    });

    const label = document.createElement("label");
    label.textContent = city;
    label.htmlFor = city;

    cityFilterForm.appendChild(checkbox);
    cityFilterForm.appendChild(label);
  });
}

// Filter the breweries based on the selected type and cities
function filterBreweries() {
  let filteredBreweries = state.breweries;

  if (state.selectedType) {
    filteredBreweries = filteredBreweries.filter(
      (brewery) => brewery.brewery_type === state.selectedType
    );
  }

  if (state.selectedCities.length > 0) {
    filteredBreweries = filteredBreweries.filter((brewery) =>
      state.selectedCities.includes(brewery.city)
    );
  }

  if (state.searchQuery) {
    filteredBreweries = filteredBreweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  renderBreweries(filteredBreweries);
}

// Check if a brewery is in the visit list
function isInVisitList(breweryId) {
  return state.visitList.some((brewery) => brewery.id === breweryId);
}

// Update visit list
async function updateVisitList() {
  const visitList = await fetchVisitList();
  state.visitList = visitList;
  renderVisitList();
}

// Render the visit list
function renderVisitList() {
  const visitListElement = document.getElementById("visit-list");
  visitListElement.textContent = ""; // Clear the list

  state.visitList.forEach((brewery) => {
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

    const removeButton = createElementWithText(
      "button",
      "Remove from Visit List"
    );
    removeButton.addEventListener("click", async () => {
      await removeFromVisitList(brewery.id);
      await updateVisitList();
      filterBreweries();
    });

    li.append(
      h2,
      typeDiv,
      addressSection,
      phoneSection,
      linkSection,
      removeButton
    );
    visitListElement.appendChild(li);
  });
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
      state.pagination.currentPage = 1;
      renderCityFilters();
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

// Event listener for search input
document
  .getElementById("search-breweries")
  .addEventListener("input", (event) => {
    state.searchQuery = event.target.value.trim();
    filterBreweries();
  });

// Event listener for pagination buttons
document.getElementById("prev-page").addEventListener("click", () => {
  if (state.pagination.currentPage > 1) {
    state.pagination.currentPage--;
    filterBreweries();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  state.pagination.currentPage++;
  filterBreweries();
});

// Event listener for clearing all city filters
document.querySelector(".clear-all-btn").addEventListener("click", () => {
  state.selectedCities = [];
  renderCityFilters();
  filterBreweries();
});
// Toggle the visibility of the visit list section
function toggleVisitList() {
  const visitListSection = document.getElementById("visit-list-section");
  const breweriesSection = document.querySelector("main > article");

  if (visitListSection.style.display === "none") {
    visitListSection.style.display = "block";
    breweriesSection.style.display = "none";
  } else {
    visitListSection.style.display = "none";
    breweriesSection.style.display = "block";
  }
}

// Event listener for viewing visit list
document
  .getElementById("view-visit-list")
  .addEventListener("click", (event) => {
    event.preventDefault();
    toggleVisitList();
  });

// Initial load of the visit list
updateVisitList();
