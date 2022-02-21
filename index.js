const state = {
  breweries: [],
  brewerySearch: [],
  page: 1,
  breweriesPerPage: 10,
  visitBreweryList: []
};

//core criteria

const breweriesList = document.querySelector("#breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const filterBrewery = document.querySelector("#filter-by-type-form");
const resetFilterBrewery = document.querySelector("#filter-by-type");
const searchCurrentBreweries = document.querySelector("#search-breweries-form");
const filterByCity = document.querySelector("#filter-by-city-form");
const clearAll = document.querySelector(".clear-all-btn");
const showVisitList = document.querySelector('.visit-list')
const FIFTY_PER_PAGE = `&per_page=50`;
const breweryTypes = ["micro", "regional", "brewpub"];

stateSearch.addEventListener("submit", function (event) {
  event.preventDefault();

  const apiEndpoint = `https://api.openbrewerydb.org/breweries?by_state=${stateSearch["select-state"].value}`;
  retrieveBreweryData(apiEndpoint + FIFTY_PER_PAGE);

  resetFilterBrewery.value = "";

  filterBrewery.addEventListener("change", function (event) {
    if (event.target.value === "") {
      retrieveBreweryData(apiEndpoint + FIFTY_PER_PAGE);
    } else {
      retrieveBreweryData(
        apiEndpoint + `&by_type=${event.target.value}` + FIFTY_PER_PAGE
      );
    }
  });
});

function addBrewery(brewery) {
  const liElement = document.createElement("li");
  liElement.innerHTML = `<h2>${brewery.name}</h2>
  <div class="type">${brewery.brewery_type}</div>
  <section class="address">
    <h3>Address:</h3>
    <p>${brewery.street}</p>
    <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>${brewery.phone}</p>
  </section>
  <section class="link">
  <button>${visitListButtonText(brewery)}</button>
    <a href="${brewery.website_url}" target="_blank">Visit Website</a>
  </section>`;

  const visitList = liElement.querySelector('button')
  addAndDeleteVisitListButton(visitList, brewery)

  breweriesList.append(liElement);
}


function retrieveBreweryData(apiEndpoint) {
  state.page = 1;
  fetch(apiEndpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      state.breweries = response.filter((brewery) =>
        breweryTypes.includes(brewery.brewery_type)
      );
      state.breweries.forEach((brewery) => (brewery.isCityChecked = true));
      renderCities();
      renderBreweries();
      searchCurrentBreweries.reset();
    });
}

function renderBreweries(arrayOfBreweries = state.breweries) {
  breweriesList.innerHTML = "";
  arrayOfBreweries
    .filter((brewery) => brewery.isCityChecked === true)
    .filter((brewery) => isPaginated(arrayOfBreweries, brewery))
    .forEach((brewery) => addBrewery(brewery));

  if (howManyPages(arrayOfBreweries) > 1) {
    addPaginationButtons(arrayOfBreweries);
  }
}

//Extension 1 and 2 criteria

