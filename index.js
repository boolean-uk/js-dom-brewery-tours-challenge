import { createBreweryListItem } from "./createBreweryListItem.js";

const state = {
  us_state: "new_york",
  brewery_name: "",
  data: [],
  breweryTypes: ["micro", "regional", "brewpub"],
  breweryTypesFilter: "",
  availableCitys: [],
  filteredCitys: [],
  currentPage: 1,
  breweriesPerPage: 10,
};

function getBreweriesFromAPI() {
  //console.log("fetch GET /tasks");
  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${state.us_state}&by_name=${state.brewery_name}`,
    {}
  )
    .then((response) => response.json())
    .then((jsonData) => {
      //console.log("GET /tasks json data:", jsonData);

      // 1: update my local `state` with the jsonData
      state.data = jsonData;
      // 2: state was changed -> call relevant re-render functions
      createCityFilter();
      renderBreweriesList();
    });
}

getBreweriesFromAPI();

function renderBreweriesList() {
  const breweriesLi = document.getElementById("breweries-list");
  breweriesLi.innerHTML = "";

  let breweriesToRender = filterData(state.data);

  // Paginate data
  // const startIndex = (state.currentPage - 1) * state.breweriesPerPage;
  // const endIndex = startIndex + state.breweriesPerPage;
  // const breweriesToRender = filteredData.slice(startIndex, endIndex);

  for (const brewery in breweriesToRender) {
    if (Object.hasOwnProperty.call(state.data, brewery)) {
      const breweryObject = breweriesToRender[brewery];
      // //console.log(breweryObject.name)
      const breweryElement = createBreweryListItem(breweryObject);
      breweriesLi.appendChild(breweryElement);
    }
  }
  //console.log(filteredData.length);
  // renderPageControls(filteredData.length);
}

const selectType = document.getElementById("filter-by-type");

selectType.addEventListener("change", (e) => {
  //console.log(`Change:${selectType.value}`);
  state.breweryTypesFilter = selectType.value;
  //console.log(`Set state:${state.breweryTypesFilter}`);
  renderBreweriesList();
});

function filterData(data = []) {
  // Only brewery types "MICRO", "BREWPUB", "REGIONAL"
  let filteredData = data.filter((obj) =>
    state.breweryTypes.includes(obj.brewery_type.toLowerCase())
  );
  // Apply options "MICRO", "BREWPUB", "REGIONAL" only-
  if (state.breweryTypesFilter) {
    //console.log(`Second filter:${state.breweryTypesFilter}`);

    filteredData = filteredData.filter((obj) => {
      return (
        obj.brewery_type.toLowerCase() ===
        state.breweryTypesFilter.toLowerCase()
      );
    });
  }
  //Filter by city
  if (state.filteredCitys.length > 0) {
    filteredData = data.filter((obj) => state.filteredCitys.includes(obj.city));
  }

  //console.log(filteredData);
  return filteredData;
}

const searchByState = document.getElementById("select-state");

searchByState.addEventListener("input", (e) => {
  //console.log(searchByState.value);
  state.us_state = searchByState.value;
  getBreweriesFromAPI();
});

const h1 = document.getElementById("heading");

const searchByName = document.getElementById("search-breweries");

searchByName.addEventListener("input", (e) => {
  //console.log(searchByName.value);
  state.brewery_name = searchByName.value;
  getBreweriesFromAPI();
});

const cityFilter = document.getElementById("filter-by-city-form");

function createCityFilter() {
  state.availableCitys = [];
  for (const brewery in state.data) {
    const breweryObject = state.data[brewery];
    if (!state.availableCitys.includes(breweryObject.city)) {
      state.availableCitys.push(breweryObject.city);
    } else {
      //console.log(`Duplicate city: ${breweryObject.city}`);
    }
  }

  //console.log(state.availableCitys);
  for (var city of state.filteredCitys) {
    if (!state.availableCitys.includes(city)) {
      state.filteredCitys.splice(state.filteredCitys.indexOf(city), 1);
    }
  }
  //console.log(state.filteredCitys);
  //state.filteredCitys = [];

  //reset checkboxes
  cityFilter.innerHTML = "";
  let availableCitys = [];

  const availableCitysSorted = state.availableCitys.sort((a, b) => {
    ////console.log(a.name);
    return a.localeCompare(b);
  });
  //console.log(availableCitysSorted);
  for (const city of availableCitysSorted) {
    //const breweryObject = state.data[brewery];

    const cityCheck = document.createElement("input");
    cityCheck.classList.add("CityCheckbox");
    cityCheck.type = "checkbox";
    cityCheck.name = city;
    cityCheck.value = city;
    if (state.filteredCitys.includes(city)) {
      cityCheck.checked = true;
    }
    cityFilter.append(cityCheck);
    cityCheck.addEventListener("click", (e) => {
      //console.log(cityCheck.value);
      //console.log(cityCheck.checked);
      if (cityCheck.checked) {
        state.filteredCitys.push(cityCheck.value);
      } else {
        state.filteredCitys.splice(
          state.filteredCitys.indexOf(cityCheck.value),
          1
        );
      }

      //console.log(state.filteredCitys);
      renderBreweriesList();
    });

    const labelForCheck = document.createElement("label");
    labelForCheck.for = city;
    labelForCheck.innerText = city;
    cityFilter.appendChild(labelForCheck);

    // //console.log(breweryObject.city)
  }
}
const clearAllButton = document.querySelector(".clear-all-btn");
clearAllButton.addEventListener("click", (e) => {
  state.filteredCitys = [];
  createCityFilter();
  renderBreweriesList();
});

// function renderPageControls(NumberOfBreweries) {
//   const paginateContainer = document.getElementById("pagination");

//   const nPages = Math.ceil(NumberOfBreweries / state.breweriesPerPage);
//   //console.log(
//   //   "For " +
//   //     NumberOfBreweries +
//   //     "NumberOfBreweries and " +
//   //     state.breweriesPerPage +
//   //     "per page we need " +
//   //     nPages +
//   //     "pages"
//   // );
//   for (let i = 0; i < nPages; i++) {
//     const btn = document.createElement("button");
//     console.log("ASd");
//     btn.innerHTML = i;
//     paginateContainer.appendChild(btn);
//   }

// }
