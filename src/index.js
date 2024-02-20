
//import { getBreweries, getBreweriesByState } from './Helpers.api.js';

const state = {
  breweries: [],
  filter: "",
  
}

const filteredBreweries = state.breweries.filter(brewery => {
  return brewery.state.toLowerCase().includes(state.filter.toLowerCase()) && 
    ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type);
});

const filteredBreweriesByType = state.breweries.filter(brewery => brewery.brewery_type === state.filter);


export async function getBreweries() {
  return await fetch("https://api.openbrewerydb.org/v1/breweries", {
    headers: {
      "Content-Type": "text/html",
      "X-Content-Type-Options": "nosniff"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function getBreweriesByState(state) {
  return await fetch("https://api.openbrewerydb.org/v1/breweries?by_state=" + state, {
    headers: {
      "Content-Type": "text/html",
      "X-Content-Type-Options": "nosniff"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function getBreweriesByName(name) {
  return await fetch("https://api.openbrewerydb.org/v1/breweries?by_name=" + state, {
    headers: {
      "Content-Type": "text/html",
      "X-Content-Type-Options": "nosniff"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


document.getElementById('select-state-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const stateInput = document.getElementById('select-state').value;
  if (stateInput.trim() === '') {
    const breweries = await getBreweriesByState(stateInput);
    state.breweries = breweries;
  } else {
  const breweries = await getBreweriesByState(stateInput);
  state.breweries = breweries;
  state.breweries = state.breweries.filter(brewery => {
    return brewery.state.toLowerCase().includes(state.filter.toLowerCase()) && 
      ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type);
  });
  console.log(breweries);
  }
  
  render();
});

function createItem(brewery) {
  const li = document.createElement('li');

  const h2 = document.createElement('h2');
  h2.textContent = brewery.name;
  li.appendChild(h2);

  const div = document.createElement('div');
  div.classList.add('type');
  div.textContent = brewery.brewery_type;
  li.appendChild(div);

  const addressSection = document.createElement('section');
  addressSection.classList.add('address');

  const addressHeading = document.createElement('h3');
  addressHeading.textContent = 'Address:';
  addressSection.appendChild(addressHeading);

  const addressP1 = document.createElement('p');
  addressP1.textContent = brewery.postal_code + " " + brewery.street;
  addressSection.appendChild(addressP1);

  const addressP2 = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = brewery.city + ", " + brewery.state;
  addressP2.appendChild(strong);
  addressSection.appendChild(addressP2);

  li.appendChild(addressSection);

  const phoneSection = document.createElement('section');
  phoneSection.classList.add('phone');

  const phoneHeading = document.createElement('h3');
  phoneHeading.textContent = 'Phone:';
  phoneSection.appendChild(phoneHeading);

  const phoneP = document.createElement('p');
  phoneP.textContent = brewery.phone;
  phoneSection.appendChild(phoneP);

  li.appendChild(phoneSection);

  const linkSection = document.createElement('section');
  linkSection.classList.add('link');

  const link = document.createElement('a');
  link.href = brewery.website_url;
  link.target = '_blank';
  link.textContent = 'Visit Website';
  linkSection.appendChild(link);

  li.appendChild(linkSection);

  return li;
}

document.getElementById('filter-by-type').addEventListener('change', async (event) => {
  const filterByType = event.target.value;
  state.filter = filterByType;
  await render();
});



async function render() {
  const ul = document.getElementById('breweries-list');
  ul.innerHTML = '';
  
  const filteredBreweries = state.filter ? state.breweries.filter(brewery => brewery.brewery_type === state.filter) : state.breweries;
  
  filteredBreweries.forEach(brewery => {
    ul.appendChild(createItem(brewery));
  });
}

async function initialize() {
  state.breweries = await getBreweries();
}

async function main() {
  await initialize();
  await render();
}

main();