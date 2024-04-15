const selectStateForm = document.getElementById('select-state-form');
const selectStateInput = document.getElementById('select-state');
const filterByTypeForm = document.getElementById('filter-by-type-form');
const filterByTypeSelect = document.getElementById('filter-by-type');
const breweriesList = document.getElementById('breweries-list');

// Function to render brewery details
function renderBreweryDetails(brewery) {
  return `
    <li class="brewery-item">
      <h2>${brewery.name}</h2>
      <div class="brewery-type">${brewery.brewery_type}</div>
      <section class="address">
        <h3>Address:</h3>
        <p>${brewery.street}</p>
        <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>${brewery.phone || 'N/A'}</p>
      </section>
      <section class="link">
        <a href="${brewery.website_url}" target="_blank">Visit Website</a>
      </section>
    </li>
  `;
}

// Function to display breweries
function displayBreweries(breweries) {
  const filteredBreweries = breweries.filter(brewery =>
    ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
  );

  breweriesList.innerHTML = filteredBreweries
    .map(brewery => renderBreweryDetails(brewery))
    .join('');
}

// Function to fetch breweries by state
async function fetchBreweriesByState(state) {
  try {
    const response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=50`);
    const breweries = await response.json();
    displayBreweries(breweries);
  } catch (error) {
    console.log('Error fetching breweries:', error);
  }
}

// Function to handle search form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  const state = selectStateInput.value.trim();
  if (state !== '') {
    fetchBreweriesByState(state);
  }
}

// Function to handle filter by type
function handleFilterByType() {
  const selectedType = filterByTypeSelect.value;
  const breweryItems = document.querySelectorAll('.brewery-item');

  breweryItems.forEach(item => {
    if (selectedType === '' || item.querySelector('.brewery-type').textContent === selectedType) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Event listeners
selectStateForm.addEventListener('submit', handleSearchSubmit);
filterByTypeSelect.addEventListener('change', handleFilterByType);