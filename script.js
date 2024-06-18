// Setup state object
const state = {
  breweries: [],
  selectedState: "",
  selectedType: "",
  searchQuery: "",
  selectedCities: [],
  currentPage: 1,
  breweriesPerPage: 10,
};

// Fetch breweries data from the API based on the selected state
async function fetchBreweries(stateName) {
  const response = await fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${stateName}`
  );
  const data = await response.json();
  state.breweries = data.filter(
    (brewery) =>
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
  );
  state.currentPage = 1;
  renderCityFilters();
  renderBreweries();
}

// Create an HTML element
function createElement(tag, textContent = "", attributes = {}) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );
  return element;
}

// Render city filters
function renderCityFilters() {
  const cities = [
    ...new Set(state.breweries.map((brewery) => brewery.city)),
  ].sort();
  const cityList = document.getElementById("city-list");

  // Clear the list
  while (cityList.firstChild) {
    cityList.removeChild(cityList.firstChild);
  }

  cities.forEach((city) => {
    const listItem = document.createElement("li");
    const checkbox = createElement("input", "", {
      type: "checkbox",
      value: city,
    });
    checkbox.addEventListener("change", function (event) {
      if (event.target.checked) {
        state.selectedCities.push(city);
      } else {
        state.selectedCities = state.selectedCities.filter(
          (selectedCity) => selectedCity !== city
        );
      }
      state.currentPage = 1;
      renderBreweries();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(createElement("label", city));
    cityList.appendChild(listItem);
  });
}

// Render the breweries list
function renderBreweries() {
  const breweriesList = document.getElementById("breweries-list");

  // Clear the list before rendering
  while (breweriesList.firstChild) {
    breweriesList.removeChild(breweriesList.firstChild);
  }

  const filteredBreweries = state.breweries.filter((brewery) => {
    if (state.selectedType && brewery.brewery_type !== state.selectedType)
      return false;
    if (
      state.searchQuery &&
      !brewery.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
      return false;
    if (
      state.selectedCities.length &&
      !state.selectedCities.includes(brewery.city)
    )
      return false;
    return true;
  });

  const totalBreweries = filteredBreweries.length;
  const totalPages = Math.ceil(totalBreweries / state.breweriesPerPage);
  const startIndex = (state.currentPage - 1) * state.breweriesPerPage;
  const endIndex = Math.min(
    startIndex + state.breweriesPerPage,
    totalBreweries
  );
  const breweriesToShow = filteredBreweries.slice(startIndex, endIndex);

  breweriesToShow.forEach((brewery) => {
    const listItem = document.createElement("li");

    const name = createElement("h2", brewery.name);
    const type = createElement("div", brewery.brewery_type, { class: "type" });
    const addressSection = document.createElement("section");
    const phoneSection = document.createElement("section");
    const linkSection = document.createElement("section");

    addressSection.classList.add("address");
    addressSection.appendChild(createElement("h3", "Address:"));
    addressSection.appendChild(createElement("p", brewery.street || ""));
    addressSection.appendChild(
      createElement("p", `${brewery.city}, ${brewery.postal_code}`, {
        style: "font-weight: bold;",
      })
    );

    phoneSection.classList.add("phone");
    phoneSection.appendChild(createElement("h3", "Phone:"));
    phoneSection.appendChild(createElement("p", brewery.phone || "N/A"));

    linkSection.classList.add("link");
    const link = createElement("a", "Visit Website", {
      href: brewery.website_url || "#",
      target: "_blank",
    });
    linkSection.appendChild(link);

    listItem.appendChild(name);
    listItem.appendChild(type);
    listItem.appendChild(addressSection);
    listItem.appendChild(phoneSection);
    listItem.appendChild(linkSection);

    breweriesList.appendChild(listItem);
  });

  // Update pagination controls
  document.getElementById(
    "page-info"
  ).textContent = `Page ${state.currentPage} of ${totalPages}`;
  document.getElementById("prev-page").disabled = state.currentPage === 1;
  document.getElementById("next-page").disabled =
    state.currentPage === totalPages;
}

// Handle form submission
document
  .getElementById("select-state-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const stateInput = document.getElementById("select-state").value;
    state.selectedState = stateInput;
    fetchBreweries(stateInput);
  });

// Event listener for the type filter change event
document
  .getElementById("filter-by-type")
  .addEventListener("change", function (event) {
    state.selectedType = event.target.value;
    state.currentPage = 1;
    renderBreweries();
  });

// Event listener for the search input
document
  .getElementById("search-breweries")
  .addEventListener("input", function (event) {
    state.searchQuery = event.target.value;
    state.currentPage = 1;
    renderBreweries();
  });

// Event listener for the clear cities button
document.getElementById("clear-cities").addEventListener("click", function () {
  state.selectedCities = [];
  document
    .querySelectorAll("#city-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  state.currentPage = 1;
  renderBreweries();
});

// Event listener for pagination controls
document.getElementById("prev-page").addEventListener("click", function () {
  if (state.currentPage > 1) {
    state.currentPage--;
    renderBreweries();
  }
});

document.getElementById("next-page").addEventListener("click", function () {
  const totalBreweries = state.breweries.filter((brewery) => {
    if (state.selectedType && brewery.brewery_type !== state.selectedType)
      return false;
    if (
      state.searchQuery &&
      !brewery.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
      return false;
    if (
      state.selectedCities.length &&
      !state.selectedCities.includes(brewery.city)
    )
      return false;
    return true;
  }).length;

  const totalPages = Math.ceil(totalBreweries / state.breweriesPerPage);
  if (state.currentPage < totalPages) {
    state.currentPage++;
    renderBreweries();
  }
});
