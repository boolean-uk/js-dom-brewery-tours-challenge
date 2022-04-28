import addressInfo from "./addressInfo.js"
import nameHeading from "./nameHeading.js"
import phoneInfo from "./phoneInfo.js"
import typeStamp from "./typeStamp.js"
import websiteUrl from "./websiteUrl.js"

function breweryLi(brewery) {
  const { 
    name, 
    brewery_type: type, 
    street, 
    city, 
    postal_code: postcode, 
    phone, 
    website_url: url
  } = brewery

  const li = document.createElement('li')
  const nameHeader = nameHeading(name)
  const typeInfo = typeStamp(type)
  const addressSection = addressInfo(street, city, postcode)
  const phoneSection = phoneInfo(phone)
  const visitWebsite = websiteUrl(url)
  
  li.append(nameHeader, typeInfo, addressSection, phoneSection, visitWebsite)
  return li
}

export default breweryLi
