function websiteUrl(url) {
  const section = document.createElement('section')
  section.className = 'link'

  const link = document.createElement('a')
  link.innerText = 'Visit Website'
  link.href = url
  link.target = '_blank'

  section.append(link)
  return section
}

export default websiteUrl
