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
