// Array for data
const breweries = {
  breweryList: [],
};

const api = "https://api.openbrewerydb.org/v1/breweries?by_state=";

// GET
function getData() {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      breweries.breweryList = data;
      console.log("data", data);
    });
}

getData();
// Stop page from loading & working input
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#select-state");
  const values = input.value;
  console.log("input value:", values);
  form.reset();
});
