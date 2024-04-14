const state = {
    breweries: [],
    type: [],
  };
  
  const container = document.querySelector("#breweries-list");
  const ulEl = document.querySelector("#breweries-list");
  const formEl = document.querySelector("#select-state-form");
  const inputEl = document.querySelector("#select-state");
  const filterEl = document.querySelector("#filter-by-type");
  const stateEl = document.querySelector("#select-state");
  
  function renderBrewList(breweries) {
    ulEl.innerHTML = "";
    breweries.forEach((choice) => {
      const xBrewery = document.createElement("li");
      xBrewery.innerHTML = `
        <h2>${choice.name}</h2>
        <div class="type">${choice.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${choice.street}</p>
          <p><strong>${choice.city}, ${choice.postal_code}</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${choice.phone}</p>
        </section>
        <section class="link">
          <a href="${choice.website_url}">Visit Website</a>
        </section>
      `;
      ulEl.appendChild(xBrewery);
    });
  }
  
  function fetchData(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        state.breweries = data;
        renderBrewList(state.breweries);
      })
      .catch((error) => console.error("Error: ", error));
  }
  
  function formList() {
    formEl.addEventListener("submit", function (event) {
      event.preventDefault();
      const url = `https://api.openbrewerydb.org/breweries?by_state=${inputEl.value}`;
      fetchData(url);
    });
  }
  
  function filter() {
    formEl.addEventListener("change", function () {
      const typeFilter = filterEl.value;
      let url = `https://api.openbrewerydb.org/breweries?by_state=${stateEl.value}`;
      if (typeFilter) {
        url += `&by_type=${typeFilter}`;
      }
      fetchData(url);
    });
  }
  
  function searchBrew() {
    const searchEl = document.querySelector("#search-breweries");
    searchEl.addEventListener("input", function () {
      const searchTerm = searchEl.value.toLowerCase();
      const filteredBreweries = state.breweries.filter((brewery) =>
        brewery.name.toLowerCase().includes(searchTerm)
      );
      renderBrewList(filteredBreweries);
    });
  }
  
  formList();
  filter();
  searchBrew();
  