const search = document.getElementById("select-state");
const searchForm = document.getElementById("select-state-form");
const filter = document.getElementById("filter-by-type");
const searchBreweryName = document.getElementById("search-breweries-form");
const breweriesList = document.querySelector(".breweries-list");

const root = "https://api.openbrewerydb.org/v1/breweries";
let breweries = state.breweries;

const getData = (state) => {
    fetch(`${root}?by_state=${state}`)
      .then(res => res.json())
      .then(data => {
        breweries = data.filter(brewery => 
            ["micro", "regional", "brewpub"].includes(brewery.brewery_type)
        )
        createBreweryCard(breweries)
      })
};

const clearBreweriesList = () => {
    const breweriesListAll = breweriesList.querySelectorAll("*");
    breweriesListAll.forEach(brewery => brewery.remove());
};

const createBreweryCard = (breweries) => {
    clearBreweriesList();
    breweries.forEach(brewery => {
        const li = document.createElement("li");
        
        const header = document.createElement("h2");
        header.innerText = brewery.name;

        const type = document.createElement("div");
        type.setAttribute("class", "type");
        type.innerText = brewery.brewery_type;

        const address = document.createElement("section");
        address.setAttribute("class", "address");
        
        const addressHeader = document.createElement("h3");
        addressHeader.innerText = "Address:"

        const addressPara1 = document.createElement("p");
        addressPara1.innerText = brewery.street;

        const addressPara2 = document.createElement("p");
        const strong = document.createElement("strong");
        addressPara2.append(strong);
        strong.innerText = `${brewery.city}, ${brewery.postal_code}`;

        address.append(
            addressHeader,
            addressPara1,
            addressPara2
            );

        const phone = document.createElement("section");
        phone.setAttribute("class", "phone");

        const phoneHeader = document.createElement("h3");
        phoneHeader.innerText = "Phone:"

        const phonePara = document.createElement("p");
        phonePara.innerText = brewery.phone

        phone.append(phoneHeader, phonePara);
    
        const link = document.createElement("section");
        link.setAttribute("class", "link");

        const a = document.createElement("a");
        a.href = brewery.website_url;
        a.target = "_blank";
        a.innerText = "Visit Website";

        link.append(a);

        li.append(
            header,
            type, 
            address, 
            phone, 
            link
            );
    
        breweriesList.append(li);
    });
};

const searchName = (e) => {
    e.preventDefault();
    const searchBreweries = document.querySelector("#search-breweries");
    const userInput = searchBreweries.value.toLowerCase();

    const filteredBreweries = breweries.filter(brewery =>
        brewery.name.toLowerCase().includes(userInput)
        );
    createBreweryCard(filteredBreweries);
};

const searchInput = (e) => {
    e.preventDefault();
    const userInput = search.value;

    getData(userInput);
    searchForm.reset();
};

const filterType = () => {
    let filteredBreweries;

    filter.value === "" ? createBreweryCard(breweries)
    : (filteredBreweries = breweries.filter(brewery => 
        brewery.brewery_type === filter.value), 
        createBreweryCard(filteredBreweries))
};

searchBreweryName.addEventListener("input", searchName);
searchForm.addEventListener("submit", searchInput);
filter.addEventListener("change",filterType);