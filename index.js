const STATE = {};
const SELECT_STATE_FORM = document.querySelector("#select-state-form");
const SELECT_STATE_INPUT = SELECT_STATE_FORM.querySelector(
  ":scope > #select-state"
);

function init() {
  usStateInput();
}

function getBreweries(filter) {
  return new Promise((resolve, reject) =>
    fetch(`https://api.openbrewerydb.org/v1/breweries${filter ? filter : ""}`)
      .then((res) => res.json())
      .then((res) => {
        STATE.breweries = res;
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
  );
}

function getBreweriesByState(state) {
  const filter = `?by_state=${washInput(state)}`;
  getBreweries(filter).then(() => renderBreweries());
}

function usStateInput() {
  SELECT_STATE_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    
    getBreweriesByState(SELECT_STATE_INPUT.value)

    SELECT_STATE_FORM.reset();
  });
}

function washInput(input) {
  return input.trim().replaceAll(" ", "_");
}

function renderBreweries() {
  console.log('STATE', STATE)
}

init()
