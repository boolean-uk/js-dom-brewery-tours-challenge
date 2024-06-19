const state = {
  breweries: [],
  breweriesDisplayed: [],
  searchedBreweries: [],
  filteredBreweries: [],
};

// Keeping some elements global for ease of access:
let breweryData = state.breweries;
let breweriesToDisplay = state.breweriesDisplayed;
let searchedBreweryData = state.searchedBreweries;
//This function stores the page Number (extension 3 - pagination)
let page = 0;
const searchStateInput = document.querySelector("#select-state");
const selectfilter = document.querySelector("select");
const cityFilterSection = document.createElement("section");

//This is the first function. Its job is to filter the brewery data from the breweryAPI. It fetches data based off user input in the search bar.
function filterBreweryData() {
  //This function also immediately renders the second search bar so that it appears on the screen ready to go:
  renderBrewerySearchBar();
  //This function only work once the user inputs a letter/state. The search updates as the user types:
  searchStateInput.addEventListener("keyup", async () => {
    breweryData = [];
    breweriesToDisplay = [];
    page = 0;
    selectfilter.value = "";
    if (searchStateInput.value < 1) {
      breweryData = [];
    } else {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries?by_state=" +
          searchStateInput.value +
          "&per_page=200"
      );
      //This part of the code filters the data according to micro/regional/brewpub and pushes it into state.breweries array.
      let stateBreweries = await response.json();
      console.log("State Breweries", stateBreweries);
      stateBreweries.forEach((brewery) => {
        if (
          brewery.brewery_type === "micro" ||
          brewery.brewery_type === "regional" ||
          brewery.brewery_type === "brewpub"
        ) {
          breweryData.push(brewery);
        }
      });
      //THis part of the code takes the first 10 breweries of the state.breweries array and pushes it into the state.breweriesDisplayed array. This is so that I can have 10 items displayed and can update accordingly:
      for (let i = 0; i < breweryData.length; i++) {
        let brewery = breweryData[i];
        if (breweriesToDisplay.length < 10) {
          breweriesToDisplay.push(brewery);
        }
      }
      console.log("updated state", breweryData);

      console.log("breweries displayed", breweriesToDisplay);
    }
    //With the state.breweriesDisplayed array I am going to render the brewery LI (to display it on screen). I also pass this array through the enableSearchBar function so that the user can type in the second search bar and search the displayed breweries. Finally I pass this array also through the renderCityFilter so that the the displayed city on the side matches the breweries displayed:
    renderBreweryLi(breweriesToDisplay);
    enableSearchBar(breweriesToDisplay);
    renderCityFilter(breweriesToDisplay);
  });
}

//This part of the function displays the breweriesLI on screen.
function renderBreweryLi(breweriesToDisplay) {
  const breweryUL = document.querySelector(".breweries-list");
  breweryUL.innerHTML = "";

  breweriesToDisplay.forEach((brewery) => {
    const breweryLi = document.createElement("li");
    breweryUL.append(breweryLi);

    const breweryHeader = document.createElement("h2");
    breweryHeader.innerText = brewery.name;

    const breweryType = document.createElement("div");
    breweryType.className = "type";
    breweryType.innerText = brewery.brewery_type;

    const breweryAddress = document.createElement("section");
    breweryAddress.className = "address";

    const addressHeading = document.createElement("h3");
    addressHeading.innerText = "Address:";

    const breweryStreet = document.createElement("p");
    breweryStreet.innerText = brewery.address_1;

    const breweryPostCode = document.createElement("p");
    const postCodeText = document.createElement("strong");
    postCodeText.innerHTML = brewery.city + ", " + brewery.postal_code;
    breweryPostCode.append(postCodeText);
    breweryAddress.append(addressHeading, breweryStreet, breweryPostCode);

    const breweryPhone = document.createElement("section");
    breweryPhone.className = "phone";

    const phoneHeading = document.createElement("h3");
    phoneHeading.innerText = "Phone:";

    const phoneNumber = document.createElement("p");
    phoneNumber.textContent = brewery.phone;
    breweryPhone.append(phoneHeading, phoneNumber);

    const breweryWebsite = document.createElement("section");
    breweryWebsite.className = "link";

    const breweryWebLink = document.createElement("a");
    breweryWebLink.href = brewery.website_url;
    breweryWebLink.innerText = "Visit Website";
    breweryWebsite.append(breweryWebLink);

    //This part of the function deals with extension 4. It adds a "Add to List" button which users can click and it then creates a new POST in the local server. The user can then access this list using a link displayed int the header.
    const addToListBtn = document.createElement("button");
    addToListBtn.className = "addToListBtn";
    addToListBtn.innerText = "Add to List";
    breweryWebsite.append(addToListBtn);

    addToListBtn.addEventListener("click", async () => {
      console.log("You clicked the add to list button");
      const repsonse = await fetch("http://localhost:3000/myBreweries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: brewery.id,
          address_1: brewery.address_1,
          brewery_type: brewery.brewery_type,
          city: brewery.city,
          country: brewery.country,
          name: brewery.name,
          phone: brewery.phone,
          postal_code: brewery.postal_code,
          state: brewery.state,
          street: brewery.street,
          website_url: brewery.website_url,
        }),
      });
      //This function just console.logs the breweries in the user list. Helps with the backend.
      getMyData();
    });

    breweryLi.append(
      breweryHeader,
      breweryType,
      breweryAddress,
      breweryPhone,
      breweryWebsite
    );
  });

  //This part of the function deals with pagination. "Previous page" button is only added after the first page. Once clicked the page goes back a page.
  if (page > 0) {
    const previousPageButton = document.createElement("button");
    previousPageButton.id = "previous_page";
    previousPageButton.innerText = "Previous Page";
    breweryUL.append(previousPageButton);

    previousPageButton.addEventListener("click", () => {
      page--;
      loadNextPage();
    });
  } else {
    //Cant go back on page 1.
    console.log("You are on page 1.");
  }

  //This displays the page number which updates automatically.
  const pageNumber = document.createElement("p");
  pageNumber.innerText = page + 1;
  pageNumber.id = "page_number";
  breweryUL.append(pageNumber);
  const nextPageButton = document.createElement("button");
  nextPageButton.id = "next_page";
  nextPageButton.innerText = "Next Page";
  breweryUL.append(nextPageButton);

  //This addes the next page button which displays the next 10 breweries. 
  nextPageButton.addEventListener("click", () => {
    console.log("search State input", searchStateInput.value);
    if (searchStateInput.value != "") {
      page++;
      loadNextPage();
    } else {
      console.log("Please input a state");
    }
  });
}

