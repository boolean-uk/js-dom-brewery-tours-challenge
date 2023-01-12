// REQUIREMENT 1: show a list of breweries for a US state
const state = {
  breweries: [],
  types: ["micro", "regional", "brewpub"],
  filterByType: "",
  search: "",
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
/*const stateForm = document.querySelector("#select-state-form");
const searchBar = document.querySelector("#select-state");
const searchTerm = searchBar.value.toLowerCase().trim();
state.userSearch = searchTerm;
searchBar.value = "";
const filterForm = document.querySelector("#filter-by-type-form");

const breweriesList = document.querySelector("#breweries-list");

// add event listener
/*stateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  breweriesList.innerHTML = "";
  // stateInput.setAttribute("value", "");

  const stateInput = document
    .querySelector("#select-state")
    .value.replace(" ", "_")
    .toLowerCase();
  const placeName = stateInput.value;
  console.log(placeName);

  console.log("event", event);

  fetch(
    "https://api.openbrewerydb.org/breweries?by_state=${state.filterState}&per_page=50"
  )
    .then((res) => res.json())
    .then((breweryList) => {
      console.log("get breweries:", breweryList);
      state.breweries = breweryList;
      createBreweryList();
    });
  // const getBreweries=

  //if (placeName.length > 0) {
  //getBreweries(placeName);
  //} else {
  // alert("plese try again later");
  // }
});

//network requests*/
/*const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;
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
      h3.innerText = "Address";
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

const searchState = document.querySelector("#select-state-form");
searchState.addEventListener("submit", (event) => {
  event.preventDefault();
  getAndRenderBreweryList();
});
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
*/

//select existing html elements
const renderBreweryList = document.querySelector("#breweries-list");
const byType = document.querySelector("#filter-by-type");
const input = document.querySelector("#select-state");
const stateForm = document.querySelector("#select-state-form");
//addeventlistener to state.form function
stateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = input.value.toLowerCase().trim();
  state.search = searchInput;
  searchInput.value = "";
  console.log(state.search);
  getBreweryData();
});
//
function getBreweryData() {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.search}`;
  fetch(url)
    .then((res) => res.json())
    .then((breweries) => {
      breweries.forEach((brewery) => {
        if (
          brewery.brewery_type === "brewpub" ||
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional"
        ) {
          state.breweries.push(brewery);
        }
        if (byType.value !== "") {
          state.filterByType = state.breweries.filter((brewery) => {
            return byType.value === brewery.brewery_type;
          });
          console.log("test1", state.filterByType);
          renderedBreweyInfo(state.filterByType);
        } else {
          console.log("test2", state.breweries);
          renderedBreweyInfo(state.breweries);
        }
        console.log("filtered list:", state.breweries);
      });
    });

  state.breweries = [];
}
//add eventlistener to byType filter
byType.addEventListener("change", (event) => {
  state.filterByType = state.breweries.filter((brewery) => {
    return byType.value === "" || brewery.brewery_type === byType.value;
  });
  console.log("by type:", state.filterByType);
  renderedBreweyInfo(state.filterByType);
});

//render and append li
function renderedBreweyInfo(breweries) {
  renderBreweryList.innerText = "";

  console.log("this is the breweries:", breweries);

  breweries.forEach((brewery) => {
    const li = document.createElement("li");
    renderBreweryList.appendChild(li);

    const h2 = document.createElement("h2");
    h2.innerText = brewery.name;
    li.appendChild(h2);

    const div = document.createElement("div");
    div.setAttribute("class", "type");
    div.innerText = brewery.brewery_type;
    li.appendChild(div);

    const section1 = document.createElement("section");
    section1.setAttribute("class", "address");
    li.appendChild(section1);

    const h3address = document.createElement("h3");
    h3address.innerText = "Address:";
    section1.appendChild(h3address);

    const p1 = document.createElement("p");
    p1.innerText = brewery.street;
    section1.appendChild(p1);
    const p2 = document.createElement("p");
    p2.innerText = brewery.city + " " + brewery.postal_code;
    p2.setAttribute("style", " bold");
    section1.appendChild(p2);

    const section2 = document.createElement("section");
    section2.setAttribute("class", "phone");
    li.appendChild(section2);

    const h3phone = document.createElement("h3");
    h3phone.innerText = "Phone:";
    section2.appendChild(h3phone);

    const p3 = document.createElement("p");
    p3.innerText = brewery.phone;
    section2.appendChild(p3);

    const section3 = document.createElement("section");
    section3.setAttribute("class", "link");
    li.appendChild(section3);

    const a = document.createElement("a");
    a.setAttribute("href", brewery.website_url);
    a.setAttribute("target", "_blank");
    a.innerText = "Visit Website";
    section3.appendChild(a);

    renderBreweryList.appendChild(li);
  });
  console.log("is rendering:2");
}

renderedBreweyInfo();
