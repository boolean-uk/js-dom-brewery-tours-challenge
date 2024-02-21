const apiUrl = "https://api.openbrewerydb.org/v1/breweries?";

export async function modelGetBreweries(state, type, city, search) {
  let stateParam = `&by_state=${state}`;
  let typeParam = "";
  if (type !== "") {
    typeParam = `&by_type=${type}`;
  } else {
    typeParam = "&by_type=brewpub&by_type=regional&by_type=micro";
  }
  let citiesParam = "";
  if (city !== "") {
    citiesParam += `&by_city=${city}`;
  }
  let searchParam = "";
  if (search !== "") {
    searchParam = "by_name=" + search;
  }
  try {
    const response = await fetch(
      apiUrl + searchParam + stateParam + typeParam + citiesParam
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSavedBreweries() {
  try {
    const response = await fetch("http://localhost:3000/breweries");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function PostSavedBreweries(brewery) {
  try {
    const response = await fetch("http://localhost:3000/breweries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brewery),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function DeleteSavedBrewery(id) {
  try {
    const response = await fetch(`http://localhost:3000/breweries/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSavedBreweryById(id) {
  try {
    const response = await fetch(`http://localhost:3000/breweries/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
