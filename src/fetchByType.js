import state from "./state.js";
import render from "./render.js";

function fetchByType(type) {
  const urlExtension = type ? `&&by_type=${type}` : ''
  fetch(`${state.currentUrl}${urlExtension}`)
  .then(res => res.json())
  .then(data => {
    render(data)
  })
}

export default fetchByType
