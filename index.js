const ulContainer = document.querySelector('#breweries-list');
const main = document.querySelector('main');
const state = {
    breweries: []
};

const renderSearchItems = (theSearchInput) => {
    theSearchInput.addEventListener('keyup', (e) => {
        ulContainer.innerHTML = '';
        const searchValue = e.target.value.toLowerCase();
        const filterSearch = state.breweries.filter((brewery) => brewery.name.toLowerCase().includes(searchValue));
        renderBreweryList(filterSearch);
    });
};

const renderSearchByState = (breweries) => {
    const SearchByStateForm = document.querySelector('#select-state-form');
    const search = document.querySelector('input[type="text"]');

    SearchByStateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        ulContainer.innerHTML = '';

        const searchValue = search.value.toLowerCase();

        if (searchValue.trim() !== '') {
            const searchByState = breweries.filter((brewery) => brewery.state.toLowerCase() === searchValue);
            renderBreweryList(searchByState);
        } else{
            ulContainer.innerHTML = '';
            renderBreweryList(breweries);
        }

        search.addEventListener('input', (e) => {
            ulContainer.innerHTML = '';
            const searchValue = e.target.value.toLowerCase();
            renderBreweryList(breweries);
        });

    });




};

const renderSearchBar = () => {
    const searchBar = document.createElement('header');
    const searchBreweryForm = document.createElement('form');
    searchBreweryForm.id = 'search-breweries-form';
    searchBreweryForm.autocomplete = 'off';
    searchBar.append(searchBreweryForm);

    const searchLabel = document.createElement('label');
    searchLabel.setAttribute('for', 'search-breweries');

    const searchTitle = document.createElement('h2');
    searchTitle.innerText = 'Search breweries:';
    searchLabel.append(searchTitle);
    searchBreweryForm.append(searchLabel);

    const searchInput = document.createElement('input');
    searchInput.id = 'search-breweries';
    searchInput.name = 'search-breweries';
    searchInput.type = 'text';
    searchBreweryForm.append(searchInput);

    const heading = document.querySelector('h1');
    heading.insertAdjacentElement("afterend", searchBreweryForm);
    main.append(searchBar);

    renderSearchItems(searchInput);
};

const renderByType = () => {
    const filterByType = document.querySelector('#filter-by-type');

    filterByType.addEventListener('change', () => {
        ulContainer.innerHTML = '';
        const selectedByType = filterByType.value;
        const filteredBreweries = state.breweries.filter((brewery) => brewery.brewery_type === selectedByType && selectedByType !== "");
        renderBreweryList(filteredBreweries);
    });
};

const renderBreweryList = (breweries) => {
    breweries.forEach((brewery) => {
        const listContainer = document.createElement('li');
        ulContainer.append(listContainer);

        const breweryTitle = document.createElement('h2');
        breweryTitle.innerText = brewery.name;
        listContainer.append(breweryTitle);

        const breweryType = document.createElement('div');
        breweryType.classList.add('type');
        breweryType.innerText = brewery.brewery_type;
        listContainer.append(breweryType);

        const AddressSection = document.createElement('section');
        AddressSection.classList.add('address');
        listContainer.append(AddressSection);

        const addressTitle = document.createElement('h3');
        addressTitle.innerText = 'Address:';
        AddressSection.append(addressTitle);

        const addressNumber = document.createElement('p');
        addressNumber.innerText = brewery.street;
        AddressSection.append(addressNumber);

        const postCodeContainer = document.createElement('p');
        AddressSection.append(postCodeContainer);

        const postCode = document.createElement('strong');
        postCode.innerText = `${brewery.city}, ${brewery.postal_code}`;
        postCodeContainer.append(postCode);

        const phoneSection = document.createElement('section');
        phoneSection.classList.add('phone');
        listContainer.append(phoneSection);

        const phoneTitle = document.createElement('h3');
        phoneTitle.innerText = 'Phone:';
        phoneSection.append(phoneTitle);

        const contactQuestion = document.createElement('p');
        contactQuestion.innerText = brewery.phone;
        phoneSection.append(contactQuestion);

        const linkSection = document.createElement('section');
        linkSection.classList.add('link');
        listContainer.append(linkSection);

        const link = document.createElement('a');
        linkSection.append(link);
        link.setAttribute('href', brewery.website_url);
        link.target = '_blank';
        link.innerText = 'Visit Website';
    });
};

const renderwithEachCity = (input, breweries) => {
    input.addEventListener('change', () => {
        if (input.checked) {
            ulContainer.innerHTML = '';
            const filterCities = breweries.filter((brewery) => brewery.city === input.value);
            renderBreweryList(filterCities);
        } else {
            ulContainer.innerHTML = '';
            renderBreweryList(state.breweries);
        }
    });
};

const filterByCity = (location) => {
    const filterMainSection = document.querySelector('.filters-section');

    const filterByCityHeading = document.createElement('div');
    filterByCityHeading.classList.add('filter-by-city-heading');

    const cityHeading = document.createElement('h3');
    cityHeading.innerText = 'Cities';
    filterByCityHeading.append(cityHeading);

    const cityButton = document.createElement('button');
    cityButton.innerText = 'clear all';
    cityButton.classList.add('clear-all-btn');
    filterByCityHeading.append(cityButton);

    const clearAll = (inputElement) => {
        cityButton.addEventListener('click', () => {
            inputElement.checked = false
            ulContainer.innerHTML = '';
            renderBreweryList(state.breweries);
        })
    }

    const cityForm = document.createElement('form');
    location.forEach((city) => {
        const cityInput = document.createElement('input');
        cityInput.type = 'checkbox';
        cityInput.name = city.city;
        cityInput.value = city.city;

        const cityLabel = document.createElement('label');
        cityLabel.setAttribute('for', city.city);
        cityLabel.innerText = city.city;

        cityForm.append(cityInput);
        cityForm.append(cityLabel);

        clearAll(cityInput)

        renderwithEachCity(cityInput, state.breweries);
    });

    filterMainSection.append(filterByCityHeading);
    filterMainSection.append(cityForm);
};

const getBreweryDetails = () => {
    fetch('https://api.openbrewerydb.org/breweries')
        .then((response) => response.json())
        .then((data) => {
            state.breweries = data;
            renderSearchByState(state.breweries);
            renderBreweryList(state.breweries);
            renderByType();
            filterByCity(state.breweries);
        })
        .catch((err) => console.log('Error in my code', err));
};

renderSearchBar();
getBreweryDetails();

