import state from "./state.js";
import render from "./render.js";

function fetchByName(name) {
  fetch(`${state.currentUrl}${state.typeExtension}&&by_name=${name}`)
  .then(res => res.json())
  .then(data => {
    render(data)
  })
}

export default fetchByName
