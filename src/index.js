const state = {
  breweries: [],
};

let url = "https://api.openbrewerydb.org/breweries?by_state=";

const formEl = document.querySelector("#select-state-form");
const formInputEl = document.querySelector("#select-state");

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputSearchValue = formInputEl.value;
  console.log(inputSearchValue);
  fetch(url + inputSearchValue)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (breweries) {
      state.breweries = breweries;
      console.log(state.breweries);
      render();
    });
});

function render() {
  clear();
  renderBreweries();
}

function clear() {
  breweriesList.innerHTML = "";
  formInputEl.value = "";
}

function renderBreweries() {
  for (const brewery of state.breweries) {
    console.log(brewery);
    const breweryListEl = document.createElement("li");
    console.log(breweriesList);
    breweryListEl.innerHTML = `<h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
            <h3>Address:</h3>
            <p>${brewery.street}</p>
            <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
        </section>
        <section class="phone">
            <h3>Phone:</h3>
            <p>${brewery.phone}</p>
        </section>
        <section class="link">
            <a href=${brewery.website_url} target="_blank">Visit Website</a>
        </section>`;
    breweriesList.append(breweryListEl);
  }
}

function renderBreweries2() {
  for (const breweryTwo of state.breweries) {
    const breweryListEl2 = document.createElement("li");

    const h2El = document.createElement("h2");
    h2El.innerText = `${breweryTwo.name}`;
    breweriesList.append(breweryListEl2);

    const divEl = document.createElement("div");
    divEl.setAttribute("class", "type");
    divEl.innerText = `${breweryTwo.brewery_type}`;

    const sectionAddress = document.createElement("section");
    sectionAddress.setAttribute("class", "address");

    const h3ElAddress = document.createElement("h3");
    h3ElAddress.innerText = "Address:";

    const pElStreet = document.createElement("p");
    pElStreet.innerText = `${breweryTwo.street}`;

    const pElCityPostal = document.createElement("p");
    const strongEl = document.createElement("strong");
    strongEl.innerText = `${breweryTwo.city}, ${breweryTwo.postal_code}`;
    pElCityPostal.appendChild(strongEl);

    const sectionPhone = document.createElement("section");
    sectionPhone.setAttribute("class", "phone");

    const h3ElPhone = document.createElement("h3");
    h3ElPhone.innerText = "Phone:";

    const pElPhone = document.createElement("p");
    pElPhone.innerText = `${breweryTwo.phone}`;

    const sectionLink = document.createElement("section");
    sectionLink.setAttribute("class", "link");

    const anchorLink = document.createElement("a");
    Object.assign(anchorLink, {
      href: `${breweryTwo.website_url}`,
      target: "_blank",
    });
    anchorLink.innerText = "Visit Website";
    breweryListEl2.append(
      h2El,
      divEl,
      sectionAddress,
      sectionPhone,
      sectionLink
    );
    sectionAddress.append(h3ElAddress, pElStreet, pElCityPostal);
    sectionPhone.append(h3ElPhone, pElPhone);
    sectionLink.append(anchorLink);
  }
}

const breweriesTypeFilter = document.querySelector("#filter-by-type");
let urlType = `${formInputEl.value}&by_type=`;

breweriesTypeFilter.addEventListener("change", function () {
  console.log("You selected this: ", this.value);
  const selectedValue = this.value;
  fetch(url + urlType + selectedValue)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (breweries) {
      state.breweries = breweries;
      console.log(state.breweries);
      render();
    });
});
