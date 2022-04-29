function createLI(brewery) {
  const listItem = document.createElement("li");

  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;

  const div = document.createElement("div");
  div.setAttribute("class", "type");
  div.innerText = brewery.brewery_type;

  const section = document.createElement("section");
  section.setAttribute("class", "address");

  const addressH3 = document.createElement("h3");
  addressH3.innerText = "Address:";

  const p = document.createElement("p");
  p.innerText = brewery.street;

  const p2 = document.createElement("p");
  p2.innerText = brewery.city + ", " + brewery.postal_code;
  p2.setAttribute("class", "bold");

  const p3 = document.createElement("p");
  p3.innerText = brewery.state;

  const section2 = document.createElement("section");
  section2.setAttribute("class", "phone");

  const phoneH3 = document.createElement("h3");
  phoneH3.innerText = "Phone:";

  const p4 = document.createElement("p");
  p4.innerText = brewery.phone;

  const section3 = document.createElement("section");
  section3.setAttribute("class", "link");

  const anchor = document.createElement("a");
  anchor.setAttribute("href", brewery.website_url);
  anchor.setAttribute("target", "_blank");
  anchor.innerText = "Visit Website";

  listItem.append(h2);
  listItem.append(div);
  listItem.append(section);
  section.append(addressH3);
  section.append(p);
  section.append(p2);
  section.append(p3);
  listItem.append(section2);
  section2.append(phoneH3);
  section2.append(p4);
  listItem.append(section3);
  section3.append(anchor);

  return listItem;
}

export { createLI };
