/**
 *
 * @param {Array} breweries
 */
export default function renderBreweries(breweries, rerender = true) {
  const breweriesListElement = document.getElementById("breweries-list");
  breweriesListElement.innerHTML = "";
  breweries.forEach((brewery) => {
    const container = document.createElement("li");
    container.innerHTML = `
    <h2>${brewery.name}</h2>
    <div class="type">${brewery.brewery_type}</div>
    <section class="address">
      <h3>Address:</h3>
      <p>${brewery.street || "N/A"}</p>
      <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
    </section>
    <section class="phone">
      <h3>Phone:</h3>
      <p>${brewery.phone}</p>
    </section>
    <section class="link">
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    </section>
  `;
    breweriesListElement.appendChild(container);
  });
  if (rerender === true) {
    renderFilterCitiesForm(breweries);
  }
}

/**
 *
 * @param {Array} breweries
 */
function renderFilterCitiesForm(breweries) {
  const filterCitiesForm = document.getElementById("filter-by-city-form");
  filterCitiesForm.innerHTML = "";
  const filterSections = [];
  breweries.forEach((brewery) => {
    if (!filterSections.includes(brewery.city)) {
      filterSections.push(brewery.city);
    }
  });
  filterSections.forEach((city) => {
    const cityInput = document.createElement("input");
    cityInput.type = "checkbox";
    cityInput.name = city;
    cityInput.value = city;

    const cityLabel = document.createElement("label");
    cityLabel.htmlFor = city;
    cityLabel.innerText = city;

    filterCitiesForm.appendChild(cityInput);
    filterCitiesForm.appendChild(cityLabel);
  });
}
