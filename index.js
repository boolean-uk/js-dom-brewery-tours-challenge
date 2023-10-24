const state = {};

const selectStateForm = document.querySelector("#select-state-form");
const breweryList = document.querySelector("#breweries-list");
const filterByType = document.querySelector("#filter-by-type");

filterByType.addEventListener("change", () => {
  state.filter = filterByType.value;
  renderTheBreweries();
});

//Event listerner to the select form

selectStateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = document.querySelector("#select-state").value;
  console.log("user input:", inputValue);
  state.inputValue = inputValue;

  state.filter = filterByType.value;

  userInputBreweries(state.inputValue);
});

// Get the user input
function userInputBreweries(inputStateValue) {
  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${inputStateValue}`
  )
    .then((response) => response.json())
    .then((json) => {
      state.breweries = json;
      renderTheBreweries();
    });
}

// filter by type for rendering the list
function filterByTypeValue(filterState, typeOfBrewery) {
  if (
    filterState === "" &&
    (typeOfBrewery === "micro" ||
      typeOfBrewery === "regional" ||
      typeOfBrewery === "brewpub")
  ) {
    return true;
  } else if (filterState === typeOfBrewery) {
    return true;
  }
  return false;
}

// filter for renderning the list

function filterRenderList(filterStateName, nameOfBrewery) {
  if (filterStateName === "") {
    return true;
  } else if (
    nameOfBrewery.toLowerCase().includes(filterStateName.toLowerCase())
  ) {
    return true;
  }
  return false;
}

// render the whole list

function renderTheBreweries() {
  breweryList.innerHTML = "";
  for (let i = 0; i < state.breweries.length; i++) {
    if (!filterByTypeValue(state.filter, state.breweries[i].brewery_type))
      continue;
    if (!filterRenderList(state.nameFilter, state.breweries[i].name)) continue;
    breweryList.append(breweryCardLi(state.breweries[i]));
  }
}
// brewery card
function breweryCardLi(breweryObject) {
  const list = document.createElement("li");

  const nameOfBreweryH2 = document.createElement("h2");
  nameOfBreweryH2.innerHTML = breweryObject.name;

  const divType = document.createElement("div");
  divType.classList.add("type");
  divType.innerText = breweryObject.brewery_type;

  const addressSection = document.createElement("section");
  addressSection.classList.add("address");
  const addressOfH3 = document.createElement("h3");
  addressOfH3.innerText = "Address:";

  const addressStreetP = document.createElement("p");
  addressStreetP.innerText = breweryObject.street;

  const addressPostcodeCityP = document.createElement("p");
  const addressStrongElement = document.createElement("strong");
  addressStrongElement.innerText = `${breweryObject.city}, ${breweryObject.postal_code}`;
  addressPostcodeCityP.append(addressStrongElement);
  addressSection.append(addressOfH3, addressStreetP, addressPostcodeCityP);

  const sectionOfPhone = document.createElement("section");
  sectionOfPhone.classList.add("phone");
  const phoneH3 = document.createElement("h3");
  phoneH3.innerText = "Phone:";
  const phoneParagraph = document.createElement("p");
  phoneParagraph.innerText = breweryObject.phone;
  sectionOfPhone.append(phoneH3, phoneParagraph);

  const sectionOfLink = document.createElement("section");
  sectionOfLink.classList.add("link");
  const linkOfA = document.createElement("a");
  linkOfA.innerText = "VISIT WEBSITE";
  linkOfA.href = breweryObject.website_url;
  sectionOfLink.append(linkOfA);

  list.append(
    nameOfBreweryH2,
    divType,
    addressSection,
    sectionOfPhone,
    sectionOfLink
  );
  return list;
}

// create the filter name

function filterName() {
  const header = document.createElement("header");
  header.classList.add("search-bar");

  const form = document.createElement("form");
  form.id = "search-breweries-form";
  form.autocomplete = "off";

  const label = document.createElement("label");
  label.for = "search-breweries";

  const h2 = document.createElement("h2");
  h2.innerText = "Search breweries:";

  const input = document.createElement("input");
  input.id = "search-breweries";
  input.name = "search-breweries";
  input.type = "text";

  label.append(h2);
  form.append(label, input);
  header.append(form);

  const articlePart = document.querySelector("article");
  const mainPart = document.querySelector("main");
  mainPart.insertBefore(header, articlePart);
}

// event listerner for the filter name

function filterNameEvent() {
  state.nameFilter = "";
  const filterCityForm = document.querySelector("#search-breweries-form");
  filterCityForm.addEventListener("submit", (event) => event.preventDefault());
  const inputText = document.querySelector("#search-breweries");
  inputText.addEventListener("input", () => {
    const userInput = inputText.value;
    state.nameFilter = userInput;
    renderTheBreweries();
  });
}

// load page

function loadPage() {
  filterName();
  filterNameEvent();
}

loadPage();
