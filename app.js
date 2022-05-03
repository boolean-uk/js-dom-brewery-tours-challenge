const breweriesUL = document.querySelector("#breweries-list");
const stateSearchForm = document.querySelector("#select-state-form");
const allowedBreweryTypes = ["micro", "brewpub", "regional"];
const filterByType = document.querySelector("#filter-by-type-form");
const searchByName = document.querySelector(".search-bar");
const filterByCityFORM = document.querySelector("#filter-by-city-form");
const clearAllCitiesBUTTON = document.querySelector(".clear-all-btn");
const citiesUL = document.createElement("ul");

const state = {
  searchedState: "",
  breweryType: "",
  searchName: "",
  filteredBreweries: [],
  cities: [],
  checkedCities: [],
};

stateSearchForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  state.searchedState = ev.target[0].value;
  ev.target.reset();
  fetchAndRender();
});

filterByType.addEventListener("change", (ev) => {
  ev.preventDefault();
  state.breweryType = ev.target.value;
  fetchAndRender();
});

/*
clearAllCitiesBUTTON.addEventListener("click", (ev) => {
  ev.preventDefault();
  //uncheckall cities
  fetchAndRender();
});
*/
function fetchAndRender() {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.searchedState}`
  )
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const brewery = data[i];
        if (allowedBreweryTypes.includes(brewery.brewery_type)) {
          state.filteredBreweries.push(brewery);
        }
      }

      filterByTypeFunction(state.filteredBreweries);
      filterByName(state.filteredBreweries);
      filterByCity(state.filteredBreweries);

      console.log(state.filteredBreweries);
      render(state.filteredBreweries);
      renderCities(state.filteredBreweries);
    });
}

function filterByName(breweries) {
  if (state.searchName !== "") {
    state.filteredBreweries = [];
    for (let i = 0; i < breweries.length; i++) {
      const brewery = breweries[i];
      const breweryName = brewery.name.toLowerCase();
      const searchedString = state.searchName.toLowerCase();
      if (
        breweryName.includes(searchedString) &&
        !isBreweryInFilteredBreweries(brewery)
      ) {
        state.filteredBreweries.push(brewery);
      }
    }
  }
}

function isBreweryInFilteredBreweries(brewery) {
  for (let i = 0; i < state.filteredBreweries.length; i++) {
    if (state.filteredBreweries[i].id == brewery.id) {
      return true;
    }
  }
  return false;
}

function filterByTypeFunction(breweries) {
  if (state.breweryType !== "") {
    state.filteredBreweries = [];
    for (let i = 0; i < breweries.length; i++) {
      const brewery = breweries[i];
      if (state.breweryType === brewery.brewery_type) {
        state.filteredBreweries.push(brewery);
      }
    }
  }
}

function filterByCity(breweries) {
  if (state.checkedCities !== []) {
    state.filteredBreweries = [];
    for (let i = 0; i < breweries.length; i++) {
      const brewery = breweries[i];
      if (brewery.city.includes(state.checkedCities)) {
        state.filteredBreweries.push(brewery);
      }
    }
  }
}

function clearBreweriesUL() {
  breweriesUL.innerHTML = "";
}

function clearCitiesUL() {
  citiesUL.innerHTML = "";
}

function render(filteredBreweries) {
  clearBreweriesUL();

  for (let i = 0; i < filteredBreweries.length; i++) {
    const brewery = filteredBreweries[i];

    const breweryLI = document.createElement("li");

    const liH2 = document.createElement("H2");
    liH2.innerText = brewery.name;

    const liDIV = document.createElement("div");
    liDIV.setAttribute("class", "type");
    liDIV.innerText = brewery.brewery_type;

    const liSECTION = document.createElement("section");
    liSECTION.setAttribute("class", "address");

    const liH3 = document.createElement("h3");
    liH3.innerText = "Address:";

    const liP1 = document.createElement("p");
    liP1.innerText = brewery.street;

    const liP2 = document.createElement("p");
    liP2.innerText = `${brewery.city}, ${brewery.postal_code}`;
    liP2.setAttribute("class", "strong");

    liSECTION.append(liH3, liP1, liP2);

    const liSECTION_2 = document.createElement("section");
    liSECTION_2.setAttribute("class", "phone");

    const liH3_2 = document.createElement("h3");
    liH3_2.innerText = "Phone:";

    const liP3 = document.createElement("p");
    liP3.innerText = brewery.phone;

    liSECTION_2.append(liH3_2, liP3);

    const liSECTION_3 = document.createElement("section");
    liSECTION_3.setAttribute("class", "link");

    const liA = document.createElement("a");
    if (brewery.website_url !== null) {
      liA.innerText = "Visit Website";
      liA.href = `${brewery.website_url}`;
    } else liA.innerText = "No Website";

    liSECTION_3.append(liA);

    breweryLI.append(liH2, liDIV, liSECTION, liSECTION_2, liSECTION_3);
    breweriesUL.append(breweryLI);
  }
}

function renderCities(filteredBreweries) {
  clearCitiesUL();
  state.cities = [];

  for (let i = 0; i < filteredBreweries.length; i++) {
    const brewery = filteredBreweries[i];
    const cityLI = document.createElement("li");

    if (!state.cities.includes(brewery.city)) {
      state.cities.push(brewery.city);

      const cityINPUT = document.createElement("input");
      cityINPUT.type = "checkbox";
      cityINPUT.name = `${brewery.city}`;
      cityINPUT.value = `${brewery.city}`;

      cityINPUT.addEventListener("change", function (event) {
        if (this.checked) {
          state.checkedCities.push(`${event.target.value}`);
        } else {
          const index = state.checkedCities.indexOf(event.target.value);
          state.checkedCities.splice(index, 1);
        }
      });

      const cityLABEL = document.createElement("label");
      cityLABEL.for = `${brewery.city}`;
      cityLABEL.innerText = `${brewery.city}`;

      cityLI.append(cityINPUT, cityLABEL);
      citiesUL.append(cityLI);
      filterByCityFORM.append(citiesUL);
    }
  }
}

render(state.filteredBreweries);
