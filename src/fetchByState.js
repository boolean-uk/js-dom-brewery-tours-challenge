import render from "./render.js";

function fetchByState(state) {
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}`)
  .then(res => res.json())
  .then(data => {
    render(data)
  })
}

export default fetchByState
