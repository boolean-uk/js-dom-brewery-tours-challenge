const breweriesContainer = document.querySelector(".breweries-list");
const search = document.querySelector("#search-breweries");
const filterForm = document.querySelector("#filter-by-type-form");
const filterCityForm = document.querySelector("#filter-by-city-form");
const stateForm = document.querySelector("#select-state-form");
let addBtn;
const paginationContainer = document.querySelector(".pagination-container");
const visitBreweries = document.querySelector(".breweries-to-visit");

const state = {
  search: null,
  brewersInState: [],
  filterType: null,
  pubSearch: null,
  currPage: 0,
  brewers: [],
  cities: [],
};

function getJSON(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    // console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
}

async function fetchBrewers(reset = false) {
  const arr = state.filterType
    ? [state.filterType]
    : ["micro", "brewpub", "regional"];
  try {
    const brewers = await Promise.all(
      arr.map((brewer) => {
        return getJSON(
          ` https://api.openbrewerydb.org/breweries?by_state=${
            state.search
          }&by_type=${brewer}${
            state.pubSearch ? "&by_name=" + state.pubSearch : ""
          }`
        );
      })
    );
    console.log(reset);
    renderBrewers(brewers, reset);
  } catch (err) {
    breweriesContainer.innerText = err.message;
    console.log(err.message);
  }
}

async function fetchBrewersByType(type) {
  const brewers = await getJSON(
    ` https://api.openbrewerydb.org/breweries?by_state=${state.search}&by_type=${type}`
  );
  renderBrewers(brewers);
}

function renderBrewers(brewers, citiesReset = false) {
  if (!citiesReset) {
    filterCityForm.innerHTML = "";
  }
  breweriesContainer.innerHTML = "";
  const brewersArr = brewers.flat();
  for (let i = brewersArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [brewersArr[i], brewersArr[j]] = [brewersArr[j], brewersArr[i]];
  }

  const citiesArr = new Set(brewersArr.map((brewer) => brewer.city)).forEach(
    (city) => {
      const cities = ` 
    <input type="checkbox" name="${city}" value="${city}" />
    <label for="${city}">${city}</label>
    `;
      if (!citiesReset) {
        filterCityForm.insertAdjacentHTML("afterbegin", cities);
      }
    }
  );

  state.brewers = brewersArr;
  renderPaginationButtons();

  brewersArr.slice(0, 19).forEach((brewer) => {
    state.brewersInState.push(brewer);
    console.log(brewer);
    const html = `<li data-id=${brewer.id}>
      <h2>${brewer.name}</h2>
      <div class="type">${brewer.brewery_type}</div>
      <section class="address">
        <h3>Address:</h3>
        <p>${brewer.street ? brewer.street : "N/A"}</p>
        <p>
          <strong>${brewer.city}, ${brewer.postal_code}</strong>
        </p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>${brewer.phone ? brewer.phone : "N/A"}</p>
      </section>
      <section class="link">
        <a href="${brewer.website_url}" target="_blank">
          Visit Website
        </a>
      </section>
    </li><button class="btn-add-to-visit">Add to visit</button>`;

    breweriesContainer.insertAdjacentHTML("afterbegin", html);
  });
}

search.addEventListener("input", (e) => {
  state.pubSearch = e.target.value;
  fetchBrewers();
});

filterForm.addEventListener("change", (e) => {
  const type = e.target.value;
  state.filterType = type;
  console.log(type);
  type ? fetchBrewersByType(type) : fetchBrewers(true);
});

async function fetchBrewersByCity(cities) {
  if (cities.length === 0) {
    fetchBrewers(true);
  }
  const arr = ["micro", "brewpub", "regional"];
  try {
    let brewers = await Promise.all(
      cities.map((city) => {
        return getJSON(
          ` https://api.openbrewerydb.org/breweries?by_city=${city}${
            state.filterType ? "&by_type=" + state.filterType : ""
          }${state.pubSearch ? "&by_name=" + state.pubSearch : ""}`
        );
      })
    );

    brewers = brewers.flat().filter((brewer) => {
      if (brewer.brewery_type === "micro") return brewer;
      else if (brewer.brewery_type === "brewpub") return brewer;
      else if (brewer.brewery_type === "regional") return brewer;
    });
    renderBrewers(brewers, true);
  } catch (err) {
    breweriesContainer.innerText = err.message;
    console.log(err.message);
  }
}

filterCityForm.addEventListener("change", (e) => {
  let cities = [...document.querySelectorAll("input:checked")].map(
    (e) => e.value
  );

  fetchBrewersByCity(cities);
});

/// MAIN HEADER

stateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = e.target.querySelector("#select-state").value;
  state.search = searchInput;
  state.currPage;
  fetchBrewers();
});

function pagination() {
  breweriesContainer.innerHTML = "";
  const from = state.currPage * 19;
  const to = from + 19;

  state.brewers.slice(from, to).forEach((brewer) => {
    state.brewersInState.push(brewer);
    const html = `<li>
      <h2>${brewer.name}</h2>
      <div class="type">${brewer.brewery_type}</div>
      <section class="address">
        <h3>Address:</h3>
        <p>${brewer.street ? brewer.street : "N/A"}</p>
        <p>
          <strong>${brewer.city}, ${brewer.postal_code}</strong>
        </p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>${brewer.phone ? brewer.phone : "N/A"}</p>
      </section>
      <section class="link">
        <a href="${brewer.website_url}" target="_blank">
          Visit Website
        </a>
      </section>
    </li><button class="btn-add-to-visit">Add to visit</button>`;

    breweriesContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function renderPaginationButtons() {
  paginationContainer.innerHTML = "";
  console.log(state.currPage, Math.floor(state.brewers.length / 20));
  let buttons;
  if (state.brewers.length < 19) return;
  if (
    state.currPage > 0 &&
    state.currPage < Math.floor(state.brewers.length / 20)
  ) {
    buttons = `<button class="prev-page">
    <i class="fa-solid fa-circle-arrow-left"></i>
      </button>
      <button class="next-page">
    <i class="fa-solid fa-circle-arrow-right"></i>
  </button>`;
  } else if (state.currPage === 0) {
    buttons = ` <button class="next-page">
    <i class="fa-solid fa-circle-arrow-right"></i>
  </button>`;
  } else if (state.currPage === Math.floor(state.brewers.length / 20)) {
    buttons = `<button class="prev-page">
    <i class="fa-solid fa-circle-arrow-left"></i>
      </button>`;
  }

  console.log(buttons);
  paginationContainer.insertAdjacentHTML("beforeend", buttons);
  const nextBtn = document.querySelector(".next-page");
  const prevBtn = document.querySelector(".prev-page");

  nextBtn &&
    nextBtn.addEventListener("click", (e) => {
      state.currPage++;
      pagination();
      renderPaginationButtons();
    });
  prevBtn &&
    prevBtn &&
    prevBtn.addEventListener("click", (e) => {
      state.currPage--;
      pagination();
      renderPaginationButtons();
    });
}

breweriesContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-add-to-visit")) return;
  const currBrewery = e.target.previousSibling.dataset.id;
  state.brewers.forEach((brewer) => {
    if (brewer.id === currBrewery) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brewer),
      };

      fetch("http://localhost:3000/breweries", options);
    }
  });
});

visitBreweries.addEventListener("click", async () => {
  const brewers = await getJSON("http://localhost:3000/breweries");
  renderBrewers(brewers);
});
