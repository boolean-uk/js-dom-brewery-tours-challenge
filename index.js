const breweryListContainer = document.querySelector("#breweries-list");
const state = {
  breweries: []
};

const renderBreweryList = (breweries) => {
  breweryListContainer.innerHTML = ''; // Clear previous content

  breweries.forEach((brewery) => {
    const breweryItem = document.createElement("li");
    const breweryName = document.createElement("h2");
    breweryName.innerText = brewery.name;

    const breweryType = document.createElement("div");
    breweryType.innerText = brewery.brewery_type;

    const addressSection = document.createElement("section");
    const breweryAddress = document.createElement("h3");
    breweryAddress.innerText = brewery.address_1;

    const addressLine2 = document.createElement("p");
    addressLine2.innerText = brewery.address_2;

    const city = document.createElement("p");
    const cityStrong = document.createElement("strong");
    cityStrong.innerText = brewery.city;
    city.appendChild(cityStrong);

    const contactSection = document.createElement("section");
    const phone = document.createElement("h3");
    phone.innerText = brewery.phone;

    const postalCode = document.createElement("p");
    postalCode.innerText = brewery.postal_code;

    const websiteSection = document.createElement("section");
    const websiteLink = document.createElement("a");
    websiteLink.innerText = brewery.website;
    websiteLink.href = brewery.website;

    breweryItem.appendChild(breweryName);
    breweryItem.appendChild(breweryType);
    breweryItem.appendChild(addressSection);
    breweryItem.appendChild(contactSection);
    breweryItem.appendChild(websiteSection);

    addressSection.appendChild(breweryAddress);
    addressSection.appendChild(addressLine2);
    addressSection.appendChild(city);

    contactSection.appendChild(phone);
    contactSection.appendChild(postalCode);

    websiteSection.appendChild(websiteLink);

    breweryListContainer.appendChild(breweryItem);
  });
};

const renderSearch = (breweries) => {
  const searchStateForm = document.querySelector('#select-state-form');
  const searchInput = document.querySelector('input[type="text"]');

  searchStateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const stateValue = searchInput.value.toLowerCase().trim();

    if (stateValue !== '') {
      const stateSearch = breweries.filter((brewery) =>
        brewery.state_province && brewery.state_province.toLowerCase() === stateValue
      );
      renderBreweryList(stateSearch);
    } else {
      renderBreweryList(breweries);
    }console.log(stateValue)
  });
};

const getDataandRender = () => {
  fetch('https://api.openbrewerydb.org/v1/breweries')
    .then((response) => response.json())
    .then((data) => {
      state.breweries = data;
      renderBreweryList(state.breweries);
      renderSearch(state.breweries);
    });
};

getDataandRender();
