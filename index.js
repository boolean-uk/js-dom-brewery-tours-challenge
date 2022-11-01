//Global CONST
const breweriesList = document.querySelector("#breweries-list");
const stateSearch = document.querySelector("#select-state-form");
const filterByType = document.querySelector("#filter-by-type");
const searchBreweries = document.querySelector("#select-breweries-form");
const searchBreweriesInput = document.querySelector("#select-breweries");
const listOfCities = document.querySelector("#filter-by-city-form");
// const clearBtn = document.querySelector('."clear-all-btn"');

const state = {
  breweries: [],
  types: ["regional", "micro", "brewpub"],
  byType: [],
  byCity: [],
};

//STATE EVEN LISTENER
stateSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const filterByState = event.target[0].value;
  const uri = `https://api.openbrewerydb.org/breweries?by_state=${filterByState}&per_page=50`;

  fetch(uri)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Got breweries:", data);
      state.breweries = data.filter((brewery) => {
        return state.types.includes(brewery.brewery_type);
      });

      if (filterByType.value !== "") {
        state.byType = state.breweries.filter((brewery) => {
          return filterByType.value === brewery.brewery_type;
        });
        addCitiesForm(state.byType);
        renderBreweries(state.byType);
      } else {
        renderBreweries(state.breweries);
        addCitiesForm(state.breweries);
      }

      console.log("filtered list", state.breweries);
      console.log("by city", state.byCity);
    });
});

// ADD SINGLE BREWERY
function addBrewery(brewery) {
  const li = document.createElement("li");
  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  div.innerText = brewery.brewery_type;
  const addressSection = document.createElement("section");
  addressSection.setAttribute("class", "address");
  const h3 = document.createElement("h3");
  h3.innerText = "Address:";
  const p1 = document.createElement("p");
  p1.innerText = brewery.street;
  const p2 = document.createElement("p");
  p2.innerText = `${brewery.city} ${brewery.postal_code}`;
  p2.setAttribute("style", "font-weigth:bold;");
  const phoneSection = document.createElement("section");
  phoneSection.setAttribute("class", "phone");
  const phoneTitle = document.createElement("h3");
  phoneTitle.innerText = "Phone:";
  const p3 = document.createElement("p");
  p3.innerText = brewery.phone;
  const linkSection = document.createElement("section");
  linkSection.setAttribute("class", "link");
  const link = document.createElement("a");
  link.setAttribute("href", brewery.website_url);
  link.setAttribute("target", "_blank");
  link.innerText = "Visit Website";

  li.appendChild(h2);
  li.appendChild(div);
  addressSection.appendChild(h3);
  addressSection.appendChild(p1);
  addressSection.appendChild(p2);
  li.appendChild(addressSection);

  phoneSection.appendChild(phoneTitle);
  phoneSection.appendChild(p3);
  li.appendChild(phoneSection);
  breweriesList.appendChild(li);

  linkSection.appendChild(link);
  li.appendChild(linkSection);
}
//RENDER
function renderBreweries(breweries) {
  //   breweriesList.innerHTML = "";
  breweries.forEach((brewery) => {
    addBrewery(brewery);
  });
}

//FILTER BY TYPE
filterByType.addEventListener("change", () => {
  state.byType = state.breweries.filter((brewery) => {
    return (
      filterByType.value == "" || brewery.brewery_type === filterByType.value
    );
  });
  console.log("by type", state.byType);
  renderBreweries(state.byType);
  addCitiesForm(state.byType);
});
//SEARCH BY NAME
searchBreweriesInput.addEventListener("input", (event) => {
  event.preventDefault();
  let searchName = "";
  searchName = searchBreweriesInput.value;
  console.log(searchName);
  state.breweries.forEach((brewery) => {
    searchName.toLowerCase();
    state.breweries = brewery.name.includes(searchName);
  });
  renderBreweries(state.breweries);
});

//ADD CITIES

function addCitiesForm(breweries) {
  listOfCities.innerHTML = "";
  byCity = [];
  breweries.forEach((brewery) => {
    byCity.push(brewery.city);
  });
  byCity = [...new Set(byCity)];
  byCity.sort();
  byCity.forEach((city) => {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", city);
    input.setAttribute("value", city);
    const label = document.createElement("label");
    label.setAttribute("for", city);
    label.innerText = city;

    listOfCities.appendChild(input);
    listOfCities.appendChild(label);
  });
}
// learBtn.addEventListener("click", () => {});
