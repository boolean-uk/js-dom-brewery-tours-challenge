function formatPhoneNumber(number) {
  switch (!!number) {
    case true:
      switch (number.length) {
        case 12:
          if (number[3] === "-" && number[7] === "-") {
            return number.replace("-", " ");
          } else {
            console.warn(
              "number not processed:",
              "numberLength:",
              number.length
            );
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

function clearElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

function multiAppend(parent, ...elements) {
  elements.forEach((element) => parent.append(element));
}

function resetBreweryFilter() {
  BREWERY_TYPE_FILTER.value = ""
}