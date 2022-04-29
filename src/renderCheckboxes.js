import { breweriesInCurrentState } from "./index.js";

function renderCheckboxes() {
  console.log("1:......", breweriesInCurrentState);

  console.log(breweriesInCurrentState[2]);

  breweriesInCurrentState.forEach((brewery) => {
    console.log("2:......", brewery);
  });
}

function createCheckbox(brewery) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", brewery.city);
  input.setAttribute("value", brewery.city);
  li.append(input);

  const label = document.createElement("label");
  label.setAttribute("for", brewery.city);
  label.innerText = brewery.city;
  li.append(label);

  return li;
}

export { createCheckbox, renderCheckboxes };