//THis function renders the second search bar on screen. It also contains an addEventListener to the "my Brewery List" link also in the header (extension 4). This link (when clicked will display the breweries added to the users list):
function renderBrewerySearchBar() {
  const listHeading = document.querySelector("h1");

  const myBreweryList = document.createElement("a");
  myBreweryList.href = "";
  myBreweryList.className = "myBreweryList";
  myBreweryList.innerText = "My Brewery List";
  listHeading.append(myBreweryList);

  //This part of the function displays 'my brewery List'. It fetches the data from a local server. It then renders that list on the screen using renderBreweryLi(). It also can be searched using enableSearchBar(). It also displays the appropriate city filters using renderCityfilters().
  myBreweryList.addEventListener("click", async () => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/myBreweries");
    let myBreweries = await response.json();
    console.log(myBreweries);
    renderBreweryLi(myBreweries);
    enableSearchBar(myBreweries);
    renderCityFilter(myBreweries);
  });

  const searchHeader = document.createElement("h2");
  listHeading.append(searchHeader);

  const searchForm = document.createElement("form");
  searchForm.id = "search-breweries-form";
  searchForm.autocomplete = "off";
  searchHeader.append(searchForm);

  const searchBarLabel = document.createElement("label");
  searchBarLabel.for = "search-breweries";
  searchForm.append(searchBarLabel);

  const searchHeading = document.createElement("h2");
  searchHeading.innerText = "Search breweries:";
  searchBarLabel.append(searchHeading);

  const searchInput = document.createElement("input");
  searchInput.id = "search-breweries";
  searchInput.name = "search-breweries";
  searchInput.type = "text";
  searchForm.append(searchInput);
}

//This function deals with the search function of the search bar. It enables the user to search the breweries that are currently displayed.
function enableSearchBar(breweriesToDisplay) {
  const searchInput = document.querySelector("#search-breweries");
  //This function is initialised once the user starts typing and updates with each letter. The searched breweries are pushed into the state.searchedBreweries array. 
  searchInput.addEventListener("keyup", () => {
    selectfilter.value = "";
    let upperCaseInput = searchInput.value.toUpperCase();
    console.log(upperCaseInput);
    breweriesToDisplay.forEach((brewery) => {
      let found = brewery.name.match(upperCaseInput);
      if (found === null) {
        console.log("name not found");
      } else {
        searchedBreweryData.push(brewery);
      }
    });
    //This fuction then displays the searches breweries and then displayed the appropriate city filter based off of those searches breweries.
    renderBreweryLi(searchedBreweryData);
    renderCityFilter(searchedBreweryData);
    searchedBreweryData = [];
  });
  searchInput.value = "";
}

