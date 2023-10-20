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
  console.log('page', page)
  return new Promise((resolve, reject) =>
    fetch(
      `https://api.openbrewerydb.org/v1/breweries?per_page=200&page=${page}&by_type=${type}${
        filter ? filter : ""
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        STATE.breweries[type].push(...res);
        if (res.length === 200) {
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
  getBreweries(filter).then(() => renderBreweries());
}

function usStateInput() {
  SELECT_STATE_FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    getBreweriesByState(SELECT_STATE_INPUT.value);

    SELECT_STATE_FORM.reset();
  });
}

function washInput(input) {
  return input.trim().replaceAll(" ", "_");
}

function renderBreweries() {
  console.log("STATE", STATE);
}

init();

getBreweriesByState("new_york");
