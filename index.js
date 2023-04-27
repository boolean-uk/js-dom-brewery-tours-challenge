
//! State
const state = {
    userSearch: "",
    breweryList: [],
    filterByBreweryType: "",
    filterTitle: "",
  };
//!  Get the User Type
  function getAndRenderBreweryList() {
    const searchBar = document.querySelector("#select-state");
    const searchTerm = searchBar.value.toLowerCase().trim();
    state.userSearch = searchTerm;
    searchBar.value = "";
  
    const url = `https://api.openbrewerydb.org/breweries?by_state=${state.userSearch}`;
    fetch(url)
      .then((res) => res.json())
      .then((breweryList) => {
        console.log("got breweries:", breweryList);
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
  }
  
//! Select HTML Elements and Render 
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
  
//! Search Button to Get the Selected Brewey Type When Customer Search The State
//! addEventListener for search button
  const searchState = document.querySelector("#select-state-form");
  searchState.addEventListener("submit", (event) => {
//* Prevent Page Reload
    event.preventDefault();
    getAndRenderBreweryList();
  });
  
//! FILTERED Brewery
//! Create a function to match the filter criteria 
//! that can be called later in an event listener for dropdown list.
  function filterBrew() {
    if (state.filterByBreweryType === "") {
      createBreweryList(state.breweryList);
    } else {
      let filteredList = state.breweryList.filter((item) => {
        if (item.brewery_type === state.filterByBreweryType)
          return true; 
        else return false; 
      });
      createBreweryList(filteredList);
    }
  }
  
//! addEventListener 
  const changeBrewType = document.querySelector("#filter-by-type");
  changeBrewType.addEventListener("change", (event) => {
    state.filterByBreweryType = event.target.value;
    filterBrew();
  });
  
//! EXTENSION 1
//! Add an event listener for inputting value for SEARCH breweries in the SEARCH BAR
  const searchBreweries = document.querySelector(".search-bar");
  searchBreweries.addEventListener("keyup", (event) => {
    state.filterTitle = event.target.value;
    filterByTitle();
  });
//! SEARCH the brewery list after searching a particular state and then narrow down it to particular brewery.
//! Call back the the function in evebtlistener to render the data
  function filterByTitle() {
    let filteredBreweries = state.breweryList;
    if (filteredBreweries.length < 1) {
      console.log(filteredBreweries);
      return;
    }
    filteredBreweries = state.breweryList.filter((brewery) => {
      return brewery.name.toLowerCase().includes(state.filterTitle);
    });
    createBreweryList(filteredBreweries);
  }
  