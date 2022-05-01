const state = {
  searchState: "",
  breweryType: "",
  byName: "",
  data: [],
  cityList: [],
  selectedCityList: [],
  pageNumber: 1,
};

const brewList = document.getElementById("breweries-list");
const breweryTypes = ["micro", "regional", "brewpub"];
const filterByCityForm = document.getElementById("filter-by-city-form");

const clearAllCheckboxes = document.querySelector(".clear-all-btn");

const firstPage = document.querySelector(".first");
const nextPage = document.querySelector(".next");
const previousPage = document.querySelector(".previous");

// PAGINATION
firstPage.addEventListener("click", (event) => {
  state.pageNumber = 1;
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.searchState}&per_page=10`
  )
    .then((res) => res.json())
    .then((data) => {
      renderListOfBreweriesFromFetchedData(data);
    });
});

nextPage.addEventListener("click", () => {
  const breweryListItems = document.querySelectorAll(".brewery-list-item");
  if (breweryListItems.length > 1) state.pageNumber += 1;
  fetchData().then((data) => {
    state.data = data;
    renderListOfBreweriesFromFetchedData(data);

    if (breweryListItems.length === 0) {
      brewList.insertAdjacentHTML(
        "afterbegin",
        `<h3>Oops.....that was the last brewery. Go back a page</h3>`
      );
    }
  });
});

previousPage.addEventListener("click", () => {
  if (state.pageNumber > 1) state.pageNumber -= 1;
  fetchData().then((data) => {
    state.data = data;
    renderListOfBreweriesFromFetchedData(data);
  });
});

clearAllCheckboxes.addEventListener("click", (event) => {
  clearCheckedBoxes();
});

// SEARCH FOR SPECIFIC BREWERY BY NAME ONLY. SEARCH WILL DISPLAY
// BREWERIES THAT MATCH SEARCH ENTRY, ALONG WITH CORRESPONDING CITY
const searchForBreweryByNameForm = document.getElementById(
  "search-breweries-form"
);
searchForBreweryByNameForm.addEventListener("input", (event) => {
  state.byName = event.target.value;
  fetch(`https://api.openbrewerydb.org/breweries?by_name=${state.byName}`)
    .then((res) => res.json())
    .then((data) => {
      renderListOfBreweriesFromFetchedData(data);
    });
});

// SEARCH FOR BREWERY BY STATE - IT WILL DISPLAY A LIST OF BREWERIES
// ALONG WITH A LIST OF CITIES. NARROW SEARCH BY SELECTING A CITY
const searchForBreweryByStateForm =
  document.getElementById("select-state-form");
searchForBreweryByStateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = event.target.querySelector("#select-state").value;
  state.searchState = searchInput.toLowerCase().replace(" ", "_");
  searchForBreweryByStateForm.reset();
  fetchData().then((data) => {
    state.data = data;
    renderListOfBreweriesFromFetchedData(data);
  });
});

// FILTER AND DISPLAY LIST OF BREWERIES. MICRO, REGIONAL OR BREWPUB
const filterBreweriesByType = document.querySelector("#filter-by-type-form");
filterBreweriesByType.addEventListener("click", (event) => {
  if (event.target.value) {
    state.breweryType = event.target.value;
    fetchData().then((data) => {
      state.data = data;
      renderListOfBreweriesFromFetchedData(data);
    });
  }
});

// CREATE URL's FROM CLICK EVENTS
function createUrl() {
  if (state.searchState === "") return "";

  if (state.searchState) {
    let url = `https://api.openbrewerydb.org/breweries?by_state=${state.searchState}&per_page=10&page=${state.pageNumber}`;
    if (state.breweryType)
      url = url + `&by_type=${state.breweryType.toLowerCase()}`;
    return url;
  } else if (state.byName) {
    console.log(state.byName);
    let url = `https://api.openbrewerydb.org/breweries?by_name=${state.byName}`;
    console.log(url);
    return url;
  }
}

