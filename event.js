function usStateInput() {
  SELECT_STATE_FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    clearStateBreweryList();
    getBreweriesByState(SELECT_STATE_INPUT.value)
      .then(() => renderBreweries(makeRenderList()))
      .then(() => renderCityFilterList());

    SELECT_STATE_FORM.reset();
    resetBreweryFilter();
  });
}

function pageLengthSelect() {
  const pageAmount = document.querySelector("#page-amount");
  pageAmount.addEventListener("input", (e) => {
    STATE.page.currentPage = 1;
    STATE.page.pageLimit = e.target.value;
    paginate();
  });
}

function pageNextEnable() {
  const button = PAGINATION.querySelector(".page-next");

  button.addEventListener("click", (e) => {
    STATE.page.currentPage++;
    paginate();
  });
}

function pagePreviousEnable() {
  const button = PAGINATION.querySelector(".page-previous");

  button.addEventListener("click", (e) => {
    STATE.page.currentPage--;
    paginate();
  });
}

function pageNumberSelect() {
  const pageNumbers = PAGINATION_NUMBERS.querySelectorAll(".page-number");

  for (const [idx, button] of pageNumbers.entries()) {
    button.addEventListener("click", (e) => {
      STATE.page.currentPage = idx + 1;
      paginate();
    });
  }
}

function breweryTypeFilter() {
  BREWERY_TYPE_FILTER.addEventListener("input", (e) => {
    renderBreweries(collateFilters());
  });
}

function clearCityFilter() {
  const button = document.querySelector(".clear-all-btn");
  button.addEventListener("click", (e) => {
    CITY_FILTER_FORM.reset();
    renderBreweries(collateFilters());
  });
}

function nameSearchFilter() {
  SEARCH_CONTAINER.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  NAME_FILTER.addEventListener("input", (e) => {
    e.preventDefault();
    renderBreweries(collateFilters());

    const filterResults = BREWERY_LIST.querySelectorAll("li");
    const searchLower = e.target.value.toLowerCase();
    const searchLength = e.target.value.length;

    filterResults.forEach((result) => {
      const h2 = result.querySelector("h2").firstChild;
      const h2Text = h2.textContent;
      const h2Start = h2Text.toLowerCase().indexOf(searchLower);
      const h2End = h2Start + searchLength;

      const range = document.createRange();
      range.setStart(h2, h2Start);
      range.setEnd(h2, h2End);

      const highlight = makeElement("span", "highlight");

      range.surroundContents(highlight);
    });
  });
}
