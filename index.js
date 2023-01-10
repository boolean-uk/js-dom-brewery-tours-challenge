// core requirements
// STATE
// 1)create the local version of data for the breweries
// which is assgint the value of breweries array to the state object
const state = {
  usState: "",
  breweries: [],
};

// select the existed classes and ids
const form = document.querySelector("#select-state-form");
const breweryUL = document.querySelector("#breweries-list");

// 2)add the event listener for the form submit
// prevent the default behaviour on page loading
// write the condition for the length of the input in the search bar (state.brewerie> 0)
// call the function of fecth request
form.addEventListener("submit", (event) => {
  //   console.log(form);
  event.preventDefault();
  const formstateInput = document
    .querySelector("#select-state")
    .value.replace(" ", "_");
  state.usState = formstateInput;
  getTheBrewery(formstateInput);
});

// NETWORK REQUESTS
// create the fetch function with link provided in the API
//  GET https://api.openbrewerydb.org/breweries?by_state=US_STATE_NAME&per_page=50
// if the state has to words like New York replace the space  " "with the "_"
// replace(): https://www.w3schools.com/jsref/jsref_replace.asp
function getTheBrewery(usState) {
  state.usState = usState;
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.usState}`)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //   console.log(responseData);
      state.breweries = responseData;
      renderBreweries();
    });
}
// RENDERING
// create the render function for the data in state
// clear the list with .innerHTMl = ""
// create the for loop foreach item in the state.breweries
// create the list of the infromation needed
// with document.createElemet for name,address, type brewery, phone number.
// append this list to the ul with Id #breweries-list

function renderBreweries() {
  breweryUL.innerHTML = "";
  for (let i = 0; i < state.breweries.length; i++) {
    const brewery = state.breweries[i];
    // remember to prepare the list of the types
    // if(brewery.brewery_type === "micro" || brewery.brewery_type === "regional" ||brewery.brewery_type === "Brewpub" )

    const li = document.createElement("li");
    breweryUL.append(li);

    const h2 = document.createElement("h2");
    h2.innerText = brewery.name;
    li.append(h2);

    const div = document.createElement("div");
    div.setAttribute("class", "type");
    div.innerText = brewery.brewery_type;
    li.append(div);

    const section = document.createElement("section");
    section.setAttribute("class", "address");

    const h3 = document.createElement("h3");
    h3.innerText = "Address:";

    const p = document.createElement("p");
    p.innerText = brewery.street;

    const strongP = document.createElement("p");
    strongP.innerText = `${brewery.city},${brewery.postal_code},${brewery.state}`;

    const strong = document.createElement("strong");
    strongP.append(strong);

    li.append(section);
    section.append(h3);
    section.append(p);
    section.append(strongP);

    const phoneSection = document.createElement("section");
    phoneSection.setAttribute("class", "phone");

    const phoneH3 = document.createElement("h3");
    phoneH3.innerText = "Phone:";

    const phoneP = document.createElement("p");
    phoneP.innerText = brewery.phone;

    li.append(phoneSection);
    phoneSection.append(phoneH3);
    phoneSection.append(phoneP);

    const linkSection = document.createElement("section");
    linkSection.setAttribute("class", "link");

    const a = document.createElement("a");
    a.setAttribute("target", "_blank");
    a.href = brewery.website_url;
    a.innerText = "Visit Website";

    linkSection.append(a);

    li.append(linkSection);
  }
}

// find out how to do the filter one
