
import { getBreweries, getBreweriesByName, getBreweriesByCity } from './Helpers/BreweryApi.js';
import { getBreweriesToVisit } from './Helpers/VisitApi.js';
import { createItem } from './View/Brewery.js';
import { renderVisit } from './View/VisitListBrewery.js';

const state = {
  breweries: [],
  filterByName: "",
  filterByType: "",
  filterByCity: [],
  page: 1,
  perPage: 10,
  visitButtonColor: "red",
}
export default state;

document.getElementById('filter-by-type').addEventListener('change', async (event) => {
  const filterByType = event.target.value;
  if (filterByType === "") {
    state.filterByType = "";
  } else {
    state.filterByType = filterByType;
  }
  await render();
});

document.getElementById('visit').addEventListener('click', async () => {
  if (state.visitButtonColor === 'red') {
    console.log("Set to green");
    state.visitButtonColor = 'green';
    document.getElementById('visit').style.backgroundColor = 'green';
    state.breweries = await getBreweriesToVisit();
  } else {
    console.log("Set to red");
    state.visitButtonColor = 'red';
    document.getElementById('visit').style.backgroundColor = 'red';
    state.breweries = await getBreweries();
  }
  renderVisit();
});


let timeoutId;

//Added a timer to put less strain on API.
document.getElementById('select-state').addEventListener('keyup', async (event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(async () => {
      const filterByName = event.target.value;
      if (filterByName.length < 3) {
        state.breweries = await getBreweries();
        console.log(state.breweries);
        state.filterByName = filterByName;
        await render();
      } else {
      state.breweries = await getBreweriesByName(filterByName);
      console.log(state.breweries);
      state.filterByName = filterByName;
      await render();
      }
    }, 300);
  });
  
  
  document.querySelectorAll('#filter-by-city-form input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', async (event) => {
      const cityName = event.target.value;
      if (event.target.checked) {
        state.filterByCity.push(cityName);
      } else {
        const index = state.filterByCity.indexOf(cityName);
        if (index !== -1) {
          state.filterByCity.splice(index, 1);
        }
      }
      state.breweries = await getBreweriesByCity();
      console.log(state.breweries)
      await render();
    });
  });
  
  document.getElementById('next-page').addEventListener('click', async () => {
    state.page++;
    state.breweries = await getBreweries(state.page, state.perPage);
    await render();
  });
  
  document.getElementById('prev-page').addEventListener('click', async () => {
    if (state.page > 1) {
      state.page--;
      state.breweries = await getBreweries(state.page, state.perPage);
      await render();
    }
  });

async function render() {
  const ul = document.getElementById('breweries-list');
  ul.innerHTML = '';

  const filteredBreweries = state.breweries.filter(brewery => {
    const nameFilter = state.filterByName.toLowerCase();
    const typeFilter = state.filterByType.toLowerCase();
    const cityFilters = state.filterByCity.map(city => city.toLowerCase());

    return (
      (nameFilter === "" || brewery.name.toLowerCase().includes(nameFilter)) &&
      (typeFilter === "" || brewery.brewery_type.toLowerCase().includes(typeFilter)) &&
      (cityFilters.length === 0 || cityFilters.includes(brewery.city.toLowerCase()))
    );
  });

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
