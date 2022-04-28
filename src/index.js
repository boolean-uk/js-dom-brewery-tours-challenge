import getRequest from "./getRequest.js";

const selectStateForm = document.querySelector("#select-state-form");

selectStateForm.addEventListener("submit", (e) => {
  const stateInput = e.target[0].value;
  e.preventDefault();
  getRequest(stateInput);
  e.target.reset();
});
