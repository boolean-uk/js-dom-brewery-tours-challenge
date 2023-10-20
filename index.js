const STATE = {
  breweries: {
    micro: [],
    regional: [],
    brewpub: [],
  },
};
const SELECT_STATE_FORM = document.querySelector("#select-state-form");
const SELECT_STATE_INPUT = SELECT_STATE_FORM.querySelector(
  ":scope > #select-state"
);
const BREWERY_LIST = document.querySelector("#breweries-list");
const PAGINATION = document.querySelector(".pagination");
const PAGINATION_NUMBERS = PAGINATION.querySelector(":scope .page-numbers");

function init() {
  usStateInput();
}

function getBreweries(filter) {
  const breweryTypes = Object.keys(STATE.breweries);

  return Promise.all(
    breweryTypes.map((type) => {
      return getBreweryType(type, filter, 1);
    })
  );
}

function getBreweryType(type, filter, page) {
  page = page ? page : 1;
  const perPage = 200;
  return fetch(
    `https://api.openbrewerydb.org/v1/breweries?per_page=${perPage}&page=${page}&by_type=${type}${
      filter ? filter : ""
    }`
  )
    .then((res) => res.json())
    .then((res) => {
      STATE.breweries[type].push(...res);
      if (res.length === perPage) {
        getBreweryType(type, filter, ++page);
      }
    });
}

function getBreweriesByState(state) {
  const filter = `&by_state=${washInput(state)}`;
  return getBreweries(filter);
}

function usStateInput() {
  SELECT_STATE_FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    clearStateBreweryList();
    clearElement(BREWERY_LIST);

    getBreweriesByState(SELECT_STATE_INPUT.value)
      .then(() => renderBreweries())
      .then(() => paginateBreweryList());

    SELECT_STATE_FORM.reset();
  });
}

function washInput(input) {
  return input.trim().replaceAll(" ", "_");
}

function clearStateBreweryList() {
  for (const key in STATE.breweries) {
    STATE.breweries[key] = [];
  }
}

function paginateBreweryList() {
  clearElement(PAGINATION_NUMBERS);

  const pageLimit = 10;
  const pageNumberDisplay = 4;
  const pageCount = Math.ceil(BREWERY_LIST.children.length / pageLimit);

  console.log("pageCount", pageCount);

  const numbers = [];
  for (let i = 1; i <= pageCount; i++) {
    numbers.push(i);
  }

  pageNumbers = numbers.map((number, idx) => {
    const element = makeElement("span", "page-number", number);
    element.classList.add("page-number");

    if (idx === 0) element.id = "selected-page";

    if (idx > pageNumberDisplay - 2 && idx !== numbers.length - 1) {
      element.classList.toggle("hidden");
    }
    return element;
  });

  multiAppend(PAGINATION_NUMBERS, ...pageNumbers);

  if (pageCount > pageNumberDisplay) {
    const morePages = makeElement("span", "page-more", "...");
    PAGINATION_NUMBERS.children[pageCount - 1].before(morePages);
  }

  showPagination();
}

function hidePagination() {
  PAGINATION.classList.add("hidden");
}

function showPagination() {
  PAGINATION.classList.remove("hidden");
}

init();

function test() {
  getBreweriesByState("washington")
    .then(() => renderBreweries())
    .then(() => paginateBreweryList());
}

test();
