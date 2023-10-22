const state = {
    breweries: []
};

const usStates = [
    "alabama",
    "alaska",
    "arizona",
    "arkansas",
    "california",
    "colorado",
    "conneticut",
    "delaware",
    "florida",
    "georgia",
    "hawaii",
    "idaho",
    "illinois",
    "indiana",
    "iowa",
    "kansas",
    "kentucky",
    "louisiana",
    "maine",
    "maryland",
    "massachussets",
    "michigan",
    "minnesota",
    "mississippi",
    "missouri",
    "montana",
    "nebraska",
    "nevada",
    "new hampshire",
    "new jersey",
    "new mexico",
    "new york",
    "north carolina",
    "north dakota",
    "ohio",
    "oaklahoma",
    "oregon",
    "pennsylvania",
    "rhode island",
    "south dakota",
    "south carolina",
    "texas",
    "tennessee",
    "utah",
    "vermont",
    "virginia",
    "west virginia",
    "wyoming",
    "wisconsin",
    "washington"
]

const root = 'https://api.openbrewerydb.org/v1/breweries';
const breweryForm = document.querySelector('form');
const breweryInput = document.querySelector('#select-state');
const breweryList = document.querySelector('#breweries-list');
const breweryFilter = document.querySelector('#filter-by-type');
const breweryNameSearch = document.querySelector('#search-breweries');

//GET request to the API to get all breweries 
breweryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state.state = breweryInput.value
    getBreweries()
});


const getBreweries = () => {
    let url = `${root}?by_state=${state.state}`
    if (state.desired_type) {
        url += `&by_type=${state.desired_type}` 
    } else if (state.byName) {
        url += `&by_name=${state.byName}`
    }
    fetch(url)
        .then(response => response.json())
        .then(breweries => {
            console.log(breweries);
            state.byName = breweries;
            state.filteredBreweries = breweries;
            state.breweries = breweries;
            clearBrewery();
            renderBrewery();
            filterByType();
        });
};

//function to clear the brewery list 
const clearBrewery = () => {
    breweryList.innerHTML = '';
};

//function to filter breweries based on their type, r
breweryFilter.addEventListener('change', (event) => {
    state.desired_type = event.target.value
    getBreweries()
});

//function to only display the breweries that have a brewery_type value of micro, regional or brewpub when a state is searched in the input box, all other values are removed from the list
let breweryByType = ["micro", "regional", "brewpub"];

const filterByType = () => {
    if (state.desired_type) {
        breweryByType = [state.desired_type]
    }
    state.filteredBreweries = state.breweries.filter(brewery => breweryByType.includes(brewery.brewery_type));
    clearBrewery();
    renderBrewery();
}

//function to search and render breweries by name
const filterByName = () => {
    state.filteredBreweries = state.breweries.filter(brewery => brewery.name.toLowerCase().includes(state.byName.toLowerCase()));
    clearBrewery();
    renderBrewery();
}

breweryNameSearch.addEventListener('input', (event) => {
    state.byName = event.target.value;
    filterByName();
});
//RENDER FUNCTION BELOW


const renderBrewery = () => {
    state.filteredBreweries.forEach(brewery => {
        const breweryLi = document.createElement('li');
        breweryLi.classList.add('.breweries-list.li');

        const name = document.createElement('h2');
        name.classList.add('.h2')
        name.innerText = brewery.name;
        
        const breweryType = document.createElement('div')
        breweryType.classList.add('type');
        breweryType.innerText = brewery.brewery_type;

        const addressSection = document.createElement('section')
        addressSection.classList.add('address');
        const addressTitle = document.createElement('h3')
        addressTitle.innerText = "Address:";
        const adr1 = document.createElement('p')
        adr1.innerText = brewery.address_1;
        const cityAndZip = document.createElement('p')
        const strong = document.createElement('STRONG')
        strong.innerText = `${brewery.city}, ${brewery.postal_code}`;
        cityAndZip.append(strong);
        addressSection.append(addressTitle, adr1, cityAndZip);

        const phoneSection = document.createElement('section')
        phoneSection.classList.add('phone');
        const phoneTitle = document.createElement('h3')
        phoneTitle.innerText = "Phone:";
        const phone = document.createElement('p')
        phone.innerText = brewery.phone;
        phoneSection.append(phoneTitle, phone);

        const websiteSection = document.createElement('section')
        websiteSection.classList.add('link');
        websiteSection.classList.add('a');
        const webUrl = document.createElement('a')
        webUrl.innerText = 'Visit Website';
        webUrl.href = brewery.website_url;
        websiteSection.append(webUrl);

        breweryLi.append(name, breweryType, addressSection, phoneSection, websiteSection);
        breweryList.append(breweryLi);
    });
}

//function to render a search bar that allows the user to search for breweries by name


getBreweries(breweryInput.value);


