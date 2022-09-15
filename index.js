// Core criteria for brewery challenge:

let dataImport = [];
let state = [];
let url = "";
let allowedTypes = ["micro", "regional", "brewpub"];
let allowedCities = [];

const addEventListeners = () => {
  document
    .querySelector("#select-state-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const stateName = document
        .querySelector("#select-state").value
        .toLowerCase();
      renderState(stateName);
    });

  document
    .querySelector("#filter-by-type-form")
    .addEventListener("change", (event) => {
      allowedTypes = event.target.value;
    });
};



const renderState = (stateName) => {
  console.log(typeof stateName, typeof dataImport[0].state);
  document.querySelector("#breweries-list").innerHTML = "";
  // console.log("dataImport: ", dataImport.forEach((dataItem) => console.log(dataItem.state))); 

  state = [...dataImport.filter((item) =>
    item.state === stateName[0].toUpperCase() + stateName.slice(1).toLowerCase()
  )];
  for (brewery in state) {
    createElements(state[brewery]);
  }
};

const renderCities = input  => {
  document.querySelector("#filter-by-city-form").innerHTML = "";
  let cities = [];
  for (let i = 0; i < input.length; i++) {
    cities.push(input[i].city);
  }
  let uniqueCities = [...new Set(cities)];
  for (let i = 0; i < uniqueCities.length; i++) {
    createCityElements(uniqueCities[i]);
  }
}

const createElements = (brewery) => {
  console.log(brewery);
  const list = document.querySelector("#breweries-list");
  const liEl = document.createElement("li");
  list.appendChild(liEl);
  const liH2 = document.createElement("h2");
  const liDiv = document.createElement("div");
  const liSecAddress = document.createElement("section");
  const firstSecH3 = document.createElement("h3");
  const firstSecParagraphOne = document.createElement("p");
  const firstSecParagraphTwo = document.createElement("p");
  const firstSecParagraphTwoStrong = document.createElement("strong");
  firstSecParagraphTwo.append(firstSecParagraphTwoStrong);
  liSecAddress.append(firstSecH3, firstSecParagraphOne, firstSecParagraphTwo);
  const liSecPhone = document.createElement("section");
  const secondSecH3 = document.createElement("h3");
  const secondSecParagraphOne = document.createElement("p");
  liSecPhone.append(secondSecH3, secondSecParagraphOne);
  const liSecLink = document.createElement("section");
  const thirdSecAnchor = document.createElement("a");
  liSecLink.append(thirdSecAnchor);
  liEl.append(liH2, liDiv, liSecAddress, liSecPhone, liSecLink);

  liH2.innerHTML = brewery.name;
  liDiv.className = "type";
  liDiv.innerHTML = brewery.brewery_type;
  liSecAddress.className = "address";
  firstSecH3.innerHTML = "Address:";
  firstSecParagraphOne.innerHTML = brewery.street;
  firstSecParagraphTwoStrong.innerHTML = `${brewery.city}, ${brewery.postal_code}, ${brewery.state}`;
  liSecPhone.className = "phone";
  secondSecH3.innerHTML = "Phone:";
  secondSecParagraphOne.innerHTML = brewery.phone;
  liSecLink.className = "link";
  thirdSecAnchor.setAttribute("href", brewery.website_url);
  thirdSecAnchor.setAttribute("target", "_blank");
  thirdSecAnchor.innerHTML = "Visit Website";
};

const init = () => {
  console.log("starting");
  addEventListeners();
};

init();

// Extensions

//Extension 1:

const searchFunction = (event) => {
  let input = event.target.value.toLowerCase();
  const newState = state.filter((item) =>
    item.name.toLowerCase().includes(input)
  );
  renderState(newState);
};

// Extension 2:

const createCityElements = (input) => {
  const cityListInput = document.createElement("input");
  const cityListLabel = document.createElement("label");

  cityListInput.setAttribute("type", "checkbox");
  cityListInput.setAttribute("id", "filter-by-city-checkbox");
  cityListInput.setAttribute("name", "city-checkbox");
  cityListInput.setAttribute("value", input);
  cityListInput.addEventListener("change", (event) => {
    event.preventDefault();
    if (event.target.checked) {
      let checkedCity = event.target.value.toLowerCase();
      allowedCities.push(checkedCity);
    }
    if (!event.target.checked) {
      let unCheckedCity = event.target.value.toLowerCase();
      allowedCities = allowedCities.filter((city) => city !== unCheckedCity);
      if (!document.querySelector("#filter-by-city-checkbox").checked) {
        fetchAndRender(url);
      }
    }
    const newState = state.filter((item) =>
      allowedCities.includes(item.city.toLowerCase())
    );
    renderState(newState);
  });

  cityListLabel.setAttribute("for", "filter-by-city-checkbox");
  cityListLabel.innerHTML = input;

  document
    .querySelector("#filter-by-city-form")
    .append(cityListInput, cityListLabel);
};

const clearAll = () => {
  document.querySelector("#filter-by-city-checkbox").checked = false;
  allowedCities = [];
  fetchAndRender(url);

  // renderCities(state)
}

// Load all data into state and render

const loadDataToState = () => {
  console.log("Loading data");
  for (let i = 1; i < 407; i++) {
    fetch(`https://api.openbrewerydb.org/breweries?page=${i}`)
    .then(function (response) {
      return response.json();
    })
    .then((breweries) => {
      const importedData = [...breweries];
      // console.log("Imported data:", importedData);
      dataImport.push(...importedData.filter((item) =>
      allowedTypes.includes(item.brewery_type)
    ))
    // console.log("new state:", dataImport) 
    })

}}

loadDataToState()