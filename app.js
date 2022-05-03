import { renderHTML } from "./renderHTML.js";
import { reset } from "./reset.js";
import { getJSON } from "./getJSON.js";
import { fetchBrewers } from "./fetchBrewers.js";

export const breweriesContainer = document.querySelector(".breweries-list");
export const search = document.querySelector("#search-breweries");
const filterForm = document.querySelector("#filter-by-type-form");
const filterCityForm = document.querySelector("#filter-by-city-form");
export const searchForm = document.querySelector("#search-breweries-form");
export const stateForm = document.querySelector("#select-state-form");
const paginationContainer = document.querySelector(".pagination-container");
const visitBreweries = document.querySelector(".breweries-to-visit");
export const visit = document.querySelector(".visit");
export const filterSection = document.querySelector(".filters-section");
const back = document.querySelector(".go-back");

export const state = {
  search: null,
  brewersInState: [],
  filterType: null,
  pubSearch: null,
  currPage: 0,
  brewers: [],
  cities: [],
  currSearchValue: "",
};

export function renderBrewers(brewers, citiesReset = false) {
  console.log(brewers);
  if (!citiesReset) {
    filterCityForm.innerHTML = "";
  }
  breweriesContainer.innerHTML = "";
  const brewersArr = brewers.flat();
  for (let i = brewersArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [brewersArr[i], brewersArr[j]] = [brewersArr[j], brewersArr[i]];
  }
  state.brewers.push(brewersArr);
  state.brewers = state.brewers.flat();
  new Set(state.brewers.map((brewer) => brewer.city)).forEach((city) => {
    const cities = ` 
    <input type="checkbox" name="${city}" value="${city}" />
    <label for="${city}">${city}</label>
    `;
    if (!citiesReset) {
      filterCityForm.insertAdjacentHTML("afterbegin", cities);
    }
  });
  renderPaginationButtons();
  renderHTML(0, 9);
}

search.addEventListener("input", (e) => {
  state.pubSearch = e.target.value;
  state.brewers = [];
  fetchBrewers();
});

filterForm.addEventListener("change", (e) => {
  const type = e.target.value;
  state.filterType = type;
  state.brewers = [];
  fetchBrewers();
  searchForm.reset();
  state.pubSearch = null;
});

async function fetchBrewersByCity(cities) {
  if (cities.length === 0) {
    fetchBrewers(true);
  }
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
  state.brewers = [];
  fetchBrewersByCity(cities);
});

stateForm.addEventListener("submit", (e) => {
  state.brewers = [];
  e.preventDefault();
  const searchInput = e.target.querySelector("#select-state").value;
  state.search = searchInput;
  state.currPage;
  reset();
});

function pagination() {
  breweriesContainer.innerHTML = "";
  const from = state.currPage * 9;
  const to = from + 9;
  renderHTML(from, to);
}

function renderPaginationButtons() {
  paginationContainer.innerHTML = "";
  let buttons;
  if (state.brewers.length <= 9) return;
  if (
    state.currPage > 0 &&
    state.currPage < Math.floor(state.brewers.length / 10)
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
  } else if (state.currPage === Math.floor(state.brewers.length / 10)) {
    buttons = `<button class="prev-page">
    <i class="fa-solid fa-circle-arrow-left"></i>
      </button>`;
  }
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
  e.target.innerText = "Added";
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

visitBreweries.addEventListener("click", brewersToVisit);

async function brewersToVisit() {
  const brewers = await getJSON("http://localhost:3000/breweries");
  state.brewers = [];
  renderBrewers(brewers);
  filterSection.style.display = "none";
  visit.style.display = "none";
  search.style.display = "none";
  document
    .querySelectorAll(".btn-delete")
    .forEach((btn) => btn.classList.remove("hide"));
  document
    .querySelectorAll(".btn-add-to-visit")
    .forEach((btn) => btn.classList.add("hide"));
  back.classList.remove("hide");
}

breweriesContainer.addEventListener("click", async (e) => {
  console.log(e.target.closest("li"));
  if (!e.target.classList.contains("btn-delete")) return;
  const currBrewery = e.target.closest("li").dataset.id;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`http://localhost:3000/breweries/${currBrewery}`, options);
  brewersToVisit();
});

back.addEventListener("click", () => {
  reset();
  back.classList.add("hide");
});
