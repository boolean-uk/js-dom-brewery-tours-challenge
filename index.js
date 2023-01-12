// state
const state = {
    breweries: []
};

// select html elements

const breweryList = document.querySelector("#breweries-list");
const formState = document.querySelector('#select-state-form');
const inputState = document.querySelector('#select-state');
const typeFilter = document.querySelector('#filter-by-type-form');

// event logic

// String.replaceAt = function (index, char) {
//     let a = this.split("");
//     a[index] = char;
//     return a.join("");
// }

let usState = ''

formState.addEventListener('submit', (event) => {
    event.preventDefault();
    state.breweries = [];
    console.log(state.breweries)    
    console.log(inputState.value);
    usState = inputState.value;
    inputState.value = '';
    usState = usState.toLowerCase();
    usState.replace(` `, `_`);
    getStateBrews(usState);    
})


// network requests

function getStateBrews(usState) {
    console.log("check if getStateBrews is running")

    fetch("https://api.openbrewerydb.org/breweries?by_state=" + usState + "&per_page=50")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((breweryData) => {
        console.log(`is state.breweries being cleared`, state.breweries);
        state.breweries = breweryData;
        renderBrewList();}
    )
}

// rendering

function renderBrewList() {
    // maybe erase here?
    
    breweryList.innerHTML = '';

    let filteredBreweries = state.breweries.filter((brewery) => {
        if (brewery.brewery_type === "brewpub" || brewery.brewery_type === "micro" || brewery.brewery_type === "regional") {
            return true
        } else {
            return false
        }
    })

    filteredBreweries.forEach((item)=> {
        const li = document.createElement('li');

        const h2 = document.createElement('h2');
        h2.innerHTML = item.name;

        const div = document.createElement('div');
        div.setAttribute('class', 'type');
        div.innerHTML = item.brewery_type;
        
        // Address Section
        const sectAddress = document.createElement('section');
        sectAddress.setAttribute('class', 'address');

        const h3Address = document.createElement('h3');
        h3Address.innerHTML = 'Address:'

        const pStreet = document.createElement('p');
        pStreet.innerHTML = item.street;

        const pCity = document.createElement('p');
        pCity.innerHTML = `${item.city}, ${item.postal_code}`

        // Phone Section
        const sectPhone = document.createElement('section');
        sectPhone.setAttribute('class', 'phone');

        const h3Phone = document.createElement('h3');
        h3Phone.innerHTML = 'Phone:';

        const pPhone = document.createElement('p');
        pPhone.innerHTML = item.phone;
        
        // Link Section
        const sectLink = document.createElement('section');
        sectLink.setAttribute('class', 'link');

        const aLink = document.createElement('a');
        aLink.href = item.website_url;
        aLink.target = "_blank";
        aLink.innerHTML = "Visit Website";

        // Appending

        // Address section appends
        sectAddress.append(h3Address);
        sectAddress.append(pStreet);
        sectAddress.append(pCity);

        // Phone section appends
        sectPhone.append(h3Phone);
        sectPhone.append(pPhone);

        // Link section appends
        sectLink.append(aLink);

        // li appends
        li.append(h2);
        li.append(div);
        li.append(sectAddress);
        li.append(sectPhone);
        li.append(sectLink);

        breweryList.append(li);

    })
}

// start

renderBrewList();