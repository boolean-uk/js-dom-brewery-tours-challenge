

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

export default getBreweries;