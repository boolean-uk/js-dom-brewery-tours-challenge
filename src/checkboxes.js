import {
  breweriesInCurrentState,
  cityListForm,
  hiddenButton,
} from "./index.js";

function renderCheckboxes() {
  cityListForm.innerHTML = "";
  const cities = oneOfEachCity(breweriesInCurrentState);
  cities.forEach((city) => {
    const newCheckbox = createCheckbox(city);
    cityListForm.append(newCheckbox);
    hiddenButton.style.display = "block";
  });
}

function oneOfEachCity(breweries) {
  let cities = [];
  breweries.forEach((brewery) => {
    if (!cities.includes(brewery.city)) {
      cities.push(brewery.city);
    }
  });
  cities = cities.sort();
  return cities;
}

function createCheckbox(city) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "city");
  input.setAttribute("value", city);
  li.append(input);

  const label = document.createElement("label");
  label.setAttribute("for", city);
  label.innerText = city;
  li.append(label);

  return li;
}

export { renderCheckboxes };
