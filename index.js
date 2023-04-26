const api = `https://api.openbrewerydb.org/v1/breweries?by_state=`;
const ul = document.querySelector("#breweries-list");
const form = document.querySelector("#select-state-form");
const input = document.querySelector("#select-state");

const state = {
  breweryList: [],
};

// GET
function getData() {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.breweryList = data;
      console.log("Data", data);
      displayBrew();
      // const tourBreweries = data.filter((brewery) => {
      //   return ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type.toLowerCase());
    })
      .catch(function (error) {
        console.log("error", error);
      })
      // );
    
}

// );
getData();

// Displaying cities just by STATE and only 3 types

// function displayByType(breweries) {
//   const byType = ["micro", "regional", "brewpub"];
//   const filteredBrew = breweries.filter((breweries) =>
//     byType.includes(breweries.brewery_type)
//   );
//   console.log("filtered", filteredBrew);
//   return filteredBrew;
// }

// function brewType() {
//   if (
//     state.breweryList.brewery_type === "micro" ||
//     state.breweryList.brewery_type === "regional" ||
//     state.breweryList.brewery_type === "brewpub"
//   ) {
//     return true;
//   }
// }

function displayByState(stateB) {
  const sameStateBrew = state.breweryList.filter(
    (sameStateB) => sameStateB.state === stateB
  );
  // state.breweryList.push(stateB);

  console.log("state array", sameStateBrew);
}
displayByState();

// ForEach => display
function displayBrew() {
    ul.innerHTML = " ";
  state.breweryList.forEach((data) => {
    const li = document.createElement("li");
    ul.append(li);

    const brewName = document.createElement("h2");
    brewName.innerText = data.name;
    li.append(brewName);

    const typeOfBrew = document.createElement("div");
    typeOfBrew.className = "type";
    typeOfBrew.innerText = data.brewery_type;
    li.append(typeOfBrew);

    const addressSection = document.createElement("section");
    addressSection.className = "address";
    li.append(addressSection);

    const addressH3 = document.createElement("h3");
    addressH3.innerText = "Address:";
    addressSection.append(addressH3);

    const address = document.createElement("p");
    address.innerText = data.address_1;
    addressSection.append(address);

    const city = document.createElement("strong");
    city.innerText = `${data.city}, ${data.postal_code}`;
    addressSection.append(city);

    const phoneSection = document.createElement("section");
    phoneSection.className = "phone";
    li.append(phoneSection);

    const phoneH3 = document.createElement("h3");
    phoneH3.innerText = "Phone:";
    phoneSection.append(phoneH3);

    const phoneNum = document.createElement("p");
    phoneNum.innerText = data.phone;
    phoneSection.append(phoneNum);

    const linkSection = document.createElement("section");
    linkSection.className = "link";
    li.append(linkSection);

    const aEl = document.createElement("a");
    aEl.innerText = `Visit Website`;
    linkSection.append(aEl);

    const link = document.querySelector("href")
    link.innerText = data.website_url;
  });
}

// Stop page from loading & working input

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = input.value;
  console.log("input value:", values);

  // still working on how to make this part work

  const newInput = input.brewery_type;
  getData(input);
  console.log("Input", newInput);
  form.reset();
});

displayByState();
