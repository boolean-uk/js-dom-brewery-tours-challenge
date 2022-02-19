const state = {
  breweries: [],
  brewerySearch: [],
  page: 1,
  breweriesPerPage: 10,
};

const breweriesList = document.querySelector("#breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const filterBrewery = document.querySelector("#filter-by-type-form");
const searchCurrentBreweries = document.querySelector("#search-breweries-form");
const filterByCity = document.querySelector("#filter-by-city-form");
const clearAll = document.querySelector(".clear-all-btn");

filterBrewery.addEventListener("change", function (event) {
  const currentState = state.breweries[0].state;
  if (event.target.value === "") {
    retrieveBreweryData(
      `https://api.openbrewerydb.org/breweries?by_state=${currentState}&per_page=50`
    );
  } else {
    retrieveBreweryData(
      `https://api.openbrewerydb.org/breweries?by_state=${currentState}&by_type=${event.target.value}&per_page=50`
    );
  }
});

stateSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  retrieveBreweryData(
    `https://api.openbrewerydb.org/breweries?by_state=${stateSearch["select-state"].value}&per_page=50`
  );

});

searchCurrentBreweries.addEventListener("input", function (event) {
  breweriesList.innerHTML = "";
  state.brewerySearch = state.breweries
    .filter(
      (brewery) =>
        brewery.name.toLowerCase().includes(event.target.value) ||
        brewery.name.toUpperCase().includes(event.target.value)
    )
    render(state.brewerySearch)
});

clearAll.addEventListener("click", function () {
  const checkboxes = filterByCity.querySelectorAll("input");
  for (const checkbox of checkboxes) {
    checkbox.checked = false;
  }
  state.breweries.forEach((brewery) => (brewery.isCityChecked = false));

  render();
});

function addBrewery(brewery) {
  const liElement = document.createElement("li");
  liElement.innerHTML = `<h2>${brewery.name}</h2>
  <div class="type">${brewery.brewery_type}</div>
  <section class="address">
    <h3>Address:</h3>
    <p>${brewery.street}</p>
    <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>${brewery.phone}</p>
  </section>
  <section class="link">
    <a href="${brewery.website_url}" target="_blank">Visit Website</a>
  </section>`;
  breweriesList.append(liElement);
}

function addCity(brewery) {
  const citiesOnPage = filterByCity.querySelectorAll("label");
  for (const label of citiesOnPage) {
    if (label.innerText === brewery.city) {
      return;
    }
  }
  const input = document.createElement("input");
  const label = document.createElement("label");

  input.setAttribute("type", "checkbox");
  input.checked = true;
  input.setAttribute("name", brewery.city.toLowerCase());
  input.setAttribute("value", brewery.city.toLowerCase());

  input.addEventListener("change", function () {
    for (let i = 0; i < state.breweries.length; i++) {
      if (state.breweries[i].city === brewery.city) {
        state.breweries[i].isCityChecked = input.checked;
      }
    }
    render();
  });

  label.setAttribute("for", brewery.city.toLowerCase());
  label.innerText = brewery.city;

  filterByCity.append(input, label);
}

function addCities() {
  filterByCity.innerHTML = "";
  state.breweries.forEach((brewery) => addCity(brewery));
}

function retrieveBreweryData(apiEndpoint) {
  state.page = 1;
  fetch(apiEndpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      state.breweries = response.filter(
        (brewery) =>
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional" ||
          brewery.brewery_type === "brewpub"
      );
      state.breweries.forEach((brewery) => (brewery.isCityChecked = true));
      addCities();
      render();
    });
}

function render(arrayOfBreweries = state.breweries) {
  breweriesList.innerHTML = "";
  arrayOfBreweries
    .filter((brewery) => brewery.isCityChecked === true)
    .filter((brewery) => isPaginated(arrayOfBreweries, brewery))
    .forEach((brewery) => addBrewery(brewery));

  if (howManyPages(arrayOfBreweries) > 1) {
    addPaginationButtons(arrayOfBreweries)
  }
}

//pagination functions

function addPaginationButtons(arrayOfBreweries) {
  const addButton = document.createElement("button");
  const pageNumber = document.createElement("span");
  const subtractButton = document.createElement("button");

  pageNumber.style.margin = "10px";

  addButton.innerText = "+";
  pageNumber.innerText = state.page;
  subtractButton.innerText = "-";

  addButton.addEventListener("click", function () {
    if (howManyPages(arrayOfBreweries) > state.page) {
      state.page++;
    }
    render(arrayOfBreweries);
  });

  subtractButton.addEventListener("click", function () {
    if (state.page > 1) state.page--;
    render(arrayOfBreweries);
  });

  breweriesList.prepend(subtractButton, pageNumber, addButton);
}

function isPaginated(arrayOfBreweries, brewery) {
  const index = arrayOfBreweries
    .filter((brewery) => brewery.isCityChecked === true)
    .indexOf(brewery);

  return (
    index >= state.breweriesPerPage * (state.page - 1) &&
    index <= state.breweriesPerPage * state.page - 1
  );
}

function howManyPages(arrayOfBreweries) {
  return (
    arrayOfBreweries.filter((brewery) => brewery.isCityChecked === true).length /
    state.breweriesPerPage
  );
}
