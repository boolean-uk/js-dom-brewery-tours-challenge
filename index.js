const api = "https://api.openbrewerydb.org/v1/breweries?by_state=";
const ul = document.querySelector("#breweries-list");

const state = {
  breweryList: [],
};

// Empty 'HomePage' not really need for it
// function loadPage() {
//   const articleSection = document.querySelector("article");

//   articleSection.innerText = "Search Brewery...";
// }
// // loadPage()

// GET
function getData() {
  // const apiLink = `${api}${searchState}`;
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.breweryList = data;
      console.log("Data", data);
      // const tourBreweries = data.filter((brewery) => {
      //   return ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type.toLowerCase());
      displayBrew();
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

// );
getData();

// Displaying cities just by STATE and only 3 types

// function displayByType() {
//   const byType = state.breweryList.filter(brewType);
// }

function brewType(item) {
  if (item.brewery_type === "micro") {
    return item;
  }
  if (item.brewery_type === "regional") {
    return item;
  }
  if (item.brewery_type === "brewpub") {
    return item;
  }

  // not sure if it's right syntax
  // if (
  //   ((((item.brewery_type === "micro") !== item.brewery_type) ===
  //     "regional") !==
  //     item.brewery_type) ===
  //   "brewpub"
  // ) {
  //   return item;
  // }
}

function displayByState(stateB) {
  const sameStateBrew = state.breweryList.filter(
    (sameStateB) => sameStateB.state === stateB
  );
  console.log("state", sameStateBrew);
  console.log(api.state)
}
displayByState()

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

    const aLink = document.createElement("a");
    aLink.innerText = "Visit Website";
    linkSection.append(aLink);
  });
}

// Stop page from loading & working input
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#select-state");
  const values = input.value;
  console.log("input value:", values);


  // still working on how to make this part work
  const newInput = document.querySelector("input");
  const stateInput = newInput.brewery_type;
  getData(input);
  console.log("new", stateInput);
  form.reset();
});
