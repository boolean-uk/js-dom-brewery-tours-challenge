/* Here are the Standard Requirements for the Brewery Challenge:

1. A user can enter a US state and view a list of breweries in that state
2. The list should only shows the types of breweries that offer brewery tours: (Micro, Regional, Brewpub)
3.  From the list of breweries, a user can view the following details about each brewery: (Name, Type of brewery, Address, Phone Number)
4. From the list of breweries, a user can visit the website of a brewery
5. From the 'filter by type of brewery' section, a user can filter by type of brewery. */

// Step 1

const tourBreweryTypes = ["micro", "brewpub", "regional"];

const state = {
  state: "",
  breweriesHeadingEl: "",
  breweriesListEl: "",
  breweriesData: [],
  filters: {
    breweryType: "",
  },
  status: "Idle",
};

// Step 2

function initialiseSearchListener() {
  const searchButton = document.querySelector("#select-state-form");

  searchButton.addEventListener("submit", (event) => {
    event.preventDefault();

    state.state = event.target[0].value;
    event.target.reset();

    fetchAndRender();
  });
}

function initialiseFilterByTypeListener() {
  const filter = document.querySelector("#filter-by-type");

  filter.addEventListener("change", (event) => {
    state.filters.breweryType = event.target.value;

    fetchAndRender();
  });
}

// Step 3

function initialise() {
  state.breweriesHeadingEl = document.querySelector("#breweries-heading");
  state.breweriesListEl = document.querySelector("#breweries-list");

  initialiseSearchListener();
  initialiseFilterByTypeListener();

  fetchAndRender();
}

// Step 4

function renderBreweries() {
  state.breweriesData.forEach((brewery) => renderBrewery(brewery));
}

function renderPhoneNumber(phoneNumber) {
  if (phoneNumber === null) {
    return "N/A";
  }
  return phoneNumber;
}

function renderBrewery(brewery) {
  const li = document.createElement("li");
  li.innerHTML = `<h2>${brewery.name}</h2>
    <div class="type">${brewery.brewery_type}</div>
    <section class="address">
      <h3>Address:</h3>
      <p>${brewery.street}</p>
      <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
    </section>
    <section class="phone">
      <h3>Phone:</h3>
      <p>${renderPhoneNumber(brewery.phone)}</p>
    </section>
    <section class="link">
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    </section>`;

  state.breweriesListEl.append(li);
}

function render() {
  renderBreweries();
}

// Step 5

function getUrl() {
  let url = `https://api.openbrewerydb.org/breweries?by_state=${state.state}`;

  if (state.filters.breweryType !== "") {
    url = url + `&by_type=${state.filters.breweryType}`;
  }

  return url;
}

function setBreweryData(rawData) {
  let breweriesWithTours = [];

  breweriesWithTours = rawData.filter((b) =>
    tourBreweryTypes.includes(b.brewery_type)
  );

  state.breweriesData = breweriesWithTours;
}

function getBreweriesHeading() {
  let breweriesHeading = "List of Breweries";

  if (state.state !== "") {
    breweriesHeading = breweriesHeading + ` for '${state.state}'`;
  }

  if (state.filters.breweryType !== "") {
    breweriesHeading = breweriesHeading + ` ${state.filters.breweryType}`;
  }

  return breweriesHeading;
}

function fetchAndRender() {
  state.breweriesListEl.innerHTML = "";

  state.breweriesHeadingEl.innerText = getBreweriesHeading();

  if (state.state === "") {
    state.breweriesListEl.innerHTML = "<p><em>No state selected</em></p>";
    return;
  }

  // Step 6

  const url = getUrl();

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      setBreweryData(data);
      //   console.log(data)
      render();
    });
}

// Step 7

initialise();

// ------------- Below is my old code snippet ------------------ //
/* const breweryUl = document.getElementById("breweries-list");

function getAndRenderBreweries() {
  fetch("https://api.openbrewerydb.org/breweries?by_state=ohio")
    .then((res) => res.json())
    .then((data) => {
      renderBreweries(data);
    });
}

const tourBreweryTypes = ["micro", "brewpub", "regional"];

function renderBreweries(breweries) {
  breweryUl.innerHTML = "";

  breweries.forEach((brewery) => {
    if (tourBreweryTypes.includes(brewery.brewery_type)) {
      renderBrewery(brewery);
    }
  });
}

function renderBrewery(brewery) {
  const breweryLi = document.createElement("li");
  breweryUl.append(breweryLi);

  const breweryName = document.createElement("h2");
  breweryName.innerText = brewery.name;
  breweryLi.append(breweryName);

  const breweryType = document.createElement("div");
  breweryType.setAttribute("class", "type");
  breweryType.innerText = brewery.brewery_type;
  breweryLi.append(breweryType);

  const breweryAddress = document.createElement("section");
  breweryAddress.setAttribute("class", "address");
  breweryLi.append(breweryAddress);

  const addressH3 = document.createElement("h3");
  addressH3.innerText = "Address:";
  breweryAddress.append(addressH3);

  const streetP = document.createElement("p");
  streetP.innerText = brewery.street;
  breweryAddress.append(streetP);

  const postcodeP = document.createElement("p");
  postcodeP.innerHTML = `<strong>${brewery.city}, ${brewery.postal_code}`;
  breweryAddress.append(postcodeP);

  const breweryPhone = document.createElement("section");
  breweryPhone.setAttribute("class", "phone");
  breweryLi.append(breweryPhone);

  const phoneH3 = document.createElement("h3");
  phoneH3.innerText = "Phone:";
  breweryPhone.append(phoneH3);

  const phoneP = document.createElement("p");
  phoneP.innerText = brewery.phone;
  breweryPhone.append(phoneP);

  const breweryLink = document.createElement("section");
  breweryLink.setAttribute("class", "link");
  breweryLi.append(breweryLink);

  const breweryA = document.createElement("a");
  breweryA.href = brewery.website_url;
  breweryA.target = "_blank";
  breweryA.innerText = "Visit Website";
  breweryLink.append(breweryA);
}

getAndRenderBreweries(); */
