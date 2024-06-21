state = {
  breweries: [],
  currentUsState: "",
  breweryTypeFilter: "",
};

const BREWERIES_LIST_UL = document.querySelector("#breweries-list");

async function getAllBreweries() {
  let response = "";
  if (state.breweryTypeFilter != "") {
    response = await fetch(
      `https://api.openbrewerydb.org/breweries?per_page=200&by_state=${state.currentUsState}&by_type=${state.breweryTypeFilter}`
    );
  } else {
    response = await fetch(
      `https://api.openbrewerydb.org/breweries?per_page=200&by_state=${state.currentUsState}`
    );
  }

  state.breweries = await response.json();
  for (let j = 0; j < 3; j++) {
    removeUnwantedBreweries();
  }
}

function removeUnwantedBreweries() {
  for (let i = 0; i < state.breweries.length; i++) {
    const brewery = state.breweries[i];
    if (
      brewery.brewery_type != "micro" &&
      brewery.brewery_type != "regional" &&
      brewery.brewery_type != "brewpub"
    ) {
      state.breweries.splice(i, 1);
    }
    if (brewery.brewery_type == "large") {
      state.breweries.splice(i, 1);
    }
  }
  console.log(state.breweries);
  renderCards();
}

function renderCard(currentBrewery) {
  const li = document.createElement("li");
  const title = document.createElement("h2");
  title.textContent = currentBrewery.name;
  const type = document.createElement("div");
  type.className = "type";
  type.innerHTML = currentBrewery.brewery_type;
  const address = document.createElement("section");
  address.className = "address";
  const addressTitle = document.createElement("h3");
  addressTitle.textContent = "Address:";
  const addressStreet = document.createElement("p");
  addressStreet.textContent = currentBrewery.street;
  const addressEnd = document.createElement("p");
  addressEnd.innerHTML = `<strong>${currentBrewery.city}, ${currentBrewery.postal_code}</strong>`;
  address.append(addressTitle, addressStreet, addressEnd);
  const phone = document.createElement("section");
  phone.className = "phone";
  const phoneTitle = document.createElement("h3");
  phoneTitle.textContent = "Phone:";
  const phoneNumber = document.createElement("p");
  phoneNumber.textContent = currentBrewery.phone;
  phone.append(phoneTitle, phoneNumber);
  const linkSection = document.createElement("section");
  linkSection.className = "link";
  const link = document.createElement("a");
  link.textContent = "Visit Website";
  link.target = "_blank";
  link.href = currentBrewery.website_url;
  linkSection.appendChild(link);
  li.append(title, type, address, phone, link);
  BREWERIES_LIST_UL.appendChild(li);
}

function getUsStateInput(usState) {}

function renderCards() {
  BREWERIES_LIST_UL.innerHTML = "";
  for (let i = 0; i < state.breweries.length; i++) {
    const currentBrewery = state.breweries[i];
    renderCard(currentBrewery);
  }
}
function createListItem() {}

const submitButton = document.querySelector("input[type=submit]");

submitButton.addEventListener("click", () => {
  event.preventDefault();
  state.currentUsState = document.getElementById("select-state").value;
  getAllBreweries();
});

const typeFilter = document.getElementById("filter-by-type");

typeFilter.addEventListener("input", () => {
  state.breweryTypeFilter = typeFilter.value;
  getAllBreweries();
});

getAllBreweries();
