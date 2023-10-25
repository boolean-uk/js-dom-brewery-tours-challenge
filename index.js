const searchForm = document.querySelector('#select-state-form');
const stateInput = document.querySelector('#select-state');
const filterForm = document.querySelector('#filter-by-type-form');
const filterSelect = document.querySelector('#filter-by-type');
const breweriesList = document.querySelector('#breweries-list');
const root = 'https://api.openbrewerydb.org/breweries?by_state=';

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const state = stateInput.value;
  fetchBreweriesByState(state);
});

function fetchBreweriesByState(state) {
  fetch(`${root}${state}`)
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter((brewery) =>
        ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
      );
      renderBreweries(filteredData);
    });
}

function filterBreweriesByType(type) {
  const breweries = Array.from(breweriesList.children);
  breweries.forEach((brewery) => {
    if (type === 'all' || brewery.querySelector('.type').textContent === type) {
      brewery.style.display = 'block';
    } else {
      brewery.style.display = 'none';
    }
  });
}

filterForm.addEventListener('change', () => {
  const selectedType = filterSelect.value;
  filterBreweriesByType(selectedType);
});

function renderBreweries(breweries) {
  breweriesList.innerHTML = '';

  breweries.forEach((brewery) => {
    const li = document.createElement('li');

    const name = document.createElement('h2');
    name.textContent = brewery.name;

    const type = document.createElement('div');
    type.className = 'type';
    type.textContent = brewery.brewery_type;

    const addressSection = document.createElement('section');
    addressSection.className = 'address';

    const addressHeading = document.createElement('h3');
    addressHeading.textContent = 'Address:';

    const address1 = document.createElement('p');
    address1.textContent = brewery.street;

    const address2 = document.createElement('p');
    address2.innerHTML = `<strong>${brewery.city}, ${brewery.postal_code}</strong>`;

    const phoneSection = document.createElement('section');
    phoneSection.className = 'phone';

    const phoneHeading = document.createElement('h3');
    phoneHeading.textContent = 'Phone:';

    const phone = document.createElement('p');
    phone.textContent = brewery.phone;

    const websiteSection = document.createElement('section');
    websiteSection.className = 'link';

    const websiteLink = document.createElement('a');
    websiteLink.href = brewery.website_url;
    websiteLink.target = '_blank';
    websiteLink.textContent = 'Visit Website';

    addressSection.appendChild(addressHeading);
    addressSection.appendChild(address1);
    addressSection.appendChild(address2);

    phoneSection.appendChild(phoneHeading);
    phoneSection.appendChild(phone);

    websiteSection.appendChild(websiteLink);

    li.appendChild(name);
    li.appendChild(type);
    li.appendChild(addressSection);
    li.appendChild(phoneSection);
    li.appendChild(websiteSection);

    breweriesList.appendChild(li);
  });
}
