const breweries = [
  {
    address_2: null,
    address_3: null,
    brewery_type: "micro",
    city: "San Diego",
    country: "United States",
    county_province: null,
    created_at: "2018-07-24T00:00:00.000Z",
    id: 8041,
    latitude: "32.714813",
    longitude: "-117.129593",
    name: "10 Barrel Brewing Co",
    obdb_id: "10-barrel-brewing-co-san-diego",
    phone: "6195782311",
    postal_code: "92101-6618",
    state: "California",
    street: "1501 E St",
    updated_at: "2018-08-23T00:00:00.000Z",
    website_url: "http://10barrel.com",
  },
];
/* Here are the Standard Requirements for the Brewery Challenge:

1. A user can enter a US state and view a list of breweries in that state
2. The list should only shows the types of breweries that offer brewery tours: (Micro, Regional, Brewpub)
3.  From the list of breweries, a user can view the following details about each brewery: (Name, Type of brewery, Address, Phone Number)
4. From the list of breweries, a user can visit the website of a brewery
5. From the 'filter by type of brewery' section, a user can filter by type of brewery. */

const breweryUl = document.getElementById("breweries-list");
for (let i = 0; i < breweries.length; i++) {
  const brewery = breweries[i];
}

function getAndRenderBrewery() {
  fetch("https://api.openbrewerydb.org/breweries?by_state=ohio")
    .then((res) => res.json())
    .then((data) => {
      renderBreweries(data);
    });
}

const tourBreweryTypes = ["micro", "brewpub", "regional"];

function renderBreweries(breweries) {
  breweryUl.innerHTML = "";

  breweries.forEach((brewery) => {
    if (tourBreweryTypes.includes(brewery.brewery_type)) {
      renderBrewery(brewery);
    } else {
      console.log(`Not to rendering ${brewery.brewery_type}`);
    }
  });
}

function renderBrewery(brewery) {
  const breweryLi = document.createElement("li");
  breweryUl.append(breweryLi);

  const breweryName = document.createElement("h2");
  breweryName.innerText = brewery.name;
  breweryLi.append(breweryName);

  const breweryType = document.createElement("div");
  breweryType.setAttribute("class", "type");
  breweryType.innerText = brewery.brewery_type;
  breweryLi.append(breweryType);

  const breweryAddress = document.createElement("section");
  breweryAddress.setAttribute("class", "address");
  breweryLi.append(breweryAddress);

  const addressH3 = document.createElement("h3");
  addressH3.innerText = "Address:";
  breweryAddress.append(addressH3);

  const streetP = document.createElement("p");
  streetP.innerText = brewery.street;
  breweryAddress.append(streetP);

  const postcodeP = document.createElement("p");
  postcodeP.innerHTML = `<strong>${brewery.city}, ${brewery.postal_code}`;
  breweryAddress.append(postcodeP);

  const breweryPhone = document.createElement("section");
  breweryPhone.setAttribute("class", "phone");
  breweryLi.append(breweryPhone);

  const phoneH3 = document.createElement("h3");
  phoneH3.innerText = "Phone:";
  breweryPhone.append(phoneH3);

  const phoneP = document.createElement("p");
  phoneP.innerText = brewery.phone;
  breweryPhone.append(phoneP);

  const breweryLink = document.createElement("section");
  breweryLink.setAttribute("class", "link");
  breweryLi.append(breweryLink);

  const breweryA = document.createElement("a");
  breweryA.href = brewery.website_url;
  breweryA.target = "_blank";
  breweryA.innerText = "Visit Website";
  breweryLink.append(breweryA);
}

getAndRenderBrewery();
