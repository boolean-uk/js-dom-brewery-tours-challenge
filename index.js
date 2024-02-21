
const validBreweryTypes = ['micro', 'regional', 'brewpub'];
let breweryData;
let stateSearch;
let filterByType;
let search;
let displayCities = [];
let filterByCities = [];

async function getData(){
    let requestURL = 'https://api.openbrewerydb.org/v1/breweries';
    if (stateSearch){
        requestURL += `?by_state=${stateSearch}`;
    }
    await fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            breweryData = data.filter(brewery => validBreweryTypes.includes(brewery.brewery_type));
            displayCities = breweryData.map(brewery => brewery.city).filter((value, index, self) => self.indexOf(value) === index);
            displayFilterByCities();
        })
        .catch(error => console.error(error));
}

async function displayBreweries(){
    const breweryList = document.querySelector('#breweries-list');
    breweryList.innerHTML = '';
    if(!breweryData) await getData();
    breweryData.forEach(brewery => {
        if (filterByType && brewery.brewery_type !== filterByType) return;
        if (search && !brewery.name.toLowerCase().includes(search.toLowerCase())) return;
        console.log(filterByCities)
        console.log(brewery.city)
        if (filterByCities.length > 0 && !filterByCities.includes(brewery.city)) return;
        const breweryLi = document.createElement('li');
        breweryLi.innerHTML = `
            <h2>${brewery.name}</h2>
            <div class="type">${brewery.brewery_type}</div>
            <section class="address">
                <h3>Address:</h3>
                <p>${brewery.street}</p>
                <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
            </section>
            <section class="phone">
                <h3>Phone:</h3>
                <p>${brewery.phone || 'N/A'}</p>
            </section>
            <section class="link">
                <a href="${brewery.website_url || 'null'}" target="_blank">Visit Website</a>
            </section>
        `;
        breweryList.appendChild(breweryLi);
    });
}

function displayFilterByCities(){
    const filterByCityDiv = document.querySelector('#filter-by-city-form');
    filterByCityDiv.innerHTML = '';
    displayCities.forEach(city => {
        filterByCityDiv.innerHTML += `
        <input type="checkbox" id="${city}" name="${city}" value="${city}">
        <label for="${city}">${city}</label>
        `;
    });
}

// State input form
const selectStateInput = document.querySelector('#select-state-form');
selectStateInput.addEventListener('submit', async (event) => {
    event.preventDefault();
    stateSearch = event.target[0].value;
    await getData();
    displayBreweries();
});

// Filter dropdown
const filterByTypeDropdown = document.querySelector('#filter-by-type');
filterByTypeDropdown.addEventListener('change', async (event) => {
    filterByType = event.target.value;
    await getData();
    displayBreweries();
});

// Search brewery input
const searchBreweryInput = document.querySelector('.search-breweries');
searchBreweryInput.addEventListener('input', (event) => {
    search = event.target.value;
    displayBreweries();
});

// Filter by city form
const filterByCityForm = document.querySelector('#filter-by-city-form');
filterByCityForm.addEventListener('change', async (event) => {
    event.preventDefault();
    const city = event.target.value;
    if (event.target.checked){
        filterByCities.push(city);
    } 
    else {
        filterByCities = filterByCities.filter(c => c !== city);
    }
    displayBreweries();
});

// Initial display of breweries
displayBreweries();