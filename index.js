document.addEventListener("DOMContentLoaded", () => {
  const stateForm = document.getElementById("select-state-form");
  const filterForm = document.getElementById("filter-by-type-form");
  const searchForm = document.getElementById("search-breweries-form");
  const breweriesList = document.getElementById("breweries-list");

  let state = "";
  let breweries = [];
  let filteredBreweries = [];

  stateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    state = event.target["select-state"].value;
    await fetchBreweriesByState(state);
    renderBreweries();
  });

  searchForm.addEventListener("input", () => {
    filterBreweries();
    renderBreweries();
  });

  filterForm.addEventListener("change", () => {
    filterBreweries();
    renderBreweries();
  });

  async function fetchBreweriesByState(state) {
    const response = await fetch(
      `https://api.openbrewerydb.org/breweries?by_state=${state}`
    );
    const data = await response.json();
    breweries = data.filter((brewery) =>
      ["micro", "regional", "brewpub"].includes(brewery.brewery_type)
    );
    filterBreweries();
  }

  function renderBreweries() {
    breweriesList.innerHTML = "";
    filteredBreweries.forEach((brewery) => {
      const breweryItem = createBreweryItem(brewery);
      breweriesList.appendChild(breweryItem);
    });
  }

  function filterBreweries() {
    const type = filterForm["filter-by-type"].value;
    const searchQuery = searchForm["search-breweries"].value.toLowerCase();
    filteredBreweries = breweries
      .filter((brewery) => !type || brewery.brewery_type === type)
      .filter((brewery) => brewery.name.toLowerCase().includes(searchQuery));
  }

  function createBreweryItem(brewery) {
    const li = document.createElement("li");

    const type = document.createElement("div");
    type.classList.add("type");
    type.textContent = brewery.brewery_type;
    li.appendChild(type);

    const name = document.createElement("h2");
    name.textContent = brewery.name;
    li.appendChild(name);

    const phoneSection = document.createElement("section");
    phoneSection.classList.add("phone");
    const phoneHeading = document.createElement("h3");
    phoneHeading.textContent = "Phone:";
    phoneSection.appendChild(phoneHeading);
    const phone = document.createElement("p");
    phone.textContent = brewery.phone || "N/A";
    phoneSection.appendChild(phone);
    li.appendChild(phoneSection);

    const addressSection = document.createElement("section");
    addressSection.classList.add("address");
    const addressHeading = document.createElement("h3");
    addressHeading.textContent = "Address:";
    addressSection.appendChild(addressHeading);
    const street = document.createElement("p");
    street.textContent = brewery.street;
    addressSection.appendChild(street);
    const cityState = document.createElement("p");
    cityState.innerHTML = `<strong>${brewery.city}, ${brewery.state}, ${brewery.postal_code}</strong>`;
    addressSection.appendChild(cityState);
    li.appendChild(addressSection);

    const linkSection = document.createElement("section");
    linkSection.classList.add("link");
    const link = document.createElement("a");
    link.href = brewery.website_url || "#";
    link.target = "_blank";
    link.textContent = "Visit Website";
    linkSection.appendChild(link);
    li.appendChild(linkSection);

    return li;
  }
});
