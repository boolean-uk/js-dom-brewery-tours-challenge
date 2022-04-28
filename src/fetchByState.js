import state from "./state.js";
import render from "./render.js";

function fetchByState(USState) {
  fetch(`https://api.openbrewerydb.org/breweries?per_page=50&&by_state=${USState}`)
  .then(res => res.json())
  .then(data => {
    state.currentUrl = `https://api.openbrewerydb.org/breweries?per_page=50&&by_state=${USState}`
    render(data)
  })
}

export default fetchByState
