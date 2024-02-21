
const validBreweryTypes = ['micro', 'regional', 'brewpub'];
let breweryData;
let stateSearch;
let filterByType;
let search;
let displayCities = [];
let filterByCities = [];
let countpages = 0;
let currentpage = 0;
let visitList = [];

async function getData(){
    let requestURL = 'https://api.openbrewerydb.org/v1/breweries';
    if (stateSearch){
        req
        uestURL += `?by_state=${stateSearch}`;
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
    const filteredData = filterData();
    let count = 0;
    displayPagination();
    filteredData.forEach(brewery => {
        count++;
        if (count <= currentpage * 10 || count > (currentpage + 1) * 10) return; // If the count is not within the current page range skip this iteration
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
            <button class="add-to-visit-list"></button>
            <section class="link">
                <a href="${brewery.website_url || 'null'}" target="_blank">Visit Website</a>
            </section>
        `;
        const visitListButton = breweryLi.querySelector('.add-to-visit-list');
        visitListButton.textContent = visitList.includes(brewery.name) ? 'Remove from visit list 🌠' : 'Add to visit list ⭐';
        visitListButton.addEventListener('click', async () => {
            console.log("Button clicked")
            if (visitList.includes(brewery.name)){
                console.log("Sending DELETE")
                // todo send delete request
                visitList = visitList.filter(b => b !== brewery.name);
            }
            else {
                console.log("Sending POST")
                // todo send post request
                visitList.push(brewery.name);
            }
            displayBreweries();
        });
        breweryList.appendChild(breweryLi);
    });
}
function filterData(){
    return breweryData.filter(brewery => {
        if (filterByType && brewery.brewery_type !== filterByType) return false;
        if (search && !brewery.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (filterByCities.length > 0 && !filterByCities.includes(brewery.city)) return false;
        return true;
    });
}

function displayPagination(){
    const paginationList = document.querySelector('.pagination');
    paginationList.innerHTML = '';
    const filteredData = filterData();
    countpages = Math.ceil(filteredData.length / 10);
    createPaginationButton(1, paginationList);
    for (let i = 1; i < filteredData.length; i++){
        if (i % 10 === 0){ // If the count is a multiple of 10 add a page button
            const page = i / 10;
            createPaginationButton(page + 1, paginationList);
        }
    }
}

function createPaginationButton(pageNumber, paginationList){
    const pageButton = document.createElement('button');
    pageButton.textContent = pageNumber;
    pageButton.addEventListener('click', (event) => {
        currentpage = event.target.textContent - 1;
        displayBreweries();
    });
    if(currentpage+1 === pageNumber){ // If this pagebutton is the current page add custom styling
        pageButton.classList.add('pagination-active');
    }
    else{
        pageButton.classList.add('pagination-inactive');
    }
    paginationList.appendChild(pageButton);
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

// Clear city filter button
const clearCityFilter = document.querySelector('.clear-all');
clearCityFilter.addEventListener('click', () => {
    filterByCities = [];
    displayFilterByCities();
    displayBreweries();
});

// Pagination buttons
const nextPageButton = document.querySelector('.next-page');
nextPageButton.addEventListener('click', () => {
    if(currentpage+1 == countpages) return;
    currentpage++;
    displayBreweries();
});

const prevPageButton = document.querySelector('.previous-page');
prevPageButton.addEventListener('click', () => {
    if(currentpage == 0) return;
    currentpage--;
    displayBreweries();
});

// Initial display of breweries
displayBreweries();