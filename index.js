const state = {
  breweries: []
};

const searchInput = document.querySelector('input[type="submit"]');
const breweryList = document.querySelector('.breweries-list');
const filterSelect = document.querySelector('#filter-by-type');

searchInput.addEventListener("click", function(event) {
  event.preventDefault();
  const searchValue = document.querySelector('#select-state').value.trim().toLowerCase();
  console.log("search has been clicked!", searchValue);
  if (searchValue) {
    fetchBreweries(searchValue);
  }
});

filterSelect.addEventListener("change", function(event) {
  const selectedType = event.target.value;
  const searchValue = document.querySelector('#select-state').value.trim().toLowerCase();
  console.log("filter type has changed!", searchValue);
  if (searchValue) {
    fetchBreweries(searchValue, selectedType);
  }
});

function fetchBreweries(state, selectedType) {
  let url = `https://api.openbrewerydb.org/v1/breweries?by_state=${state}`;
  if (selectedType) {
    url += `&by_type=${selectedType}`;
  }
  console.log('Does it contian',url )

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const filteredBreweries = data.filter(brewery => brewery.state.toLowerCase() === state);
      
      renderBreweries(filteredBreweries);
    });
}

function renderBreweries(breweries) {
    breweryList.innerHTML = '';

    breweries.forEach(brewery => {
    const li = document.createElement("li");
    breweryList.append(li);

    const name = document.createElement("h2");
    name.innerText = brewery.name;
    li.append(name);

    const div = document.createElement("div");
    li.append(div);
    div.innerText = brewery.brewery_type;
    div.className = "type";

    const address = document.createElement("section");
    address.className = "address";
    li.append(address);

    const h3 = document.createElement("h3");
    h3.innerText = "Address";
    address.append(h3);

    const p1 = document.createElement("p");
    p1.innerText = brewery.address_1;
    address.append(p1);

    const p2 = document.createElement("p");
    p2.innerText = brewery.postal_code;
    address.append(p2);

    const phone = document.createElement("section");
    phone.className = "phone";
    li.append(phone);

    const header2 = document.createElement("h3");
    header2.innerText = "Phone";
    phone.append(header2);

    const p3 = document.createElement("p");
    p3.innerText = brewery.phone;
    phone.append(p3);

    const link = document.createElement("section");
    link.className = "link";
    li.append(link);

    const websiteLink = document.createElement("a");
    websiteLink.innerText = "Visit Website";
    websiteLink.setAttribute("href", brewery.website_url);
    websiteLink.setAttribute("target", "_blank");
    link.append(websiteLink);
  });
}
  






  // user inputs a state in the search bar
  // event listener on the search bar
  // find function to match the search input to the data
  // display the data and relavent data in a list
  // 
  
  // create a function that renders all the ls elements
  
  