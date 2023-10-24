function paginate() {
  STATE.page.pageCount = Math.ceil(
    BREWERY_LIST.children.length / STATE.page.pageLimit
  );

  renderPaginateSelector();
  showPagination();
  paginateShowPage();
  pageNumberSelect();
}

function hidePagination() {
  PAGINATION.classList.add("hidden");
}

function showPagination() {
  PAGINATION.classList.remove("hidden");
}

function paginateShowPage() {
  const breweries = BREWERY_LIST.querySelectorAll(":scope > li");

  const { currentPage, pageLimit } = STATE.page;
  const resultCount = BREWERY_LIST.children.length;

  const startBrewery = resultCount ? currentPage * pageLimit - pageLimit + 1 : 0;
  const endBrewery = currentPage * pageLimit;

  for (const [idx, brewery] of breweries.entries()) {
    brewery.classList.add("hidden");

    if (idx >= startBrewery && idx < endBrewery)
      brewery.classList.remove("hidden");
  }

  const resultCounter = document.querySelector(".search-result-counter");
  resultCounter.innerText = `Showing ${startBrewery}-${
    endBrewery < resultCount ? endBrewery : resultCount
  } of ${resultCount} results`;
}

function changePage(page) {
  STATE.page.currentPage = page;
  renderPaginateSelector();
  paginateShowPage();
}


function togglePaginateAdjacentButtons() {
  const buttons = PAGINATION.querySelectorAll(".page-button");

  for (const button of buttons) {
    button.classList.remove("disabled");
  }

  if (STATE.page.currentPage <= 1) {
    buttons[0].classList.add("disabled");
  }

  if (STATE.page.currentPage >= STATE.page.pageCount) {
    buttons[1].classList.add("disabled");
  }
}
