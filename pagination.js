const firstPage = document.querySelector(".first");
const nextPage = document.querySelector(".next");
const previousPage = document.querySelector(".previous");

firstPage.addEventListener("click", (event) => {
  state.pageNumber = 1;
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.searchState}&per_page=10`
  )
    .then((res) => res.json())
    .then((data) => {
      renderList(data);
    });
});

nextPage.addEventListener("click", () => {
  const breweryListItems = document.querySelectorAll(".brewery-list-item");
  if (breweryListItems.length > 1) state.pageNumber += 1;
  fetchData().then((data) => {
    state.data = data;
    renderList(data);

    if (breweryListItems.length === 0) {
      brewList.insertAdjacentHTML(
        "afterbegin",
        `<h3>Oops.....that was the last brewery. Go back a page</h3>`
      );
    }
  });
});

previousPage.addEventListener("click", () => {
  if (state.pageNumber > 1) state.pageNumber -= 1;
  fetchData().then((data) => {
    state.data = data;
    renderList(data);
  });
});
