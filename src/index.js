const state = {
  breweries: [],
};

let url = "https://api.openbrewerydb.org/breweries?by_state=";

const formEl = document.querySelector("#select-state-form");
const formInputEl = document.querySelector("#select-state");

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputSearchValue = formInputEl.value;
  console.log(inputSearchValue);
  fetch(url + inputSearchValue)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (breweries) {
      state.breweries = breweries;
      console.log(state.breweries);
      render();
    });
});

function render() {
  clear();
  renderBreweries();
}

function clear() {
  breweriesList.innerHTML = "";
  formInputEl.value = "";
}
