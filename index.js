const state = {
  breweries: [],
  typeFilter: "",
  stateFilter: "",
  nameFilter: "",
  cityFilter: [],
  allowedTypes: ["micro", "regional", "brewpub"],
};

// SELECTED ROOT ELEMENTS
const breweryList = document.querySelector("#breweries-list");
const selectState = document.querySelector("#select-state");
const typeFilter = document.querySelector("#filter-by-type");
const nameFilter = document.querySelector("#search-breweries");
const cityForm = document.querySelector("#filter-by-city-form");
const cityFilter = document.querySelector("#checkbox");
const clearButton = document.querySelector(".clear-all-btn");

// Filtering
function updateFilterState() {
  selectState.value = state.stateFilter;
}

function updateFilterName() {
  nameFilter.value = state.nameFilter;
}

function updateDropdownState() {
  // var val = typeFilter.options[typeFilter.selectedIndex].text;
  typeFilter.value = state.typeFilter;
}

function handleClick(event, checkbox, city) {
  checkbox.check = !checkbox.check;
  handleCityFilterChanged(event, checkbox.check, city);
}

function clearChecks(event) {
  var clist = document.getElementsByTagName("input");
  for (var i = 0; i < clist.length; ++i) {
    clist[i].checked = false;
  }
  state.cityFilter = [];
  renderBreweries();
}

function handleStateFilterChanged(event) {
  // update our state of our filter
  // state.titleFilter = event.target.value
  state.stateFilter = selectState.value;

  // state was updated, re-render
  renderBreweries();
}

function handleCityFilterChanged(event, bol, city) {
  if (!state.cityFilter.includes(city) && bol === true);
  {
    state.cityFilter.push(city);
  }

  if (state.cityFilter.includes(city) && bol === false) {
    state.cityFilter = state.cityFilter.filter(function (item) {
      return item !== city;
    });
  }
  renderBreweries();
}

function handleNameFilterChanged(event) {
  // update our state of our filter
  // state.titleFilter = event.target.value
  state.nameFilter = nameFilter.value;

  // state was updated, re-render
  renderBreweries();
}

function handleTypeFilterChanged(event) {
  // update our state of our filter
  // state.titleFilter = event.target.value
  state.typeFilter =
    typeFilter.options[typeFilter.selectedIndex].innerText.toLowerCase();

  // state was updated, re-render
  renderBreweries();
}

// FUNCTIONS FOR API CALLS
function getBreweriessFromApi() {
  console.log("fetch GET /breweries");
  fetch("https://api.openbrewerydb.org/v1/breweries?per_page=200", {})
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log("GET /tasks json data:", jsonData);

      // 1: update my local `state` with the jsonData
      state.breweries = jsonData;
      // 2: state was changed -> call relevant re-render functions
      renderBreweries();
      let filteredState = state.breweries.filter((brew) => {
        if (state.allowedTypes.includes(brew.brewery_type)) return brew;
      });
      createCityCheckbox(filteredState);
    });
}

function getBreweriessFromApiByState(state) {
  console.log("fetch GET /breweries");
  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&per_page=60`,
    {}
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log("GET /tasks json data:", jsonData);

      // 1: update my local `state` with the jsonData
      state.breweries = jsonData;
      // 2: state was changed -> call relevant re-render functions
    });
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function createCityCheckbox(cities) {
  // create an input of type checkbox
  cityForm.innerHTML = "";

  const unique = [...new Set(cities.map((c) => c.city))];

  for (let i = 0; i < unique.length; i++) {
    const label = document.createElement("label");
    label.innerText = `${unique[i]}`;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", `${unique[i]}`);
    checkbox.setAttribute("value", `${unique[i]}`);
    checkbox.check = false;
    checkbox.addEventListener("click", (event) =>
      handleClick(event, checkbox, unique[i])
    );

    cityForm.append(checkbox, label);
  }
}

function renderBreweries() {
  console.log("calling renderTasks()");
  // reset my task list completely
  breweryList.innerHTML = "";

  // creating a new array that has a subset of tasks
  let filteredState = state.breweries.filter((brew) => {
    if (state.allowedTypes.includes(brew.brewery_type)) return brew;
  });

  // creating a new array that has a subset of tasks
  let filteredBreweriesTemp = filteredState.filter((brew) =>
    brew.state.toLowerCase().includes(state.stateFilter.toLocaleLowerCase())
  );

  let filteredByName = filteredBreweriesTemp.filter((brew) =>
    brew.name.toLowerCase().includes(state.nameFilter.toLocaleLowerCase())
  );

  let filteredType = filteredByName.filter((brew) => {
    if (state.typeFilter === "" || state.typeFilter === "select a type...") {
      return brew;
    } else {
      return brew.brewery_type
        .toLowerCase()
        .includes(state.typeFilter.toLowerCase());
    }
  });

  let filteredBreweries = filteredType.filter((brew) => {
    if (state.cityFilter.length === 0) {
      return brew;
    } else {
      return state.cityFilter.includes(brew.city);
    }
  });

  // for each task in my data, create a new li element
  for (let i = 0; i < filteredBreweries.length; i++) {
    const brew = filteredBreweries[i];

    const brewLi = document.createElement("li");
    brewLi.setAttribute("id", brew.id);

    const h2 = document.createElement("h2");
    h2.innerText = brew.name;

    const div = document.createElement("div");
    div.setAttribute("class", "type");
    div.innerText = brew.brewery_type;

    const sect = document.createElement("section");
    sect.setAttribute("class", "address");

    const h3 = document.createElement("h3");
    h3.innerText = "Address:";
    const p1 = document.createElement("p");
    p1.innerText = brew.address_1;

    const p2 = document.createElement("p");
    const strong = document.createElement("strong");
    strong.innerText = brew.city + ", " + brew.postal_code;
    p2.appendChild(strong);

    sect.append(h3, p1, p2);

    const sect2 = document.createElement("section");
    sect2.setAttribute("class", "phone");
    const h32 = document.createElement("h3");
    h32.innerText = "Phone:";
    const p3 = document.createElement("p");
    p3.innerText = brew.phone;
    sect2.append(h32, p3);

    const sect3 = document.createElement("section");
    sect3.setAttribute("class", "link");

    const Anchor = document.createElement("a");
    Anchor.target = "_blank";
    Anchor.innerText = "Visit Website";

    const linkHref = document.createAttribute("href");
    linkHref.value = brew.website_url;
    Anchor.setAttributeNode(linkHref);

    sect3.append(Anchor);

    brewLi.append(h2, div, sect, sect2, sect3);

    // add the list element inside the breweryList
    breweryList.appendChild(brewLi);
  }
  //
}

// INITIAL RENDER
function main() {
  console.log("running main()");
  console.log("data: ", state.breweries);

  // update filter UI
  updateFilterState();

  updateDropdownState();

  updateFilterName();

  // register handlers for filtering
  clearButton.addEventListener("click", (event) => clearChecks(event));
  selectState.addEventListener("input", handleStateFilterChanged);
  typeFilter.addEventListener("input", handleTypeFilterChanged);
  nameFilter.addEventListener("input", handleNameFilterChanged);

  getBreweriessFromApi();
}

main();
