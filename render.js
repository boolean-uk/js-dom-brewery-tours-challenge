function renderBreweries() {
  const breweryList = [];

  for (const key in STATE.breweries) {
    breweryList.push(...STATE.breweries[key]);
  }

  breweryList.forEach((brewery) => renderBrewery(brewery));
}

function renderBrewery(brewery) {
  const li = makeElement("li");
  const h2 = makeElement("h2", null, brewery.name);
  const typeDiv = makeElement("div", "type", "micro");

  const addressSection = makeElement("section", "address");
  const addressLines = [];
  addressLines.push(makeElement("h3", null, "Address:"));
  addressLines.push(makeElement("p", null, brewery.address_1));
  addressLines.push(makeElement("p", null, brewery.address_2));
  addressLines.push(makeElement("p", null, brewery.address_3));
  addressLines.push(
    makeElement("p", "strong", `${brewery.city}, ${brewery.postal_code}`)
  );

  multiAppend(
    addressSection,
    ...addressLines.filter((element) => !!element.innerText)
  );

  const phoneSection = makeElement("section", "phone");
  const phoneLines = [];
  phoneLines.push(makeElement("h3", null, "Phone:"));
  phoneLines.push(makeElement("p", null, formatPhoneNumber(brewery.phone)));
  multiAppend(phoneSection, ...phoneLines);

  const linkSection = makeElement("section", "link");
  const anchor = makeElement("a", null, "Visit Website");
  anchor.href = brewery.website_url;
  anchor.target = "_blank";
  linkSection.append(anchor);

  multiAppend(li, h2, typeDiv, addressSection, phoneSection, linkSection);
  BREWERY_LIST.append(li);
}

function makeElement(elementName, className, innerText) {
  const element = document.createElement(elementName);

  if (Array.isArray(className)) {
    className.forEach((classItem) => element.classList.add(classItem));
  } else if (typeof className === "string" || typeof className === "number") {
    element.classList.add(className);
  }

  element.innerText = innerText ? innerText : null;

  return element;
}

function multiAppend(parent, ...elements) {
  elements.forEach((element) => parent.append(element));
}

function clearElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

function formatPhoneNumber(number) {
  switch (!!number) {
    case true:
      switch (number.length) {
        case 12:
          if (number[3] === "-" && number[7] === "-") {
            return number.replace("-", " ");
          } else {
            console.warn("number not processed:", "numberLength:", number.length)
          }
        case 10:
          return `${number.slice(0, 3)} ${number.slice(3, 6)}-${number.slice(
            6
          )}`;
        case 6:
          return `${number.slice(0, 3)}-${number.slice(3)}`;
        default:
          console.warn(
            "number not processed:",
            number,
            "numberLength:",
            number.length
          );
      }

    default:
      break;
  }
  return number;
}
