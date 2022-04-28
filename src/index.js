import fetchByState from "./fetchByState.js";

const searchBtn = document.getElementById('select-state-form')

searchBtn.addEventListener('submit', (e) => {
  e.preventDefault()
  const state = e.target[0].value.split(' ').join('_')

  fetchByState(state)
})