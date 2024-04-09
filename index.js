// const breweriesApi = "https://api.openbrewerydb.org/v1/breweries"
// //Access HTML elements
// //Header elements
// const header = document.querySelector(".main-header")
// const headerSection = document.querySelector("section")
// const headerSearchBox = document.querySelector("#select-state-form")
// const headerSearchBoxInput = document.querySelector("#select-state")
// //Main elements
// const filterForm = document.querySelector("#filter-by-type-form")
// const formSelect = document.querySelector("#filter-by-type")
// //Article elements
// const breweriesUl = document.querySelector(".breweries-list")

// //Create breweries card's elements
// function bList() {
// 	const brewLi = document.createElement("li")
// 	return brewLi
// }

// function brName(brew) {
// 	const brewName = document.createElement("h2")
// 	brewName.innerText = brew.name
// 	return brewName
// }

// function typeDiv(brew) {
// 	const brewType = document.createElement("div")
// 	brewType.classList.add("type")
// 	brewType.innerText = brew.brewery_type
// 	return brewType
// }

// function addressSection() {
// 	const brewAddr = document.createElement("section")
// 	brewAddr.classList.add("address")
// 	return brewAddr
// }

// function addressH3() {
// 	const addrH3 = document.createElement("h3")
// 	addrH3.innerText = "Address:"
// 	return addrH3
// }

// function brewAddress(brew) {
// 	const brewRoad = document.createElement("p")
// 	brewRoad.classList.add("address-road")
// 	brewRoad.innerText = brew.address_1
// 	return brewRoad
// }

// function brewCity(brew) {
// 	const brewCity = document.createElement("p")
// 	brewCity.classList.add("address-city")
// 	brewCity.style.fontWeight = "bold"
// 	brewCity.innerText = `${brew.city}, ${brew.postal_code}`
// 	return brewCity
// }

// function phoneSection() {
// 	const brewPhone = document.createElement("section")
// 	brewPhone.classList.add("phone")
// 	return brewPhone
// }

// function phoneH3() {
// 	const phH3 = document.createElement("h3")
// 	phH3.innerText = "Phone:"
// 	return phH3
// }

// function brewPhone(brew) {
// 	const phoneNum = document.createElement("p")
// 	phoneNum.innerText = brew.phone
// 	return phoneNum
// }

// function websiteSection() {
// 	const linkSectiom = document.createElement("section")
// 	linkSectiom.classList.add("link")
// 	return linkSectiom
// }

// function brewLinkBtn(brew) {
// 	const linkBtn = document.createElement("a")
// 	linkBtn.setAttribute("href", brew.website_url)
// 	linkBtn.setAttribute("target", _blank)
// 	linkBtn.innerText = "VISIT WEBSITE"
// }

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
const breweriesUl = document.querySelector(".breweries-list")

//Create arrays for each  brewery type
const allUsBreweriesArray = []
const microArray = []
const regionalArray = []
const brewPubArray = []

//GET api pages
async function fetchBreweriesFromPage(page) {
	const response = await fetch(
		// `breweriesApi?page=${page}`
		`https://api.openbrewerydb.org/v1/breweries?page=${page}`
	)
	return response.json()
}

//Filter-out non US-Breweries
function filterByCountry(breweries) {
	return breweries.filter((brew) => brew.country === "United States")
}

//Paginate and filter brewery_types
async function getAllBreweries() {
	let currentPage = 1

	while (true) {
		const breweries = await fetchBreweriesFromPage(currentPage)

		if (breweries.length === 0) {
			break
		}

		const usBreweries = filterByCountry(breweries)

		allUsBreweriesArray.push(...usBreweries)
		currentPage++
	}

	allUsBreweriesArray.forEach((brew) => {
		const micro = brew.brewery_type === "micro"
		const regional = brew.brewery_type === "regional"
		const bPub = brew.brewery_type === "brewpub"

		if (micro) {
			microArray.push(brew)
		} else if (regional) {
			regionalArray.push(brew)
		} else if (bPub) {
			brewPubArray.push(brew)
		}
	})
}
console.log(regionalArray)

//Create cards
async function createCards(selectedBreweries) {
	const breweries = await getAllBreweries()

	breweriesUl.innerHTML = ""
	selectedBreweries.forEach((brew) => {
		breweriesUl.insertAdjacentHTML(
			"beforeend",
			`<li>
                <h2>${brew.name}</h2>
				<div class='type'>${brew.brewery_type}</div>
				<section class='address'>
					<h3>Address:</h3>
					<p>${brew.address_1}</p>
					<p>
						<strong>${brew.city}, ${brew.postal_code}</strong>
					</p>
				</section>
				<section class='phone'>
					<h3>Phone:</h3>
					<p>${brew.phone}</p>
				</section>
				<section class='link'>
					<a href='${brew.website_url}' target='_blank'>
						Visit Website
					</a>
				</section>
			</li>`
		)
	})
}
createCards(regionalArray)