// FETCH DATA USING CONSTRUCTED URL's
async function fetchData() {
  const url = createUrl();
  if (url === "") return;

  const res = await fetch(url);
  return await res.json();
}

// RENDER LIST OF BREWERIES FROM FETCHED DATA
// CREATES UNIQUE LIST OF CITY NAMES
// RENDERS CITIES -  renderListOfCitiesFromStoredData()
function renderListOfBreweriesFromFetchedData(data) {
  brewList.innerHTML = "";

  const cityList = [];

  data.forEach((el) => {
    if (breweryTypes.includes(el.brewery_type)) {
      const htmlBrewery = getBreweryHtml(el);

      brewList.insertAdjacentHTML("afterbegin", htmlBrewery);

      if (!cityList.includes(el.city)) {
        cityList.push(el.city);
        cityList.sort().reverse();
      }
    }
  });
  renderListOfCitiesFromStoredData(cityList);
}

// RENDER A LIST OF CITIES FROM cityList VARIABLE
function renderListOfCitiesFromStoredData(cityList) {
  filterByCityForm.innerHTML = "";
  state.selectedCityList = [];

  cityList.forEach((city) => {
    const htmlCityList = `<input class='city-list' id='${city}item-list' type="checkbox" name="${city.toLowerCase()}" value="${city.toLowerCase()}" />
    <label for="${city.toLowerCase()}">${city}</label>`;

    filterByCityForm.insertAdjacentHTML("afterbegin", htmlCityList);

    const listItem = document.getElementById(`${city}item-list`);
    listItem.addEventListener("change", (event) => {
      toggleSelectedCitiesRenderListOfBreweries(event);
    });
  });

  state.cityList = cityList.map((city) => {
    return city.toLowerCase();
  });
}

// SELECT CITIES AND RENDER LIST OF BREWERIES ACCORDINGLY
function toggleSelectedCitiesRenderListOfBreweries(event) {
  if (event.target.checked) {
    state.selectedCityList.push(event.target.value);
  } else if (
    !event.target.checked &&
    state.selectedCityList.includes(event.target.value)
  ) {
    filteredCityList = state.selectedCityList.filter(
      (el) => el !== event.target.value
    );
    state.selectedCityList = filteredCityList;
  }
  renderListOfBreweriesFromSelectedCities(state.selectedCityList);

  if (state.selectedCityList.length === 0)
    renderListOfBreweriesFromFetchedData(state.data);
}

// ONCE CITIES ARE CHECKED THEY ARE RENDERED
function renderListOfBreweriesFromSelectedCities() {
  brewList.innerHTML = "";

  state.data.forEach((el) => {
    if (state.selectedCityList.includes(el.city.toLowerCase())) {
      const htmlBrewery = getBreweryHtml(el);

      brewList.insertAdjacentHTML("afterbegin", htmlBrewery);
    }
  });
}

// CLEAR CHECK BOXES BY clear all
function clearCheckedBoxes() {
  const citiesList = document.querySelectorAll(".city-list");
  citiesList.forEach((city) => {
    city.checked = false;
  });
  renderListOfBreweriesFromFetchedData(state.data);
}

// RETURN VALUE OF FUNCTION IS THE BREWERY LIST ITEMS
// USED: renderListOfBreweriesFromFetchedData()
// AND: renderListOfBreweriesFromSelectedCities()
function getBreweryHtml(el) {
  const htmlBrewery = `<li class='brewery-list-item'>
  <h2>${el.name}</h2>
  <div class="type">${el.brewery_type}</div>
  <section class="address">
    <h3>Address:</h3>
    <p>${el.street}</p>
    <p><strong>${el.city}, ${el.postal_code}</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>N/A</p>
  </section>
  <section class="link">
    <a href="${el.website_url}" target="_blank">Visit Website</a>
  </section>
  </li>`;

  return htmlBrewery;
}
