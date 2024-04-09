//Build brewery card
const buildCard = (brewery) => {
  const breweryList = document.querySelector("#breweries-list");

  if (
    brewery.brewery_type != "micro" &&
    brewery.brewery_type != "regional" &&
    brewery.brewery_type != "brewpub"
  ) {
    return;
  }

  const li = document.createElement("li");
  li.classList.add("brewery-card");

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
const render = async () => {
  const breweryList = document.querySelector("#breweries-list");
  breweryList.innerHTML = "";
  const searchInput = document.querySelector("#search-bar");
  searchInput.value = "";

  let url = "https://api.openbrewerydb.org/v1/breweries?";

  if (getState()) {
    url += `by_state=${getState()}&`;
  }
  if (getFilter()) {
    url += `by_type=${getFilter()}`;
  }

  const data = await fetch(url);
  const json = await data.json();
  json.forEach(buildCard);
};

//State functionality
const getState = () => {
  return document.querySelector("#select-state").value;
};

const stateForm = document.querySelector("#select-state-form");
stateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});

//Filter functionality
const getFilter = () => {
  return document.querySelector(`#filter-by-type`).value;
};

const typeFilter = document.querySelector("#filter-by-type");
typeFilter.addEventListener("change", (event) => {
  event.preventDefault();
  render();
});


//Search functionality
const searchBreweryForm = document.querySelector("#search-breweries-form");
let keyPresses = 0;
searchBreweryForm.addEventListener("keyup", () => {
  const input = document.querySelector("#search-bar");
  const populatedBreweries = document.querySelectorAll(".brewery-card");

  for (let i = 0; i < populatedBreweries.length; i++) {
    if (!nameMatchCheck(input.value, populatedBreweries[i])) {
      populatedBreweries[i].style.display = "none";
    } else {
      populatedBreweries[i].style.display = "grid";
    }
  }
  if (keyPresses % Math.floor(Math.random() * 15) === 0 && keyPresses !== 0) {
    console.log(keyPresses)
    console.log('now')
  }
  keyPresses++

});

//Checks if brewery name matches search input
const nameMatchCheck = (input, node) => {
  return node
    .querySelector("h2")
    .innerText.toLowerCase()
    .startsWith(input.toLowerCase());
};


