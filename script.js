const state = {
  breweries: [],
  breweriesInputSearch: [],
  cities: [],
  selectedCities: [],
  breweriesFilteredByCity: [],
  userInputState: "",
  userInputSearch: "",
  currentPageItems: [],
  currentPage: 1,
};
init();
function init() {
  mainStateSearch();
  filterListening();
  breweriesSearch();
}
function mainStateSearch() {
  const searchForm = document.querySelector("#select-state-form");
  const inputField = document.querySelector("#select-state");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.userInputState = inputField.value;
    apiCall();
  });
}
function apiCall() {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.userInputState}&per_page=50`
  )
    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
      state.breweries = breweries;
      filterToMicroRegionalBrewpub();
      citiesGenerator(state.breweries);
      pagination();
    });
}
function filterToMicroRegionalBrewpub() {
  state.breweries = state.breweries.filter((brewery) => {
    if (
      brewery.brewery_type !== "micro" &&
      brewery.brewery_type &&
      "regional" &&
      brewery.brewery_type !== "brewpub"
    ) {
      return false;
    } else {
      return true;
    }
  });
}
function pageRender(listToRender) {
  breweriesUL = document.querySelector("#breweries-list");
  breweriesUL.innerHTML = "";
  if (listToRender == false) {
    noBreweriesErrorMessage();
  } else {
    listToRender.forEach((brewery) => {
      cardsRender(brewery);
    });
  }
}
function noBreweriesErrorMessage() {
  const li = document.createElement("li");
  breweriesUL.appendChild(li);
  const h2 = document.createElement("h2");
  h2.innerText = "Nothing to display";
  li.appendChild(h2);
}
function cardsRender(brewery) {
  const li = document.createElement("li");
  breweriesUL.appendChild(li);
  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;
  li.appendChild(h2);
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  div.innerText = brewery.brewery_type;
  li.appendChild(div);
  const section = document.createElement("section");
  section.setAttribute("class", "address");
  li.appendChild(section);
  const h3 = document.createElement("h3");
  h3.innerText = "Address:";
  section.appendChild(h3);
  const p1 = document.createElement("p");
  p1.innerText = brewery.street;
  section.appendChild(p1);
  const p2 = document.createElement("p");
  section.appendChild(p2);
  const strong = document.createElement("strong");
  strong.innerText = `${brewery.city}, ${brewery.postal_code}`;
  p2.appendChild(strong);
  const section2 = document.createElement("section");
  section2.setAttribute("class", "phone");
  li.appendChild(section2);
  const h3Phone = document.createElement("h3");
  h3Phone.innerText = "Phone";
  section2.appendChild(h3Phone);
  const pPhone = document.createElement("p");
  pPhone.innerText = brewery.phone || "N/A";
  section2.appendChild(pPhone);
  const section3 = document.createElement("section");
  section3.setAttribute("class", "link");
  li.appendChild(section3);
  const a = document.createElement("a");
  a.setAttribute("href", brewery.website_url);
  a.setAttribute("target", "_blank");
  a.innerText = "Visit Website";
  section3.appendChild(a);
}
function filterListening() {
  const filterForm = document.querySelector("#filter-by-type");
  filterForm.addEventListener("change", (event) => {
    event.preventDefault();
    if (filterForm.value) {
      newAPICallWithFilters(filterForm.value);
    } else {
      apiCall();
    }
  });
}
function newAPICallWithFilters(filter) {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.userInputState}&per_page=50&by_type=${filter}`
  )
    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
      state.breweries = breweries;
      citiesGenerator(state.breweries);
      pagination();
    });
}
function breweriesSearch() {
  const breweriesSearchForm = document.querySelector("#search-breweries");
  breweriesSearchForm.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      state.userInputSearch = state.userInputSearch.slice(0, -1);
    } else if (
      event.key === "Shift" ||
      event.key === "Control" ||
      event.key === "Enter" ||
      event.key === "Alt"
    ) {
    } else {
      state.userInputSearch += event.key;
    }
    state.breweriesInputSearch = state.breweries.filter((brewery) => {
      if (
        brewery.name.toLowerCase().includes(state.userInputSearch.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log(state.breweriesInputSearch);
    pageRender(state.breweriesInputSearch);
  });
}
function citiesGenerator(breweryList) {
  breweryList.forEach((brewery) => {
    state.cities.push(brewery.city);
  });
  state.cities = [...new Set(state.cities)];
  state.cities = state.cities.sort();
  renderCities();
}
function renderCities() {
  const cityForm = document.querySelector("#filter-by-city-form");
  cityForm.innerText = "";
  state.cities.forEach((city) => {
    const cityInput = document.createElement("input");
    cityInput.setAttribute("type", "checkbox");
    cityInput.setAttribute("name", `${city}`);
    cityInput.setAttribute("value", `${city}`);
    cityInput.setAttribute("id", `${city}`);
    cityForm.appendChild(cityInput);

    const cityLabel = document.createElement("label");
    cityLabel.setAttribute("for", `${city}`);
    cityLabel.innerText = city;
    cityForm.appendChild(cityLabel);

    cityFilterEventListener(city, cityInput);
  });
  clearAll();
}

function cityFilterEventListener(city, cityInput) {
  cityInput.addEventListener("change", () => {
    if (state.selectedCities.includes(city)) {
      const index = state.selectedCities.indexOf(city);
      state.selectedCities.splice(index, 1);
    } else {
      state.selectedCities.push(city);
    }
    filterCities();
  });
}

function clearAll() {
  const clearAll = document.querySelector(".clear-all-btn");
  clearAll.addEventListener("click", () => {
    pageRender(state.breweries);
    citiesGenerator(state.breweries);
  });
}

function filterCities() {
  state.breweriesFilteredByCity = state.breweries.filter((brewery) => {
    if (state.selectedCities.includes(brewery.city)) {
      return true;
    } else {
      return false;
    }
  });
  if (state.selectedCities == false) {
    pageRender(state.breweries);
  } else {
    pageRender(state.breweriesFilteredByCity);
  }
}

function pagination() {
  state.currentPageItems = state.breweries.filter((brewery, index) => {
    if (
      index >= 10 * state.currentPage - 9 &&
      index <= 10 * state.currentPage
    ) {
      return true;
    }
  });
  pageRender(state.currentPageItems);
  renderPaginationButtons();
}

function renderPaginationButtons() {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  for (i = 1; i <= state.breweries.length / 10; i++) {
    const paginationLink = document.createElement("a");
    paginationLink.innerText = i;
    paginationContainer.appendChild(paginationLink);
    if (i === state.currentPage) {
      paginationLink.setAttribute("class", "active");
    }
    paginationEventListener(paginationLink, i);
  }
}
function paginationEventListener(paginationLink, i) {
  paginationLink.addEventListener("click", () => {
    state.currentPage = i;
    pagination();
  });
}
