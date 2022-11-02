const data = {
    // threeFilter, micro, region, brewpub
    filter: 'threeFilter', 
    perPage: 3,
    state: null,

    breweries: [], // Filled by the first return
    threeFilterBreweries: [], // Filled in Filter
    microBreweries: [],
    regionalBreweries: [],
    brewpubBreweries: []
}

function filterListOfBreweries() {
    // Clear Filtered Breweries
    data.threeFilterBreweries = [];
    data.microBreweries = [];
    data.regionalBreweries = [];
    data.brewpubBreweries = [];

    // Put 15 breweries inside breweries list
    // and call the sort function
    for (brewery of data.breweries) {
        const type = brewery.brewery_type;

        // Filters Micro and store in data
        if (type == 'micro') {
            data.microBreweries.push(brewery); // Add to respective
            data.threeFilterBreweries.push(brewery); // Add to default
        }
        else if (type == 'regional') {
            data.regionalBreweries.push(brewery);
            data.threeFilterBreweries.push(brewery); // Add to default
        }
        else if (type == 'brewpub') {
            data.brewpubBreweries.push(brewery);
            data.threeFilterBreweries.push(brewery); // Add to default
        } // Do nothing with breweries not within these filters


        // // Filters Micro and store in data.threeFilterBreweries
        // if (type == 'micro' || type == 'regional' || type == 'brewpub') {
        //     data.threeFilterBreweries.push(brewery);
        // } // Else do nothing.
    }
}

function renderListOfBreweries(filter, renderPerPage) {
    // renderPerPage will always be 10
    // Filter: micro - regional - brewpub - threeFilter (allThree)

    // Breweries Wrapper
    const ul = document.querySelector('#breweries-list');

    // Clears before Rendering new.
    clearListOfBreweries();

    // Data instance with the respective brewery list
    const breweriesToRender = data[ String(filter + "Breweries") ];

    // Returns if the list is Empty
    if (breweriesToRender.length === 0) {
        searchNotFound();
        return
    }

    // If perPage is more than list lenght, update local perPage
    if (breweriesToRender.length < renderPerPage) {
        renderPerPage = breweriesToRender.length
    }

    // Render only the amount set by Per Page
    for (let num = 0; num < renderPerPage; num++) {
        // Individual Brewery
        const brewery = breweriesToRender[num];

        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        h2.innerText = brewery.name;
        const div = document.createElement('div');
        div.setAttribute('class', 'type');
        div.innerText = brewery.brewery_type;
        const secAddress = document.createElement('section');
        secAddress.setAttribute('class', 'address');
        const h3Address = document.createElement('h3');
        h3Address.innerText = 'Address:';
        const pStreet = document.createElement('p'); 
        pStreet.innerText = brewery.street || 'Street N/A';
        const pCityPostcode = document.createElement('p');
        pCityPostcode.innerText = `${brewery.city || 'City N/A'}, ${brewery.postal_code || 'Postal Code N/A'}`;
        pCityPostcode.style.fontWeight = 'bold';
        const secPhone = document.createElement('section');
        secPhone.setAttribute('class', 'phone');
        const h3Phone = document.createElement('h3');
        h3Phone.innerText = 'Phone:';
        const pPhone = document.createElement('p');
        pPhone.innerText = brewery.phone || 'N/A';
        const secLink = document.createElement('section');
        secLink.setAttribute('class', 'link');
        const a = document.createElement('a');
        brewery.website_url ? a.setAttribute('href', brewery.website_url): null
        a.setAttribute('target', '_blank');
        a.innerText = brewery.website_url ? 'Visit Website': 'No Website found'
   
        // Append it to Page
        ul.appendChild(li);
        li.appendChild(h2);
        li.appendChild(div);
        li.appendChild(secAddress);
        secAddress.appendChild(h3Address);
        secAddress.appendChild(pStreet);
        secAddress.appendChild(pCityPostcode);
        li.appendChild(secPhone);
        secPhone.appendChild(h3Phone);
        secPhone.appendChild(pPhone);
        li.appendChild(secLink);
        secLink.appendChild(a);
    }
}

