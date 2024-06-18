document.addEventListener('DOMContentLoaded', () => {
  const stateForm = document.getElementById('select-state-form');
  const breweryList = document.getElementById('breweries-list');
  const filterByType = document.getElementById('filter-by-type');
  const filterByCity = document.getElementById('filter-by-city');
  const clearAllCitiesBtn = document.getElementById('clear-all-cities');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  let breweries = [];
  let filteredBreweries = [];
  let selectedState = '';
  let selectedType = '';
  let selectedCities = new Set();
  let currentPage = 1;
  const itemsPerPage = 10;

  stateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    selectedState = e.target['select-state'].value;
    if (selectedState) {
      await fetchBreweries(selectedState);
      populateCityFilter();
      filterAndRenderBreweries();
    }
  });

  filterByType.addEventListener('change', (e) => {
    selectedType = e.target.value;
    filterAndRenderBreweries();
  });

  filterByCity.addEventListener('change', (e) => {
    if (e.target.checked) {
      selectedCities.add(e.target.value);
    } else {
      selectedCities.delete(e.target.value);
    }
    filterAndRenderBreweries();
  });

  clearAllCitiesBtn.addEventListener('click', () => {
    selectedCities.clear();
    document.querySelectorAll('#filter-by-city input').forEach(input => input.checked = false);
    filterAndRenderBreweries();
  });

  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderBreweries();
    }
  });

  nextPageBtn.addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredBreweries.length) {
      currentPage++;
      renderBreweries();
    }
  });

  async function fetchBreweries(state) {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      breweries = await response.json();
      breweries = breweries.filter(brewery => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type));
    } catch (error) {
      console.error('Error fetching breweries:', error);
    }
  }

  function populateCityFilter() {
    const cities = new Set(breweries.map(brewery => brewery.city));
    filterByCity.innerHTML = '';
    cities.forEach(city => {
      const cityElement = document.createElement('div');
      cityElement.innerHTML = `
        <input type="checkbox" id="${city}" name="city" value="${city}">
        <label for="${city}">${city}</label>
      `;
      filterByCity.appendChild(cityElement);
    });
  }

  function filterAndRenderBreweries() {
    filteredBreweries = breweries.filter(brewery => {
      const matchesType = selectedType ? brewery.brewery_type === selectedType : true;
      const matchesCity = selectedCities.size ? selectedCities.has(brewery.city) : true;
      return matchesType && matchesCity;
    });
    currentPage = 1;
    renderBreweries();
  }

  function renderBreweries() {
    breweryList.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const breweriesToShow = filteredBreweries.slice(startIndex, endIndex);

    breweriesToShow.forEach(brewery => {
      const breweryItem = document.createElement('li');
      breweryItem.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <div class="address">
          <p>${brewery.street}</p>
          <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
        </div>
        <div class="phone">${brewery.phone}</div>
        <div class="link"><a href="${brewery.website_url}" target="_blank">Visit Website</a></div>
      `;
      breweryList.appendChild(breweryItem);
    });

    pageInfo.textContent = `Page ${currentPage}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage * itemsPerPage >= filteredBreweries.length;
  }
});
