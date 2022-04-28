function cityLabel(city) {
  const label = document.createElement('label')
  label.for = city
  label.innerText = city

  return label
}

export default cityLabel
