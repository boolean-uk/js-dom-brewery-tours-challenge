const breweryList = document.querySelector("#breweries-list")
const typeFilter = document.querySelector("#filter-by-type")
const stateSearch = document.querySelector("#select-state")


async function render() {
    const breweries = await fetch(
        "https://api.openbrewerydb.org/v1/breweries"
    )

    const breweriesData = await breweries.json()

    const currentFilter = typeFilter.value
    
    breweryList.innerHTML = ""
    
    breweriesData.forEach((item) => {
        const isValidBrewery = item.brewery_type === "micro" || item.brewery_type === "regional" || item.brewery_type === "brewpub"
        if(isValidBrewery && (item.brewery_type === currentFilter || currentFilter === "")){
            createListItem(item)
        }
    })
}

function createListItem(obj) {    
    const breweryName = document.createElement("h2")
    breweryName.innerHTML = obj.name

    const breweryType = document.createElement("h3")
    breweryType.innerHTML = obj.brewery_type.toUpperCase()
    breweryType.className = "type"

    const addressBlock = document.createElement("div")
    addressBlock.style.display = "flex"
    addressBlock.style.flexDirection = "column"
    addressBlock.className = "address"

    const addressTitle = document.createElement("h3")
    addressTitle.innerHTML = "Address:"
    
    const addressStreet = document.createElement("p")
    addressStreet.innerHTML = obj.address_1

    const addressCity = document.createElement("p")
    addressCity.innerHTML = obj.city + ", " + obj.postal_code
    addressCity.style.fontWeight = "700"



    addressBlock.append(addressTitle)
    addressBlock.append(addressStreet)
    addressBlock.append(addressCity)
    

    const phoneBlock = document.createElement("div")
    phoneBlock.className = "phone"

    const phoneTitle = document.createElement("h3")
    phoneTitle.innerHTML = "Phone:"

    const phoneNumber = document.createElement("p")
    phoneNumber.innerHTML = "+" + obj.phone

    

    phoneBlock.append(phoneTitle)
    phoneBlock.append(phoneNumber)

    const websiteButton = document.createElement("a")
    websiteButton.className = "link"
    websiteButton.innerHTML = "VISIT WEBSITE"
    websiteButton.href = obj.website_url
    websiteButton.target = "_blank"


    const breweryItem = document.createElement("li")
    breweryItem.className = "brewery--list"


    breweryItem.append(breweryName)
    breweryItem.append(breweryType)
    breweryItem.append(addressBlock)
    breweryItem.append(phoneBlock)
    breweryItem.append(websiteButton)

    breweryList.append(breweryItem)
}

typeFilter.addEventListener("change" , render)

render()
