export async function modelBreweryByState(state) {
    const apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&by_type=micro&by_type=regional&by_type=brewpub`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function modelBreweryByStateAndFilter(state, type) {
    const apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&by_type=${type}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}