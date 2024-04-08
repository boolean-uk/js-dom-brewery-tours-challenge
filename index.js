let breweryData = [];
let stateSearch = ""

async function getBreweryData() {
    try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${stateSearch}`);
        const responseData = await response.json();
        breweryData = responseData.filter(brewery => ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type));
        renderBreweries();
    } catch (error) {
        console.error("Error fetching brewery data:", error);
    }
}

async function filterByBreweryType(selectedType) {
    try {
        //if no filter applied, then fetch without filter and render.
        console.log(selectedType)
        if (selectedType === '') {
            getBreweryData();
            return;
        }
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${selectedType}`);
        const responseData = await response.json();
        breweryData = responseData;
        renderBreweries();
    } catch (error) {
        console.error("Error fetching brewery data:", error);
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

document.getElementById('select-state-form').addEventListener('submit', function(event) {
    event.preventDefault();
    stateSearch = document.getElementById('select-state').value;
    getBreweryData(state);
});

document.getElementById('filter-by-type-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedType = document.getElementById('filter-by-type').value;
    filterByBreweryType(selectedType);
});

getBreweryData();

