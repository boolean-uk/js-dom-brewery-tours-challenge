const apiUrl = "https://api.openbrewerydb.org/v1/breweries?"

export async function modelGetBreweries(state, type, city) {
    let stateParam = `by_state=${state}`
    let typeParam = ""
    if (type !== "") {
        typeParam = `&by_type=${type}`;
    }else{
        typeParam="&by_type=brewpub&by_type=regional&by_type=micro"
    }
    let citiesParam = ""
    if(city !== ""){
        citiesParam += `&by_city=${city}`
    }
    
    try {
        const response = await fetch(apiUrl + stateParam + typeParam + citiesParam);
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