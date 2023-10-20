const search = document.getElementById("select-state");
const form = document.getElementById("select-state-form");
const filter = document.getElementById("filter-by-type");
const breweriesList = document.querySelector(".breweries-list");

const root = "https://api.openbrewerydb.org/v1/breweries";
let breweries = state.breweries;

const createBreweryCard = (breweries) => {
    breweries.forEach(brewery => {
        const li = document.createElement("li");

        // Card header
        const header = document.createElement("h2");
        header.innerText = brewery.name;

        // Type of brewery
        const type = document.createElement("div");
        type.setAttribute("class", "type");
        type.innerText = brewery.brewery_type;

        // Address of brewery
        const address = document.createElement("section");
        address.setAttribute("class", "address");
        
        const addressHeader = document.createElement("h3");
        addressHeader.innerText = "Address:"

        const addressParaI = document.createElement("p");
        addressParaI.innerText = brewery.street;

        const addressParaII = document.createElement("p");
        const strong = document.createElement("strong");
        addressParaII.append(strong);
        strong.innerText = `${brewery.city}, ${brewery.postal_code}`;

        address.append(
            addressHeader,
            addressParaI,
            addressParaII
            );
    
        // Phone no. of brewery
        const phone = document.createElement("section");
        phone.setAttribute("class", "phone");

        const phoneHeader = document.createElement("h3");
        phoneHeader.innerText = "Phone:"

        const phonePara = document.createElement("p");
        phonePara.innerText = brewery.phone

        phone.append(phoneHeader, phonePara);
    
        // Link to brewery website
        const link = document.createElement("section");
        link.setAttribute("class", "link");

        const a = document.createElement("a");
        a.href = brewery.website_url;
        a.target = "_blank";
        a.innerText = "Visit Website";

        link.append(a);

        // Append all created HTML/data
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

const getData = (state) => {
    fetch(`${root}?by_state=${state}`)
      .then(res => res.json())
      .then(data => {
        breweries = data.filter(brewery => 
            // Checking if current brewery.type includes given breweries type,
            // if so returns true and passes into the state.breweries
            ["micro", "regional", "brewpub"].includes(brewery.brewery_type)
        )
        createBreweryCard(breweries);
      })
};

const searchInput = (e) => {
    e.preventDefault()
    const userInput = search.value;

    getData(userInput);
    form.reset();
};

form.addEventListener("submit", searchInput)