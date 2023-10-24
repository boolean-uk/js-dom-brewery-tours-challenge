function init() {
  usStateInput();
  pageLengthSelect();
  pageNextEnable();
  pagePreviousEnable();
  nameSearchFilter();
  breweryTypeFilter();
  clearCityFilter();
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
        return getBreweryType(type, filter, ++page);
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

init();

function test() {
  getBreweriesByState("washington")
    .then(() => renderBreweries(makeRenderList()))
    .then(() => renderCityFilterList());
}

// test();