//This function deals with the city filters. It first displays the aside filters and then updates according to the data being passed through.
function renderCityFilter(breweriesToDisplay) {
  cityFilterSection.innerHTML = "";
  const filtersSection = document.querySelector(".filters-section");

  cityFilterSection.className = "city-filter-section";
  filtersSection.append(cityFilterSection);

  const cityFilterHeading = document.createElement("div");
  cityFilterHeading.className = "filter-by-city-heading";
  cityFilterSection.append(cityFilterHeading);

  const cityFilterHeader = document.createElement("h3");
  cityFilterHeader.innerText = "Cities";

  const clearButton = document.createElement("button");
  clearButton.className = "clear-all-btn";
  clearButton.innerText = "Clear All";
  cityFilterHeading.append(cityFilterHeader, clearButton);

  const cityForm = document.createElement("form");
  cityForm.id = "filter-by-city-form";
  cityFilterSection.append(cityForm);

  //These variables deal with the data needed for the city filters. "cityBreweries" deals stores all the cities of the displayed breweryLi. "filteredCityBreweries" contains the breweries which match the city the user checks.
  let cityBreweries = [];
  let filteredCityBreweries = [];

  //This part of the function deals with whether the cityBreweries array(above) already contains the city (from a brewery earlier in the list). This makes sure only one of each city is displayed.
  breweriesToDisplay.forEach((brewery) => {
    if (cityBreweries.includes(brewery.city)) {
      console.log("City already included");
    } else {
      cityBreweries.push(brewery.city);
    }
  });

  cityBreweries.sort();

  //This part of the function displays the city checkboxes based of the cities of the displayed breweries.
  cityBreweries.forEach((city) => {
    const filterCheckbox = document.createElement("input");
    filterCheckbox.type = "checkbox";
    filterCheckbox.name = city;
    filterCheckbox.value = city;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.for = city;
    checkboxLabel.innerText = city;
    cityForm.append(filterCheckbox, checkboxLabel);

    clearButton.addEventListener("click", () => {
      filteredCityBreweries = [];
      filterCheckbox.checked = false;
      renderBreweryLi(breweriesToDisplay);
    });

    //This part of the function deals with what happens when the user clicks the checkbox. If the user ticks the box it displays the filtered cities. If they unticks the box it removes that city from the filteredCityBreweries and therefore it is not displayed.
    filterCheckbox.addEventListener("change", function () {
      if (filterCheckbox.checked === true) {
        const selectedBreweries = breweriesToDisplay.filter(
          (brewery) => brewery.city === filterCheckbox.name
        );
        filteredCityBreweries = filteredCityBreweries.concat(selectedBreweries);
        console.log("filtered City Breweries:", filteredCityBreweries);
        renderBreweryLi(filteredCityBreweries);
        //This part of the function deals with what happens when a user unticks a box. It essentially removes the city from the filteredCityBreweries arrray and then re-displays the breweriesLi.
      } else if (
        filterCheckbox.checked === false &&
        filteredCityBreweries.length >= 1
      ) {
        let i = filteredCityBreweries.length;
        while (i--) {
          if (filteredCityBreweries[i].city === filterCheckbox.name) {
            filteredCityBreweries.splice(i, 1);
          }
        }
        renderBreweryLi(filteredCityBreweries);
      }
      //This part of the function ensures that the orignial breweriesToDisplay is displayed if the user has unchecks all city filters.
      if (filteredCityBreweries.length === 0) {
        renderBreweryLi(breweriesToDisplay);
      }
    });
  });
}

//This function deals with the loadNextPage function(extension 3 - pagination). How it works is that the breweriesToDisplay array updates with the next 10 arrays from the states.breweries array. This ensures that 10 items are always displayed even after filtering out the micro/regional/brewpub breweries.
async function loadNextPage() {
  breweriesToDisplay = [];
  selectfilter.value = "";

  let startingPlace = page * 10;
  for (let i = startingPlace; i < breweryData.length; i++) {
    let brewery = breweryData[i];
    if (breweriesToDisplay.length < 10) {
      breweriesToDisplay.push(brewery);
    }
  }
  //The new breweriesToDisplay data is then displayed on screen/search bar enabled/city filteres updated:
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderBreweryLi(breweriesToDisplay);
  enableSearchBar(breweriesToDisplay);
  renderCityFilter(breweriesToDisplay);
}

//This part of the function deals with the select filter on the left-aside. It updates the screen depending on the filter applied:
selectfilter.addEventListener("change", () => {
  let filteredBreweries = breweriesToDisplay.filter(
    (brewery) => brewery.brewery_type === selectfilter.value
  );
  console.log("filtered Breweries:", filteredBreweries);
  renderBreweryLi(filteredBreweries);
});

//This function just console.logs the data added to the users "My Brewery List" so that developer can keep track of it:
async function getMyData() {
  const response = await fetch("http://localhost:3000/myBreweries");
  let myServerData = await response.json();
  console.log("My Server Data", myServerData);
}


filterBreweryData();
