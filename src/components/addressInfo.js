function addressInfo(street, city, postcode) {
  const section = document.createElement('section')
  section.className = 'address'

  const heading = document.createElement('h3')
  heading.innerText = 'Address:'

  const streetInfo = document.createElement('p')
  streetInfo.innerText = street

  const locality = document.createElement('p')
  locality.innerHTML = `<strong>${city}, ${postcode}</strong>`

  section.append(heading, streetInfo, locality)
  return section
}

export default addressInfo
