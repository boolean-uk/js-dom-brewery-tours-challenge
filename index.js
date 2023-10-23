const root = 'https://api.openbrewerydb.org/v1/breweries'
let breweries = []

const api = (str) => {
    return `${root}?${str}?per_page=10`;
}

const getBreweries = (type) => {
    console.log('fetching')
    if (type == null) {
        fetch(api())
            .then((response) => response.json())
            .then((data) => {
                breweries = data;
                renderBreweries();
            })
    } else {
        fetch(api(`by_type=${typeButton.value}&`))
        .then((response) => response.json())
        .then((data) => {
            breweries = data;
            renderBreweries();
        })

    }
}

const renderBreweries = () => {
    const list = document.querySelector('#breweries-list')
    list.textContent = ''
    breweries.forEach((item) => {
        const container = document.createElement('li')
        
        const title = document.createElement('h2')
        const type = document.createElement('div')
        const addressContainer = document.createElement('section')
        const addressh3 = document.createElement('h3')
        const addressp1 = document.createElement('p')
        const strong = document.createElement('strong')
        const addressp2 = document.createElement('p')

        const phoneContainer = document.createElement('section')
        const phoneh3 = document.createElement('h3')
        const phonep = document.createElement('p')
        
        const link = document.createElement('section')
        const a = document.createElement('a')

        title.innerText = item.name
        type.innerText = item.brewery_type
        addressh3.innerText = 'Address:'
        addressp1.innerText = item.street
        strong.innerText = `${item.state}, ${item.postal_code}`
        phoneh3.innerText = 'Phone:'
        phonep.innerText = item.phone


        type.className = 'type'
        addressContainer.className = 'address'
        addressContainer.append(addressh3, addressp1, addressp2)
        addressp2.append(strong)

        phoneContainer.className = 'phone'
        phoneContainer.append(phoneh3, phonep)

        link.className = 'link'
        a.href = `${item.website_url}`
        link.append(a)

        container.append(title, type, addressContainer, phoneContainer, link)
        list.append(container)
    })
    

}

const typeButton = document.querySelector('#filter-by-type')
typeButton.addEventListener('change', event => {
    getBreweries(typeButton.value)
})

getBreweries()



