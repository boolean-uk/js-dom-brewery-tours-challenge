const state = {
  breweries: [],
};

const newState = {
  breweries: [],
};

const protocol = "https";
const baseURL = "api.openbrewerydb.org";

const USStates = [
"alabama",
"california",
"colorado",
"conneticut",
"delaware",
"florida",
"georgia",
"hawaii",
"idaho",
"illinois",
"indiana",
"iowa",
"kansas",
"kentucky",
"louisiana",
"maine",
"maryland",
"massachussets",
"michigan",
"minnesota",
"mississippi",
"missouri",
"montana",
"nebraska",
"nevada",
"new hampshire",
"new jersey",
"new mexico",
"new york",
"north carolina",
"north dakota",
"ohio",
"oaklahoma",
"oregon",
"pennsylvania",
"rhode island",
"south dakota",
"south carolina",
"texas",
"tennessee",
"utah",
"vermont",
"virginia",
"west virginia",
"wyoming",
"wisconsin",
"washington"
];

const root = `${protocol}://${baseURL}/v1/breweries`;
const breweryList = document.querySelector("#breweries-list");
const selectStateForm = document.querySelector("#select-state-form");
const filterByType = document.getElementById("filter-by-type");
const filterByCity = document.getElementById("filter-by-city");
const pagination = document.getElementById("pagination");
const itemsPerPage = 10;
let currentPage = 1;

const removeBreweries = () => {
  while (breweryList.firstChild) {
    breweryList.removeChild(breweryList.firstChild);
  }
};

const renderBreweryList = (breweryState) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const breweriesToDisplay = breweryState.breweries.slice(start, end);

  breweriesToDisplay.forEach((brewery) => {
    const li = document.createElement("li");

    const breweryName = document.createElement("h2");
    breweryName.innerText = brewery.name;

    const breweryType = document.createElement("div");
    breweryType.innerText = brewery.brewery_type;
    breweryType.classList.add("type");

    const addressSection = document.createElement("section");
    addressSection.classList.add("address");

    const address = document.createElement("h3");
    address.innerText = "Address:";

    const street = document.createElement("p");
    street.innerText = brewery.street;

    const cityAndPostCode = document.createElement("p");
    const strong = document.createElement("strong");
    strong.innerText = `${brewery.city}, ${brewery.postal_code}`;
    cityAndPostCode.append(strong);

    addressSection.append(address, street, cityAndPostCode);

    const phoneSection = document.createElement("section");
    phoneSection.classList.add("phone");

    const phoneNumberTitle = document.createElement("h3");
    phoneNumberTitle.innerText = "Phone:";

    const phoneNumber = document.createElement("p");
    phoneNumber.innerText = brewery.phone;

    phoneSection.append(phoneNumberTitle, phoneNumber);

    const websiteLinkSection = document.createElement("section");
    websiteLinkSection.classList.add("link");

    const linkAnchor = document.createElement("a");
    linkAnchor.setAttribute("href", brewery.website_url);
    linkAnchor.setAttribute("target", "_blank");
    linkAnchor.innerText = "Visit Website";

    websiteLinkSection.append(linkAnchor);

    li.append(
      breweryName,
      breweryType,
      addressSection,
      phoneSection,
      websiteLinkSection
    );

    breweryList.appendChild(li);
  });
};
selectStateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchState = event.target[0].value;

  fetch(`${root}?by_state=${searchState}`)
    .then((response) => response.json())
    .then((data) => {
      let BreweryCanVisit = [];
      data.forEach((item) => {
        if (["micro", "regional", "brewpub"].includes(item.brewery_type)) {
          BreweryCanVisit.push(item);
        }
      });
      state.breweries = BreweryCanVisit;

      const selectedType = filterByType.value;
      if (selectedType === "no_filter") {
        // No brewery type filter, simply render
        currentPage = 1;
        removeBreweries();
        renderBreweryList(state);
      } else {
        changeState(selectedType);
      }

      updatePagination();
    });
});

filterByType.addEventListener("click", (event) => {
  const selectedType = filterByType.value;
  if (selectedType === "no_filter") {
    removeBreweries();
    renderBreweryList(state);
  } else {
    changeState(selectedType);
  }
});

filterByCity.addEventListener("click", (event) => {
  const cities = new Set(state.breweries.map((brewery) => brewery.city));
  const cityCheckboxes = Array.from(cities).map((city) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = city;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(city));
    return label;
  });

  const clearFilter = document.createElement("button");
  clearFilter.innerText = "Clear Filters";
  clearFilter.addEventListener("click", () => {
    cityCheckboxes.forEach((checkbox) => {
      checkbox.firstChild.checked = false;
    });
    updateCityFilter();
  });

  selectStateForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const searchState = event.target[0].value;
  
    if (searchState.trim() === "") {
      
      alert("Please provide a state name");
      return;
    }
  
    fetch(`${root}?by_state=${searchState}`)
      .then((response) => response.json())
      .then((data) => {
        let BreweryCanVisit = [];
        data.forEach((item) => {
          if (["micro", "regional", "brewpub"].includes(item.brewery_type)) {
            BreweryCanVisit.push(item);
          }
        });
  
        state.breweries = BreweryCanVisit;
        currentPage = 1;
        removeBreweries();
        renderBreweryList(state);
        updatePagination();
      });
  });
  

  filterByCity.innerHTML = "";
  filterByCity.appendChild(clearFilter);
  cityCheckboxes.forEach((checkbox) => {
    filterByCity.appendChild(checkbox);
    checkbox.addEventListener("change", updateCityFilter);
  });
});

function changeState(type) {
  newState.breweries = state.breweries.filter((brewery) => brewery.brewery_type === type);
  currentPage = 1;
  removeBreweries();
  renderBreweryList(newState);
  updatePagination();
}

function updateCityFilter() {
  const selectedCities = Array.from(filterByCity.querySelectorAll("input:checked")).map(
    (checkbox) => checkbox.value
  );
  if (selectedCities.length === 0) {
    removeBreweries();
    renderBreweryList(state);
  } else {
    newState.breweries = state.breweries.filter((brewery) =>
      selectedCities.includes(brewery.city)
    );
    currentPage = 1;
    removeBreweries();
    renderBreweryList(newState);
    updatePagination();
  }
}

function updatePagination() {
  const totalPages = Math.ceil(state.breweries.length / itemsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      removeBreweries();
      renderBreweryList(state);
      updatePagination();
    });
    pagination.appendChild(pageButton);
  }
}

updatePagination();
