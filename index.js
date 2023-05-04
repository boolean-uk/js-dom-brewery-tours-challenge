// Search bar functionality
// Grab the input from the input field
// Format the text to match the api
// 


let state = []
const submitForm = document.querySelector("#select-state-form");
const filterForm = document.querySelector('#filter-by-type');
const breweryList = document.querySelector('#breweries-list');

// functions

function renderBrews(brewery)  {

    const listItem = document.createElement('li');
    breweryList.append(listItem);

    const breweryName = document.createElement('h2');
    breweryName.innerText = brewery.name;
    listItem.append(breweryName);

    const brType = document.createElement('div');
    brType.setAttribute('class', 'type');
    brType.innerText = brewery.brewery_type;
    listItem.append(brType);

    // Section for address
    const brAddress = document.createElement('section');
    brAddress.setAttribute('class', 'address');
    listItem.append(brAddress);

    const brAddressHeader = document.createElement('h3');
    brAddressHeader.innerText = 'Address:';
    brAddress.append(brAddressHeader);

    const brAddressStreet = document.createElement('p');
    brAddressStreet.innerText = brewery.street;
    brAddress.append(brAddressStreet);

    const brAddressCity = document.createElement('p');
    brAddressCity.innerText = `${brewery.city}, ${brewery.postal_code}`;
    brAddress.append(brAddressCity);

    // Section for phone
    const brPhoneSection = document.createElement('section');
    brPhoneSection.setAttribute('class', 'phone');
    listItem.append(brPhoneSection);

    const phoneHeader = document.createElement('h3');
    phoneHeader.innerText = "Phone:";
    brPhoneSection.append(phoneHeader);

    const brPhoneNumber = document.createElement('p');
    brPhoneNumber.innerText = brewery.phone;
    brPhoneSection.append(brPhoneNumber);

    // section for website
    const brLink = document.createElement('section');
    brLink.setAttribute('class', 'link');
    listItem.append(brLink);

    const brAnchor = document.createElement('a');
    const breweryLink = brewery.website_url;
    brAnchor.setAttribute('href', `${breweryLink}`);
    brAnchor.innerText = 'Visit Website';
    brLink.append(brAnchor);



};

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state = [];
    breweryList.innerHTML = "";
    let usState = document.getElementById("select-state").value;
    usState = usState.toLowerCase();
    for (let i = 0; i < usState.length; i++) {
        if (usState[i] === " "){
            usState[i] = "_"
        }
    }
    console.log(usState);
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${usState}&per_page=50`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((breweries) => {
            state = breweries;
            console.log(state);
            for (let i = 0; i < state.length; i++) {
                let brewery = state[i];
                if(brewery.brewery_type === 'brewpub' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'micro'){
                    renderBrews(brewery);
                }

        }});
    
    }
)

filterForm.addEventListener("change", (e) => {
    e.preventDefault();
    if(e.target.value === ""){
        breweryList.innerHTML = "";
        for (let i = 0; i < state.length; i++) {
            let brewery = state[i];
            if(brewery.brewery_type === 'brewpub' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'micro'){
                renderBrews(brewery);
            }
        }
    } else if(e.target.value === "micro"){
        console.log(e.target.value)
        breweryList.innerHTML = "";
        for (let i = 0; i < state.length; i++){
            if(state[i].brewery_type === "micro"){
                renderBrews(state[i]);
            }
        }
    } else if(e.target.value === "regional"){
        breweryList.innerHTML = "";
        for (let i = 0; i < state.length; i++){
            if(state[i].brewery_type === "regional"){
                renderBrews(state[i]);
            }
        }
    } else if(e.target.value === "brewpub"){
        breweryList.innerHTML = "";
        for (let i = 0; i < state.length; i++){
            if(state[i].brewery_type === "brewpub"){
                renderBrews(state[i]);
            }
        }
    }

})



