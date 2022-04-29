const breweries = [
  {
    address_2: null,
    address_3: null,
    brewery_type: "large",
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

// Loop through breweries
const breweryUl = document.getElementById("breweries-list");
for (let i = 0; i < breweries.length; i++) {
  const brewery = breweries[i];

  /* Create a brewery list with child elements 
  (h2, div, sectionAddress, h3, p, p, sectionPhone, h3, p, sectionLink, a) 
  using the HTML provided in templates/standard-list-items.html */

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
