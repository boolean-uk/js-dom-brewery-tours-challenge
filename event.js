function usStateInput() {
  SELECT_STATE_FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    clearStateBreweryList();
    clearElement(BREWERY_LIST);

    getBreweriesByState(SELECT_STATE_INPUT.value)
      .then(() => renderBreweries())
      .then(() => paginateBreweryList());

    SELECT_STATE_FORM.reset();
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
