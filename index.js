let state = {
  breweries: [],
  filters: {
    type: "",
    city: [],
  },
  search: "",
  pagination: {
    currentPage: 1,
    perPage: 3,
  },
};

// Function to load breweries by state from the local breweries object
function loadBreweriesByState(stateName) {
  console.log(`Loading breweries for state: ${stateName}`);
  state.breweries = breweries.filter(
    (brewery) => brewery.state.toLowerCase() === stateName.toLowerCase()
  );
  console.log(`Filtered breweries:`, state.breweries);
  state.pagination.currentPage = 1;
  renderCityFilters();
  renderBreweries();
}

// Function to create a new element with text content and optional class
function createElement(tag, textContent, className) {
  const element = document.createElement(tag);
  if (textContent) element.textContent = textContent;
  if (className) element.className = className;
  return element;
}

// Function to render the list of breweries
function renderBreweries() {
  const breweryList = document.getElementById("breweries-list");
  breweryList.textContent = ""; // Clear the list

  const filteredBreweries = state.breweries
    .filter(
      (brewery) =>
        !state.filters.type || brewery.brewery_type === state.filters.type
    )
    .filter((brewery) =>
      brewery.name.toLowerCase().includes(state.search.toLowerCase())
    )
    .filter(
      (brewery) =>
        !state.filters.city.length || state.filters.city.includes(brewery.city)
    );

  const startIndex =
    (state.pagination.currentPage - 1) * state.pagination.perPage;
  const paginatedBreweries = filteredBreweries.slice(
    startIndex,
    startIndex + state.pagination.perPage
  );

  console.log(
    `Rendering breweries with search term "${state.search}":`,
    paginatedBreweries
  );

  paginatedBreweries.forEach((brewery) => {
    const breweryItem = document.createElement("li");

    const nameElement = createElement("h2", brewery.name);
    breweryItem.appendChild(nameElement);

    const typeElement = createElement(
      "div",
      brewery.brewery_type.toUpperCase(),
      "type"
    );
    breweryItem.appendChild(typeElement);

    const addressSection = createElement("section", null, "address");
    addressSection.appendChild(createElement("h3", "Address:"));
    addressSection.appendChild(createElement("p", brewery.street));
    addressSection.appendChild(
      createElement("p", `${brewery.city}, ${brewery.postal_code}`)
    );
    breweryItem.appendChild(addressSection);

    const phoneSection = createElement("section", null, "phone");
    phoneSection.appendChild(createElement("h3", "Phone:"));
    phoneSection.appendChild(createElement("p", brewery.phone || "N/A"));
    breweryItem.appendChild(phoneSection);

    const linkSection = createElement("section", null, "link");
    const linkElement = createElement("a", "VISIT WEBSITE");
    linkElement.href = brewery.website_url;
    linkElement.target = "_blank";
    linkSection.appendChild(linkElement);
    breweryItem.appendChild(linkSection);

    breweryList.appendChild(breweryItem);
  });

  updatePaginationControls(filteredBreweries.length);
}

// Function to update pagination controls
function updatePaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / state.pagination.perPage);
  const pageInfo = document.getElementById("page-info");
  pageInfo.textContent = `Page ${state.pagination.currentPage} of ${totalPages}`;

  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  prevPageButton.disabled = state.pagination.currentPage === 1;
  nextPageButton.disabled = state.pagination.currentPage === totalPages;

  prevPageButton.addEventListener("click", function () {
    if (state.pagination.currentPage > 1) {
      state.pagination.currentPage--;
      renderBreweries();
    }
  });

  nextPageButton.addEventListener("click", function () {
    if (state.pagination.currentPage < totalPages) {
      state.pagination.currentPage++;
      renderBreweries();
    }
  });
}

// Function to render city filters
function renderCityFilters() {
  const cities = [...new Set(state.breweries.map((brewery) => brewery.city))];
  const cityFilterForm = document.getElementById("filter-by-city-form");
  cityFilterForm.textContent = ""; // Clear the form

  cities.forEach((city) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = city;
    checkbox.value = city;

    const label = document.createElement("label");
    label.textContent = city;
    label.htmlFor = city;

    cityFilterForm.appendChild(checkbox);
    cityFilterForm.appendChild(label);
  });
}

// Event listener for state form submission
document
  .getElementById("select-state-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const stateName = document.getElementById("select-state").value.trim();
    console.log(`State name entered: ${stateName}`);
    if (stateName) {
      loadBreweriesByState(stateName);
    }
  });

// Event listener for type filter change
document
  .getElementById("filter-by-type")
  .addEventListener("change", function (event) {
    state.filters.type = event.target.value;
    console.log(`Type filter selected: ${state.filters.type}`);
    state.pagination.currentPage = 1;
    renderBreweries();
  });

// Event listener for search input
document
  .getElementById("search-breweries")
  .addEventListener("input", function (event) {
    state.search = event.target.value.trim();
    console.log(`Search term entered: ${state.search}`);
    state.pagination.currentPage = 1;
    renderBreweries();
  });

// Event listener for city filter change
document
  .getElementById("filter-by-city-form")
  .addEventListener("change", function (event) {
    const checkboxes = document.querySelectorAll(
      '#filter-by-city-form input[type="checkbox"]'
    );
    state.filters.city = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    console.log(`City filters selected: ${state.filters.city}`);
    state.pagination.currentPage = 1;
    renderBreweries();
  });

// Event listener for clear all button
document.querySelector(".clear-all-btn").addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(
    '#filter-by-city-form input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  state.filters.city = [];
  console.log(`City filters cleared`);
  state.pagination.currentPage = 1;
  renderBreweries();
});
