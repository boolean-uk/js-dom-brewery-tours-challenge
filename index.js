// - A user can enter a US state and view a list of breweries in that state
// 	- The list should only shows the types of breweries that offer brewery tours:
// 		- Micro
// 		- Regional
// 		- Brewpub
// 	- **Do not** show the other types of breweries
// - From the list of breweries, a user can view the following details about each brewery:
// 	- Name
// 	- Type of brewery
// 	- Address
// 	- Phone Number
// - From the list of breweries, a user can visit the website of a brewery
// - From the 'filter by type of brewery' section, a user can filter by type of brewery.

const stateForm = document.querySelector("#select-state-form");
const stateInput = document.querySelector("#select-state");

// - A user can enter a US state and view a list of breweries in that state

const state = {
  breweries: [],
  filtered: [],
};

stateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // 	- The list should only shows the types of breweries that offer brewery tours:
  // 		- Micro
  // 		- Regional
  // 		- Brewpub
  // 	- **Do not** show the other types of breweries
  const stateTyped = stateInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${stateTyped}&per_page=50`
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      (state.breweries = data), renderBreweries();
    });
});

function renderBreweries() {
  const breweriesUl = document.querySelector("#breweries-list");
  breweriesUl.innerHTML = "";
  for (let i = 0; i < state.breweries.length; i++) {
    const breweryLi = document.createElement("li");

    const breweryH2 = document.createElement("h2");
    breweryH2.innerText = state.breweries[i].name;

    const breweryTypeDiv = document.createElement("div");
    breweryTypeDiv.setAttribute("class", "type");
    breweryTypeDiv.innerText = state.breweries[i].brewery_type;

    const brewerySectionAddress = document.createElement("section");
    brewerySectionAddress.setAttribute("class", "address");

    const breweryH3Address = document.createElement("h3");
    breweryH3Address.innerText = "Address:";

    const breweryPAddress = document.createElement("p");
    breweryPAddress.innerText = state.breweries[i].street;

    const breweryPostalAddress = document.createElement("p");
    const breweryPostalStrong = document.createElement("strong");
    breweryPostalStrong.innerText = `${state.breweries[i].city}, ${state.breweries[i].postal_code}`;

    const brewerySectionPhone = document.createElement("section");
    brewerySectionPhone.setAttribute("class", "phone");

    const breweryH3Phone = document.createElement("h3");
    breweryH3Phone.innerText = "Phone:";

    const breweryPhoneNumber = document.createElement("p");
    breweryPhoneNumber.innerText = state.breweries[i].phone;

    const brewerySectionLink = document.createElement("section");
    brewerySectionLink.setAttribute("class", "link");

    const breweryLinkA = document.createElement("a");
    breweryLinkA.setAttribute("href", state.breweries[i].website_url);
    breweryLinkA.setAttribute("target", "_blank");
    breweryLinkA.innerText = "Visit Website";

    if (
      state.breweries[i].brewery_type === "micro" ||
      state.breweries[i].brewery_type === "brewpub" ||
      state.breweries[i].brewery_type === "regional"
    ) {
      // - From the list of breweries, a user can view the following details about each brewery:
      // 	- Name
      // 	- Type of brewery
      // 	- Address
      // 	- Phone Number
      // - From the list of breweries, a user can visit the website of a brewery
      breweriesUl.append(breweryLi);
      breweryLi.append(
        breweryH2,
        breweryTypeDiv,
        brewerySectionAddress,
        brewerySectionPhone,
        brewerySectionLink
      );
      brewerySectionAddress.append(
        breweryH3Address,
        breweryPAddress,
        breweryPostalAddress
      );
      breweryPostalAddress.append(breweryPostalStrong);
      brewerySectionPhone.append(breweryH3Phone, breweryPhoneNumber);
      brewerySectionLink.append(breweryLinkA);
    }
  }
}

// - From the 'filter by type of brewery' section, a user can filter by type of brewery.
const filter = document.querySelector("#filter-by-type-form");
const selectOption = document.querySelector("#filter-by-type");

filter.addEventListener("change", function (event) {
  event.preventDefault();
  const filteredBrewery = selectOption.value;
  console.log("error", filteredBrewery);
  const stateTyped = stateInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_type=${filteredBrewery}&by_state=${stateTyped}&per_page=50`
  )
    .then((response) => {
      return response.json();
    })
    .then(function (filteredBreweryData) {
      (state.breweries = filteredBreweryData), renderBreweries();
    });
});

renderBreweries();
