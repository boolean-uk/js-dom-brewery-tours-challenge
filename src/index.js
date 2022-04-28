import getRequest from "./getRequest.js";

const selectStateForm = document.querySelector("#select-state-form");
const filterByType = document.querySelector("#filter-by-type");
let selectState = "";

selectStateForm.addEventListener("submit", (e) => {
  const stateInput = e.target[0].value;
  e.preventDefault();
  getRequest(stateInput);
  selectState = stateInput;
  e.target.reset();
});

filterByType.addEventListener("change", (e) => {
  const selectBreweryType = e.target.value;
  getRequest(selectState, selectBreweryType);
});
