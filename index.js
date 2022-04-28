const breweriesList = document.querySelector(".breweries-list");
const selectStateForm = document.getElementById("select-state-form");
const filterByTypeForm = document.getElementById("filter-by-type-form");

const state = {
  state: "",
  breweryType: "",
};

const validBreweryTypes = ["micro", "regional", "brewpub"];

selectStateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.state = e.target[0].value;
  getAndRenderBreweries();
});

filterByTypeForm.addEventListener("change", (e) => {
  e.preventDefault();
  state.breweryType = e.target.value;
  getAndRenderBreweries();
});

function getAndRenderBreweries() {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.state}${
      state.breweryType ? "&by_type=" + state.breweryType : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter((brewery) => {
        if (validBreweryTypes.includes(brewery.brewery_type)) return true;
      });
      renderBreweries(filtered);
    });
}

function renderBreweries(breweries) {
  breweriesList.innerHTML = "";

  breweries.forEach((brewery) => {
    const li = createTodoListItem(brewery);

    breweriesList.append(li);
  });
}

function createTodoListItem(brewery) {
  const li = document.createElement("li");

  li.innerHTML = `
    <h2>${brewery.name}</h2>
    <div class="type">${brewery.brewery_type}</div>
    <section class="address">
        <h3>Address:</h3>
        <p>${brewery.street}</p>
        <p><strong>${brewery.state}, ${brewery.postal_code}</strong></p>
    </section>
    <section class="phone">
        <h3>Phone:</h3>
        <p>${brewery.phone ? brewery.phone : "N/A"}</p>
    </section>
    <section class="link">
        <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    </section>`;

  return li;
}
