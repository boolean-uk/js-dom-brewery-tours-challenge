function typeStamp(breweryType) {
  const typeStamp = document.createElement('div')
  typeStamp.className = 'type'
  typeStamp.innerText = breweryType
  return typeStamp
}

export default typeStamp
