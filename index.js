const state = {
  tours: [],
};

const root = "https://api.openbrewerydb.org/v1/breweries";
const brewList = document.querySelector("#breweries-list");
const stateSelectForm = document.querySelector("#select-state-form");
const filterByTypeForm = document.querySelector("#filter-by-type-form");
const filterByTypeSelect = document.querySelector("#filter-by-type");
const article = document.querySelector('article');

const renderBreweryDetails = (brewery) => {
  alert(`Brewery Name: ${brewery.name}\nType: ${brewery.brewery_type}\nAddress: ${brewery.address}`);
};

const renderBreweries = (data) => {
  while (brewList.firstChild) {
    brewList.removeChild(brewList.firstChild);
  }

  data.forEach((brewery) => {
    if (state.tours.includes(brewery.brewery_type)) {
      const breweryItem = document.createElement("li");
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

      // Event listener to display brewery details when clicked
      breweryItem.addEventListener("click", () => {
        fetchBreweryDetails(brewery.id);
      });

      brewList.appendChild(breweryItem);
    }
  });
};

const fetchBreweryDetails = (breweryId) => {
  const breweryDetailsEndpoint = `${root}/${breweryId}`;

  fetch(breweryDetailsEndpoint)
    .then((response) => response.json())
    .then((brewery) => {
      renderBreweryDetails(brewery);
    })
    .catch((error) => console.error("Error fetching brewery details:", error));
};

const renderStateSelectAndRender = () => {
  fetch(`${root}`)
    .then((response) => response.json())
    .then((data) => {
      const stateSelect = document.querySelector("#select-state");
      const uniqueStates = [...new Set(data.map((brewery) => brewery.state))];

      uniqueStates.forEach((state) => {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        stateSelect.appendChild(option);
      });

      stateSelect.addEventListener("change", () => {
        const selectedState = stateSelect.value;
        fetchBreweriesByState(selectedState);
      });

      filterByTypeSelect.addEventListener("change", () => {
        const selectedType = filterByTypeSelect.value;
        if (selectedType === "") {
          const selectedState = stateSelect.value;
          fetchBreweriesByState(selectedState);
        } else {
          fetchBreweriesByTypeAndState(selectedType, stateSelect.value);
        }
      });
    })
    .catch((error) => console.error("Error fetching Data:", error));
};

const fetchBreweriesByState = (selectedState) => {
  fetch(`${root}?by_state=${selectedState}&per_page=3`)
    .then((response) => response.json())
    .then((data) => {
      renderBreweries(data);
    })
    .catch((error) => console.error("Error fetching Data:", error));
};

const fetchBreweriesByTypeAndState = (selectedType, selectedState) => {
  fetch(`${root}?by_type=${selectedType}&by_state=${selectedState}&per_page=3`)
    .then((response) => response.json())
    .then((data) => {
      renderBreweries(data);
    })
    .catch((error) => console.error("Error fetching Data:", error));
};

stateSelectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedState = stateSelectForm.value;
  fetchBreweriesByState(selectedState);
});

renderStateSelectAndRender();
