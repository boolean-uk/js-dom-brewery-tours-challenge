import { breweriesInCurrentState, filteredBreweries } from "./index.js";
import { createLI } from "./createLI.js";
import { breweriesListUL } from "./index.js";

function filterByType(type) {
  breweriesListUL.innerHTML = "";
  breweriesInCurrentState.forEach((brewery) => {
    if (brewery.brewery_type === type) {
      const newBrewery = createLI(brewery);
      breweriesListUL.append(newBrewery);
      filteredBreweries.push(brewery);
    }
  });
}

// TODO: make sure it accepts lower or upper case
function filterByName(input) {
  breweriesListUL.innerHTML = "";
  console.log(input);

  if (filteredBreweries.length !== 0) {
    filteredBreweries.forEach((brewery) => {
      if (brewery.name.includes(input)) {
        console.log(brewery.name);
        const newBrewery = createLI(brewery);
        breweriesListUL.append(newBrewery);
      }
    });
  }
  if (filteredBreweries.length === 0) {
    breweriesInCurrentState.forEach((brewery) => {
      if (brewery.name.includes(input)) {
        console.log(brewery.name);
        const newBrewery = createLI(brewery);
        breweriesListUL.append(newBrewery);
      }
    });
  }
}

export { filterByType, filterByName };
