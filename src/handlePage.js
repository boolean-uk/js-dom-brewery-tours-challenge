import { createLI } from "./createBreweryLI.js";
import {
  breweriesInCurrentState,
  breweriesListUL,
  pageButtons,
} from "./index.js";
import { renderCheckboxes } from "./checkboxes.js";

function fetchFromAPI(state) {
  breweriesListUL.innerHTML = "";
  fetch("https://api.openbrewerydb.org/breweries?per_page=50&by_state=" + state)
    .then((res) => res.json())
    .then((breweries) => {
      breweries.forEach((element) => {
        if (
          element.brewery_type === "micro" ||
          element.brewery_type === "regional" ||
          element.brewery_type === "brewpub"
        ) {
          breweriesInCurrentState.push(element);
        }
      });
      //i want to pass through a parameter ARRAY to renderList()
      renderList();
      renderCheckboxes();
    });
}

let currentPageNr = 1;

// TODO: LITTLE BUG: this function should take in a input ARRAY...and work with it only...instead of "breweriesInCurrentState".
function renderList() {
  breweriesListUL.innerHTML = "";
  const itemPerPage = 5;
  const NrOfPages = Math.ceil(breweriesInCurrentState.length / itemPerPage);
  let start = itemPerPage * (currentPageNr - 1);
  let end = start + itemPerPage;
  let displayedItems = breweriesInCurrentState.slice(start, end);
  displayedItems.forEach((brewery) => {
    const newBrewery = createLI(brewery);
    breweriesListUL.append(newBrewery);
  });
  renderPaginationButtons(NrOfPages);
}

function renderPaginationButtons(NrOfPages) {
  pageButtons.innerHTML = "";
  for (let i = 1; i <= NrOfPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    if (button.innerText == currentPageNr) {
      button.setAttribute("class", "active");
    }
    button.addEventListener("click", () => {
      currentPageNr = button.innerText;
      //i want to pass through a parameter ARRAY to renderList()
      renderList();
    });
    pageButtons.append(button);
  }
}

export { fetchFromAPI, renderList };
