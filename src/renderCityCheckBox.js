import createCityArr from "./createCityArr.js";
import searchBrewery from "./searchBrewery.js";
import state from "./index.js";

const clearAllCheckBox = (cityCheckBox) => {
  const clearAllBtn = document.querySelector(".clear-all-btn");
  clearAllBtn.addEventListener("click", () => {
    cityCheckBox.checked = false;
  });
};

const renderCityCheckBox = (breweries) => {
  const cityForm = document.querySelector("#filter-by-city-form");
  cityForm.innerHTML = "";
  const cities = createCityArr(breweries);

  cities.forEach((city) => {
    // checkbox input
    const cityCheckBox = document.createElement("input");
    cityCheckBox.type = "checkbox";
    cityCheckBox.name = city.toLowerCase();
    cityCheckBox.value = city.toLowerCase();

    // label
    const cityLabel = document.createElement("label");
    cityLabel.setAttribute("for", city);
    cityLabel.innerText = city;

    cityCheckBox.addEventListener("click", () => {
      // searchBrewery(city, breweries, state.selectBreweryType);
    });

    clearAllCheckBox(cityCheckBox);
    cityForm.append(cityCheckBox, cityLabel);
  });
};

export default renderCityCheckBox;
