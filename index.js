const breweriesList = document.querySelector(".breweries-list");
const selectStateForm = document.getElementById("select-state-form");
const filterByTypeForm = document.getElementById("filter-by-type-form");
const searchBreweriesForm = document.getElementById("search-breweries-form");
const filterByCityForm = document.getElementById("filter-by-city-form");

const state = {
  state: "",
  breweryType: "",
  breweryName: "",
  desiredCities: [],
};

const validBreweryTypes = ["micro", "regional", "brewpub"];

selectStateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.state = e.target[0].value;
  getAndRenderBreweries();
});

filterByTypeForm.addEventListener("change", (e) => {
  e.preventDefault();
  state.breweryType = e.target.value;
  getAndRenderBreweries();
});

searchBreweriesForm.addEventListener("input", (e) => {
  state.breweryName = e.target.value;
  getAndRenderBreweries();
});

function getAndRenderBreweries() {
  fetch(_createURL())
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter((brewery) => {
        if (validBreweryTypes.includes(brewery.brewery_type)) return true;
      });
      _renderCityCheckBoxes(filtered);
      _renderBreweries(filtered);
    });
}

function _createURL() {
  return `https://api.openbrewerydb.org/breweries?by_state=${state.state}${
    state.breweryType ? "&by_type=" + state.breweryType : ""
  }${state.breweryName ? "&by_name=" + state.breweryName : ""}`;
}

function _renderCityCheckBoxes(breweries) {
  filterByCityForm.innerHTML = "";
  const cityNameArray = [...new Set(breweries.map((brewery) => brewery.city))];

  cityNameArray.forEach((cityName) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = cityName;
    input.value = cityName;

    const label = document.createElement("label");
    label.for = cityName;
    label.innerText = cityName;

    filterByCityForm.append(input);
    filterByCityForm.append(label);

    input.addEventListener("change", (e) =>
      _filterByCity(breweries, e.target.value)
    );
  });
}

function _filterByCity(breweries, breweryName) {
  state.desiredCities.push(breweryName);

  const filtered = breweries.filter((brewery) => {
    if (state.desiredCities.includes(brewery.city)) return true;
  });

  _renderBreweries(filtered);
  console.log(filtered);
}

function _renderBreweries(breweries) {
  breweriesList.innerHTML = "";

  breweries.forEach((brewery) => {
    const li = _createTodoListItem(brewery);

    breweriesList.append(li);
  });
}

function _createTodoListItem(brewery) {
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
