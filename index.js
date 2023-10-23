const api = `https://api.openbrewerydb.org/v1/breweries?by_state`;
const ul = document.querySelector("#breweries-list");

const state = {
  breweryList: [],
  searchState: "",
  filterType: "",
};
function load (){
    submitForm();
    filterDropDown();
}
function submitForm() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const input = document.querySelector("#select-state");
      state.searchState = input.value; 
      getData();

    form.reset();
  });
}

function filterDropDown() {
    const filter = document.querySelector("#filter-by-type");
    filter.addEventListener("change", (event) => {
      //  event.preventDefault();
  
      state.filterType = filter.value;
      displayBrew();
    });
  }
  function getData() {
    fetch(`${api}=${state.searchState}`) 
    .then(function (response) {
        return response.json();
      })
  
      .then(function (data) {
        console.log(data.length);
        state.breweryList = data;
  
        displayBrew(); // all good!
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  function displayBrew() {
    const wantedTypes = ["micro", "regional", "brewpub"];
  console.log("state", state.filterType);

  const filtered = state.breweryList
    .filter((obj) => {
      return wantedTypes.includes(obj.brewery_type);
    })
    .filter((obj) => {
      if (wantedTypes.includes(state.filterType)) {
        return obj.brewery_type === state.filterType;
      } else {
        return true;
      }
    });
    ul.innerHTML = "";
  filtered.forEach((data) => {
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
    aEl.innerText = "Visit Website";
    aEl.href = data.website_url;
    aEl.target = "_blank";
    linkSection.append(aEl);
  });
}

load();