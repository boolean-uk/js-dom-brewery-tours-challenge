import { state, renderBrewers, breweriesContainer } from "./app.js";
import { getJSON } from "./getJSON.js";

export async function fetchBrewers(reset = false, currPage = 1) {
  const arr = state.filterType
    ? [state.filterType]
    : ["micro", "brewpub", "regional"];
  try {
    const brewers = await Promise.all(
      arr.map((brewer) => {
        return getJSON(
          ` https://api.openbrewerydb.org/breweries?by_state=${
            state.search
          }&by_type=${brewer}${
            state.pubSearch ? "&by_name=" + state.pubSearch : ""
          }&per_page=50&page=${currPage}`
        );
      })
    );
    renderBrewers(brewers, reset);
    if (brewers.flat().length >= 10) {
      fetchBrewers(reset, (currPage += 1));
    }
  } catch (err) {
    breweriesContainer.innerText = err.message;
    console.log(err.message);
  }
}
