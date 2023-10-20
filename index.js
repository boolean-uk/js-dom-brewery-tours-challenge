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
  return new Promise((resolve, reject) =>
    fetch(
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
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
  );
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
  const pageLimit = 10;
  const pageCount = BREWERY_LIST.children.length / pageLimit;

  console.log("BREWERY_LIST.children", BREWERY_LIST.childElementCount);
  console.log("pageCount", pageCount);
}

init();
