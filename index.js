const state = {
  breweries: [],
  typeofFilter: "",
  locationFilter: "",
  breweryName: "",
};

// SELECT STATIC ELEMENT
const brewerUlElement = document.getElementById("breweries-list");
const formFilter = document.getElementById("filter-by-type-form");
const searchFilter = document.getElementById("select-state-form");
const searchBreweryFilter = document.getElementById("search-breweries-form");

// INITIALIZE FUNCTIONS
function renderWebsite() {
  brewerUlElement.innerHTML = "";

  let filteredBreweries = state.breweries;

  // FILTERS
  if (state.typeofFilter != "") {
    filteredBreweries = state.breweries.filter((brewery) => {
      return brewery.brewery_type.includes(state.typeofFilter);
    });
  }

  if (state.locationFilter != "") {
    filteredBreweries = filteredBreweries.filter((brewery) => {
      return brewery.city.includes(state.locationFilter);
    });
  }

  if (state.breweryName != "") {
    filteredBreweries = filteredBreweries.filter((brewery) => {
      return brewery.name.includes(state.breweryName);
    });
  }
  // END FILTERS

  // START RENDERING
  for (const brewerie of filteredBreweries) {
    const liElement = createCardElement(brewerie);
    brewerUlElement.appendChild(liElement);
  }
}

// BREWERY CARD CREATION
function createCardElement(brewerie) {
  const liElement = document.createElement("li");

  const h2Element = document.createElement("h2");
  h2Element.innerText = brewerie.name;
  liElement.appendChild(h2Element);

  const divElement = document.createElement("div");
  divElement.className = "type";
  divElement.innerText = brewerie.brewery_type;
  liElement.appendChild(divElement);

  const section1Element = document.createElement("section");
  section1Element.className = "address";

  const section1h3element = document.createElement("h3");
  section1h3element.innerText = brewerie.address_2;
  section1Element.appendChild(section1h3element);

  const section1p1Element = document.createElement("p");
  section1p1Element.innerText = brewerie.street;
  section1Element.appendChild(section1p1Element);

  const section1p2Element = document.createElement("p");
  const strongElement = document.createElement("strong");
  strongElement.innerText = `${brewerie.city} ${brewerie.postal_code}`;
  section1p2Element.appendChild(strongElement);
  section1Element.appendChild(section1p2Element);
  liElement.appendChild(section1Element);

  const section2Element = document.createElement("section");
  section2Element.className = "phone";

  const section2h3Element = document.createElement("h3");
  section2h3Element.innerText = "Phone:";
  section2Element.appendChild(section2h3Element);

  const section2pElement = document.createElement("p");
  section2pElement.innerText = brewerie.phone;
  section2Element.appendChild(section2pElement);
  liElement.appendChild(section2Element);

  const section3Element = document.createElement("section");
  section3Element.className = "link";

  const section3aElement = document.createElement("a");
  section3aElement.setAttribute("href", brewerie.website_url);
  section3aElement.setAttribute("target", "_blank");
  section3aElement.innerText = "Visit Website";
  section3Element.appendChild(section3aElement);

  liElement.appendChild(section3Element);

  return liElement;
}

// CRUD FUNCTIONS
function getBreweriesApi() {
  fetch("http://localhost:3000/breweries", {})
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      state.breweries = resData;
      renderWebsite();
    });
}

// EVENTLISTNERS
// FILTER BY TYPE
formFilter.addEventListener("change", (event) => {
  event.preventDefault();

  state.typeofFilter = event.target.value;

  getBreweriesApi();
});

// FILTER BY SEARCH LOCATION
searchFilter.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  state.locationFilter = event.target[0].value;

  getBreweriesApi();
});

// FILTER BY SEARCH NAME OF BREWERY
searchBreweryFilter.addEventListener("input", (event) => {
  event.preventDefault();

  state.breweryName = event.target.value;

  getBreweriesApi();
});

// FILTER BE SEARCH BREWERY NAME

function initialize() {
  console.log("Initializing...");
  getBreweriesApi();
  console.log("Initialized!");
}

initialize();

// TEMPLATES
/*
<li>
  <h2>Snow Belt Brew</h2>
  <div class="type">micro</div>
  <section class="address">
    <h3>Address:</h3>
    <p>9511 Kile Rd</p>
    <p><strong>Chardon, 44024</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>N/A</p>
  </section>
  <section class="link">
    <a href="null" target="_blank">Visit Website</a>
  </section>
</li>
*/
