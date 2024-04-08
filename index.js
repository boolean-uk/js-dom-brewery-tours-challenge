//Build brewery card
const buildCard = (brewery) => {
  const breweryList = document.querySelector("#breweries-list");

  const li = document.createElement("li");
  li.classList.add('brewery-card')

  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;
  li.append(h2);

  const div = document.createElement("div");
  div.innerText = brewery.brewery_type;
  div.classList.add("type");
  li.append(div);

  const addSection = document.createElement("section");
  addSection.classList.add("address");

  const addressH3 = document.createElement("h3");
  addressH3.innerText = "Address:";
  addSection.append(addressH3);

  const line1P = document.createElement("p");
  line1P.innerText = brewery.address_1;
  addSection.append(line1P);

  const line2P = document.createElement("p");
  const strongText = document.createElement("strong");
  strongText.innerText = `${brewery.city}, ${brewery.postal_code}`;
  line2P.append(strongText);
  addSection.append(line2P);

  li.append(addSection);

  const phoneSection = document.createElement("section");
  phoneSection.classList.add("phone");

  const phoneH3 = document.createElement("h3");
  phoneH3.innerText = "Phone:";
  phoneSection.append(phoneH3);

  const phoneP = document.createElement("p");
  if (brewery.phone) {
    phoneP.innerText = brewery.phone;
  } else {
    phoneP.innerText = "N/A";
  }
  phoneSection.append(phoneP);

  li.append(phoneSection);

  if (brewery.website_url) {
    const linkSection = document.createElement("section");
    linkSection.classList.add("link");
    const link = document.createElement("a");
    link.innerText = "Visit Website";
    link.setAttribute("target", "_blank");
    link.setAttribute("href", brewery.website_url);
    linkSection.append(link);
    li.append(linkSection);
  }

  breweryList.append(li);
};

//Render cards
const render = async (state, type) => {
  const breweryList = document.querySelector("#breweries-list");
  breweryList.innerHTML = "";

  const defaultBreweryTypes = ["micro", "regional", "brewpub"];
   
  if (!type) {
    defaultBreweryTypes.forEach(async (element) => {
      const data = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&by_type=${element}`
      );
      const json = await data.json();
      json.forEach((element) => {buildCard(element)});
    });
  } else {
    const data = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&by_type=${type}`
      );
      const json = await data.json();
      json.forEach((element) => {buildCard(element)});
  }
};

//Get search state input and filter input then trigger render
const stateSearchForm = document.querySelector("#select-state-form");
stateSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = document.querySelector("#select-state").value;

  const typeFilter = document.querySelector("#filter-by-type");
  if (typeFilter.value.length > 0) {
    render(searchInput, typeFilter.value);
  } else {
    render(searchInput);
  }
});

//Search rendered breweries with search bar
const searchBreweryForm = document.querySelector('#search-breweries-form')
searchBreweryForm.addEventListener('keyup', (event) => {
    const input = document.querySelector('#search-bar')
    const populatedBreweries = document.querySelectorAll('.brewery-card')

    for (let i = 0; i < populatedBreweries.length; i++) {
        if (!displayNode(input.value, populatedBreweries[i])) {
            console.log(populatedBreweries[i])
            populatedBreweries[i].style.display = 'none'
        } else {
            populatedBreweries[i].style.display = 'grid'
        }
    }
})

//Checks if brewery name matches search input
const displayNode = (input, node) => {
    return node.querySelector('h2').innerText.toLowerCase().startsWith(input)
}
