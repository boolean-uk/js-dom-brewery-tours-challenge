function phoneInfo(phoneNumber) {
  const section = document.createElement('section')
  section.className = 'phone'

  const heading = document.createElement('h3')
  heading.innerText = 'Phone:'

  const phone = document.createElement('p')
  phone.innerText = phoneNumber ? phoneNumber : 'N/a'

  section.append(heading, phone)
  return section
}

export default phoneInfo
