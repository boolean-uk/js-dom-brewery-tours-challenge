// USER ENTERS A STATE IN THE SEARCH FIELD:
//     - Add a SUBMIT event listener to the submit button
//     - Prevent page from refreshing
//     - Store the input value of #select-state
//     - Check if the the number of characters is > 0
//     - If state has 2 words, replace spaces with an underscore '_'
//     - Call function that sends GET request: fetchBreweriesByState(STATE_NAME)

//    MAKE A GET REQUEST: fetchBreweriesByState(STATE_NAME):
//     - Use FETCH and THEN to receive the data from server
//     - Server documentation: https://www.openbrewerydb.org/documentation    -
//     - fetch: https://api.openbrewerydb.org/breweries?by_state=STATE_NAME&per_page=50
//     - No need to specify OPTIONS
//     - Convert response to JSON object
//     - Use forEach to filter out breweries that doesn't have a type of Micro, Regional or Brewpub
//     - Push the JSON object to state.breweries
//     - Call function to render the breweries
//     - Throw away HTML

//     FILTER BREWERIES BY TYPE:
//         - call renderMicroBreweries() if micro is selected
//         - call renderRegionalBreweries() if regional is selected
//         - call renderBrewpubBreweries() if brewpub is selected

//    RENDER BREWERIES: renderBreweries()
//     - Create HTML elements and set attributes
//         - Follow the template in templates/standard-list-items.html
//     - Append the elements

// STATE
const state = {
  breweries: [], // state.breweries
  microBreweries: [],
  regionalBreweries: [],
  brewpubBreweries: [],
};
// EXISTING ELEMENTS QUERY SELECTORS
const searchButton = document.querySelector("#select-state-form");
const breweriesUL = document.querySelector("#breweries-list");
const filterForm = document.querySelector("#filter-by-type-form");

function fetchBreweriesByState(stateName) {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((stateData) => {
      console.log("stateData: ", stateData);
      // Use forEach to filter out breweries that doesn't have a type of Micro, Regional or Brewpub
      // If type matches, push the JSON object to state.breweries
      stateData.forEach((brewery) => {
        if (brewery.brewery_type === "micro") {
          state.breweries.push(brewery);
        } else if (brewery.brewery_type === "regional") {
          state.breweries.push(brewery);
        } else if (brewery.brewery_type === "brewpub") {
          state.breweries.push(brewery);
        }
      });

      console.log(state.breweries);
      /*  stateData.forEach((item) => {
        console.log(item.id, "======", item.brewery_type.toUpperCase());
      });
      console.log("=================================");
      console.log("FILTERED DATA IN STATE.BREWERIES: ");
      console.log("=================================");

      state.breweries.forEach((item) => {
        console.log(item.id, "======", item.brewery_type.toUpperCase());
      }); */

      // Call function to render the breweries
      renderBreweries(state.breweries);
    });
}

function renderBreweries(breweriesToBeRendered) {
  // Throw away HTML so that page is updated
  breweriesUL.innerHTML = "";

  breweriesToBeRendered.forEach((listing) => {
    // CREATE ELEMENTS & SET ATTRIBUTES + PROPERTIES
    const breweryLI = document.createElement("li");

    const name = document.createElement("h2");
    name.innerText = listing.name;

    const type = document.createElement("div");
    type.setAttribute("class", "type");
    type.innerText = listing.brewery_type;

    const addressSection = document.createElement("section");
    addressSection.setAttribute("class", "address");

    const addressHeader = document.createElement("h3");
    addressHeader.innerText = "Address:";

    const street = document.createElement("p");
    street.innerText = listing.street;

    const cityAndPostalCode = document.createElement("p");
    cityAndPostalCode.innerHTML = `<strong>${listing.city}, ${listing.postal_code}</strong>`;

    const phoneSection = document.createElement("section");
    phoneSection.setAttribute("class", "phone");

    const phoneHeader = document.createElement("h3");
    phoneHeader.innerText = "Phone:";

    const phoneNumber = document.createElement("p");
    if (listing.phone === null) {
      phoneNumber.innerText = "N/A";
    } else {
      phoneNumber.innerText = listing.phone;
    }

    const websiteSection = document.createElement("section");
    websiteSection.setAttribute("class", "link");

    const websiteAnchor = document.createElement("a");
    websiteAnchor.setAttribute("href", listing.website_url);
    websiteAnchor.setAttribute("target", "_blank");
    websiteAnchor.innerText = "Visit Website";

    // APPEND ELEMENTS
    breweriesUL.append(breweryLI);
    breweryLI.append(name);
    breweryLI.append(type);

    breweryLI.append(addressSection);
    addressSection.append(addressHeader);
    addressSection.append(street);
    addressSection.append(cityAndPostalCode);

    breweryLI.append(phoneSection);
    phoneSection.append(phoneHeader);
    phoneSection.append(phoneNumber);

    breweryLI.append(websiteSection);
    websiteSection.append(websiteAnchor);
  });
}

// Read the text that the user inputs and store it in a variable
// event.target[0] is the first <input> in the form
searchButton.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop page from refreshing on submit

  const stateName = event.target[0].value;

  // Check if the the number of characters is > 0

  // Clear state.breweries array
  // state.breweries.splice(0, state.breweries.length);
  state.breweries = [];

  // Call function that sends GET request: fetchBreweriesByState(STATE_NAME)
  fetchBreweriesByState(stateName);
});

// FILTER BREWERIES BY TYPE
filterForm.addEventListener("change", (event) => {
  //console.log("micro submitted");
  const selectedOption = event.target.value;
  console.log(selectedOption);
  filterByType(selectedOption);
});

function filterByType(selectedOption) {
  if (selectedOption === "micro") {
    state.breweries.forEach((brewery) => {
      if (brewery.brewery_type === "micro") {
        state.microBreweries.push(brewery);
      }
    });
    renderBreweries(state.microBreweries);
  } else if (selectedOption === "regional") {
    state.breweries.forEach((brewery) => {
      if (brewery.brewery_type === "regional") {
        state.regionalBreweries.push(brewery);
      }
    });
    renderBreweries(state.regionalBreweries);
  } else if (selectedOption === "brewpub") {
    state.breweries.forEach((brewery) => {
      if (brewery.brewery_type === "brewpub") {
        state.brewpubBreweries.push(brewery);
      }
    });
    renderBreweries(state.brewpubBreweries);
  } else {
    renderBreweries(state.breweries);
  }
}
