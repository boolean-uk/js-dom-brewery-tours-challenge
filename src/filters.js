import { breweriesInCurrentState, breweriesListUL } from "./index.js";
import { renderCheckboxes } from "./checkboxes.js";
import { renderList } from "./handlePage.js";

let breweriesByType = [];

function filterByType(type) {
  breweriesByType = [];
  breweriesInCurrentState.forEach((brewery) => {
    if (brewery.brewery_type === type) {
      breweriesByType.push(brewery);
    }
  });
  breweriesListUL.innerHTML = "";
  renderList(breweriesByType);
}

function filterByName(input) {
  const breweriesByName = [];
  if (breweriesByType.length !== 0) {
    breweriesByType.forEach((brewery) => {
      const breweryNameLowercase = brewery.name.toLowerCase();
      if (breweryNameLowercase.includes(input)) {
        breweriesByName.push(brewery);
      }
    });
  }
  if (breweriesByType.length === 0) {
    breweriesInCurrentState.forEach((brewery) => {
      const breweryNameLowercase = brewery.name.toLowerCase();
      if (breweryNameLowercase.includes(input)) {
        breweriesByName.push(brewery);
      }
    });
  }
  breweriesListUL.innerHTML = "";
  renderList(breweriesByName);
}

function filterByCity() {
  let chosenCities = [];
  let breweriesByCity = [];
  let checkboxes = document.getElementsByName("city");
  checkboxes.forEach((box) => {
    if (box.checked === true) {
      chosenCities.push(box.value);
    }
  });
  breweriesInCurrentState.forEach((brewery) => {
    if (chosenCities.includes(brewery.city)) {
      breweriesByCity.push(brewery);
    }
  });
  breweriesListUL.innerHTML = "";
  renderList(breweriesByCity);
}

function clearFilter() {
  renderCheckboxes();
  breweriesListUL.innerHTML = "";
  renderList(breweriesInCurrentState);
}

export { filterByType, filterByName, filterByCity, clearFilter };
