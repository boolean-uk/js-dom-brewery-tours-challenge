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
      renderList(breweriesInCurrentState);
      renderCheckboxes();
    });
}

let currentPageNr = 1;

function renderList(breweries) {
  breweriesListUL.innerHTML = "";
  const itemPerPage = 5;
  const NrOfPages = Math.ceil(breweries.length / itemPerPage);
  let start = itemPerPage * (currentPageNr - 1);
  let end = start + itemPerPage;
  let displayedItems = breweries.slice(start, end);
  displayedItems.forEach((brewery) => {
    const newBrewery = createLI(brewery);
    breweriesListUL.append(newBrewery);
  });
  renderPaginationButtons(NrOfPages, breweries);
}

function renderPaginationButtons(NrOfPages, breweries) {
  pageButtons.innerHTML = "";
  for (let i = 1; i <= NrOfPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    if (button.innerText == currentPageNr) {
      button.setAttribute("class", "active");
    }
    button.addEventListener("click", () => {
      currentPageNr = button.innerText;
      renderList(breweries);
    });
    pageButtons.append(button);
  }
}

export { fetchFromAPI, renderList };
