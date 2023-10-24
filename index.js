const root = 'https://api.openbrewerydb.org/v1/breweries';
let breweries = [];
let types = [
    'micro',
    'brewpub',
    'regional',
];
const api = (str) => {
    return `${root}?${str}`;
};

const typeFilter = (dat) => {
    let out = [];
    dat.forEach((item) => {
        for (let i = 0; i < types.length; i++) {
            if (item.brewery_type === types[i]) {
                out.push(item);
            };
        };
    });
    return out;
}

const getBreweries = () => {
    breweries = [];

    fetch(`${root}/random?size=50`)
        .then((response) => response.json())
        .then((data) => {
            breweries = typeFilter(data);
            renderBreweries(); 
        });
}

const renderBreweries = () => {
    const list = document.querySelector('#breweries-list');
    list.textContent = '';
    breweries.forEach((item) => {
        const container = document.createElement('li');
        
        const title = document.createElement('h2');
        const type = document.createElement('div');
        const addressContainer = document.createElement('section');
        const addressh3 = document.createElement('h3');
        const addressp1 = document.createElement('p');
        const strong = document.createElement('strong');
        const addressp2 = document.createElement('p');

        const phoneContainer = document.createElement('section');
        const phoneh3 = document.createElement('h3');
        const phonep = document.createElement('p');
        
        const link = document.createElement('section');
        const a = document.createElement('a');

        title.innerText = item.name;
        type.innerText = item.brewery_type;
        addressh3.innerText = 'Address:';
        addressp1.innerText = item.street;
        strong.innerText = `${item.state}, ${item.postal_code}`;
        phoneh3.innerText = 'Phone:';
        phonep.innerText = item.phone;
        a.innerText = 'VISIT WEBSITE';

        type.className = 'type';
        addressContainer.className = 'address';
        addressContainer.append(addressh3, addressp1, addressp2);
        addressp2.append(strong);

        phoneContainer.className = 'phone';
        phoneContainer.append(phoneh3, phonep);

        link.className = 'link';
        a.href = `${item.website_url}`;
        link.append(a);

        container.append(title, type, addressContainer, phoneContainer, link);
        list.append(container);
    });
};



const typeButton = document.querySelector('#filter-by-type');

const search = document.querySelector('#select-state-form');
const searchInput = document.querySelector('#select-state');
search.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if (searchInput.value != '' && typeButton.value != '') {
        fetch(api(`by_state=${searchInput.value}&by_type=${typeButton.value}`))
        .then((response) => response.json())
        .then((data) => {
            breweries = data;
            renderBreweries();
        })
    } else if (searchInput.value != '') {
        fetch(api(`by_state=${searchInput.value}`))
        .then((response) => response.json())
        .then((data) => {
            breweries = typeFilter(data);
            renderBreweries();
        })
    } else if (typeButton.value != '') {
        fetch(api(`by_type=${typeButton.value}`))
        .then((response) => response.json())
        .then((data) => {
            breweries = data;
            renderBreweries();
        })
    } else {
        getBreweries();
    };
    
});

getBreweries();



