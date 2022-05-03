import fetchByName from "./fetchByName.js"

function handleInputSearchBar(event) {
  event.preventDefault()
  const name = event.target.value

  fetchByName(name)
}

export default handleInputSearchBar