console.log('render')

const renderBrewery = (brewery) => {
    const breweryContainer = document.createElement('li')
    breweriesList.append(breweryContainer)
    renderBreweryLayout(breweryContainer, brewery)
}

const renderBreweryLayout = (breweryContainer, brewery) => {

    const h2 = document.createElement('h2')
    breweryContainer.append(h2)
    h2.innerText = brewery.name

    const div = document.createElement('div')
    div.setAttribute('class', 'type')
    div.innerText = brewery.brewery_type
    breweryContainer.append(div)

    const sectionTypes = ["address", "phone", "link"]
    sectionTypes.forEach(sectionClass => {
        const section = document.createElement('section')
        section.setAttribute('class', `${sectionClass}`)
        breweryContainer.append(section)
        renderSectionContent(sectionClass, section, brewery)
    })
}

const renderSectionContent = (sectionClass, section, brewery) => {

    if (sectionClass === "address") {
         
        const h3 = document.createElement('h3')
        h3.innerText = 'Address:'
        section.append(h3)
        const p1 = document.createElement('p')
        p1.innerText = brewery.street
        section.append(p1) 
        const p2 = document.createElement('p')
        section.append(p2)        
        const strong = document.createElement('strong')
        p2.append(strong)
        strong.innerText = `${brewery.city}, ${brewery.postal_code}` 
    }
    if (sectionClass === "phone") {
        const h3 = document.createElement('h3')
        section.append(h3)
        h3.innerText = 'Phone:'
        const p = document.createElement('p')
        section.append(p)
        p.innerText = brewery.phone
    }
    if (sectionClass === "link") {
        const a = document.createElement('a')
        a.setAttribute('href', `${brewery.website_url}`)
         a.setAttribute('target', 'blank')
         a.innerText = 'Visit Website'
        section.append(a)
    }
}