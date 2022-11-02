//Create const state = {
//  brewery: []
//}
//Have state = to a GET that returns breweries in a state that are Micro, Regional or Brewpub
//Have checks for any filters in the search above
// For each brewery create a li that contains:
// - Name
// - Type of brewery
// - Address
// - Phone Number
// -Link to website
// insert that li into html at query selected Ul to display to user
//
const breweriesList = document.querySelector(".breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const stateSearchInput = document.querySelector("#select-state");
const filterSelect = document.querySelector("#filter-by-type");
const state = {
  breweries: [],
  userStateSearch: "",
  filterType: "",
};
//function to fetch breweries in users selected state
function getBreweries() {
  const uri = `https://api.openbrewerydb.org/breweries?by_state=${state.userStateSearch}&per_page=50`;
  fetch(uri)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.breweries = [];
      // filters out any breweries that arent "micro", "brewpub" or "regional"
      data.forEach((brewery) => {
        if (
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional" ||
          brewery.brewery_type === "brewpub"
        ) {
          state.breweries.push(brewery);
        }
      });
    });
}
//Event listener to process the state the user wants to search in
stateSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  breweriesList.innerHTML = " ";
  const userState = stateSearchInput.value.toLowerCase().trim();
  state.userStateSearch = userState;
  getBreweries();
  renderBreweries();
  stateSearchInput.value = "";
});
//event listener
filterSelect.addEventListener("change", (event) => {
  event.preventDefault();
  state.filterType = filterSelect.value;
  renderBreweries();
});

//Function to render the breweries
function renderBreweries() {
  breweriesList.innerHTML = "";

  state.breweries.forEach((brewery) => {
    // checks if brewery meets filter requirement
    if (brewery.brewery_type === state.filterType || state.filterType === "") {
      const breweryLi = document.createElement("li");
      breweriesList.appendChild(breweryLi);

      const breweryName = document.createElement("h2");
      breweryName.innerText = brewery.name;
      breweryLi.appendChild(breweryName);

      const breweryType = document.createElement("div");
      breweryType.setAttribute("class", "type");
      breweryType.innerText = brewery.brewery_type;

      breweryLi.appendChild(breweryType);

      const breweryAddress = document.createElement("section");
      breweryAddress.setAttribute("class", "address");
      breweryLi.appendChild(breweryAddress);

      const breweryAddressH3 = document.createElement("h3");
      breweryAddressH3.innerText = "Address:";
      breweryAddress.appendChild(breweryAddressH3);

      const breweryStreet = document.createElement("p");
      breweryStreet.innerText = brewery.street;
      breweryAddress.appendChild(breweryStreet);

      const breweryCity = document.createElement("p");
      breweryAddress.appendChild(breweryCity);
      const strong = document.createElement("strong");
      strong.innerText = brewery.city + "  " + brewery.postal_code;
      breweryCity.appendChild(strong);

      const breweryPhone = document.createElement("section");
      breweryPhone.setAttribute("class", "phone");
      breweryLi.appendChild(breweryPhone);

      const breweryPhoneH3 = document.createElement("h3");
      breweryPhoneH3.innerText = "Phone:";
      breweryPhone.appendChild(breweryPhoneH3);

      const breweryPhoneNumber = document.createElement("p");
      breweryPhoneNumber.innerText = brewery.phone;
      breweryPhone.appendChild(breweryPhoneNumber);

      const breweryWebsite = document.createElement("section");
      breweryWebsite.setAttribute("class", "link");
      breweryLi.appendChild(breweryWebsite);

      const breweryWebsiteLink = document.createElement("a");
      breweryWebsiteLink.setAttribute("href", brewery.website_url);
      breweryWebsiteLink.setAttribute("target", "_blank");
      breweryWebsiteLink.innerText = "Visit Website";
      breweryWebsite.appendChild(breweryWebsiteLink);
    }
  });
}

getBreweries();
