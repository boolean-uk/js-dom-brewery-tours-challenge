const state = {
    breweries: []
}

// All the querySelectors
const root = "https://api.openbrewerydb.org/v1/breweries";
const breweriesSearch = document.querySelector('#select-state-form')
const breweriesForm = document.querySelector('#filter-by-type-form');
const breweriesUl = document.querySelector('#breweries-list');
const filter = document.querySelector('#filter-by-type')
const breweryInput = document.querySelector('#select-state')


// sumbit button for form and also reset 
breweriesSearch.addEventListener('submit', search)

function search(event) {
    event.preventDefault()
    console.log('text')
    const eachState = breweryInput.value
    getBrewery(eachState)
    breweriesForm.reset()
}

//GET
const getBrewery = (eachState) => {
    fetch(`${root}/?by_state=`)
        .then((Response) => Response.json())
        .then((data) => {
            console.log("show all breweries", data);
            state.breweries = data;

        })
    allBreweries(state.breweries);
   
}

//Creating a brewery card
function allBreweries(breweries) {
    breweriesUl.innerHTML = ""
    console.log("text", breweries.length)
    breweries.forEach((state) => {


        //main li example from the standard html card
        const brewLi = document.createElement('li');
        breweriesUl.append(brewLi);

        const brewH2 = document.createElement('h2');
        brewH2.innerText = state.name;
        brewLi.append(brewH2);

        const brewDiv = document.createElement('div');
        brewDiv.setAttribute('class', 'type');
        brewLi.append(brewDiv);

        const brewSectionAdress = document.createElement('section');
        brewSectionAdress.setAttribute('class', 'address');
        brewLi.append(brewSectionAdress);

        const brewH3Adress = document.createElement('h3');
        brewH3Adress.innerText = state.address;
        brewSectionAdress.append(brewH3Adress);

        const brewAddress2 = document.createElement('p');
        brewAddress2.innerText = state.address_2;
        brewSectionAdress.append(brewAddress2);

        const strong = document.createElement('p');
        strong.innerText = state.postal_code;
        brewSectionAdress.append(strong);

        const brewSectionPhone = document.createElement('section');
        brewSectionPhone.setAttribute('class', 'phone');
        brewLi.append(brewSectionPhone);

        const phoneH3 = document.createElement('h3');
        phoneH3.innerText = "Phone";
        brewSectionPhone.append(phoneH3);

        const phoneNumber = document.createElement('p');
        phoneNumber.innerText = state.phone;
        brewSectionPhone.append(phoneNumber);

        const websiteLink = document.createElement('section');
        websiteLink.setAttribute('class', 'link')
        brewLi.append(websiteLink);

        const aLink = document.createElement('a')
        aLink.setAttribute('href', `${state.website_url}`)
        aLink.setAttribute('target', '_blank')
        aLink.innerText = 'Visit Website';
        websiteLink.append(aLink);
    })
}
