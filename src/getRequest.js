import renderBreweryUl from "./renderbreweryUl.js";
import renderSearchBar from "./renderSearchBar.js";
import formatState from "./formatState.js";
import renderCityCheckBox from "./renderCityCheckBox.js";

const getRequest = (selectState, selectBreweryType = "") => {
  const url = "https://api.openbrewerydb.org/breweries?by_state=";

  fetch(url + formatState(selectState))
    .then((res) => res.json())
    .then((breweries) => {
      renderBreweryUl(breweries, selectBreweryType);
      renderSearchBar(breweries);
      renderCityCheckBox(breweries);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default getRequest;
