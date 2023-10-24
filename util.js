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
  BREWERY_TYPE_FILTER.value = "";
}

function obtainCityList() {
  const set = new Set();
  makeRenderList().forEach(brewery => {
    set.add(brewery.city)
  });

  const result = Array.from(set).sort()

  return result
}

function sortArray(array, objectProperty) {
  return array.sort((a, b) => {
    const aUpper = a[objectProperty].toUpperCase();
    const bUpper = b[objectProperty].toUpperCase();

    if (aUpper < bUpper) return -1;
    if (aUpper > bUpper) return 1;
    return 0;
  });
}

function makeRenderList(type) {
  const breweryList = [];

  if (Object.keys(STATE.breweries).includes(type)) {
    breweryList.push(...STATE.breweries[type]);
  } else {
    for (const key in STATE.breweries) {
      breweryList.push(...STATE.breweries[key]);
    }
  }

  return sortArray(breweryList, "name");
}

function filterBreweryType(inputArray) {
  const selectedType = BREWERY_TYPE_FILTER.value

  if (!!selectedType) {
    return filterResults = inputArray.filter(brewery => brewery.brewery_type === selectedType)
  }

  return inputArray
}

function filterCities(inputArray) {
  const checked = obtainSelectedCities()
  
  const filterResults = checked.map(checkBox => {
    return inputArray.filter(brewery => brewery.city.toLowerCase().includes(checkBox.value))
  })

  const results = []

  if (filterResults.length > 0) {
    filterResults.forEach(set => results.push(...set))
    return sortArray(results, "name")
  }

  return inputArray
}

function obtainSelectedCities() {
  const checkBoxes = CITY_FILTER_FORM.querySelectorAll("input")

  return Array.from(checkBoxes).filter(child => child.checked)
}

function collateFilters() {
  const type = filterBreweryType(makeRenderList())

  const cities = filterCities(type)

  return cities
}