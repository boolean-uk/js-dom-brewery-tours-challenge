import { createLI } from "./createLI.js";
import { breweriesInCurrentState, breweriesListUL } from "./index.js";

function renderList(state) {
  breweriesListUL.innerHTML = "";
  fetch("https://api.openbrewerydb.org/breweries?by_state=" + state)
    .then((res) => res.json())
    .then((breweries) => {
      //breweriesInCurrentState = [];
      breweries.forEach((element) => {
        if (
          element.brewery_type === "micro" ||
          element.brewery_type === "regional" ||
          element.brewery_type === "brewpub"
        ) {
          breweriesInCurrentState.push(element);
          const newBrewery = createLI(element);
          breweriesListUL.append(newBrewery);
        }
      });
      console.log(
        "BREWERIES IN CURRENT STATE ARRAY: ",
        breweriesInCurrentState
      );
      console.log(
        "BREWERIES IN CURRENT STATE ARRAY: ",
        breweriesInCurrentState[2]
      );
    });
}

export { renderList };