searchCurrentBreweries.addEventListener("input", function (event) {
  state.page = 1;
  state.brewerySearch = state.breweries.filter((brewery) =>
    brewery.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  renderBreweries(state.brewerySearch);
  renderCities(state.brewerySearch);
});

clearAll.addEventListener("click", function () {
  const checkboxes = filterByCity.querySelectorAll("input");
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  state.breweries.forEach((brewery) => (brewery.isCityChecked = false));
  state.brewerySearch.forEach((brewery) => (brewery.isCityChecked = false));
  renderBreweries();
});

function addCity(city) {
  const input = document.createElement("input");
  const label = document.createElement("label");

  input.setAttribute("type", "checkbox");
  input.setAttribute("name", city.toLowerCase());
  input.setAttribute("value", city.toLowerCase());

  label.setAttribute("for", city.toLowerCase());
  label.innerText = city;

  if (isCityAlreadyChecked(city)) {
    input.checked = true;
  }

  input.addEventListener("change", function () {
    checkboxEvent(state.brewerySearch, city, input);
    checkboxEvent(state.breweries, city, input);

    if (isInputInSearchBreweries()) {
      renderBreweries(state.brewerySearch);
    } else {
      renderBreweries();
    }
  });

  filterByCity.append(input, label);
}

function isInputInSearchBreweries() {
  return (
    state.brewerySearch.length > 0 &&
    state.brewerySearch.length !== state.breweries.length
  );
}

function checkboxEvent(arrayOfBreweries, city, input) {
  for (const brewery of arrayOfBreweries) {
    if (brewery.city === city) {
      brewery.isCityChecked = input.checked;
    }
  }
}

function renderCities(arrayOfBreweries = state.breweries) {
  filterByCity.innerHTML = "";
  let cities = [];
  arrayOfBreweries.forEach((brewery) => cities.push(brewery.city));
  let citySet = [...new Set(cities)].sort();
  citySet.forEach((city) => addCity(city));
}

function isCityAlreadyChecked(city) {
  return state.breweries.find((brewery) => brewery.city === city).isCityChecked;
}

//Pagination functions

function addPaginationButtons(arrayOfBreweries) {
  const addButton = document.createElement("button");
  const pageNumber = document.createElement("span");
  const subtractButton = document.createElement("button");

  pageNumber.style.margin = "10px";

  addButton.innerText = "+";
  pageNumber.innerText = state.page;
  subtractButton.innerText = "-";

  addButton.addEventListener("click", function () {
    if (howManyPages(arrayOfBreweries) > state.page) {
      state.page++;
    }
    renderBreweries(arrayOfBreweries);
  });

  subtractButton.addEventListener("click", function () {
    if (state.page > 1) {
      state.page--;
    }
    renderBreweries(arrayOfBreweries);
  });

  breweriesList.prepend(subtractButton, pageNumber, addButton);
}

function isPaginated(arrayOfBreweries, brewery) {
  const index = arrayOfBreweries
    .filter((brewery) => brewery.isCityChecked === true)
    .indexOf(brewery);

  return (
    index >= state.breweriesPerPage * (state.page - 1) &&
    index <= state.breweriesPerPage * state.page - 1
  );
}

function howManyPages(arrayOfBreweries) {
  return (
    arrayOfBreweries.filter((brewery) => brewery.isCityChecked === true)
      .length / state.breweriesPerPage
  );
}

// ext 4 showing bookmarked mreweries to visit

showVisitList.addEventListener('click', function(){
  createVisitList()
  if(showVisitList.innerHTML === "show visit list") {
      showVisitList.innerHTML = "show state breweries"
        renderBreweries(state.visitBreweryList)
        renderCities(state.visitBreweryList)
  }
  else if(showVisitList.innerHTML === "show state breweries") {
    showVisitList.innerHTML = "show visit list"
    renderBreweries(state.breweries) 
    renderCities(state.breweries)
  }
})

function addAndDeleteVisitListButton(visitList, brewery) {
  visitList.addEventListener('click', function() {
  if(visitList.innerHTML === "Add to Visit List") {
  fetch("http://localhost:3000/visit-list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(brewery)
  }).then(function() {

  fetch(`http://localhost:3000/visit-list/${brewery.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({isCityChecked: true})
  })
 visitList.innerHTML = "delete from visit list"
 } )
    }
else {
  fetch(`http://localhost:3000/visit-list/${brewery.id}`, {
    method: "DELETE"})
    visitList.innerHTML = "Add to Visit List"
}
})
}

function isInVisitList(brewery) {
for (let item of state.visitBreweryList) {
  if(item.id === brewery.id) return true
}
return false
}

function visitListButtonText(brewery) {
  if(isInVisitList(brewery)) {
    return `delete from visit list`
  }
  return `Add to Visit List`
}

//todo find out why stuff is disappearing
function createVisitList() {
fetch("http://localhost:3000/visit-list")
.then(function (response) {
  return response.json();
})
  .then(function(response) { 
    state.visitBreweryList = response
  })
}

createVisitList()

