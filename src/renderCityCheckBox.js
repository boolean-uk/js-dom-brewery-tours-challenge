import createCityArr from "./createCityArr.js";

const renderCityCheckBox = (breweries) => {
  const cityForm = document.querySelector("#filter-by-city-form");
  const cities = createCityArr(breweries);

  cities.forEach((city) => {
    const cityCheckBox = document.createElement("input");
    cityCheckBox.type = "checkbox";
    cityCheckBox.name = city.toLowerCase();
    cityCheckBox.value = city.toLowerCase();

    const cityLabel = document.createElement("label");
    cityLabel.setAttribute("for", city);
    cityLabel.innerText = city;

    cityCheckBox.addEventListener("click", () => {});

    cityForm.append(cityCheckBox, cityLabel);
  });
};

export default renderCityCheckBox;
