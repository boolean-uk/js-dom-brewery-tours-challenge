import getRequest from "./getRequest.js";

const selectStateForm = document.querySelector("#select-state-form");
const filterByType = document.querySelector("#filter-by-type");

let state = {
  selectState: "",
  selectBreweryType: "",
};

selectStateForm.addEventListener("submit", (e) => {
  const stateInput = e.target[0].value;
  e.preventDefault();
  getRequest(stateInput);
  state.selectState = stateInput;
  filterByType.selectedIndex = 0;
});

filterByType.addEventListener("change", (e) => {
  state.selectBreweryType = e.target.value;
  getRequest(state.selectState, state.selectBreweryType);
});

export default state;
