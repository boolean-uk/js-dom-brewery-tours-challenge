import { getBreweries, saveBrewery, removeSavedBreweries, retrieveSavedBreweryById, retrieveSavedBreweries } from './controller.js';

window.addEventListener("load", init);

const state = {
    breweries: [],
    state: "",
    type: "",
    chosenCities: [],
    fetchedCities: [],
    search: "",
    currentPage: 1,
}

function init(){
    const form = document.getElementById("select-state-form");
    form.addEventListener("submit", (e) => setState(e));

    const selectElement = document.getElementById('filter-by-type');
    selectElement.addEventListener('change', (e) => setType(e))
    
    const searchElement = document.getElementById("search-breweries")
    searchElement.addEventListener('input', (e) => setSearch(e));

    const showSavedElement = document.getElementById("show-saved-btn")
    showSavedElement.addEventListener("click", (e) => showSaved(e))

    document.querySelector(".clear-all-btn").addEventListener("click", () => clearCities())

    showSaved()
}

async function renderList(breweryData){
    const breweriesList = document.getElementById("breweries-list");
    // Clear previous content
    breweriesList.innerHTML = '';
    const startIndex = (state.currentPage - 1) * 10;
    const endIndex = startIndex + 10;

    const breweriesToRender = breweryData.slice(startIndex, endIndex);

    breweriesToRender.forEach(async brewery => {
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

        // Check if brewery is saved
        const isSaved = await checkIfBreweryIsSaved(brewery);

        const actionButton = document.createElement('button');
        actionButton.textContent = isSaved ? 'Remove Brewery' : 'Save Brewery';
        actionButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (isSaved) {
                removeSavedBreweries(brewery.id); // Call deleteBrewery if brewery is saved
            } else {
                saveBrewery(brewery); // Call saveBrewery if brewery is not saved
            }
        });
        linkSection.appendChild(actionButton);

        li.appendChild(linkSection);

        // Append li element to breweriesList
        breweriesList.appendChild(li);
    });

    renderPaginationButtons(breweryData.length);
}

async function checkIfBreweryIsSaved(brewery){
    let fetchedbrewery = await retrieveSavedBreweryById(brewery.id)

    if (fetchedbrewery === null) {
        return false;
    }
    return true;
}

async function showSaved(){
    let saved = await retrieveSavedBreweries();
    if (saved.length !== 0) {
        renderList(saved)
    }
}

function renderPaginationButtons(totalBreweries){
    const totalPages = Math.ceil(totalBreweries / 10);

    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = '';

    for(let i = 1; i <= totalPages; i++){
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            state.currentPage = i;
            fetchBreweries();
        });
        paginationContainer.appendChild(button);
    }
}

async function fetchBreweries(){
    let response = await getBreweries(state.state, state.type, state.chosenCities, state.search);
    if(response === null || response.length === 0) {
        return;
    }

    renderList(response.breweries);
    if(response.cities.length !== 0 && state.chosenCities.length === 0){
        renderCities(response.cities)
    }
}

function clearCities(){
    state.chosenCities = []
    const checkboxes = document.querySelectorAll('#filter-by-city-form input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    fetchBreweries()
}

function renderCities(cities){
    const form = document.getElementById("filter-by-city-form")
    form.innerHTML = '';
    cities.forEach((city) => {
        const input = document.createElement("input")
        input.type = "checkbox";
        input.name = city
        input.value = city
        input.addEventListener("change", () => setCities(city))
        const label = document.createElement("label")
        label.for = city
        label.innerHTML = city
        form.appendChild(input);
        form.appendChild(label);
    });
}

async function setCities(city){
    if (!state.chosenCities.includes(city)) {
        state.chosenCities.push(city)
    }
    fetchBreweries();
}

async function setSearch(e){
    e.preventDefault();
    state.search = e.target.value
    fetchBreweries();
}

async function setState(e){
    e.preventDefault();
    const chosenstate = document.getElementById("select-state").value;
    state.state = chosenstate
    fetchBreweries();
}

async function setType(e){
    e.preventDefault();
    state.type =  e.target.value;
    fetchBreweries();
}