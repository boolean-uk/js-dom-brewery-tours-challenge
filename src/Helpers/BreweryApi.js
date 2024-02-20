import state from '../index.js';

export async function getBreweries() {
  return await fetch(`https://api.openbrewerydb.org/v1/breweries?page=${state.page}&per_page=${state.perPage}`, {
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
  state.page = 1;
  return await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${state}&page=${page}&per_page=${perPage}`, {
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
  state.page = 1;
  return await fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${name}&page=${state.page}&per_page=${state.perPage}`, {
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

export async function getBreweriesByCity() {
  state.page = 1;
  let cities = state.filterByCity.join(',')
  console.log(cities);
  return await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${cities}&page=${state.page}&per_page=${state.perPage}`, {
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