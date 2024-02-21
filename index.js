
const validBreweryTypes = ['micro', 'regional', 'brewpub'];
let breweryData;
let state;
let filter;

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

// State input form
const selectStateInput = document.querySelector('#select-state-form');
selectStateInput.addEventListener('submit', (event) => {
    event.preventDefault();
    state = event.target[0].value;
    displayBreweries();
});

async function displayBreweries(){
    const breweryList = document.querySelector('#breweries-list');
    breweryList.innerHTML = '';
    await getData();
    breweryData.forEach(brewery => {
        if (filter && brewery.brewery_type !== filter) return;
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

// Filter dropdown
const filterByTypeDropdown = document.querySelector('#filter-by-type');
filterByTypeDropdown.addEventListener('change', (event) => {
    filter = event.target.value;
    displayBreweries();
});

// Initial data load
displayBreweries();