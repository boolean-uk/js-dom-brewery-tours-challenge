// REQUIREMENT 1: show a list of breweries for a US state
const state = {
  brewery: [],
  breweryList: [],
  filterByBreweryType: "",
  userSearch: "",
};

// - note: only show micro, regional and brewpub
// ACTIONS
// - add a listener for the search form submission which triggers the GET request
//    - the HTML element to listen for submission: <form> #select-state-form
//    - don't forget to prevent default form behaviour on submit event
//    - read the us state name from <input> #select-state
//    - check the us state name length > 0
//    - call getBreweriesByState(stateName)
// - make a GET request to fetch breweries, by state (this is the one the user typed)
//   GET https://api.openbrewerydb.org/breweries?by_state=US_STATE_NAME&per_page=50
//   if a us state has 2 words, then the " " should be replaced with "_"
//   replace(): https://www.w3schools.com/jsref/jsref_replace.asp
// - on FETCH response: save the fetched data into local state: state.breweries
// - render list of breweries
// - during render of list, filter out by type to keep micro, regional and brewpub

//select exiting html elements
const stateForm = document.querySelector("#select-state-form");
const stateInput = document.querySelector("#select-state");

const filterForm = document.querySelector("#filter-by-type-form");

const breweriesList = document.querySelector("#breweries-list");

// add event listener
stateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  breweriesList.innerHTML = "";
  stateInput.setAttribute("value", "");

  const placeName = stateInput.value;
  console.log(placeName);

  console.log("e", e);

  if (placeName.length > 0) {
    getBre(placeName);
  } else {
    alert("plese try again later");
  }
});
//network requests
const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;
fetch(url)
  .then((res) => res.json())
  .then((breweryList) => {
    console.log("get breweries:", breweryList);
    state.breweryList = [];

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
  });

//redener li and append
function createBreweryList(breweries) {
  (breweriesList.innerHTML = ""),
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
      h3.innerText = "address";
      li.appendChild(h3);
      const p1 = document.createElement("p");
      p1.innerText = brewery.street;
      li.appendChild(p1);
      const p2 = document.createElement("p");
      p2.innerText = `${brewery.city}${brewery.postal_code}`;
      p2.setAttribute("style", "font-style:bold");
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
//filter
function filterBrew() {
  if (state.filterByBreweryType === "") {
    createBreweryList(state.breweryList);
  } else {
    let filteredList = state.breweryList.filter((item) => {
      if (item.brewey_type === state.filterByBreweryType) return true;
      else false;
    });
  }

  createBreweryList(filteredList);
}

const changeBrewType = document.querySelector("#filter-by-type");
changeBrewType.addEventListener("change", (event) => {
  state.filterByBreweryType = event.target.value;
  filterBrew();
});

//start
