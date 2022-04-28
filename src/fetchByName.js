import state from "./state.js";
import render from "./render.js";

function fetchByName(name) {
  const nameExtension = name ? `&&by_name=${name}` : ''
  fetch(`${state.currentUrl}${state.typeExtension}${nameExtension}`)
  .then(res => res.json())
  .then(data => {
    state.nameExtension = nameExtension
    render(data)
  })
}

export default fetchByName
