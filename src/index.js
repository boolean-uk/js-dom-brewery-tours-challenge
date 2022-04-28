import getRequest from "./getRequest.js";

const selectStateForm = document.querySelector("#select-state-form");
const filterByType = document.querySelector("#filter-by-type");
const selectStateText = document.querySelector("#select-state");

selectStateForm.addEventListener("submit", (e) => {
  const stateInput = e.target[0].value;
  e.preventDefault();
  getRequest(stateInput);
  e.target.reset();
});

filterByType.addEventListener("change", (e) => {
  const targetBreweryType = e.target.value;
});
