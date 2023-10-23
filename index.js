function init() {
  usStateInput();
  pageLengthSelect();
  pageNextEnable();
  pagePreviousEnable();
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

function washInput(input) {
  return input.trim().replaceAll(" ", "_");
}

function clearStateBreweryList() {
  for (const key in STATE.breweries) {
    STATE.breweries[key] = [];
  }
}

function paginate() {
  STATE.page.pageCount = Math.ceil(
    BREWERY_LIST.children.length / STATE.page.pageLimit
  );

  renderPaginateSelector();

  showPagination();
  paginateShowPage();
  pageNumberSelect();
}

function hidePagination() {
  PAGINATION.classList.add("hidden");
}

function showPagination() {
  PAGINATION.classList.remove("hidden");
}

function paginateShowPage() {
  const breweries = BREWERY_LIST.querySelectorAll(":scope > li");

  const { currentPage, pageLimit, pageCount } = STATE.page;

  const startBrewery = currentPage * pageLimit - pageLimit;
  const endBrewery = currentPage * pageLimit;

  for (const [idx, brewery] of breweries.entries()) {
    brewery.classList.add("hidden");

    if (idx >= startBrewery && idx <= endBrewery)
      brewery.classList.remove("hidden");
  }
}

function changePage(page) {
  STATE.page.currentPage = page;
  renderPaginateSelector();
  paginateShowPage();
}

init();

function test() {
  getBreweriesByState("washington")
    .then(() => renderBreweries())
    .then(() => paginate());
}

test();
