const api = "https://api.openbrewerydb.org/v1/breweries?by_state=";
const ul = document.querySelector("#breweries-list");

const breweries = {
  breweryList: [],
};

// Empty 'HomePage'
function loadPage() {
  const articleSection = document.querySelector("article");
  articleSection.innerText = "Search Brewery...";
}
// loadPage()

// GET
function getData() {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      breweries.breweryList = data;
      console.log("Data", data);
      displayBrew();
    });
}
getData();

// ForEach => display
function displayBrew() {
  ul.innerHTML = " ";
  breweries.breweryList.forEach((data) => {
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

// Displaying cities just by TYPE

function displayByType(array, type, input) {
  let breweries = null;
  let breweryList = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].type === type) {
      breweries = array[i];
      break;
    }
  }

  if (breweries) {
    breweryList = array.filter((data) => {
      for (const prop in data) {
        if (data[prop].includes(input)) {
          return true;
        }
      }
      return false;
    });
  }
  return breweryList;
}

// Stop page from loading & working input
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#select-state");
  const values = input.value;
  console.log("input value:", values);
  form.reset();

  const searchInput = document.querySelector("submit");
  searchInput.addEventListener("submit", () => {
    displayByType();
  });
});
