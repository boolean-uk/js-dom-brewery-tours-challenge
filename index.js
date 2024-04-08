/* <li>
  <h2>Snow Belt Brew</h2>
  <div class="type">micro</div>
  <section class="address">
    <h3>Address:</h3>
    <p>9511 Kile Rd</p>
    <p><strong>Chardon, 44024</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>N/A</p>
  </section>
  <section class="link">
    <a href="null" target="_blank">Visit Website</a>
  </section>
</li>
     */



//Build brewery card
const buildCard = (brewery) => {
    const breweryList = document.querySelector('#breweries-list')

    const li = document.createElement('li')

    const h2 = document.createElement('h2')
    h2.innerText = brewery.name
    li.append(h2)

    const div = document.createElement('div')
    div.innerText = brewery.brewery_type
    div.classList.add('type')
    li.append(div)

    const addSection = document.createElement('section')
    addSection.classList.add('address')

    const addressH3 = document.createElement('h3')
    addressH3.innerText = "Address:"
    addSection.append(addressH3)

    const line1P = document.createElement('p')
    line1P.innerText = brewery.address_1
    addSection.append(line1P)

    const line2P = document.createElement('p')
    const strongText = document.createElement('strong')
    strongText.innerText = `${brewery.city}, ${brewery.postal_code}`
    line2P.append(strongText)
    addSection.append(line2P)

    li.append(addSection)

    const phoneSection = document.createElement('section')
    phoneSection.classList.add('phone')

    const phoneH3 = document.createElement('h3')
    phoneH3.innerText = 'Phone:'
    phoneSection.append(phoneH3)

    const phoneP = document.createElement('p')
    if (brewery.phone) {
        phoneP.innerText = brewery.phone
    } else {
        phoneP.innerText = "N/A"
    }
    phoneSection.append(phoneP)

    li.append(phoneSection)

    if (brewery.website_url) {
        const linkSection = document.createElement('section')
        linkSection.classList.add('link')
        const link = document.createElement('a')
    
        link.innerText = 'Visit Website'
        link.setAttribute('target', '_blank')
        link.setAttribute('href', brewery.website_url)
        li.append(linkSection)
    }

    breweryList.append(li)
}

