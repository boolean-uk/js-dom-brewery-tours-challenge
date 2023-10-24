

const state = {
  tours: [],
};

// selectors

const root = "https://api.openbrewerydb.org/v1/breweries";
const brewList = document.querySelector("#breweries-list");
const stateSelectForm = document.querySelector("#select-state-form");
const filterByForm = document.querySelector("#filter-by-type-form");
const filterSection = document.querySelectorAll(".filters-section")[1];
const article = document.querySelector('article')



const renderBreweries = (data) => {
  // Clear previous brewery list
  while (brewList.firstChild) {
    brewList.removeChild(brewList.firstChild);
  }
  const breweryItem = document.createElement("li");

  data.forEach((brewery) => {
    // Create elements for each brewery

    const breweryName = document.createElement("h2");
    const breweryType = document.createElement("div");
    const sectionAddress = document.createElement("section");
    const breweryAddress = document.createElement("h3");
    const lineOne = document.createElement("p");
    const lineTwo = document.createElement("p");
    const sectionPhone = document.createElement("section");
    const breweryPhone = document.createElement("h3");
    const phoneP = document.createElement("p");
    const sectionLink = document.createElement("section");
    const breweryLink = document.createElement("a");

    sectionAddress.appendChild(breweryAddress);
    sectionAddress.appendChild(lineOne);
    sectionAddress.appendChild(lineTwo);

    sectionPhone.appendChild(breweryPhone);
    sectionPhone.appendChild(phoneP);

    sectionLink.appendChild(breweryLink);

    breweryItem.appendChild(breweryName);
    breweryItem.appendChild(breweryType);
    breweryItem.appendChild(sectionAddress);
    breweryItem.appendChild(sectionPhone);
    breweryItem.appendChild(sectionLink);

    brewList.appendChild(breweryItem);
  });
};

// search by type

const renderTours = () => {
  const searchBreweriesByType = (type) => {
    fetch(`${root}?by_type=${type}&per_page=3`)
      .then((response) => response.json())
      .then((data) => {
        renderBreweries(data);
      })
      .catch((error) => console.error("Error fetching Data:", error));
  };

  filterByForm.addEventListener("change", (event) => {
    const selectedType = document.querySelector("#filter-by-type").value;
    searchBreweriesByType(selectedType);
  });
  

  const searchBreweriesByState = (states) => {
    fetch(`${root}?by_state=${states}&per_page=3`)
      .then((response) => response.json())
      .then((data) => {
        renderBreweries(data);
      })
      .catch((error) => console.error("Error fetching Data:", error));
  };
  stateSelectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedState = document.querySelector("#select-state").value;
    searchBreweriesByState(selectedState);
  });
  renderTours();
};

const renderStateSelectAndRender = () => {
  fetch("${root}/state")
    .then((response) => response.json())
    .then((data) => {
      console.log("read state", data);
      state.tours = data;
      renderTours();
    })
    .catch((error) => console.error("Error fetching Data:", error));
};



