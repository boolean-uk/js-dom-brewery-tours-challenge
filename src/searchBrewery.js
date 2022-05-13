import renderBreweryUl from "./renderBreweryUl.js";

const searchBrewery = (e, breweries, selectBreweryType) => {
  let searchInput = e.target.value;
  let targetBrewery = breweries.filter((brewery) => {
    if (brewery.name.includes(searchInput)) return brewery;
  });

  renderBreweryUl(targetBrewery, selectBreweryType);
};

export default searchBrewery;
