const breweriesList = document.querySelector(".breweries-list");
const selectStateForm = document.getElementById("select-state-form");
const filterByTypeForm = document.getElementById("filter-by-type-form");
const searchBreweriesForm = document.getElementById("search-breweries-form");
const filterByCityForm = document.getElementById("filter-by-city-form");

// ---------------------- state ----------------------
const state = {
  state: "",

  breweries: [],
  breweriesFiltered: [],

  breweryType: "",
  breweryName: "",
  desiredCities: [],
};

const validBreweryTypes = ["micro", "regional", "brewpub"];

// ---------------------- main event Listners ----------------------

selectStateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.state = e.target[0].value;
  getBreweries();
});

filterByTypeForm.addEventListener("change", (e) => {
  e.preventDefault();
  state.breweryType = e.target.value;
  _filterBreweries();
});

searchBreweriesForm.addEventListener("input", (e) => {
  state.breweryName = "";
  state.breweryName += e.target.value;
  _filterBreweries();
});

// ---------------------- GET method ----------------------

function getBreweries() {
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.state}`)
    .then((res) => res.json())
    .then((data) => {
      const validBreweries = data.filter((brewery) => {
        if (validBreweryTypes.includes(brewery.brewery_type)) return true;
      });
      state.breweries = validBreweries;

      _renderBreweries(validBreweries);
    });
}

// ---------------------- filtering of breweries ----------------------

function _filterBreweries() {
  state.breweriesFiltered = state.breweries;
  _filterByType();
  _filterByName();
  _filterByCity();
  _renderBreweries(state.breweriesFiltered);
}

function _filterByType() {
  if (state.breweryType.length > 0) {
    state.breweriesFiltered = state.breweries.filter(
      (brewery) => brewery.brewery_type === state.breweryType
    );
  }
}

function _filterByName() {
  if (!state.breweryName) _renderBreweries(state.breweries);
  else {
    state.breweriesFiltered = state.breweriesFiltered.filter((brewery) =>
      brewery.name.toLowerCase().includes(state.breweryName.toLowerCase())
    );
  }
}

function _filterByCity() {
  console.log(state.breweriesFiltered);
  state.breweriesFiltered = state.breweriesFiltered.filter((brewery) =>
    state.desiredCities.includes(brewery.city)
  );
  console.log(state.breweriesFiltered);
}

// ---------------------- rendering of Page elements----------------------

function _renderCityCheckBoxes(breweries) {
  filterByCityForm.innerHTML = "";
  const cityNameArray = [...new Set(breweries.map((brewery) => brewery.city))];

  cityNameArray.forEach((cityName) => _createCityCheckBox(cityName));
}

function _renderBreweries(breweries) {
  _renderCityCheckBoxes(state.breweries);

  breweriesList.innerHTML = "";

  breweries.forEach((brewery) => {
    const li = _createBreweryItem(brewery);

    breweriesList.append(li);
  });
}

// ---------------------- creation of Page elements----------------------

function _createBreweryItem(brewery) {
  const li = document.createElement("li");

  li.innerHTML = `
  <h2>${brewery.name}</h2>
  
  <div class="type">${brewery.brewery_type}</div>
  
  <section class="address">
  <h3>Address:</h3>
  <p>${brewery.street}</p>
  <p><strong>${brewery.state}, ${brewery.postal_code}</strong></p>
  </section>
  
  <section class="phone">
  <h3>Phone:</h3>
  <p>${brewery.phone ? brewery.phone : "N/A"}</p>
  </section>
  
  <section class="link">
  <a href="${brewery.website_url}" target="_blank">Visit Website</a>
  </section>`;

  return li;
}

function _createCityCheckBox(cityName) {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = cityName;
  input.value = cityName;

  input.addEventListener("change", (e) => {
    const targetCity = e.target.value;

    if (state.desiredCities.includes(targetCity)) {
      const idx = state.desiredCities.indexOf(targetCity);
      state.desiredCities.splice(idx, 1);
    } else {
      state.desiredCities.push(targetCity);
    }

    _filterBreweries();
  });

  const label = document.createElement("label");
  label.for = cityName;
  label.innerText = cityName;

  filterByCityForm.append(input);
  filterByCityForm.append(label);
}
