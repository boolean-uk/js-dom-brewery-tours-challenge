// 1) Select form and set up submit event. Capture what user types and store in state
// 2) Perform GET request to https://api.openbrewerydb.org/breweries?by_state=[state]
// 3) Filter out anything not micro, regional or brewpub before passing into state
// 4) Call a render function that will generate HTML for each brewery in the state array
// 5) Make sure to link to website for each brewery - take URL from object

// State - userSearch, breweries, list of possible filters

// Second core requirement - From the 'filter by type of brewery' section, a user can filter by type of brewery.
// 1) Select second form- we need to know if the user has selected one of the filter options
// 2) In our render or separate function, we filter the currently displayed breweries to only include a selected type
// 3) We rerender the list

// Selections
const search = document.querySelector("#select-state");
const stateForm = document.querySelector("#select-state-form");
const mainList = document.querySelector(".breweries-list");

// State
const state = {
  userSearch: "",
  breweries: [],
};

// Event listeners
stateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.toLowerCase().trim();
  state.userSearch = searchTerm;
  search.value = "";

  getBreweries();
});

// Render
function renderBreweries() {
  mainList.innerHTML = "";

  state.breweries.forEach((brewery) => {
    createBreweryCard(brewery);
  });
}

function createBreweryCard(brewery) {
  const li = document.createElement("li");

  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;

  const div = document.createElement("div");
  div.classList.add("type");
  div.innerText = brewery.brewery_type;

  const sectionAddress = document.createElement("section");
  sectionAddress.classList.add("address");
  const address = document.createElement("h3");
  address.innerText = "Address:";
  const street = document.createElement("p");
  street.innerText = brewery.street;
  const city = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = `${brewery.city}, ${brewery.postal_code}`;

  const sectionPhone = document.createElement("section");
  const phone = document.createElement("h3");
  phone.innerText = "Phone:";
  const number = document.createElement("p");
  number.innerText = brewery.phone;

  const sectionLink = document.createElement("section");
  sectionLink.classList.add("link");

  const siteLink = document.createElement("a");
  siteLink.innerText = "Visit Website";
  siteLink.setAttribute("href", brewery.website_url);
  siteLink.setAttribute("target", "_blank");

  city.append(strong);
  sectionAddress.append(address, street, city);
  sectionPhone.append(phone, number);
  sectionLink.append(siteLink);

  li.append(h2, div, sectionAddress, sectionPhone, sectionLink);
  mainList.appendChild(li);
}

// Get data and put into state
function getBreweries() {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Basic error message if 0 items in array
      if (data.length < 1) {
        mainList.innerText = "Please enter a valid US state";
        return;
      }

      // Need to reset the breweries array between searches
      state.breweries = [];

      data.forEach((brewery) => {
        if (
          brewery.brewery_type === "brewpub" ||
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional"
        ) {
          state.breweries.push(brewery);
        } else {
          return;
        }
      });

      renderBreweries();
    });
}
