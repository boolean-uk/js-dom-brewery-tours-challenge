let breweryData = [];
let stateSearch = "";
let selectedType = "micro";
let uniqueCities = [];
let selectedCities = [];
let searchQuery = "";
let page = 1;
const perPage = 10;

async function getBreweryData() {
    try {
        console.log(selectedCities)
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${stateSearch}&by_type=${selectedType}&by_city=${selectedCities}&by_name=${searchQuery}&page=${page}&per_page=${perPage}`);
        const responseData = await response.json();
        breweryData = responseData.filter(brewery => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type));
        renderBreweries();
        updatePageNumber()
    } catch (error) {
        console.error("Error fetching brewery data:", error);
    }

}

async function fetchCityData() {
    try {
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=50");
        const data = await response.json();
        uniqueCities = [...new Set(data.map(brewery => brewery.city))];
        populateCityFilter();
    } catch (error) {
        console.error("Error fetching city data:", error);
        return [];
    }
}

function renderBreweries() {
    const breweryListDOM = document.querySelector(".breweries-list");
    breweryListDOM.innerHTML = "";

    breweryData.forEach((brewery) => {
        const { name, brewery_type, street, city, state, postal_code, phone, website_url } = brewery;

        breweryListDOM.innerHTML += `
            <li>
                <h2>${name}</h2>
                <div class="type">${brewery_type}</div>
                <section class="address">
                    <h3>Address:</h3>
                    <p>${street}, ${city}, ${state} ${postal_code}</p>
                </section>
                <section class="phone">
                    <h3>Phone:</h3>
                    <p>${phone}</p>
                </section>
                <section class="link">
                    <a href="${website_url}" target="_blank">Visit Website</a>
                </section>
            </li>
        `;
    });
}

function populateCityFilter() {
    const cityFilterOptions = document.getElementById('filter-by-city-form');
console.log('uniqueCities:', uniqueCities)
    uniqueCities.forEach(city => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = city;
        checkbox.id = city.toLowerCase().replace(/\s+/g, '');
        checkbox.onclick = applyCityFilter
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = city;
        cityFilterOptions.appendChild(checkbox);
        cityFilterOptions.appendChild(label);
    });
}

function applyCityFilter(event) {
    console.log(event.target.id)
        document.querySelectorAll('#filter-by-city-form input[type="checkbox"]:checked').forEach(checkbox => {
            if (checkbox.id != event.target.id) {
                checkbox.checked = false;
            }
        });
    const selectedCityCheckboxes = document.querySelectorAll('#filter-by-city-form input[type="checkbox"]:checked');
    selectedCities = Array.from(selectedCityCheckboxes).map(checkbox => checkbox.value);
    console.log(selectedCities)
    getBreweryData();
}


function clearCityFilters() {
    document.querySelectorAll('#filter-by-city-form input[type="checkbox"]:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    selectedCities = [];
    
    getBreweryData()
}

function updatePageNumber() {
    let pageDom = document.getElementById('page-number')
    pageDom.innerHTML = page;
}

function nextPage() {
    if (breweryData.length < perPage) {
        return
    }
    page += 1 
    getBreweryData()
}

function previousPage() {
    if (page === 1 ) {
        return 
    }
    page -= 1
    getBreweryData()
}

document.getElementById('select-state-form').addEventListener('submit', function(event) {
    event.preventDefault();
    stateSearch = document.getElementById('select-state').value;
    page = 1;
    getBreweryData();
    
});

document.getElementById('filter-by-type-form').addEventListener('submit', function(event) {
    event.preventDefault();
    selectedType = document.getElementById('filter-by-type').value;
    page = 1;
    getBreweryData();
});

document.getElementById('filter-by-city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    page = 1;
    applyCityFilter();
});

document.getElementById('clear-city-filters-btn').addEventListener('click', function(event) {
    event.preventDefault();
    page = 1;
    clearCityFilters();
});

document.getElementById('search-breweries-form').addEventListener('submit', function(event) {
    event.preventDefault();
    searchQuery = document.getElementById('search-query').value;
    page = 1;
    getBreweryData();
});


getBreweryData();
fetchCityData();