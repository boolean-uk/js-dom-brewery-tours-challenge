const brewList = document.getElementById("breweries-list");
const searchForm = document.getElementById("select-state-form");
const breweryTypes = ["micro", "regional", "brewpub"];

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = event.target.querySelector("#select-state").value;
  formattedInput = searchInput.toLowerCase().replace(" ", "_");
  searchForm.reset();

  renderList(formattedInput);
});

const selectForm = document.querySelector("#filter-by-type-form");
selectForm.addEventListener("click", (event) => {
  if (event.target.value) {
    console.log(event.target.value);
  }
  selectForm.reset();
});

function renderList(input) {
  // get url generate url based on current application state

  fetch(`https://api.openbrewerydb.org/breweries?by_state=${input}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        if (breweryTypes.includes(el.brewery_type)) {
          const html = `<li>
            <h2>${el.name}</h2>
            <div class="type">${el.brewery_type}</div>
            <section class="address">
              <h3>Address:</h3>
              <p>${el.street}</p>
              <p><strong>${el.city}, ${el.postal_code}</strong></p>
            </section>
            <section class="phone">
              <h3>Phone:</h3>
              <p>N/A</p>
            </section>
            <section class="link">
              <a href="${el.website_url}" target="_blank">Visit Website</a>
            </section>
            </li>`;

          brewList.insertAdjacentHTML("afterbegin", html);
        }
      });
    });
}
