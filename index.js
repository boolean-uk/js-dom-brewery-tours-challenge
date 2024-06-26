const state = {
  breweries: [],
  type: [],
};

const container = document.querySelector("#breweries-list");
const ulEl = document.querySelector("#breweries-list");
const formEl = document.querySelector("#select-state-form");
const inputEl = document.querySelector("#select-state");
const filterEl = document.querySelector("#filter-by-type");
const stateEl = document.querySelector("#select-state");

function renderBrewList(breweries) {
  // const brewArr = [];
  // for (const brewery in breweries) {
  //   if (
  //     brewery.brewery_type === "micro" ||
  //     brewery.brewery_type === "regional" ||
  //     brewery.brewery_type === "brewpub"
  //   ) {
  //     brewArr.push(brewery);
  //   }
  // }
  // console.log(brewArr);
  // console.log(typeof breweries);
  // console.log(breweries);
  ulEl.innerHTML = "";
  breweries.forEach((choice) => {
    const xBrewery = document.createElement("li");
    xBrewery.innerHTML = `
        <h2>${choice.name}</h2>
        <div class="type">${choice.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${choice.street}</p>
          <p><strong>${choice.city}, ${choice.postal_code}</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${choice.phone}</p>
        </section>
        <section class="link">
          <a href="${choice.website_url}">Visit Website</a>
        </section>
      `;
    ulEl.appendChild(xBrewery);

    if (state.breweries.length > 0 && !choice.brewery_type) {
      url = `https://api.openbrewerydb.org/breweries?by_state=${stateEl.value}`;
    } else if (state.breweries.length > 0 && choice.brewery_type) {
      url = `https://api.openbrewerydb.org/breweries?by_type=${choice.brewery_type}&by_state=${stateEl.value}`;
    } else if (state.breweries.length === 0 && choice.brewery_type) {
      url = `https://api.openbrewerydb.org/breweries?by_type=${choice.brewery_type}`;
    } else {
      url = `https://api.openbrewerydb.org/breweries?by_type=${choice.brewery_type}`;
    }
  });
}

function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.breweries = Object.values(data).filter(
        (brewery) =>
          brewery.brewery_type === "regional" ||
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "brewpub"
      );
      renderBrewList(state.breweries);
    })
    .catch((error) => console.error("Error: ", error));
}

function formList() {
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = `https://api.openbrewerydb.org/breweries?by_state=${inputEl.value}`;
    fetchData(url);
  });
}
function filter() {
  filterEl.addEventListener("change", function () {
    const validTypes = state.type.filter((type) => {
      type === "micro" || type === "regional" || type === "brewpub";
    });
    const typeFilter = filterEl.value;
    let url = "";
    if (state.breweries.length > 0 && !typeFilter) {
      url = `https://api.openbrewerydb.org/breweries?by_state=${stateEl.value}`;
    } else if (state.breweries.length > 0 && typeFilter) {
      url = `https://api.openbrewerydb.org/breweries?by_type=${typeFilter}&by_state=${stateEl.value}`;
    } else if (state.breweries.length === 0 && typeFilter) {
      url = `https://api.openbrewerydb.org/breweries?by_type=${typeFilter}`;
    } else {
      url = `https://api.openbrewerydb.org/breweries?by_type=${validTypes}`;
    }
    fetchData(url);
  });
}

function searchBrew() {
  const searchEl = document.querySelector("#search-breweries");
  if (searchEl) {
    searchEl.addEventListener("input", function () {
      const searchTerm = searchEl.value.toLowerCase();
      const filteredBreweries = state.breweries.filter((brewery) =>
        brewery.name.toLowerCase().includes(searchTerm)
      );
      renderBrewList(filteredBreweries);
    });
  }
}

formList();
filter();
searchBrew();
