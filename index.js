const state = {
  state: "",
  type: "",
};


const listElement = document.querySelector("#breweries-list");
const formElement = document.querySelector("#select-state-form");
const inputElement = document.querySelector("#select-state");
const filterElement = document.querySelector("#filter-by-type");
const stateElement = document.querySelector("#select-state");

function renderBrewList() {
  for (const brewery of state.breweries) {
    const li = document.createElement("li");
    li.innerHTML = `<h2>${brewery.name}</h2>
      <div class="type">${brewery.brewery_type}</div>
      <section class="address">
        <h3>Address:</h3>
        <p>${brewery.street}</p>
        <p><strong>${brewery.city}, ${brewery.postal_code}</p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>${brewery.phone}</p>
      </section>
      <section class="link">
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
      </section>
        `;
    listElement.append(li);
  }
}

function render() {
  clear();
  renderBrewList();
}

function clear() {
  inputElement.innerHTML = "";
  inputElement.value = ""
}

function renderList() {
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${inputElement.value}`)
    // by state https://api.openbrewerydb.org/breweries?by_state=[ state ]
    //by pages https://api.openbrewerydb.org/breweries?per_page=25
      .then((res) => res.json())
      .then((breweries) => {
        state.breweries = breweries;
        render();
      });
  });
}

// function filter(){
//   formElement.addEventListener('change', function () {
//     const typeFilter = filterElement.value 
//     if (typeFilter != ""){
//       `https://api.openbrewerydb.org/breweries?by_state=${stateElement.value}` += `&by_type=${typeFilter}`
//     }
//     fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateElement.value}`)
//     .then((res) => res.json())
//     .then((breweries) => {
//      state.breweries = breweries;
//        render();
//     })
//   })
// }

renderList();
filter()
// get the fetch working on the whole list

// hard code the state in the Url

// read the state from the search bar
