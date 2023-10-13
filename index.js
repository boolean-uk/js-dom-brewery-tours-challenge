const form = document.querySelector("#select-state-form");
const formInput = document.querySelector("input[type=text]");
const ul = document.querySelector("#breweries-list");
const dropdownMenu = document.querySelector("#filter-by-type");
const searchByNameForm = document.querySelector("#search-breweries-form");
const searchByNameInput = document.querySelector("#search-breweries");
const baseUrl = "https://api.openbrewerydb.org/v1/breweries";

const state = {
  breweryArr: [],
  filter: "optionVal",
};

// adding an event listener for dropdown menu
dropdownMenu.addEventListener("input", () => {
  let dropdownMenuVal = dropdownMenu.value;
  state.filter = dropdownMenuVal;

  let userInput = formInput.value.toLowerCase().split(" ").join("_");
  console.log(`userInput`, userInput);

  // fetching breweries by state
  fetch(`${baseUrl}?by_state=${userInput}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(`data`, data);
      // filtering fetched breweries by selected type
      let filteredByType = data.filter((brewery) => {
        return brewery.brewery_type === state.filter;
      });
      state.breweryArr = filteredByType;
      console.log(`state.breweryArr`, state.breweryArr);
      renderBreweries();
    });
});

// adding an event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let userInput = formInput.value.toLowerCase().split(" ").join("_");
  console.log(`userInput`, userInput);
  fetch(`${baseUrl}?by_state=${userInput}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      filterFetchedDataByType(data);
      renderBreweries();
    });
});

// creating a function to render breweries
const renderBreweries = () => {
  ul.innerHTML = "";
  state.breweryArr.forEach((element) => {
    const li = document.createElement("li");
    ul.append(li);
    const h2 = document.createElement("h2");
    h2.innerHTML = element.name;
    const div = document.createElement("div");
    div.setAttribute("class", "type");
    div.innerHTML = element.brewery_type;

    // address section
    const addresSection = document.createElement("section");
    addresSection.setAttribute("class", "address");
    const h3Address = document.createElement("h3");
    h3Address.innerHTML = "Address:";
    const pAddressStrt = document.createElement("p");
    pAddressStrt.innerHTML = element.address_1;
    const pAddressCity = document.createElement("p");
    pAddressCity.innerHTML = `<strong>${element.city}, ${element.postal_code}</strong>`;
    addresSection.append(h3Address, pAddressStrt, pAddressCity);

    // phone section
    const phoneSection = document.createElement("section");
    phoneSection.setAttribute("class", "phone");
    const h3Phone = document.createElement("h3");
    h3Phone.innerHTML = "Phone:";
    const phoneNr = document.createElement("p");
    phoneNr.innerHTML = element.phone;
    phoneSection.append(h3Phone, phoneNr);

    // link section
    const linkSection = document.createElement("section");
    linkSection.setAttribute("class", "link");
    const website = document.createElement("a");
    website.setAttribute("href", `${element.website_url}`);
    website.innerHTML = "Visit Website";
    website.setAttribute("target", "_blank");
    linkSection.append(website);

    li.append(h2, div, addresSection, phoneSection, linkSection);
  });
};

// creating a reusable function for fetching and filtering data by type
const filterFetchedDataByType = (fetchedData) => {
  let filtered = fetchedData.filter(
    (brewery) =>
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
  );
  state.breweryArr = filtered;
  console.log(`state.breweryArr`, state.breweryArr);
};

// Extension 1

// adding an event listener to input for searching breweries by name
searchByNameInput.addEventListener("input", (e) => {
  let searchByNameInputVal = e.target.value.toLowerCase();
  console.log(searchByNameInputVal);

  if (!searchByNameInputVal) {
    ul.innerHTML = "";
  } else {
    fetch(`${baseUrl}?by_name=${searchByNameInputVal}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        filterFetchedDataByType(data);
        renderBreweries();
      });
  }
});
