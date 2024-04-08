const breweriesApi = "https://api.openbrewerydb.org/v1/breweries"
//Access HTML elements
//Header elements
const header = document.querySelector(".main-header")
const headerSection = document.querySelector("section")
const headerSearchBox = document.querySelector("#select-state-form")
const headerSearchBoxInput = document.querySelector("#select-state")
//Main elements
const filterForm = document.querySelector("#filter-by-type-form")
const formSelect = document.querySelector("#filter-by-type")
//Article elements
const breweriesUl = document.querySelector(".breweries-list")

//Create breweries card's elements
function bList() {
	const brewLi = document.createElement("li")
	return brewLi
}

function brName(brew) {
	const brewName = document.createElement("h2")
	brewName.innerText = brew.name
	return brewName
}

function typeDiv(brew) {
	const brewType = document.createElement("div")
	brewType.classList.add("type")
	brewType.innerText = brew.brewery_type
	return brewType
}

function addressSection() {
	const brewAddr = document.createElement("section")
	brewAddr.classList.add("address")
	return brewAddr
}

function addressH3() {
	const addrH3 = document.createElement("h3")
	addrH3.innerText = "Address:"
	return addrH3
}

function brewAddress(brew) {
	const brewRoad = document.createElement("p")
	brewRoad.classList.add("address-road")
	brewRoad.innerText = brew.address_1
	return brewRoad
}

function brewCity(brew) {
	const brewCity = document.createElement("p")
	brewCity.classList.add("address-city")
	brewCity.style.fontWeight = "bold"
	brewCity.innerText = `${brew.city}, ${brew.postal_code}`
	return brewCity
}

function phoneSection() {
	const brewPhone = document.createElement("section")
	brewPhone.classList.add("phone")
	return brewPhone
}

function phoneH3() {
	const phH3 = document.createElement("h3")
	phH3.innerText = "Phone:"
	return phH3
}

function brewPhone(brew) {
	const phoneNum = document.createElement("p")
	phoneNum.innerText = brew.phone
	return phoneNum
}

function websiteSection() {
	const linkSectiom = document.createElement("section")
	linkSectiom.classList.add("link")
	return linkSectiom
}

function brewLinkBtn(brew) {
	const linkBtn = document.createElement("a")
	linkBtn.setAttribute("href", brew.website_url)
	linkBtn.setAttribute("target", _blank)
	linkBtn.innerText = "VISIT WEBSITE"
}
