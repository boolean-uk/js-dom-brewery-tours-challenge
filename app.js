const api = `https://api.openbrewerydb.org/v1/breweries?by_state`;
const ul = document.querySelector("#breweries-list");

const state = {
  breweryList: [],
  searchState: "",
  filterType: "",
  // TODO: add searchState variable here to store the state the user searched for and submitted in the form ✅ -> ?
};


function load() {
  // TODO: add searchState to state js object above ✅
  // TODO: enable the line below, apiLink and use that for fetch ✅
  submitForm();
  filterDropDown();
}

function submitForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.querySelector("#select-state");
    state.searchState = input.value; // this is the input value

    // TODO: save values inside the state.searchState variable
    // then just call getData() without passing anything to it

    // still working on how to make this part work
    // const newInput = document.querySelector("input");
    // const stateInput = newInput.brewery_type;

    //console.log("new", stateInput);
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

// GET
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


//  TODO: -> move this - getData()- at the bottom of the file, just for clarity ✅ changed it after 

// // TODO: NOT NEEDED ✅
// function brewType(item) {
//   if (item.brewery_type === "micro") {
// return item;
//   }
//   if (item.brewery_type === "regional") {
//     return item;
//   }
//   if (item.brewery_type === "brewpub") {
//     return item;
//   }

// TODO: not needed really...✅
// function displayByState(stateB) {
//   const sameStateBrew = state.breweryList.filter(
//     (sameStateB) => sameStateB.state === stateB
//   );
//   console.log("state", sameStateBrew);
//   console.log(api.state)
// }
// // TODO: not needed ✅
// displayByState()

// Display after filtering

function displayBrew() {
  
  // TODO: -> filter here state.breweryList to only include the breweries of micro, regional, brewpub ✅
  // store the filter results in a variable ✅
  // then call forEach on the filtered list only ✅
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
// NOTE: when you add the dropdown functionality, you can then filter a second time to just keep micro, regional or brewpub
  console.log("Filtered data by Type", filtered.length);

  
  // For Each => creating elements 

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
