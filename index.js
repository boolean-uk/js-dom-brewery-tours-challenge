// 1) Select form and set up submit event. Capture what user types and store in state
// 2) Perform GET request to https://api.openbrewerydb.org/breweries?by_state=[state]
// 3) Filter out anything not micro, regional or brewpub before passing into state
// 4) Call a render function that will generate HTML for each brewery in the state array
// 5) Make sure to link to website for each brewery - take URL from object

// State - userSearch, breweries, list of possible filters

// Second core requirement - From the 'filter by type of brewery' section, a user can filter by type of brewery.
// 1) Select second form- we need to know if the user has selected one of the filter options
// 2) In our render or separate function, we filter the currently displayed breweries to only include a selected type
// 3) We rerender the list

// Extension 1 - Search bar
// 1) Select new search bar and add keyup event listener
// 2) We filter the breweries each time a key is pressed - we can use the includes array method to check if the user's searched value appears in the title
// 3) Rerender the list

// Extension 2 - Cities filter
// 1) Add city form to HTML
// 2) Create a function where we loop through the state breweries and generate a checkbox for each featured city
// 3) Add an event listener to the cities form + check which boxes have been selected
// 4) Add the selected cities to a cities array in state
// 5) Filter the state breweries so only the selected cities are included
// 6) Rerender the main list

// Selections
const search = document.querySelector("#select-state");
const mainList = document.querySelector(".breweries-list");
const stateForm = document.querySelector("#select-state-form");
const filterSelect = document.querySelector("#filter-by-type");
const filterCity = document.querySelector("#filter-by-city-form");
const searchBreweries = document.querySelector("#search-breweries");
const clearCityBtn = document.querySelector(".clear-all-btn");

// State
const state = {
  userSearch: "",
  breweries: [],
  filterType: "",
  filterTitle: "",
  filterCities: [],
};

//////////////////////////////////////////////////////
// Event listeners //
//////////////////////////////////////////////////////

stateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  resetFilters();
  const searchTerm = search.value.toLowerCase().trim();
  state.userSearch = searchTerm;
  search.value = "";

  getBreweries();
});

filterSelect.addEventListener("change", () => {
  state.filterType = filterSelect.value;
  filterByType();
});

searchBreweries.addEventListener("keyup", () => {
  state.filterTitle = searchBreweries.value.toLowerCase().trim();
  filterByTitle();
});

clearCityBtn.addEventListener("click", () => {
  // Turns HTML Collection into JS array
  const inputs = [...document.getElementsByTagName("input")];
  inputs.forEach((input) => {
    input.checked = false;
  });

  // remove any cities in the filter list
  state.filterCities = [];
  // rerender full list so the user still has something
  renderBreweries(state.breweries);
});

//////////////////////////////////////////////////////
// Render functions //
//////////////////////////////////////////////////////

function renderBreweries(breweries) {
  mainList.innerHTML = "";

  breweries.forEach((brewery) => {
    createBreweryCard(brewery);
  });
}

function createBreweryCard(brewery) {
  const li = document.createElement("li");

  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;

  const div = document.createElement("div");
  div.classList.add("type");
  div.innerText = brewery.brewery_type;

  const sectionAddress = document.createElement("section");
  sectionAddress.classList.add("address");
  const address = document.createElement("h3");
  address.innerText = "Address:";
  const street = document.createElement("p");
  street.innerText = brewery.street;
  const city = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = `${brewery.city}, ${brewery.postal_code}`;

  const sectionPhone = document.createElement("section");
  const phone = document.createElement("h3");
  phone.innerText = "Phone:";
  const number = document.createElement("p");
  number.innerText = brewery.phone;

  const sectionLink = document.createElement("section");
  sectionLink.classList.add("link");

  const siteLink = document.createElement("a");
  siteLink.innerText = "Visit Website";
  siteLink.setAttribute("href", brewery.website_url);
  siteLink.setAttribute("target", "_blank");

  city.append(strong);
  sectionAddress.append(address, street, city);
  sectionPhone.append(phone, number);
  sectionLink.append(siteLink);

  li.append(h2, div, sectionAddress, sectionPhone, sectionLink);
  mainList.appendChild(li);
}

//////////////////////////////////////////////////////
// Fetch functions //
//////////////////////////////////////////////////////

function getBreweries() {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Basic error message if 0 items in array
      if (data.length < 1) {
        mainList.innerText = "Please enter a valid US state";
        return;
      }

      // Need to reset the breweries array between searches
      state.breweries = [];

      data.forEach((brewery) => {
        if (
          brewery.brewery_type === "brewpub" ||
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional"
        ) {
          state.breweries.push(brewery);
        } else {
          return;
        }
      });

      renderBreweries(state.breweries);
      generateCities();
    });
}

//////////////////////////////////////////////////////
// Filter functions //
//////////////////////////////////////////////////////

function filterByType() {
  if (state.filterType === "") {
    renderBreweries(state.breweries);
  } else {
    // save a copy of the breweries
    let filteredBreweries = state.breweries;

    // run a filter with saved filterType
    filteredBreweries = state.breweries.filter((brewery) => {
      return brewery.brewery_type === state.filterType;
    });

    // rerender the list
    renderBreweries(filteredBreweries);

    // revert breweries back to the full list
    filteredBreweries = state.breweries;
  }
}

function filterByTitle() {
  let filteredBreweries = state.breweries;

  if (filteredBreweries.length < 1) {
    mainList.innerText = "Please enter a state first!";
    return;
  }

  filteredBreweries = state.breweries.filter((brewery) => {
    return brewery.name.toLowerCase().includes(state.filterTitle);
  });

  renderBreweries(filteredBreweries);
}

function filterByCity() {
  const checkboxes = [...document.querySelectorAll("input[type=checkbox]")];

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const city = checkbox.value;
      if (checkbox.checked === true) {
        state.filterCities.push(city);
      } else {
        const match = state.filterCities.find(
          (filtereredCity) => filtereredCity === city
        );
        state.filterCities.splice(state.filterCities.indexOf(match), 1);
      }

      let filteredBreweries = state.breweries.filter((brewery) =>
        state.filterCities.includes(brewery.city.toLowerCase())
      );

      if (filteredBreweries.length < 1) {
        renderBreweries(state.breweries);
      } else {
        renderBreweries(filteredBreweries);
      }
    });
  });
}

// reset the filter select value
function resetFilters() {
  filterSelect.value = "";
}

function generateCities() {
  // Clear the checkboxes each time a new state is searched for
  filterCity.innerHTML = "";

  let uniqueCities = [];

  state.breweries.forEach((brewery) => {
    uniqueCities.push(brewery.city);
  });

  // Using set + spread operator syntax to remove duplicate values
  uniqueCities = [...new Set(uniqueCities)];

  uniqueCities.forEach((city) => {
    const cityLower = city.toLowerCase();
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", cityLower);
    input.setAttribute("value", cityLower);

    const label = document.createElement("label");
    label.setAttribute("for", cityLower);
    label.innerText = city;

    filterCity.append(input, label);
  });

  // moved everything to its own filter function
  filterByCity();
}

// init
resetFilters();
