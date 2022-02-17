const state = {
  breweries: [],
};

const breweriesList = document.querySelector("#breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const filterBrewery = document.querySelector('#filter-by-type-form')
const searchCurrentBreweries = document.querySelector('#search-breweries-form')
const filterByCity = document.querySelector('#filter-by-city-form')


filterBrewery.addEventListener('change', function(event) {
    const currentState = state.breweries[0].state
    if(event.target.value === "") {
        fetch(
            `https://api.openbrewerydb.org/breweries?by_state=${currentState}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              state.breweries = response;
              render();
            });

    }
    else{
    fetch(
        `https://api.openbrewerydb.org/breweries?by_state=${currentState}&by_type=${event.target.value}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          state.breweries = response;
          render();
        });
    }   
})

stateSearch.addEventListener("submit", function (event) {
  event.preventDefault();
    
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${stateSearch["select-state"].value}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      state.breweries = response;
      render();
    });


});

searchCurrentBreweries.addEventListener('input', function(event) {
    breweriesList.innerHTML = "";
    state.breweries
    .filter(
      (brewery) =>
        brewery.brewery_type === "micro" ||
        brewery.brewery_type === "regional" ||
        brewery.brewery_type === "brewpub"
    )
    .filter(
        (brewery) => 
        brewery.name.toLowerCase().includes(event.target.value) || 
        brewery.name.toUpperCase().includes(event.target.value) 
    )
    .forEach((brewery) => addBrewery(brewery));
})

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
    <a href="${brewery.website_url}" target="_blank">Visit Website</a>
  </section>`;
  breweriesList.append(liElement);

  addCity(brewery)  
}

function addCity(brewery) { 
const citiesOnPage = filterByCity.querySelectorAll('label')
    for (const label of citiesOnPage) {
        if(label.innerText === brewery.city) {
            return
        }
}
const input = document.createElement('input')
const label = document.createElement('label')

input.setAttribute('type', 'checkbox')
input.setAttribute('name', brewery.city.toLowerCase())
input.setAttribute('value', brewery.city.toLowerCase())

label.setAttribute('for', brewery.city.toLowerCase())
label.innerText = brewery.city

filterByCity.append(input,label)
}



function render() {
  breweriesList.innerHTML = "";
  filterByCity.innerHTML = "";
  state.breweries
    .filter(
      (brewery) =>
        brewery.brewery_type === "micro" ||
        brewery.brewery_type === "regional" ||
        brewery.brewery_type === "brewpub"
    )
    .forEach((brewery) => addBrewery(brewery))

}

