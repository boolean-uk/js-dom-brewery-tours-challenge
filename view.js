import { breweryByState, breweryByStateAndFilter } from './controller.js';

window.addEventListener("load", init);

const state = {
    state: "",
}

function init(){
    const form = document.getElementById("select-state-form");
    form.addEventListener("submit", (e) => fetchBreweries(e));

    const selectElement = document.getElementById('filter-by-type');
    selectElement.addEventListener('change', (e) => filterBreweries(e))
}

function renderList(breweryData){
    const breweriesList = document.getElementById("breweries-list");
    // Clear previous content
    breweriesList.innerHTML = '';

    breweryData.forEach(brewery => {
        // Create li element
        const li = document.createElement('li');

        // Create h2 element for name
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = brewery.name;
        li.appendChild(nameHeader);

        // Create div element for type
        const typeDiv = document.createElement('div');
        typeDiv.classList.add('type');
        typeDiv.textContent = brewery.brewery_type;
        li.appendChild(typeDiv);

        // Create section element for address
        const addressSection = document.createElement('section');
        addressSection.classList.add('address');

        // Create h3 element for address title
        const addressTitle = document.createElement('h3');
        addressTitle.textContent = 'Address:';
        addressSection.appendChild(addressTitle);

        // Create p elements for street and city/state/zip
        const streetP = document.createElement('p');
        streetP.textContent = brewery.address;
        addressSection.appendChild(streetP);

        const cityStateZipP = document.createElement('p');
        cityStateZipP.innerHTML = `<strong>${brewery.city}, ${brewery.state} ${brewery.postal_code}</strong>`;
        addressSection.appendChild(cityStateZipP);

        li.appendChild(addressSection);

        // Create section element for phone
        const phoneSection = document.createElement('section');
        phoneSection.classList.add('phone');

        // Create h3 element for phone title
        const phoneTitle = document.createElement('h3');
        phoneTitle.textContent = 'Phone:';
        phoneSection.appendChild(phoneTitle);

        // Create p element for phone number
        const phoneP = document.createElement('p');
        phoneP.textContent = brewery.phone;
        phoneSection.appendChild(phoneP);

        li.appendChild(phoneSection);

        // Create section element for link
        const linkSection = document.createElement('section');
        linkSection.classList.add('link');

        // Create anchor element for website link
        const websiteLink = document.createElement('a');
        websiteLink.href = brewery.website_url;
        websiteLink.textContent = 'Visit Website';
        websiteLink.target = '_blank';
        linkSection.appendChild(websiteLink);

        li.appendChild(linkSection);

        // Append li element to breweriesList
        breweriesList.appendChild(li);
    });
}

async function filterBreweries(e){
    e.preventDefault();
    console.log(e.target.value);
    if (state.state === "") {
        return
    }
    let response = await breweryByStateAndFilter(state.state, e.target.value);
    if(response === null || response.length === 0) {
        return;
    }
    renderList(response);
}

async function fetchBreweries(e){
    e.preventDefault();
    const chosenstate = document.getElementById("select-state").value;
    state.state = chosenstate
    let response = await breweryByState(chosenstate);
    if(response === null || response.length === 0) {
        return;
    }
    console.log(response);
    renderList(response);
}
