import fetchByType from "./fetchByType.js"

function handleChangeFilterByTypeBtn(event) {
  const typeFilter = event.target.value

  fetchByType(typeFilter)
}

export default handleChangeFilterByTypeBtn