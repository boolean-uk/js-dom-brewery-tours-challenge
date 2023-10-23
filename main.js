const state = {
    breweries: []
}

// All the querySelectors
const breweriesForm = document.querySelector('#select-state-form');
const breweriesUl = document.querySelector('#breweries-list');
const filter = document.querySelector('#filter-by-type')
const breweryInput = document.querySelector('#select-state')


// sumbit button for form and also reset 
breweriesForm.addEventListener('submit', search)
    function search(event){
    event.preventDefault()
    console.log('text')
    const eachState = breweryInput.value
    getBrewery(eachState)
    breweriesForm.reset()
}
//GET for each state
const getBrewery = (eachState) => {
    const root = `https://api.openbrewerydb.org/v1/breweries?by_state=${eachState}`;
    fetch(root)
        .then((Response) => Response.json())
        .then((data) => {
            console.log("show all breweries", data);
            state.breweries = data.filter((brewery) =>
            ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type)
          )
          allBreweries(state.breweries);
        })
}

//filter for the type of brewery
filter.addEventListener('change', breweryChange)
    function breweryChange() {
        const type = filter.value
        if (type === 'brew_type') {
            allBreweries(state.breweries)
        } else {
            const filtered = state.breweries.filter(
                (brewery) => brewery.brewery_type === type)
                allBreweries(filtered)
        }}


//Creating a brewery card
function allBreweries(breweries) {
    breweriesUl.innerHTML = ""
    console.log("text", breweries.length)
    breweries.forEach((brewery) => {

        //main li example from the standard html card
        const brewLi = document.createElement('li');
        breweriesUl.append(brewLi);
        
        //Name of each brewery
        const brewH2 = document.createElement('h2');
        brewH2.innerText = brewery.name;
        brewLi.append(brewH2);

        //The type of brewery it is
        const brewDiv = document.createElement('div');
        brewDiv.innerText = `${brewery.brewery_type}`
        brewDiv.setAttribute('class', 'type');
        brewLi.append(brewDiv);

        //Address section
        const brewSectionAdress = document.createElement('section');
        brewSectionAdress.setAttribute('class', 'address');
        brewLi.append(brewSectionAdress);

        //Address section
        const brewH3Adress = document.createElement('h3');
        brewH3Adress.innerText = 'Address:';
        brewSectionAdress.append(brewH3Adress);

        //Address section
        const brewAddress2 = document.createElement('p');
        brewAddress2.innerText = `${brewery.street}`;
        brewAddress2.setAttribute('class', 'address')
        brewSectionAdress.append(brewAddress2);

        //End of address section
        const strong = document.createElement('p');
        strong.innerText = `${brewery.city}, ${brewery.postal_code}`
        strong.style.fontWeight = 'bold'
        brewSectionAdress.append(strong);

        //Phone section
        const brewSectionPhone = document.createElement('section');
        brewSectionPhone.setAttribute('class', 'phone');
        brewLi.append(brewSectionPhone);

        //Phone section
        const phoneH3 = document.createElement('h3');
        phoneH3.innerText = "Phone:";
        brewSectionPhone.append(phoneH3);

        //Phone section
        const phoneNumber = document.createElement('p');
        phoneNumber.innerText = `+${brewery.phone}`;
        brewSectionPhone.append(phoneNumber);

        //Link to each brewery website
        const websiteLink = document.createElement('section');
        websiteLink.setAttribute('class', 'link')
        brewLi.append(websiteLink);

        //Link to each brewery website
        const aLink = document.createElement('a')
        aLink.setAttribute('href', `${brewery.website_url}`)
        aLink.setAttribute('target', '_blank')
        aLink.innerText = 'Visit Website';
        websiteLink.append(aLink);
    })
}

