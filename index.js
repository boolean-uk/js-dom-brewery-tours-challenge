const stateForm = document.querySelector("#select-state-form");
const stateInput = document.querySelector("#select-state");
const breweriesUl = document.querySelector("#breweries-list");
const filter = document.querySelector("#filter-by-type-form");
const selectOption = document.querySelector("#filter-by-type");

const state = {
  breweries: [],
};

stateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const stateTyped = stateInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${stateTyped}&per_page=50`
  )
    .then((response) => response.json())
    .then(function (data) {
      state.breweries = data;
      renderBreweries();
    });
});

filter.addEventListener("change", function (event) {
  event.preventDefault();
  const filteredBrewery = selectOption.value;
  const stateTyped = stateInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_type=${filteredBrewery}&by_state=${stateTyped}&per_page=50`
  )
    .then((response) => response.json())
    .then(function (filteredBreweryData) {
      state.breweries = filteredBreweryData;
      renderBreweries();
    });
});

function renderBreweries() {
  breweriesUl.innerHTML = "";
  state.breweries.forEach((brewery) => {
    if (["micro", "brewpub", "regional"].includes(brewery.brewery_type)) {
      const breweryLi = document.createElement("li");
      const breweryH2 = document.createElement("h2");
      breweryH2.innerText = brewery.name;

      const breweryTypeDiv = document.createElement("div");
      breweryTypeDiv.setAttribute("class", "type");
      breweryTypeDiv.innerText = brewery.brewery_type;

      const brewerySectionAddress = createSection("address");
      const breweryH3Address = document.createElement("h3");
      breweryH3Address.innerText = "Address";

      const breweryPAddress = createParagraph(brewery.street);
      const breweryPostalAddress = createParagraph(
        `${brewery.city}, ${brewery.postal_code}`
      );

      const brewerySectionPhone = createSection("phone");
      const breweryH3Phone = document.createElement("h3");
      breweryH3Phone.innerText = "Phone";

      const breweryPhoneNumber = createParagraph(brewery.phone);

      const brewerySectionLink = createSection("link");
      const breweryLinkA = createLink(brewery.website_url, "Visit Website");

      appendChildren(breweryLi, [
        breweryH2,
        breweryTypeDiv,
        brewerySectionAddress,
        brewerySectionPhone,
        brewerySectionLink,
      ]);

      appendChildren(brewerySectionAddress, [
        breweryH3Address,
        breweryPAddress,
        breweryPostalAddress,
      ]);

      appendChildren(breweryPostalAddress, [createStrong(brewery.city)]);
      appendChildren(brewerySectionPhone, [breweryH3Phone, breweryPhoneNumber]);
      appendChildren(brewerySectionLink, [breweryLinkA]);
      breweriesUl.appendChild(breweryLi);
    }
  });
}

function createSection(className) {
  const section = document.createElement("section");
  section.setAttribute("class", className);
  return section;
}

function createParagraph(text) {
  const p = document.createElement("p");
  p.innerText = text;
  return p;
}

function createStrong(text) {
  const strong = document.createElement("strong");
  strong.innerText = text;
  return strong;
}

function createLink(href, text) {
  const a = document.createElement("a");
  a.setAttribute("href", href);
  a.setAttribute("target", "_blank");
  a.innerText = text;
  return a;
}

function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

renderBreweries();
