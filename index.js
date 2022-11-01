// create const for local state
const state = {
  userSearch: "",
  breweryList: [],
  filterByBreweryType: "",
};

// create a function to make a GET request with fetch to recieve data from server
// Make a GET request with fetch to https://api.openbrewerydb.org/breweries to load all breweries from the server and render them in a list.

function getAndRenderBreweryList() {
  // get what the user type
  const searchBar = document.querySelector("#select-state");
  const searchTerm = searchBar.value.toLowerCase().trim();
  state.userSearch = searchTerm;
  searchBar.value = "";

  // add it to the string and send the fetch

  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;
  fetch(url)
    .then((res) => res.json())
    .then((breweryList) => {
      console.log("got breweries:", breweryList);
      state.breweryList = [];

      // call the createBreweryList function and returns the brewery type includes micro, original and brewpub by implementing if statement
      breweryList.forEach((brewery) => {
        if (
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "brewpub" ||
          brewery.brewery_type === "regional"
        ) {
          state.breweryList.push(brewery);
        } else {
          return;
        }
      });
      createBreweryList(state.breweryList);
      // filterBrew();
    });
}

// create a function that renders the li and append accordingly to display in html
const breweriesList = document.querySelector(".breweries-list");
function createBreweryList(breweries) {
  breweriesList.innerHTML = "";
  breweries.forEach((brewery) => {
    const li = document.createElement("li");
    breweriesList.appendChild(li);
    const h2 = document.createElement("h2");
    h2.innerText = brewery.name;
    li.appendChild(h2);
    const div = document.createElement("div");
    div.setAttribute("class", "type");
    div.innerText = brewery.brewery_type;
    li.appendChild(div);
    const sectionAddress = document.createElement("section");
    sectionAddress.setAttribute("class", "address");
    div.appendChild(sectionAddress);
    const h3 = document.createElement("h3");
    h3.innerText = "Address";
    li.appendChild(h3);
    const p1 = document.createElement("p");
    p1.innerText = brewery.street;
    h3.appendChild(p1);
    const p2 = document.createElement("p");
    p2.innerText = `${brewery.city} ${brewery.postal_code}`;
    p2.setAttribute("style", "font-style: bold");
    h3.appendChild(p2);
    const sectionPhone = document.createElement("section");
    sectionPhone.setAttribute("class", "phone");
    li.appendChild(sectionPhone);
    const h3_phone = document.createElement("h3");
    h3_phone.innerText = "Phone";
    sectionPhone.appendChild(h3_phone);
    const p3 = document.createElement("p");
    p3.innerText = brewery.phone;
    h3_phone.appendChild(p3);
    const section = document.createElement("section");
    section.setAttribute("class", "link");
    li.appendChild(section);
    const a = document.createElement("a");
    a.setAttribute("href", brewery.website_url);
    a.setAttribute("target", "_blank");
    a.innerText = "Visit Website";
    section.appendChild(a);
  });
}

//serach button to get the selected brewey type when customer search the state
// which includes only micro, original and brewpub
// add an event listener and call the function that renders brewery type accordingly.
const searchState = document.querySelector("#select-state-form");
searchState.addEventListener("submit", (event) => {
  // prevent page reload
  event.preventDefault();
  //get value from the input field by calling render function -getAndRenderBreweryList()
  getAndRenderBreweryList();
});

// FILTERED Brewery
// create a function to match the filter criteria that can be called later in an event listener for dropdown list.
// function for filter
function filterBrew() {
  //  brewery filter: whether brewery_type === state.filterByBreweryType
  if ( state.filterByBreweryType === ""){
    createBreweryList(state.breweryList)
  } else {
    let filteredList = state.breweryList.filter((item) => {
      if (item.brewery_type === state.filterByBreweryType) return true; // keep it
      else return false; //reject item
    });
    createBreweryList(filteredList);
  }
}

// add an eventListener for filter for brewery type
const changeBrewType = document.querySelector("#filter-by-type");
changeBrewType.addEventListener("change", (event) => {
  event.preventDefault();
  state.filterByBreweryType = event.target.value;
  console.log(state.filterByBreweryType);
  filterBrew();
});
