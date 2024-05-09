const BASE_URL = "https://api.openbrewerydb.org/v1/breweries/";
const LOCALHOST = "http://localhost:3000/breweries";
let store = {
  currentPage: 0,
  breweries: [],
  cities: [],
  visited_breweries: [],
};

function localhost_get() {
  fetch(`${LOCALHOST}`).then(async (response) => {
    let data = await response.json();
    renderVisitBreweries(data);
  });
}

function localhost_add(event, id) {
  event.preventDefault();
  let payload = store.breweries.find((brewery) => brewery.id === id);
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  };

  fetch(`${LOCALHOST}`, options).then((response) => {
    localhost_get();
  });
}

function localhost_remove(event, id) {
  event.preventDefault();
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  fetch(`${LOCALHOST}/${id}`, options).then((response) => {
    localhost_get();
  });
}

function clearStore() {
  store.breweries = [];
  store.cities = [];
  store.visited_breweries = [];
}

function getBreweries(limit, page) {
  fetch(`${BASE_URL}` + `?per_page=${limit}` + `&page=${page}`).then(
    async (response) => {
      let data = await response.json();
      loadBreweries(data);
    }
  );
}

function getBreweriesByState(limit, page, state) {
  fetch(
    `${BASE_URL}` +
      `?per_page=${limit}` +
      `&page=${page}` +
      `&by_state=${state}`
  ).then(async (response) => {
    let data = await response.json();
    loadBreweries(data);
  });
}

function searchBreweries(query) {
  fetch(`${BASE_URL}` + `search?query=${query}`).then(async (response) => {
    let data = await response.json();
    loadBreweries(data);
  });
}

function loadBreweries(data) {
  clearStore();
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].brewery_type === "micro" ||
      data[i].brewery_type === "regional" ||
      data[i].brewery_type === "brewpub"
    ) {
      store.breweries.push(data[i]);
    }
  }

  for (let i = 0; i < store.breweries.length; i++) {
    if (!store.cities.includes(store.breweries[i].city)) {
      store.cities.push(store.breweries[i].city);
    }
  }
  render();
}

let city_filter = [];
function handleCheckCity(event) {
  let city = event.target.value;
  if (event.target.checked) {
    city_filter.push(city);
  } else {
    city_filter.splice(city_filter.indexOf(city), 1);
  }

  console.log(city_filter);
  if (city_filter.length > 0) {
    let filtered_breweries = [];
    for (let i = 0; i < store.breweries.length; i++) {
      if (city_filter.includes(store.breweries[i].city)) {
        filtered_breweries.push(store.breweries[i]);
      }
    }
    renderBreweries(filtered_breweries);
  } else {
    renderBreweries(store.breweries);
  }
}

function renderBreweries(breweries) {
  let brewery_list = document.getElementById("breweries-list");
  brewery_list.innerHTML = "";
  breweries.forEach((brewery) => {
    let brewey_list_item = document.createElement("li");
    brewey_list_item.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
            <h3>Address:</h3>
            <p>${brewery.street}</p>
            <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
            <p>
                <button onclick="localhost_add(event,'${brewery.id}')">Add to Visit Wishlist</button>
            </p>
        </section>
        <section class="phone">
            <h3>Phone:</h3>
            <p>${brewery.phone}</p>
        </section>
        <section class="link">
            <a href="${brewery.website_url}" target="_blank">Visit Website</a>
        </section>
        `;
    brewery_list.append(brewey_list_item);
  });
}

function renderCityFilter(cities) {
  let city_filter_form = document.getElementById("filter-by-city-form");
  city_filter_form.innerHTML = "";
  cities.forEach((city) => {
    city_filter_form.innerHTML += `
            <input type="checkbox" name="${city}" value="${city}" class="city_filter" onchange="handleCheckCity(event)" />
            <label for="chardon">${city}</label>`;
  });
}

function renderPagination(currentPage) {
  document.getElementById("page-current").innerText = store.currentPage;
  document.getElementById("page-prev").onclick = async (event) => {
    if (store.currentPage <= 1) return;

    clearStore();
    store.currentPage -= 1;
    await getBreweries(10, store.currentPage);
    render();
  };
  document.getElementById("page-next").onclick = async (event) => {
    clearStore();
    store.currentPage += 1;
    await getBreweries(10, store.currentPage);
    render();
  };
}

function renderVisitBreweries(breweries) {
  let visit_brewery_list = document.getElementById("visit-breweries-list");
  visit_brewery_list.innerHTML = "";
  breweries.forEach((brewery) => {
    let visit_brewey_list_item = document.createElement("li");
    visit_brewey_list_item.innerHTML = `
        <p>${brewery.name}</p>
        <button onclick="localhost_remove(event,'${brewery.id}')">Remove</button>
        `;
    visit_brewery_list.append(visit_brewey_list_item);
  });
}

function render() {
  renderBreweries(store.breweries);
  renderCityFilter(store.cities);
  renderPagination(store.currentPage);
}

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("select-state-form").onsubmit = async (event) => {
    event.preventDefault();
    let state = event.target.elements["select-state"].value;
    clearStore();
    getBreweriesByState(10, 1, state);
    render();
  };

  document.getElementById("search-breweries").onkeyup = async (event) => {
    event.preventDefault();
    let query = event.target.value;
    clearStore();
    searchBreweries(query);
    render();
  };

  document.getElementById("filter-by-type-form").onchange = async (event) => {
    let filter_brewery_type = event.target.value;
    let filtered_by_type_breweries = [];
    for (let i = 0; i < store.breweries.length; i++) {
      if (store.breweries[i].brewery_type === filter_brewery_type) {
        filtered_by_type_breweries.push(store.breweries[i]);
      }
    }
    renderBreweries(filtered_by_type_breweries);
  };

  document.getElementsByClassName("clear-all-btn")[0].onclick = (event) => {
    let collection = document.getElementsByClassName("city_filter");
    for (let i = 0; i < collection.length; i++) {
      collection[i].checked = false;
    }
    render();
  };

  localhost_get();
  render();
});
