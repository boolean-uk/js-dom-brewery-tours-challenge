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
const searchBreweriesForm = document.getElementById("search-breweries-form");
const clearAllCheckboxes = document.querySelector(".clear-all-btn");

const firstPage = document.querySelector(".first");
const nextPage = document.querySelector(".next");
const previousPage = document.querySelector(".previous");

firstPage.addEventListener("click", (event) => {
  state.pageNumber = 1;
  console.log("firstPage", state.pageNumber);
  console.log(state.searchState);
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.searchState}&per_page=10`
  )
    .then((res) => res.json())
    .then((data) => {
      renderList(data);
    });
});

nextPage.addEventListener("click", () => {
  const breweryListItems = document.querySelectorAll(".brewery-list-item");
  if (breweryListItems.length > 1) state.pageNumber += 1;
  fetchData().then((data) => {
    state.data = data;
    renderList(data);

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
  console.log("previous", state.pageNumber);
  fetchData().then((data) => {
    state.data = data;
    renderList(data);
  });
});

clearAllCheckboxes.addEventListener("click", (event) => {
  clearCheckedBoxes();
});

searchBreweriesForm.addEventListener("input", (event) => {
  state.byName = event.target.value;
  fetch(`https://api.openbrewerydb.org/breweries?by_name=${state.byName}`)
    .then((res) => res.json())
    .then((data) => {
      renderList(data);
    });
});

const searchForm = document.getElementById("select-state-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = event.target.querySelector("#select-state").value;
  state.searchState = searchInput.toLowerCase().replace(" ", "_");
  searchForm.reset();
  fetchData().then((data) => {
    state.data = data;
    renderList(data);
  });
});

const selectForm = document.querySelector("#filter-by-type-form");
selectForm.addEventListener("click", (event) => {
  if (event.target.value) {
    state.breweryType = event.target.value;
    fetchData().then((data) => {
      state.data = data;
      renderList(data);
    });
  }
});

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

async function fetchData() {
  const url = createUrl();
  if (url === "") return;

  const res = await fetch(url);
  return await res.json();
}

function renderList(data) {
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
  renderCityList(cityList);
}

function renderCityList(cityList) {
  filterByCityForm.innerHTML = "";

  state.selectedCityList = [];

  cityList.forEach((city) => {
    const htmlCityList = `<input class='city-list' id='${city}item-list' type="checkbox" name="${city.toLowerCase()}" value="${city.toLowerCase()}" />
    <label for="${city.toLowerCase()}">${city}</label>`;

    filterByCityForm.insertAdjacentHTML("afterbegin", htmlCityList); // ohio

    const listItem = document.getElementById(`${city}item-list`);
    listItem.addEventListener("change", (event) => {
      toggleSelectedCities(event);
    });
  });

  state.cityList = cityList.map((city) => {
    return city.toLowerCase();
  });
}

function toggleSelectedCities(event) {
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
  renderFromArrayNames(state.selectedCityList);

  if (state.selectedCityList.length === 0) renderList(state.data);
}

function renderFromArrayNames() {
  brewList.innerHTML = "";

  state.data.forEach((el) => {
    if (state.selectedCityList.includes(el.city.toLowerCase())) {
      const htmlBrewery = getBreweryHtml(el);

      brewList.insertAdjacentHTML("afterbegin", htmlBrewery);
    }
  });
}

function clearCheckedBoxes() {
  const citiesList = document.querySelectorAll(".city-list");
  citiesList.forEach((city) => {
    city.checked = false;
  });
  renderList(state.data);
}

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
