const form = document.querySelector('#select-state-form')
const stateInput = document.querySelector('#select-state')
const breweryList = document.querySelector('.breweries-list')
const type = document.querySelector('#filter-by-type')
const typeInput = document.querySelector('option')
const searchInput = document.querySelector('#search-breweries')
const cityForm = document.querySelector('#filter-by-city-form')
const clear = document.querySelector('.clear-all-btn')

const brew = {
    brewerys: [],
}

let cityArray = []

let cityArrayFilter = []

// form submit

form.addEventListener('submit', function handle(event) {
    event.preventDefault()
    const state = stateInput.value;
    const updateState = state.toLowerCase().replaceAll(' ', '_')
    form.reset()

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${updateState}&per_page=10`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            brew.brewerys = data
            
            renderBrewerys()
            renderCityFilter()
        })
})

function renderBrewerys(filteredBreweries) {
    breweryList.innerHTML = '';
  
    const typeOfBrew = type.value;
    const searchTerm = searchInput.value.toLowerCase();
    const breweriesToRender = filteredBreweries || brew.brewerys;

    // filters

    const filteredBreweriesByTypeAndCity = breweriesToRender.filter(function (brewery) {
        // first filter checks for brewery type filter and if nothing is selected gives the list with all types with excursions
        if (typeOfBrew === '') {
            return brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub';
        } else {
            return brewery.brewery_type === typeOfBrew;
        }
        // this filter checks for the city that were added in the array (array that we got from the renderCityFilter function)
    }).filter(function (brewery) {
        if (cityArrayFilter.length === 0) {
            return true;
        } else {
            return cityArrayFilter.includes(brewery.city);
        }
        // search input 
    }).filter(function (brewery) {
        const breweryName = brewery.name.toLowerCase();
        return breweryName.includes(searchTerm);
    });

    // the above const will tell what to render in the bellow code

    filteredBreweriesByTypeAndCity.forEach(function (brewery) {
        // create elements
        const li = document.createElement('li');
        const h2name = document.createElement('h2');
        const divType = document.createElement('div');
        const sectionAddress = document.createElement('section');
        const h3Address = document.createElement('h3');
        const pTagAddress = document.createElement('p');
        const pTagAddressTwo = document.createElement('p');
        const sectionContact = document.createElement('section');
        const h3Contact = document.createElement('h3');
        const pTagContact = document.createElement('p');
        const sectionLinks = document.createElement('section');
        const aTagLink = document.createElement('a');
        const strong = document.createElement('strong');

        // set attributes
        divType.setAttribute('class', 'type');
        sectionAddress.setAttribute('class', 'address');
        sectionContact.setAttribute('class', 'phone');
        sectionLinks.setAttribute('class', 'link');
        aTagLink.setAttribute('href', `${brewery.website_url}`);
        aTagLink.setAttribute('target', '_blank');

        // content
        h2name.innerText = `${brewery.name}`;
        divType.innerText = `${brewery.brewery_type}`;
        h3Address.innerText = 'Address:';
        pTagAddress.innerText = `${brewery.street}`;
        strong.innerText = `${brewery.city}, ${brewery.postal_code.slice(0, 5)}`;

        h3Contact.innerText = 'Phone:';
        if (brewery.phone) {
            pTagContact.innerText = `${brewery.phone}`;
        } else {
            pTagContact.innerText = 'N/A';
        }
        aTagLink.innerText = 'Visit Website';

        // appending
        pTagAddressTwo.append(strong);
        sectionAddress.append(h3Address, pTagAddress, pTagAddressTwo);
        sectionContact.append(h3Contact, pTagContact);
        sectionLinks.append(aTagLink);
        li.append(h2name, divType, sectionAddress, sectionContact, sectionLinks);
        breweryList.append(li);
    });
}

// Event Handlers 
type.addEventListener('change', function typeSelect(event) {
    renderBrewerys()

})

searchInput.addEventListener('input', function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredBreweries = brew.brewerys.filter(brewery => {
    const breweryName = brewery.name.toLowerCase();
    return breweryName.includes(searchTerm);
  });
  
  renderBrewerys(filteredBreweries);
});



// Extension 2

function renderCityFilter() {
    cityForm.innerHTML = '';

    cityArray = []; 
    cityArrayFilter = []; 

    brew.brewerys.forEach(brewery => {
        const city = brewery.city;

        if (cityArray.includes(city))
         {
            return;
        }
        if (brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub')
        {

        cityArray.push(city);

        const cityInput = document.createElement('input');
        const cityLabel = document.createElement('label');

        cityInput.setAttribute('type', 'checkbox');
        cityInput.setAttribute('name', city);
        cityInput.setAttribute('value', city);
        cityLabel.setAttribute('for', city);
        cityLabel.innerText = city;

        cityForm.append(cityInput, cityLabel);

        cityInput.addEventListener('change', event => {
            const checked = event.target.checked;
           
      
           

            if (checked) {
                cityArrayFilter.push(city);
            } else {
                const index = cityArrayFilter.indexOf(city);
                if (index > -1) {
                    cityArrayFilter.splice(index, 1);
                }
            }
             

            renderBrewerys();

        })
    }

    })


    // Clear button
    clear.addEventListener('click', function () {

        cityForm.reset()
        cityArrayFilter = [];
        renderBrewerys();
    });

}



renderBrewerys()

