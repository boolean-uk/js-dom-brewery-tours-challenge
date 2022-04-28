const state = {
  breweries: [],
};

let url = "https://api.openbrewerydb.org/breweries?by_state=";

const formEl = document.querySelector("#select-state-form");
const formInputEl = document.querySelector("#select-state");
