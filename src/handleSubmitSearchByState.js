import fetchByState from "./fetchByState.js"

function handleSubmitSearchByState(event) {
  event.preventDefault()
  const USState = event.target[0].value.split(' ').join('_')

  fetchByState(USState)
}

export default handleSubmitSearchByState