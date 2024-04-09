const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

async function baseFetch(endpoint = "/", method = "GET", body) {
	return await (await fetch(BASE_URL + endpoint, { method, body })).json();
}

//endpoints
async function listBreweries(query) {
	return baseFetch(query ? `?${query}` : "");
}
async function getBrewery(id) {
	return baseFetch(`/${id}`);
}
