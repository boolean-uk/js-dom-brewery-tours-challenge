const state = {
  breweries: [],
  breweriesDisplayed: [],
  searchedBreweries: [],
  filteredBreweries: [],
};

let breweryData = state.breweries;
let breweriesToDisplay = state.breweriesDisplayed;
let searchedBreweryData = state.searchedBreweries;
let page = 0;
const searchStateInput = document.querySelector("#select-state");
const selectfilter = document.querySelector("select");
const cityFilterSection = document.createElement("section");

function filterBreweryData() {
  renderBrewerySearchBar();
  searchStateInput.addEventListener("keyup", async () => {
    breweryData = [];
    breweriesToDisplay = [];
    page = 0;
    selectfilter.value = "";
    if (searchStateInput.value < 1) {
      breweryData = [];
    } else {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries?by_state=" +
          searchStateInput.value +
          "&per_page=200"
      );
      let stateBreweries = await response.json();
      console.log("State Breweries", stateBreweries);
      stateBreweries.forEach((brewery) => {
        if (
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional" ||
          brewery.brewery_type === "brewpub"
        ) {
          // if (breweryData.length < 10) {
          breweryData.push(brewery);
        }
        // }
      });
      for (let i = 0; i < breweryData.length; i++) {
        let brewery = breweryData[i];
        if (breweriesToDisplay.length < 10) {
          breweriesToDisplay.push(brewery);
        }
      }
      console.log("updated state", breweryData);

      console.log("breweries displayed", breweriesToDisplay);
    }
    renderBreweryLi(breweriesToDisplay);
    enableSearchBar(breweriesToDisplay);
    renderCityFilter(breweriesToDisplay);
  });
}
function renderBrewerySearchBar() {
  const listHeading = document.querySelector("h1");

  const myBreweryList = document.createElement("a");
  myBreweryList.href = "";
  myBreweryList.className = "myBreweryList";
  myBreweryList.innerText = "My Brewery List";
  listHeading.append(myBreweryList);

  myBreweryList.addEventListener("click", async () => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/myBreweries");
    let myBreweries = await response.json();
    console.log(myBreweries);
    renderBreweryLi(myBreweries);
    enableSearchBar(myBreweries);
    renderCityFilter(myBreweries);
  });

  const searchHeader = document.createElement("h2");
  listHeading.append(searchHeader);

  const searchForm = document.createElement("form");
  searchForm.id = "search-breweries-form";
  searchForm.autocomplete = "off";
  searchHeader.append(searchForm);

  const searchBarLabel = document.createElement("label");
  searchBarLabel.for = "search-breweries";
  searchForm.append(searchBarLabel);

  const searchHeading = document.createElement("h2");
  searchHeading.innerText = "Search breweries:";
  searchBarLabel.append(searchHeading);

  const searchInput = document.createElement("input");
  searchInput.id = "search-breweries";
  searchInput.name = "search-breweries";
  searchInput.type = "text";
  searchForm.append(searchInput);
}
function enableSearchBar(breweriesToDisplay) {
  const searchInput = document.querySelector("#search-breweries");
  searchInput.addEventListener("keyup", () => {
    selectfilter.value = "";
    let upperCaseInput = searchInput.value.toUpperCase();
    console.log(upperCaseInput);
    breweriesToDisplay.forEach((brewery) => {
      let found = brewery.name.match(upperCaseInput);
      if (found === null) {
        console.log("name not found");
      } else {
        searchedBreweryData.push(brewery);
      }
    });
    renderBreweryLi(searchedBreweryData);
    renderCityFilter(searchedBreweryData);
    searchedBreweryData = [];
  });
  searchInput.value = "";
}
function renderCityFilter(breweriesToDisplay) {
  cityFilterSection.innerHTML = "";
  const filtersSection = document.querySelector(".filters-section");

  cityFilterSection.className = "city-filter-section";
  filtersSection.append(cityFilterSection);

  const cityFilterHeading = document.createElement("div");
  cityFilterHeading.className = "filter-by-city-heading";
  cityFilterSection.append(cityFilterHeading);

  const cityFilterHeader = document.createElement("h3");
  cityFilterHeader.innerText = "Cities";

  const clearButton = document.createElement("button");
  clearButton.className = "clear-all-btn";
  clearButton.innerText = "Clear All";
  cityFilterHeading.append(cityFilterHeader, clearButton);

  const cityForm = document.createElement("form");
  cityForm.id = "filter-by-city-form";
  cityFilterSection.append(cityForm);

  let cityBreweries = [];
  let filteredCityBreweries = [];

  breweriesToDisplay.forEach((brewery) => {
    if (cityBreweries.includes(brewery.city)) {
      console.log("City already included");
    } else {
      cityBreweries.push(brewery.city);
    }
  });

  cityBreweries.sort();

  cityBreweries.forEach((city) => {
    const filterCheckbox = document.createElement("input");
    filterCheckbox.type = "checkbox";
    filterCheckbox.name = city;
    filterCheckbox.value = city;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.for = city;
    checkboxLabel.innerText = city;
    cityForm.append(filterCheckbox, checkboxLabel);

    clearButton.addEventListener("click", () => {
      filteredCityBreweries = [];
      filterCheckbox.checked = false;
      renderBreweryLi(breweriesToDisplay);
    });

    filterCheckbox.addEventListener("change", function () {
      if (filterCheckbox.checked === true) {
        const selectedBreweries = breweriesToDisplay.filter(
          (brewery) => brewery.city === filterCheckbox.name
        );
        filteredCityBreweries = filteredCityBreweries.concat(selectedBreweries);
        console.log("filtered City Breweries:", filteredCityBreweries);
        renderBreweryLi(filteredCityBreweries);
      } else if (
        filterCheckbox.checked === false &&
        filteredCityBreweries.length >= 1
      ) {
        let i = filteredCityBreweries.length;
        while (i--) {
          if (filteredCityBreweries[i].city === filterCheckbox.name) {
            filteredCityBreweries.splice(i, 1);
          }
        }
        renderBreweryLi(filteredCityBreweries);
      }
      if (filteredCityBreweries.length === 0) {
        renderBreweryLi(breweriesToDisplay);
      }
    });
  });
}
function renderBreweryLi(breweriesToDisplay) {
  const breweryUL = document.querySelector(".breweries-list");
  breweryUL.innerHTML = "";

  breweriesToDisplay.forEach((brewery) => {
    const breweryLi = document.createElement("li");
    breweryUL.append(breweryLi);

    const breweryHeader = document.createElement("h2");
    breweryHeader.innerText = brewery.name;

    const breweryType = document.createElement("div");
    breweryType.className = "type";
    breweryType.innerText = brewery.brewery_type;

    const breweryAddress = document.createElement("section");
    breweryAddress.className = "address";

    const addressHeading = document.createElement("h3");
    addressHeading.innerText = "Address:";

    const breweryStreet = document.createElement("p");
    breweryStreet.innerText = brewery.address_1;

    const breweryPostCode = document.createElement("p");
    const postCodeText = document.createElement("strong");
    postCodeText.innerHTML = brewery.city + ", " + brewery.postal_code;
    breweryPostCode.append(postCodeText);
    breweryAddress.append(addressHeading, breweryStreet, breweryPostCode);

    const breweryPhone = document.createElement("section");
    breweryPhone.className = "phone";

    const phoneHeading = document.createElement("h3");
    phoneHeading.innerText = "Phone:";

    const phoneNumber = document.createElement("p");
    phoneNumber.textContent = brewery.phone;
    breweryPhone.append(phoneHeading, phoneNumber);

    const breweryWebsite = document.createElement("section");
    breweryWebsite.className = "link";

    const breweryWebLink = document.createElement("a");
    breweryWebLink.href = brewery.website_url;
    breweryWebLink.innerText = "Visit Website";
    breweryWebsite.append(breweryWebLink);

    const addToListBtn = document.createElement("button");
    addToListBtn.className = "addToListBtn";
    addToListBtn.innerText = "Add to List";
    breweryWebsite.append(addToListBtn);

    addToListBtn.addEventListener("click", async () => {
      console.log("You clicked the add to list button");
      const repsonse = await fetch("http://localhost:3000/myBreweries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: brewery.id,
          address_1: brewery.address_1,
          brewery_type: brewery.brewery_type,
          city: brewery.city,
          country: brewery.country,
          name: brewery.name,
          phone: brewery.phone,
          postal_code: brewery.postal_code,
          state: brewery.state,
          street: brewery.street,
          website_url: brewery.website_url,
        }),
      });
      getMyData();
    });

    breweryLi.append(
      breweryHeader,
      breweryType,
      breweryAddress,
      breweryPhone,
      breweryWebsite
    );
  });

  if (page > 0) {
    const previousPageButton = document.createElement("button");
    previousPageButton.id = "previous_page";
    previousPageButton.innerText = "Previous Page";
    breweryUL.append(previousPageButton);

    previousPageButton.addEventListener("click", () => {
      page--;
      loadNextPage();
    });
  } else {
    console.log("You are on page 1.");
  }

  const pageNumber = document.createElement("p");
  pageNumber.innerText = page + 1;
  pageNumber.id = "page_number";
  breweryUL.append(pageNumber);
  const nextPageButton = document.createElement("button");
  nextPageButton.id = "next_page";
  nextPageButton.innerText = "Next Page";
  breweryUL.append(nextPageButton);

  nextPageButton.addEventListener("click", () => {
    console.log("search State input", searchStateInput.value);
    if (searchStateInput.value != "") {
      page++;
      loadNextPage();
    } else {
      console.log("Please input a state");
    }
  });
}
async function loadNextPage() {
  breweriesToDisplay = [];
  selectfilter.value = "";

  let startingPlace = page * 10;
  for (let i = startingPlace; i < breweryData.length; i++) {
    let brewery = breweryData[i];
    if (breweriesToDisplay.length < 10) {
      breweriesToDisplay.push(brewery);
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderBreweryLi(breweriesToDisplay);
  enableSearchBar(breweriesToDisplay);
  renderCityFilter(breweriesToDisplay);
}
selectfilter.addEventListener("change", () => {
  let filteredBreweries = breweriesToDisplay.filter(
    (brewery) => brewery.brewery_type === selectfilter.value
  );
  console.log("filtered Breweries:", filteredBreweries);
  renderBreweryLi(filteredBreweries);
});

async function getMyData() {
  const response = await fetch("http://localhost:3000/myBreweries");
  let myServerData = await response.json();
  console.log("My Server Data", myServerData);
}

filterBreweryData();
