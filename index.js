const data = {
    breweries: [
        // {
            // address_2: null
            // address_3: null
            // brewery_type: "brewpub"
            // city: "Williamsville"
            // country:"United States"
            // county_province:null
            // created_at:"2022-10-30T06:11:39.514Z"
            // id:"12-gates-brewing-company-williamsville"
            // latitude:null
            // longitude:null
            // name:"12 Gates Brewing Company"
            // phone:"7169066600"
            // postal_code:"14221-7804"
            // state:"New York"
            // street:"80 Earhart Dr Ste 20"
            // updated_at:"2022-10-30T06:11:39.514Z"
            // website_url:"http://www.12gatesbrewing.com"
        // }
    ],
    filteredBreweries: []
}

function filterListOfBreweries() {
    // Clear Filtered Breweries
    data.filteredBreweries = [];

    // Put 15 breweries inside breweries list
    // and call the sort function
    for (brewery of data.breweries) {
        const type = brewery.brewery_type;

        // Filters Micro and store in data
        if (type == 'micro' || type == 'regional' || type == 'brewpub') {
            // TODO: Keep wanted brewery on data
            // console.log("==- ",brewery.name, " is type: ", type);
            data.filteredBreweries.push(brewery);
        } 
        else {
            // TODO: Remove not wanted Brewery from data
            console.log(`Not the wanted type, ${brewery.name} of type ${type}`);

            // const index = data.breweries.indexOf(brewery);
            // data.breweries.splice(index, 1);
            // console.log(data.breweries)
        }
    }
}

function renderListOfBreweries(renderPerPage) {
    // Breweries Wrapper
    const ul = document.querySelector('#breweries-list');

    // Clears before Rendering new.
    clearListOfBreweries();

    // Returns if empty filteredBreweries
    if (data.filteredBreweries.length === 0) {
        searchNotFound();
        return
    }

    // Render only the amount set by Per Page
    for (let num = 0; num < renderPerPage; num++) {
        // Individual Brewery
        const brewery = data.filteredBreweries[num];

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

    return
    for (brewery of data.filteredBreweries) {
        // Individual Brewery
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

function createEventListeners() {
    // Form
    const form = document.querySelector('#select-state-form');
    const input = document.querySelector('#select-state');
    const perPage = document.querySelector('#select-per-page')
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Avoid Page Refresh
        
        // Remove Whitespaces
        const valueTrimmed = input.value.trim();
        input.value = valueTrimmed;
        
        // Return if Input empty
        if (valueTrimmed === '') return input.placeholder = "Type a state first.";
    
        // Call get Breweries with the form Input
        getBreweriesByState(valueTrimmed, perPage.value);
    
        // Clears text from Input
        input.value = ''; 
    })

    // Other EventListeners here...
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

// Called when form Submit.
// Gets 15 Breweries to later filter it
function getBreweriesByState(state, perPage) {
    // Replaces space with underline and lower case it
    const underlinedState = state.split(' ').join('_').toLowerCase();
    const breweriesPerPage = 15; // Always get 15
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
        renderListOfBreweries(perPage);
    });
}

createEventListeners();
