const api = "https://api.openbrewerydb.org/v1/breweries?by_state=";
const ul = document.querySelector("#breweries-list");
const searchState = [];
const apiLink = `${api}${searchState}`;

// ????
const state = {
  breweryList: [],
  searchState: [], // TODO: add searchState variable here to store the state the user searched for and submitted in the form ✅?
};

// GET
function getData() {
  // TODO: add searchState to state js object above ✅
  // TODO: enable the line below, apiLink and use that for fetch ✅

  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.breweryList = data;
      console.log("Data", data);
      // const tourBreweries = data.filter((brewery) => {
      //   return ['micro', 'regional', 'brewpub'].includes(brewery.brewery_type.toLowerCase());

      // EITHER FIX FILTER FUNCTION OR USE FOR LOOP ALONG THE LINES OF:
      // const breweries = []
      // for(let i = 0; i < data.length; i++) {
      //   const brewery = data[i]
      //   if(I WANT TO KEEP BREWERY) {
      //     breweries.push(brewery)
      //   }
      // }
      // state.breweries = breweries

      displayBrew(); // all good!
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

// );
//  TODO: -> move this - getData()- at the bottom of the file, just for clarity ✅

// Displaying cities just by STATE and only 3 types

// function displayByType() {
//   const byType = state.breweryList.filter(brewType);
// }

// // NOT NEEDED ✅
// function brewType(item) {
//   if (item.brewery_type === "micro") {
//     return item;
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

// ForEach => display
function displayBrew() {
  // const wantedType = ["micro", "regional", "brewpub"]; --> why doesn't work **
  // console.log('b-list', state.breweryList)
  // const filtered = state.breweryList.filter(
  //   (obj) => obj.brewery_type === wantedType **
  // );
  const filtered = state.breweryList.filter((obj) => {
    if (obj.brewery_type === "micro") return true;
    if (obj.brewery_type === "regional") return true;
    if (obj.brewery_type === "brewpub") return true;
    state.breweryList.push(obj);
  });

  console.log("Filtered", filtered);

  // TODO: -> filter here state.breweryList to only include the breweries of micro, regional, brewpub ✅
  // store the filter results in a variable ✅
  // then call forEach on the filtered list only ✅

  // NOTE: when you add the dropdown functionality, you can then filter a second time to just keep micro, regional or brewpub

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
    linkSection.append(aEl);

    // WEB SITE LINK

    //  const link = document.querySelector("href");
    //   // link.innerText = data.website_url;
    //   linkSection.append(link);
    //   console.log('link', link)
    // });
    // }

    // Stop page from loading & working input
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = document.querySelector("#select-state");
      const values = input.value; // this is the input value
      console.log("input value:", values);

      // save values inside the state.searchState variable
      // then just call getData() without passing anything to it
      state.searchState = values;
      // still working on how to make this part work
      // const newInput = document.querySelector("input");
      // const stateInput = newInput.brewery_type;
      getData();
      //console.log("new", stateInput);
      form.reset();
    });
  });
}
getData();
