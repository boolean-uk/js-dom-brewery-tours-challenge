// STATE
const state = {
  breweryList: [],
  breweryTypeFilter: '',
  brewerySearchFilter: '',
  breweryCityFilter: [],
};

// EVENT HANDLERS
function handleStateFormSubmit(event) {
  event.preventDefault();
  const searchedForState = whichStateInput.value;
  getData(searchedForState);
  whichStateForm.reset();
}

function handleClearFilters(event) {
  event.preventDefault();
  state.breweryTypeFilter = '';
  state.brewerySearchFilter = '';
  state.breweryCityFilter = [];
  checkRenderConditions();
}

// SERVER LOGIC
const homeURL = 'https://api.openbrewerydb.org/v1/breweries?by_state=';

async function getData(searchedForState) {
  try {
    const link = `${homeURL}${searchedForState}`;
    const response = await fetch(link);
    const data = await response.json();
    state.breweryList = data;
    filterBreweryList();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// FILTERING LOGIC
function filterBreweryList() {
  let filtered = state.breweryList;
  if (state.breweryTypeFilter) {
    filtered = filtered.filter(brewery => brewery.brewery_type === state.breweryTypeFilter);
  }
  if (state.brewerySearchFilter) {
    const searchTerm = state.brewerySearchFilter.toLowerCase();
    filtered = filtered.filter(brewery => brewery.name.toLowerCase().includes(searchTerm));
  }
  renderBreweryList(filtered);
}

function updateCityFilter(event) {
  // Implement code to update state.breweryCityFilter based on checkbox changes
  // Then call checkRenderConditions()
}

// RENDERING
function renderBreweryList(breweries) {
  breweriesUL.innerHTML = '';
  breweries.forEach(brewery => {
    // Create and append elements to render each brewery
  });
}

function renderCityCheckboxes(cities) {
  filterByCityForm.innerHTML = '';
  cities.forEach(city => {
    // Create and append checkboxes for each city
  });
}

// INIT
function init() {
  whichStateForm.addEventListener('submit', handleStateFormSubmit);
  clearAllFiltersButton.addEventListener('click', handleClearFilters);
  // Add event listeners for typeOfBrewerySelect, searchBreweriesForm, and city checkboxes
}

init();
