const createCityCheckBox = (breweries) => {
  const cityForm = document.querySelector("#filter-by-city-form");
  breweries.forEach((brewery) => {
    const cityCheckBox = document.createElement("input");
    cityCheckBox.type = "checkbox";
    cityCheckBox.name = brewery.city.toLowerCase();
    cityCheckBox.value = brewery.city.toLowerCase();

    const cityLabel = document.createElement("label");
    cityLabel.setAttribute("for", brewery.city);
    cityLabel.innerText = brewery.city;

    cityForm.append(cityCheckBox, cityLabel);
  });
};

export default createCityCheckBox;
