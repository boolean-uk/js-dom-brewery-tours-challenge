import { modelBreweryByState, modelBreweryByStateAndFilter } from "./model.js";

export async function breweryByStateAndFilter(state, type)
{
    if (state === "" || state === null || type === "" || type === null) {
        return null
    }
    try {
        const data = await modelBreweryByStateAndFilter(state, type);
        let returnArr = []
        for (let i = 0; i < data.length; i++) {
            let returnObject = {
                name: data[i].name,
                brewery_type: data[i].brewery_type,
                address: data[i].street,
                city: data[i].city,
                state: data[i].state,
                postal_code: data[i].postal_code,
                phone: data[i].phone || "N/A",
                website_url: data[i].website_url || "#"
            };
            returnArr.push(returnObject);
        }
        
        return returnArr;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function breweryByState(state) {
    if (state === "") {
        return null
    }
    try {
        const data = await modelBreweryByState(state);
        let returnArr = []
        for (let i = 0; i < data.length; i++) {
            let returnObject = {
                name: data[i].name,
                brewery_type: data[i].brewery_type,
                address: data[i].street,
                city: data[i].city,
                state: data[i].state,
                postal_code: data[i].postal_code,
                phone: data[i].phone || "N/A",
                website_url: data[i].website_url || "#"
            };
            returnArr.push(returnObject);
        }
        
        return returnArr;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
