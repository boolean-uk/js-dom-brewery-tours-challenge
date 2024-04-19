//   <li>
//     <h2>Snow Belt Brew</h2>
//     <div class="type">micro</div>
//     <section class="address">
//       <h3>Address:</h3>
//       <p>9511 Kile Rd</p>
//       <p><strong>Chardon, 44024</strong></p>
//     </section>
//     <section class="phone">
//       <h3>Phone:</h3>
//       <p>N/A</p>
//     </section>
//     <section class="link">
//       <a href="null" target="_blank">Visit Website</a>
//     </section>
//   </li>

const url = 'https://api.openbrewerydb.org/v1/breweries/{obdb-id}'

const list = document.createElement('li')

const nameHeader = document.createElement('h2')
const breweryType = document.createElement('div')
breweryType.classList.add('type')
const addressSection = document.createElement('section')
addressSection.classList.add('address')
const phoneSection = document.createElement('section')
phoneSection.classList.add('phone')
const linkSection = document.createElement('section')
linkSection.classList.add('link')


const addressHeader = document.createElement('h3')
addressHeader.innerText = 'Address:'
const paragOne = document.createElement('p')
const paragTwo = document.createElement('p')
const paragTwoStr = document.createElement('strong')
paragTwo.append(paragTwoStr)

addressSection.append(
    addressHeader,
    paragOne,
    paragTwo
)

const phoneHeader = document.createElement('h3')
phoneHeader.innerText = 'Phone:'
const phoneParag = document.createElement('p')
phoneSection.appendChild(
    phoneHeader,
    phoneParag
)

const link = document.createElement('a')
link.setAttribute('href', null)
link.setAttribute('target', '_blank')
link.innerText = 'Visit Website'
linkSection.append(link)

list.append(
    nameHeader,
    breweryType,
    addressSection,
    phoneSection,
    linkSection
)

const breweriesList = document.querySelector('#breweries-list')
breweriesList.appendChild(list)
