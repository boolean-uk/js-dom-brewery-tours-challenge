import {
  breweriesInCurrentState,
  breweriesByType,
  breweriesListUL,
} from "./index.js";
import { createLI } from "./createBreweryLI.js";
import { renderCheckboxes } from "./checkboxes.js";

function filterByType(type) {
  breweriesListUL.innerHTML = "";
  breweriesInCurrentState.forEach((brewery) => {
    if (brewery.brewery_type === type) {
      // TODO: LITTLE BUG: i want to use renderList() here...and pass a array of breweries as a parameter.
      const newBrewery = createLI(brewery);
      breweriesListUL.append(newBrewery);
      breweriesByType.push(brewery);
    }
  });
}

function filterByName(input) {
  breweriesListUL.innerHTML = "";
  if (breweriesByType.length !== 0) {
    breweriesByType.forEach((brewery) => {
      const breweryNameLowercase = brewery.name.toLowerCase();
      if (breweryNameLowercase.includes(input)) {
        // TODO: LITTLE BUG: i want to use renderList() here...and pass a array of breweries as a parameter.
        const newBrewery = createLI(brewery);
        breweriesListUL.append(newBrewery);
      }
    });
  }
  if (breweriesByType.length === 0) {
    breweriesInCurrentState.forEach((brewery) => {
      const breweryNameLowercase = brewery.name.toLowerCase();
      if (breweryNameLowercase.includes(input)) {
        // TODO: LITTLE BUG: i want to use renderList() here...and pass a array of breweries as a parameter.
        const newBrewery = createLI(brewery);
        breweriesListUL.append(newBrewery);
      }
    });
  }
}

function filterByCity() {
  let chosenCities = [];
  let checkboxes = document.getElementsByName("city");
  checkboxes.forEach((box) => {
    if (box.checked === true) {
      chosenCities.push(box.value);
    }
  });
  breweriesListUL.innerHTML = "";
  breweriesInCurrentState.forEach((brewery) => {
    if (chosenCities.includes(brewery.city)) {
      // TODO: LITTLE BUG: i want to use renderList() here...and pass a array of breweries as a parameter.
      const newBrewery = createLI(brewery);
      breweriesListUL.append(newBrewery);
    }
  });
}

function clearFilter() {
  renderCheckboxes();
  breweriesListUL.innerHTML = "";
  breweriesInCurrentState.forEach((brewery) => {
    // TODO: LITTLE BUG: i want to use renderList() here...and pass a array of breweries as a parameter.
    const newBrewery = createLI(brewery);
    breweriesListUL.append(newBrewery);
  });
}

export { filterByType, filterByName, filterByCity, clearFilter };
