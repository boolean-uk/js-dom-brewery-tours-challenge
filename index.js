
// Part 1
const idBreweriesList = document.querySelector("#breweries-list");
const idSelectState = document.querySelector("#select-state-form");

const breweriesURL = "https://api.openbrewerydb.org/breweries";

const applicationState = {
  state: "",
  pubs: [],
  breweryTypeFilter: "", // "" means no filtering required
};

function addPubsToList() {
  // Clear existing pubs
  idBreweriesList.innerHTML = "";

  // Add all pubs to the 'idBreweriesList'
  applicationState.pubs.forEach((pub) => {
    if (
      pub.brewery_type === "micro" ||
      pub.brewery_type === "brewpub" ||
      pub.brewery_type == "regional"
    ) {
      // Only add the pubs that are one of the types above
      addPub(pub);
    } else {
      console.log(`Not adding ${pub.name}. Type is ${pub.brewery_type}`);
    }
  });
}

// Adds one pub to the 'idBreweriesList'
function addPub(pub) {
  const li = document.createElement("li");
  idBreweriesList.append(li);

  const pubNameH2 = document.createElement("h2");
  const div = document.createElement("div");
  const addressSection = document.createElement("section");
  const addressH3 = document.createElement("h3");
  const streetP = document.createElement("p");
  const postCodeP = document.createElement("p");
  const phoneSection = document.createElement("section");
  const phoneH3 = document.createElement("h3");
  const phoneNumberP = document.createElement("p");
  const linkSection = document.createElement("section");
  const webLinkA = document.createElement("a");
  // Part 2
pubNameH2.innerText = pub.name;
div.className = "type";
div.innerText = pub.brewery_type;
addressSection.className = "address";
addressH3.innerText = "Address:";
streetP.innerText = pub.street;
postCodeP.innerText = `${pub.city}, ${pub.postal_code} ${pub.state}`;
postCodeP.style.fontWeight = "888";
phoneSection.className = "phone";
phoneH3.innerText = "Phone:";
phoneNumberP.innerText = pub.phone;

linkSection.className = "link";
webLinkA.href = pub.website_url;
webLinkA.innerText = "Visit Website";

li.append(pubNameH2, div, addressSection, phoneSection, linkSection);
addressSection.append(addressH3, streetP, postCodeP);
phoneSection.append(phoneH3, phoneNumberP);
linkSection.append(webLinkA);
}

function addInputListener() {
idSelectState.addEventListener("submit", (event) => {
  event.preventDefault();

  // get state from input and lowercase it all
  const myState = document
    .querySelector("#select-state")
    .value.replace(" ", "_")
    .toLowerCase();

  // Save the state that the user has chosen
  applicationState.state = myState;

  const selectedState = breweriesURL + "?by_state=" + applicationState.state;

  // Now fetch data for the selected state
  fetch(selectedState)
    .then((res) => res.json())
    .then((data) => {
      // We now have the pubs we have fetched - save it in our applicationState
      applicationState.pubs = data;

      // Display all the pubs that we have fetched
      addPubsToList();
    });
});
}
// Part 3
function addFilteringListener() {
  const filter = document.querySelector("#filter-by-type");

  filter.addEventListener("change", (e) => {
    e.preventDefault();

    console.log("filter changed", filter.value);

    applicationState.breweryTypeFilter = filter.value;

    // We can only fetch new data if the user has selected a state
    if (applicationState.state) {
      let newUrl = breweriesURL + "?by_state=" + applicationState.state;

      if (applicationState.breweryTypeFilter !== "") {
        // Now add the brewery type
        newUrl += "&by_type=" + applicationState.breweryTypeFilter;
      }

      fetch(newUrl)
        .then((res) => res.json())
        .then((data) => {
          // We now have the pubs we have fetched - save it in our applicationState
          applicationState.pubs = data;

          // Display all the pubs that we have fetched
          addPubsToList();
        });
    }
  });
}

// This is what we need to do to initialise the application
function applicationInitialise() {
  addInputListener();
  addFilteringListener();
}

applicationInitialise();