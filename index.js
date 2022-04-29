const state = {
  searchState: "",
  breweryType: "",
  byName: "",
  data: [],
};

const brewList = document.getElementById("breweries-list");
const breweryTypes = ["micro", "regional", "brewpub"];

// https://api.openbrewerydb.org/breweries?by_name=modern_times

const searchBreweriesForm = document.getElementById("search-breweries-form");
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
    let url = `https://api.openbrewerydb.org/breweries?by_state=${state.searchState}`;

    switch (state.breweryType) {
      case "micro":
        url = url + `&by_type=micro`;
        break;
      case "regional":
        url = url + `&by_type=regional`;

        break;
      case "brewpub":
        url = url + `&by_type=brewpub`;

        break;
    }
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
  data.forEach((el) => {
    if (breweryTypes.includes(el.brewery_type)) {
      const html = `<li>
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

      brewList.insertAdjacentHTML("afterbegin", html);
    }
  });
}

function fetchData() {
  const url = createUrl();

  if (url === "") return;

  return fetch(url).then((res) => res.json());

  // return fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     state.data = data;
  //     renderList(state.data);
  //   });
}
