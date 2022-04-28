const listUl = document.querySelector("#breweries-list");

function renderBreweryApi() {
    listUl.innerHTML = "";
    const city = 'ohio'
    // get data
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${city}`)
    .then((res) => res.json())
    .then((data) => {
        // update the page
        console.log('have data', data)
        data.forEach((breweryData) => {
            
            listUl.append(renderBreweriesList(breweryData));
        })
    })
}



function renderBreweriesList(brewery) {
    // li
    const li = document.createElement('li')
    // name of the brewery
    const breweryName = document.createElement('h2')
    breweryName.innerText = brewery.name

    const breweryType = document.createElement('div')
    breweryType.className = 'type'
    brewery.innerText = brewery.brewery_type

    // section element created with the address of the brewery (with title and street) embedded in it
    const brewerySection = document.createElement('section')
    brewerySection.className = 'address'

    const h3Address = document.createElement('h3')
    h3Address.innerText = 'Address:'

    const pAddressOne = document.createElement('p')
    pAddressOne.innerText = brewery.street

    const pAddressTwo = document.createElement('p')
    // pAddressTwo.innerText = `<strong>${brewery.city}, ${brewery.postal_code}</strong>`

    const addressTwoStrong = document.createElement('strong')
    addressTwoStrong.innerText = `${brewery.city}, ${brewery.postal_code}`
    pAddressTwo.append(addressTwoStrong)
    // append the address into the section
    brewerySection.append(h3Address,pAddressOne,pAddressTwo)
    // create a section that holds the phone data
    const phoneSection = document.createElement('section')
    phoneSection.className = 'phone'

    const h3phone = document.createElement('h3')
    h3phone.innerText = 'Phone:'

    const pPhone = document.createElement('p')
    pPhone.innerText = 'N/A'
    // append the the phone into the section 
    phoneSection.append(h3phone,pPhone)
    // create a section that hold a link
    const linkSection = document.createElement('section')
    linkSection.className = 'link'

    const VisitLinkTag = document.createElement('a')
    VisitLinkTag.setAttribute('href','null')
    VisitLinkTag.setAttribute('target','_blank')
    VisitLinkTag.innerText = 'Visit Website'
    // append the link into the section
    linkSection.append(VisitLinkTag)
    // append all the h2, div and sections into the list
    li.append(
        breweryName,
        breweryType,
        brewerySection,
        phoneSection,
        linkSection
    )
    return li
}

renderBreweryApi()
