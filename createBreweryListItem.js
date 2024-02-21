function createBreweryListItem(data) {
  const li = document.createElement("li");

  //name
  const h2 = document.createElement("h2");
  h2.innerText = data.name;
  li.appendChild(h2);
  //Type
  const divType = document.createElement("div");
  divType.classList.add("type");
  divType.innerText = data.brewery_type;
  li.appendChild(divType);

  // address
  const sectionAdress = document.createElement("section");
  sectionAdress.classList.add("address");
  li.appendChild(sectionAdress);

  const h3Adress = document.createElement("h3");
  h3Adress.innerText = "Address";
  sectionAdress.appendChild(h3Adress);
  //pAdress
  const pAdress1 = document.createElement("p");
  pAdress1.innerText = data.street;
  sectionAdress.appendChild(pAdress1);

  const pAdress2 = document.createElement("p");
  pAdress2.innerHTML = `<strong>${data.state}, ${data.city}, ${data.postal_code}</strong>`;
  sectionAdress.appendChild(pAdress2);

  // phone
  const sectionPhone = document.createElement("section");
  sectionPhone.classList.add("phone");
  li.appendChild(sectionPhone);

  const h3Phone = document.createElement("h3");
  h3Phone.innerText = "Phone";
  sectionPhone.appendChild(h3Phone);

  const pPhone = document.createElement("p");
  pPhone.innerText = data.phone;
  sectionPhone.appendChild(pPhone);

  const sectionLink = document.createElement("section");
  sectionLink.classList.add("link");
  li.appendChild(sectionLink);

  const a = document.createElement("a");
  a.href = data.website_url;
  a.target = "_blank";
  a.innerText = "Visit Website";
  sectionLink.appendChild(a);

  return li;
}

export { createBreweryListItem };
