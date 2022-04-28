import state from "./state.js";
import render from "./render.js";

function fetchByType(type) {
  const urlExtension = type ? `&&by_type=${type}` : ''
  fetch(`${state.currentUrl}${urlExtension}`)
  .then(res => res.json())
  .then(data => {
    state.typeExtension = urlExtension
    render(data)
  })
  .catch(() => console.log('Choose a state first.'))
}

export default fetchByType
