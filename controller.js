import { modelGetBreweries, getSavedBreweries, PostSavedBreweries, DeleteSavedBrewery, getSavedBreweryById } from "./model.js";

export async function getBreweries(state, filter, cities, search) {
    if (state === "") {
        return null
    }
    try {
        let data = []
        if (cities.length !== 0) {
            for (let i = 0; i < cities.length; i++) {
                let fetchdata = await modelGetBreweries(state, filter, cities[i], search);
                let currentdata = data
                data = currentdata.concat(fetchdata)
            }
        }else{
            let fetchdata = await modelGetBreweries(state, filter, cities, search);
            data = fetchdata;
        }

        let returnArr = []
        let cityarr = []
        for (let i = 0; i < data.length; i++) {
            let returnObject = {
                id: data[i].id,
                name: data[i].name,
                brewery_type: data[i].brewery_type,
                address: data[i].street,
                city: data[i].city,
                state: data[i].state,
                postal_code: data[i].postal_code,
                phone: data[i].phone || "N/A",
                website_url: data[i].website_url || "#"
            };
            if (!cityarr.includes(data[i].city)) {
                cityarr.push(data[i].city)
            }
            returnArr.push(returnObject);
        }

        return {
            breweries: returnArr,
            cities: cityarr
        }
    } catch (error) {
        throw error;
    }
}

export async function saveBrewery(brewery) {
    try {
        const response = await PostSavedBreweries(brewery);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function removeSavedBreweries(id) {
    try {
        const response = await DeleteSavedBrewery(id);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function retrieveSavedBreweries() {
    try {
        const savedBreweries = await getSavedBreweries();
        return savedBreweries;
    } catch (error) {
        throw error;
    }
}

export async function retrieveSavedBreweryById(id) {
    try {
        const savedBreweries = await getSavedBreweryById(id);
        return savedBreweries;
    } catch (error) {
        throw error;
    }
}