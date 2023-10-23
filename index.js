//state for the main source 
const state = [
    {
        address_2: null,
        address_3: null,
        brewery_type: "large",
        city: "San Diego",
        country: "United States",
        county_province: null,
        created_at: "2018-07-24T00:00:00.000Z",
        id: 8041,
        latitude: "32.714813",
        longitude: "-117.129593",
        name: "10 Barrel Brewing Co",
        obdb_id: "10-barrel-brewing-co-san-diego",
        phone: "6195782311",
        postal_code: "92101-6618",
        state: "California",
        street: "1501 E St",
        updated_at: "2018-08-23T00:00:00.000Z",
        website_url: "http://10barrel.com"
      }
];
    
//root url for the fetch
const root = "https://api.openbrewerydb.org/v1/breweries";
//breweries list for the ul
const breweryList = document.querySelector('.breweries-list');

//render fucntion to display the created items
function renderBreweryList() {
    state.forEach((brewery) => {
        //for the li 
        const li = document.createElement('li')

            //h2 inside the li
            const breweryName = document.createElement('h2')
            breweryName.innerText = brewery.name

            //div
            const breweryType = document.createElement('div')
            breweryType.setAttribute('class','type')
            breweryType.innerText = brewery.brewery_type

            //for the section 
            const sectionAddress = document.createElement('section')
            sectionAddress.setAttribute('class','address')

                //for the h3 inside the sectionAdress
                const addressH3 = document.createElement('h3')
                addressH3.innerText = 'Address :'
                //for the address p
                const addressStreet = document.createElement('p')
                addressStreet.innerText = brewery.street
                //for the city 
                const addressCity = document.createElement('p')
                    //for the strong 
                    const addressStrong = document.createElement('strong')
                    addressStrong.innerText = brewery.city,brewery.postal_code

                    //appending evrything inside 
                addressCity.append(addressStrong)
            sectionAddress.append(addressH3,addressStreet,addressCity)

            //for the  sectionPhone 
            const sectionPhone = document.createElement('section')
            sectionPhone.classList.add('phone')

                //for the h3 insdei the phone 
                const phoneH3 = document.createElement('h3')
                phoneH3.innerText = 'Phone :'
                //for the phone number insdie tthe p 
                const phoneNumber = document.createElement('p')
                phoneNumber.innertext = `${brewery.phone}`
                //appeding the section 
            sectionPhone.append(phoneH3,phoneNumber)

            //sectionLink 
            const sectionLink = document.createElement('section')
            sectionLink.classList.add('link')
                //for the a 
                const link = document.createElement('a')
                link.setAttribute('href',`${brewery.website_url}`)
                link.setAttribute('target','_blank')
                link.innerText='Visit Website'
            sectionLink.append(link)    

        li.append(breweryName,breweryType,sectionAddress,sectionPhone,sectionLink)

    })
}

renderBreweryList()