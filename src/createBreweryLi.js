const createBreweryLi = (brewery) => {
  const breweryLi = document.createElement("li");

  const breweryName = document.createElement("h2");
  breweryName.innerText = brewery.name;

  const breweryType = document.createElement("div");
  breweryType.classList.add("type");
  breweryType.innerText = brewery.brewery_type;

  const addressSection = document.createElement("section");
  addressSection.classList.add("address");

  const addressTitle = document.createElement("h3");
  addressTitle.innerText = "Address:";

  const breweryStreet = document.createElement("p");
  breweryStreet.innerText = brewery.street;

  const breweryCityPostal = document.createElement("p");
  breweryCityPostal.innerHTML = `<strong>${brewery.city}, ${brewery.postal_code}`;

  const phoneSection = document.createElement("section");
  phoneSection.classList.add("phone");

  const phoneTitle = document.createElement("h3");
  phoneTitle.innerText = "Phone:";

  const breweryPhone = document.createElement("p");
  breweryPhone.innerText = brewery.phone;

  const linkSection = document.createElement("section");
  linkSection.classList.add("link");

  const breweryLink = document.createElement("a");
  breweryLink.href = brewery.website_url;
  breweryLink.innerText = "Visit Website";

  addressSection.append(addressTitle, breweryStreet, breweryCityPostal);
  phoneSection.append(phoneTitle, breweryPhone);
  linkSection.append(breweryLink);

  breweryLi.append(
    breweryName,
    breweryType,
    addressSection,
    phoneSection,
    linkSection
  );

  return breweryLi;
};

export default createBreweryLi;
