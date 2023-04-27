// Create the state and initialise it.
const state = {
  breweries: [],
  selectedType: "",
  userStateSearch: "",
};

// Grab the elements
const breweriesList = document.querySelector(".breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const searchInput = document.querySelector("#select-state");
const selectBreweryType = document.querySelector("#filter-by-type");

// Store the base URL inside a variable.
const baseUri = "https://api.openbrewerydb.org/breweries";

// Render the list on the screen and apply the fetched data.
function renderBreweries() {
  breweriesList.innerHTML = "";

  state.breweries.forEach((brewery) => {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h3Phone = document.createElement("h3");
    const div = document.createElement("div");
    const section1 = document.createElement("section");
    const section2 = document.createElement("section");
    const section3 = document.createElement("section");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const a = document.createElement("a");

    div.setAttribute("class", "type");
    section1.setAttribute("class", "address");
    p2.setAttribute("style", "font-weight : bold");
    section2.setAttribute("class", "phone");
    section3.setAttribute("class", "link");
    a.setAttribute("href", brewery.website_url);
    a.setAttribute("target", "_blank");

    p1.innerText = brewery.street;
    h2.innerText = brewery.name;
    div.innerText = brewery.brewery_type;
    h3.innerText = "Address:";
    p2.innerText = brewery.city + "  " + brewery.postal_code;
    h3Phone.innerText = "Phone:";
    p3.innerText = brewery.phone;
    a.innerText = "Visit Website";

    breweriesList.appendChild(li);
    li.appendChild(h2);
    li.appendChild(div);
    li.appendChild(section1);
    section1.appendChild(h3);
    section1.appendChild(p1);
    section1.appendChild(p2);
    li.appendChild(section2);
    section2.appendChild(h3Phone);
    section2.appendChild(p3);
    li.appendChild(section3);
    section3.appendChild(a);
  });
}

// From the list, retrieve only micro, regional and brewup types.
function filterBreweries(breweries) {
  const typesOfBrewery = ["micro", "regional", "brewpub"];

  const results = breweries.filter((breweries) =>
    typesOfBrewery.includes(breweries.brewery_type)
  );

  return results;
}

// Add event listener to the input field and filter by the entered value.
stateSearch.addEventListener("submit", (event) => {
  // This will prevent default.
  event.preventDefault();

  const search = searchInput.value.toLowerCase().trim();
  state.userStateSearch = search;

  fetch(`${baseUri}?by_state=${state.userStateSearch}&per_page=9`)
    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
      state.breweries = filterBreweries(breweries);
      renderBreweries();
    });

  searchInput.value = "";
});

// Brewery will be filtered by brewery type
selectBreweryType.addEventListener("change", (event) => {
  // This will prevent default.
  event.preventDefault();

  state.selectedType = selectBreweryType.value;

  fetch(`${baseUri}?by_type=${state.selectedType}&per_page=9`)
    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
      state.breweries = filterBreweries(breweries);
      renderBreweries();
    });
});


// The first time the page is loaded, some New York breweries will be loade on the page.
function loadBreweryData() {
  fetch(`${baseUri}?by_state=new_york&per_page=9`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.breweries = data;
      renderBreweries();
    });
}

loadBreweryData();