function clearListOfBreweries() {
    // Breweries Wrapper
    const ul = document.querySelector('#breweries-list');
    ul.innerHTML = '';
}

// Called when form Submit.
// Gets 50 Breweries to later filter it
function getBreweriesByState(state) {
    // Replaces space with underline and lower case it
    const underlinedState = state.split(' ').join('_').toLowerCase();
    const breweriesPerPage = 50; // Always get 50 - Max from DB
    const uri = `https://api.openbrewerydb.org/breweries?by_state=${underlinedState}&per_page=${breweriesPerPage}`;

    // Fetch Breweries based on the State given to Function
    fetch(uri)
    .then((promise) => {
        // Converts promise response to Json
        return promise.json();
    })
    .then((breweriesJson) => {
        // Save to Local Data
        data.breweries = breweriesJson;

        // Filter Breweries before render
        filterListOfBreweries();

        // Render Breweries to Page, render only the value the user inputed
        renderListOfBreweries(data.filter, 10); // 10 is per page render
    });
}

// Called when Search Bar value is changed
// Gets 50 Breweries to later filter it
function getBreweriesByName(name) {
    // Replaces space with underline and lower case it
    const underlinedName = name.split(' ').join('_').toLowerCase();
    const breweriesPerPage = 50; // Always get 50 - Max from DB
    const uri = `https://api.openbrewerydb.org/breweries?by_name=${underlinedName}&per_page=${breweriesPerPage}`;

    // Fetch Breweries based on the State given to Function
    fetch(uri)
    .then((promise) => {
        // Converts promise response to Json
        return promise.json();
    })
    .then((breweriesJson) => {
        // Save to Local Data
        data.breweries = breweriesJson;

        // Filter Breweries before render
        filterListOfBreweries();

        // Render Breweries to Page, render only the value the user inputed
        renderListOfBreweries(data.filter, 10); // 10 is per page render
    });
}


function createEventListeners() {
    // Form
    const form = document.querySelector('#select-state-form');
    const input = document.querySelector('#select-state');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Avoid Page Refresh
        
        // Remove Whitespaces - State
        const valueTrimmed = input.value.trim();
        input.value = valueTrimmed;
        
        // Save state to Data
        data.state = valueTrimmed;

        // Return if Input empty
        if (valueTrimmed === '') return input.placeholder = "Type a state first.";
    
        // Call get Breweries with the form Input
        getBreweriesByState(valueTrimmed);
    
        // Clears text from Input
        input.value = ''; 

        // Clears Search bar
        searchBar.value = '';
    })

    // Aside Filter
    const select = document.querySelector('#filter-by-type');
    select.addEventListener('change', (event) => {
        // If nothing selected, show all three filters
        if (select.value === '') {
            data.filter = 'threeFilter';
            return
        } // Don't continue if true

        // If something's selected, update data.filter
        data.filter = select.value;

        // Update List
        getBreweriesByState(data.state);
    })

    // Search bar
    const searchBar = document.querySelector('#search-breweries');
    searchBar.addEventListener('input', (event) => {
        // Called on every value change
        event.preventDefault(); // Avoid Page Refresh
        
        // Remove Whitespaces - State
        const valueTrimmed = searchBar.value.trim();
        // searchBar.value = valueTrimmed;

        // Return if Input empty
        if (valueTrimmed === '') return searchBar.placeholder = "Type a name first.";
    
        // Call get Breweries with the form Input
        getBreweriesByName(valueTrimmed);

        // Search bar value is set to empty on var input submit
    })
}

function searchNotFound() {
    // Breweries Wrapper
    const ul = document.querySelector('#breweries-list');

    // Clears before creating h3 warning
    clearListOfBreweries();

    const h3 = document.createElement('h3');
    h3.innerText = "Sorry, search not Found."

    ul.appendChild(h3);
}


createEventListeners();
