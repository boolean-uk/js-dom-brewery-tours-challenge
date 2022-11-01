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

// Extension 3 - Pagination
// 1) Add prev + next buttons - only to appear when the user searches for a state
// 2) Update fetch URL with some kind of state value- which page we're on
// 3) Set event listeners on the buttons that increase or decrease page in state depending on which button clicked
// 4) Send another fetch request with new page number
// 5) Add state value that tracks whether there's more results to display or not
// 6) If that value is true, return out of increment event listener

// Extension 4 - add visit list
// 1) Add 'add to visit' button to each brewery card
// 2) Set up json server
// 3) Add event listener to button- when clicked, we make a POST request to the server, sending an object of details about the chosen brewery. Push that brewery to a state visit list
// 4) Create a separate page to display visit list - render the breweries in the state visit list array
// 5) On this page, each displayed brewery has a remove from visit list button
// 6) Add event listener to this button - if clicked, we make a delete request to the server then rerender page
// 7) If the brewery is already in the visit list, prevent from adding + maybe display some kind of message
// 8) On page reload, we need to send a GET request to the json server and then load the visit list

// Selections
const search = document.querySelector("#select-state");
const mainList = document.querySelector(".breweries-list");
const stateForm = document.querySelector("#select-state-form");
const filterSelect = document.querySelector("#filter-by-type");
const filterCity = document.querySelector("#filter-by-city-form");
const searchBreweries = document.querySelector("#search-breweries");
const clearCityBtn = document.querySelector(".clear-all-btn");
const btnContainer = document.querySelector(".btn-container");

// State
const state = {
  userSearch: "",
  breweries: [],
  filterType: "",
  filterTitle: "",
  filterCities: [],
  page: 1,
  noResults: false,
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
  resetPageNumber();

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

  createButtons();
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
  number.innerText = brewery.phone || "N/A";

  const sectionLink = document.createElement("section");
  sectionLink.classList.add("link");

  const siteLink = document.createElement("a");
  siteLink.innerText = "Visit Website";
  siteLink.setAttribute("href", brewery.website_url);
  siteLink.setAttribute("target", "_blank");
  const visitLink = document.createElement("button");
  visitLink.innerText = "Add to visit list";

  city.append(strong);
  sectionAddress.append(address, street, city);
  sectionPhone.append(phone, number);
  sectionLink.append(visitLink, siteLink);

  li.append(h2, div, sectionAddress, sectionPhone, sectionLink);
  mainList.appendChild(li);
}

function createButtons() {
  // Ensures we don't add the buttons every time the list is rerendered
  if (btnContainer.hasChildNodes()) {
    return;
  }
  const prevBtn = document.createElement("button");
  prevBtn.classList.add("page-btn");
  prevBtn.innerText = "Previous";
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("page-btn");
  nextBtn.innerText = "Next";
  const pageNumber = document.createElement("p");
  pageNumber.classList.add("page-number");
  pageNumber.innerText = state.page;

  prevBtn.addEventListener("click", () => {
    handlePageButtons("decrement", pageNumber);
  });

  nextBtn.addEventListener("click", () => {
    handlePageButtons("increment", pageNumber);
  });

  btnContainer.append(prevBtn, pageNumber, nextBtn);
}

function handlePageButtons(operation, pageNumber) {
  if (operation === "decrement") {
    if (state.page === 1) return;
    state.page--;
  } else if (operation === "increment") {
    if (state.noResults) return;
    state.page++;
  }
  getBreweries();
  pageNumber.innerText = state.page;
}

function resetPageNumber() {
  const pageNumber = document.querySelector(".page-number");
  if (pageNumber !== null) {
    state.page = 1;
    pageNumber.innerText = state.page;
  }
}

//////////////////////////////////////////////////////
// Fetch functions //
//////////////////////////////////////////////////////

function getBreweries() {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}&per_page=50&page=${state.page}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Basic error message if 0 items in array
      if (data.length < 1) {
        mainList.innerText = "Sorry, there are no results to display";
        // Change state variable so we can stop pagination from functioning when there's no results to display
        state.noResults = true;
        return;
      }

      // If data received, we reset this noResults variable
      state.noResults = false;
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

      // removes the buttons if the user has a city selected
      if (state.filterCities.length > 0) {
        btnContainer.innerHTML = "";
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
