state = {};

const BREWERIES_LIST_UL = document.querySelector("#breweries-list");

async function getAllBreweries() {
  const response = await fetch("https://api.openbrewerydb.org/breweries");
  state.breweries = await response.json();
  removeUnwantedBreweries();
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
  addressEnd.innerHTML = `${currentBrewery.city}, ${currentBrewery.postal_code}`;
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

function renderCards() {
  for (let i = 0; i < state.breweries.length; i++) {
    const currentBrewery = state.breweries[i];
    renderCard(currentBrewery);
  }
}
function createListItem() {}

getAllBreweries();
