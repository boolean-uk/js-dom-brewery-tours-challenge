const state = {
  breweries: [],
};

const root = "https://api.openbrewerydb.org/v1/breweries";
const breweryList = document.querySelector('.breweries-list');
const selectStateForm = document.querySelector('#select-state-form');
const filterByType = document.querySelector('#filter-by-type');
const selectState = document.querySelector('#select-state');

function renderBreweryList() {
  state.breweries.forEach((brewery) => {
    if (brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub') {
      const li = document.createElement('li');
      const breweryName = document.createElement('h2');
      breweryName.innerText = brewery.name;
      const breweryType = document.createElement('div');
      breweryType.setAttribute('class', 'type');
      breweryType.innerText = brewery.brewery_type;
      const sectionAddress = document.createElement('section');
      sectionAddress.setAttribute('class', 'address');
      const addressH3 = document.createElement('h3');
      addressH3.innerText = 'Address :';
      const addressStreet = document.createElement('p');
      addressStreet.innerText = brewery.street;
      const addressCity = document.createElement('p');
      const addressStrong = document.createElement('strong');
      addressStrong.innerText = `${brewery.city},${brewery.postal_code}`;
      addressCity.append(addressStrong);
      sectionAddress.append(addressH3, addressStreet, addressCity);
      const sectionPhone = document.createElement('section');
      sectionPhone.setAttribute('class', 'phone');
      const phoneH3 = document.createElement('h3');
      phoneH3.innerText = 'Phone :';
      const phoneNumber = document.createElement('p');
      phoneNumber.innerText = brewery.phone === null ? 'N/A' : `${brewery.phone}`;
      sectionPhone.append(phoneH3, phoneNumber);
      const sectionLink = document.createElement('section');
      sectionLink.classList.add('link');
      const link = document.createElement('a');
      link.setAttribute('href', `${brewery.website_url}`);
      link.setAttribute('target', '_blank');
      link.innerText = 'Visit Website';
      sectionLink.append(link);
      li.append(breweryName, breweryType, sectionAddress, sectionPhone, sectionLink);
      breweryList.append(li);
    }
  });
}

function main() {
  fetch(`${root}`)
    .then((response) => response.json())
    .then((data) => {
      state.breweries = data;
      renderBreweryList();
    });
}

function remove() {
  breweryList.innerHTML = '';
}

function filter() {
  fetch(`${root}?by_state=${selectState.value}&by_type=${filterByType.value}`)
    .then((res) => res.json())
    .then((data) => {
      state.breweries = data;
      renderBreweryList();
    });
}

selectStateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  remove();
  if (filterByType.value === '') {
    fetch(`${root}?by_state=${selectState.value}`)
      .then((response) => response.json())
      .then((data) => {
        state.breweries = data;
        renderBreweryList();
      });
  } else {
    filter();
  }
});

filterByType.addEventListener('click', (event) => {
  event.preventDefault();
  remove();
  if (filterByType.value === '') {
    renderBreweryList();
  } else {
    filter();
  }
});

main();
