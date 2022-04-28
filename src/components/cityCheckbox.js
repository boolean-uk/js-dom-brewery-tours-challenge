function cityCheckbox(city) {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.name = city
  input.value = city

  return input
}

export default cityCheckbox
