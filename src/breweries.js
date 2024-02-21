/**
 *
 * @param {Array} breweries
 */
export default function renderBreweries(breweries) {
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
}
