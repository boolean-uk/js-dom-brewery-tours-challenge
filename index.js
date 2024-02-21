
const validBreweryTypes = ['micro', 'regional', 'brewpub'];
let breweryData;
let state;
let filter;
let search;

async function getData(){
    let requestURL = 'https://api.openbrewerydb.org/v1/breweries';
    if (state){
        requestURL += `?by_state=${state}`;
    }
    await fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            breweryData = data.filter(brewery => validBreweryTypes.includes(brewery.brewery_type));
        })
        .catch(error => console.error(error));
}

async function displayBreweries(){
    const breweryList = document.querySelector('#breweries-list');
    breweryList.innerHTML = '';
    if(!breweryData) await getData();
    breweryData.forEach(brewery => {
        if (filter && brewery.brewery_type !== filter) return;
        if (search && !brewery.name.toLowerCase().includes(search.toLowerCase())) return;
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

// State input form
const selectStateInput = document.querySelector('#select-state-form');
selectStateInput.addEventListener('submit', async (event) => {
    event.preventDefault();
    state = event.target[0].value;
    await getData();
    displayBreweries();
});

// Filter dropdown
const filterByTypeDropdown = document.querySelector('#filter-by-type');
filterByTypeDropdown.addEventListener('change', async (event) => {
    filter = event.target.value;
    await getData();
    displayBreweries();
});

// Search brewery input
const searchBreweryInput = document.querySelector('.search-breweries');
searchBreweryInput.addEventListener('input', (event) => {
    search = event.target.value;
    displayBreweries();
});

// Initial display of breweries
displayBreweries();