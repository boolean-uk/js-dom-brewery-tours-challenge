const url = "https://api.openbrewerydb.org/v1/breweries";
const brewerieslist = document.querySelector("#breweries-list");
const searchForm = document.querySelector("#select-state-form");
const searchInput = document.querySelector("#select-state");
const filterForm = document.querySelector("#filter-by-type-form");
const filterSelectMenu = document.querySelector("#filter-by-type");
const listBreweriesHeading = document.querySelector("#list-breweries-heading");

//To populate the search result in HTML list.
function getBreries(array) {
  brewerieslist.innerHTML = "";
  array.forEach((brewery) => {
    brewerieslist.insertAdjacentHTML(
      "beforeend",
      `<li>
            <h2>${brewery.name}</h2>
            <div class="type">${brewery.brewery_type}</div>
            <section class="address">
                <h3>Address:</h3>
                 <p>${brewery.address_1} Rd</p>
                 <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
            </section>
            <section class="phone">
                <h3>Phone:</h3>
                <p>${brewery.phone}</p>
            </section>
            <section class="link">
                <a href= ${brewery.website_url} target="_blank">Visit Website</a>
            </section>
         </li>`
    );
  });
}

function serachByState(state) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const searchResult = [];
      data.filter((item) => {
        const micro = item.brewery_type === "micro";
        const regional = item.brewery_type === "regional";
        const brewpub = item.brewery_type === "brewpub";

        const isTypeIncluded = micro || regional || brewpub;
        const isStateFound = item.state_province.toLowerCase() === state;

        if (isStateFound && isTypeIncluded) {
          searchResult.push(item);
        }
      });
      addInstantSerachBar(searchResult);
      getBreries(searchResult);
      filterByType(searchResult);
    });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const state = searchInput.value.trim().toLowerCase();
  serachByState(state);
});

function filterByType(searchResult) {
  filterSelectMenu.addEventListener("change", (event) => {
    const filterResult = [];
    const option = event.currentTarget.value;

    searchResult.filter((item) => {
      if (item.brewery_type === option) {
        filterResult.push(item);
      }
    });

    getBreries(filterResult);
  });
}

function addInstantSerachBar(searchResult) {
  if (searchResult.length > 0) {
    listBreweriesHeading.insertAdjacentHTML(
      "afterend",
      `<header class="search-bar">
            <form id="search-breweries-form" autocomplete="off">
                <label for="search-breweries"><h2>Search breweries:</h2></label>
                 <input id="search-breweries" name="search-breweries" type="text">
            </form>
        </header>`
    );

    const instantSearchBar = document.querySelector("#search-breweries");
    instantSearchBar.addEventListener("keyup", (event) => {
      render(instantSearchBar.value, searchResult);
    });
  }
}

function render(query = "", searchResult) {
  const cleanedupQuery = query.trim().toLowerCase();
  const filteredByName = searchResult.filter((item) =>
    item.name.toLowerCase().includes(cleanedupQuery)
  );
  getBreries(filteredByName);
}
