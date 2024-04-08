const allBreweries = [
    {
        address_2: 'Tuscaloosa, AL 35401',
        brewery_type: "micro",
        city: "Tuscaloosa",
        country: "United States",
        id: 1,
        latitude: "33.21061754545455",
        longitude: "-87.565915",
        name: "Black Warrior Brewing Company",
        phone: "+1 205-248-7841",
        postal_code: "35401",
        state: "Alabama",
        street: "2216 University Blvd",
        website_url: "https://www.blackwarriorbrewing.com/"
    },
    {
        address_2: 'Boulder, CO 80301',
        brewery_type: "brewpub",
        city: "Boulder",
        country: "United States",
        id: 2,
        latitude: "40.06262435526316",
        longitude: "-105.20331059210527",
        name: "Avery Brewing Company",
        phone: "+1 303-440-4324",
        postal_code: "80301",
        state: "Colorado",
        street: "4910 Nautilus Ct N",
        website_url: "https://www.averybrewing.com/"
    },
    {
        address_2: 'Boise, Ada County, Idaho, 83702',
        brewery_type: "brewpub",
        city: "Boise",
        country: "United States",
        id: 3,
        latitude: "43.6178661",
        longitude: "-116.20275664677072",
        name: "10 Barrel Brewing Boise",
        phone: "+1 208-344-5870",
        postal_code: "83702",
        state: "Idaho",
        street: "826, West Bannock Street",
        website_url: "https://10barrel.com/"
    },
    {
        address_2: 'Chicago, Illinois, 60613',
        brewery_type: "regional",
        city: "Chicago",
        country: "United States",
        id: 4,
        latitude: "41.9553987",
        longitude: "-87.6745486",
        name: "Begyle Brewing",
        phone: "+1 773-661-6963",
        postal_code: "60613",
        state: "Illinois",
        street: "1800, West Cuyler Avenue",
        website_url: "https://www.begylebrewing.com/"
    },
    {
        address_2: 'South Dakota, 57701',
        brewery_type: "brewpub",
        city: "Rapid City",
        country: "United States",
        id: 5,
        latitude: "44.08144085",
        longitude: "-103.22755621579424",
        name: "Firehouse Brewing Company",
        phone: "+1 605-348-1915",
        postal_code: "57701",
        state: "South Dakota",
        street: "610, Main Street, Rapid City",
        website_url: "https://www.firehousebrewing.com/"
    },
    {
        address_2: 'Temple, Texas, 76502',
        brewery_type: "micro",
        city: "Belton",
        country: "United States",
        id: 6,
        latitude: "31.126632",
        longitude: "-97.4146198",
        name: "Bold Republic Brewing Company",
        phone: "+1 254-598-2278",
        postal_code: "76502",
        state: "Texas",
        street: "7070 Stonehollow",
        website_url: "https://www.boldrepublicbrewing.com/"
    },
    {
        address_2: 'Buffalo, New York, 14203',
        brewery_type: "brewpub",
        city: "Buffalo",
        country: "United States",
        id: 7,
        latitude: "42.8695553",
        longitude: "-78.8715807",
        name: "Buffalo RiverWorks",
        phone: "+1 716-342-2292",
        postal_code: "14203",
        state: "New York",
        street: "359, Ganson Street",
        website_url: "https://buffaloriverworks.com/"
    },
    {
        address_2: 'Cleveland, Ohio, 44103',
        brewery_type: "micro",
        city: "Cleveland",
        country: "United States",
        id: 8,
        latitude: "41.5214479",
        longitude: "-81.6516143",
        name: "Goldhorn Brewery",
        phone: "+1 216-273-7001",
        postal_code: "44103",
        state: "Ohio",
        street: "1361, East 55th Street, St.",
        website_url: "https://goldhornbrewery.com/"
    },
    {
        address_2: 'Miami, Florida, 33127',
        brewery_type: "micro",
        city: "Miami",
        country: "United States",
        id: 9,
        latitude: "25.7995437",
        longitude: "-80.19752867117082",
        name: "J Wakefield Brewing",
        phone: "+1 786-254-7779",
        postal_code: "33127",
        state: "Florida",
        street: "120, Northwest 24th Street, Wynwood",
        website_url: "https://jwakefieldbrewing.com/"
    },
    {
        address_2: 'Lihue, Hawaii, 96766',
        brewery_type: "regional",
        city: "Lihue",
        country: "United States",
        id: 10,
        latitude: "21.9722854",
        longitude: "-159.364787",
        name: "Kauai Beer Company",
        phone: "N/A",
        postal_code: "96766",
        state: "Hawaii",
        street: "4265, Rice Street, Kupolo",
        website_url: "https://www.kauaibeer.com/"
    }
]
const breweriesList = document.getElementById('breweries-list')

function createBreweryEl() {
    for (let i = 0; i < allBreweries.length; i++) {
        const breweryEl = document.createElement('li')
        breweriesList.append(breweryEl)
    
        const breweryName = document.createElement('h2')
        breweryName.innerText = allBreweries[i].name
        breweryEl.append(breweryName)
    
        const breweryType = document.createElement('div')
        breweryType.innerText = allBreweries[i].brewery_type
        breweryType.classList.add('type')
        breweryEl.append(breweryType)
    
        const breweryAddressSection = document.createElement('section')
        breweryAddressSection.classList.add('address')
        breweryEl.append(breweryAddressSection)
    
        const breweryAddress = document.createElement('h3')
        breweryAddress.innerText = 'Address:'
        breweryAddressSection.append(breweryAddress)
    
        const breweryAddressFirstname = document.createElement('p')
        breweryAddressFirstname.innerText = allBreweries[i].street
        breweryAddressSection.append(breweryAddressFirstname)
    
        const breweryAddressLastname = document.createElement('p')
        breweryAddressSection.append(breweryAddressLastname)
    
        const breweryAddressStrongLastname = document.createElement('strong')
        breweryAddressStrongLastname.innerText = allBreweries[i].address_2
        breweryAddressLastname.append(breweryAddressStrongLastname)
    
        const breweryPhoneSection = document.createElement('section')
        breweryPhoneSection.classList.add('phone')
        breweryEl.append(breweryPhoneSection)
    
        const breweryPhone = document.createElement('h3')
        breweryPhone.innerText = 'Phone:'
        breweryPhoneSection.append(breweryPhone)
    
        const breweryPhoneNumber = document.createElement('p')
        breweryPhoneNumber.innerText = allBreweries[i].phone
        breweryPhoneSection.append(breweryPhoneNumber)
    
        const breweryLinkSection = document.createElement('section')
        breweryLinkSection.classList.add('link')
        breweryEl.append(breweryLinkSection)
    
        const breweryLink = document.createElement('a')
        breweryLink.setAttribute('href', allBreweries[i].website_url)
        breweryLink.setAttribute('target', '_blank')
        breweryLink.innerText = 'Visit Website'
        breweryLinkSection.append(breweryLink)
    }
}

createBreweryEl()