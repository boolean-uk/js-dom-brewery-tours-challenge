const breweriesApi = `https://api.openbrewerydb.org/v1/breweries?by_country=United_States`
// 	"https://api.openbrewerydb.org/v1/breweries?by_country=United_States"
// 	"https://api.openbrewerydb.org/v1/breweries"

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
const filteredUsBreweriesArray = []
const microArray = []
const regionalArray = []
const brewPubArray = []

//GET api pages
async function fetchBreweriesFromPage() {
	const response = await fetch(
		`https://api.openbrewerydb.org/v1/breweries?by_country=United_States`
	)
	return response.json()
}
fetchBreweriesFromPage()


//Filter brewery_types
async function getAllBreweries() {
	const usBreweries = await fetchBreweriesFromPage()
	allUsBreweriesArray.push(...usBreweries)
	allUsBreweriesArray.forEach((brew) => {
		const micro = brew.brewery_type === "micro"
		const regional = brew.brewery_type === "regional"
		const bPub = brew.brewery_type === "brewpub"

		if (micro) {
			// console.log("mic", microArray)
			microArray.push(brew)
			filteredUsBreweriesArray.push(brew)
		} else if (regional) {
			// console.log("reg", regionalArray)
			regionalArray.push(brew)
			filteredUsBreweriesArray.push(brew)
		} else if (bPub) {
			brewPubArray.push(brew)
			filteredUsBreweriesArray.push(brew)
		}
	})
}
console.log(allUsBreweriesArray);
console.log('us', filteredUsBreweriesArray);
// console.log("reg", brewPubArray)

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
createCards(filteredUsBreweriesArray)

filterForm.addEventListener("change", function (event) {
	event.preventDefault()
	
	breweriesUl.innerHTML = ""
	console.log(event.target.value)
	let selectedType = event.target.value

	if (selectedType === "micro") {
		// console.log(microArray)
		createCards(microArray)
	} else if (selectedType === "regional") {
		// console.log(regionalArray)
		createCards(regionalArray)
	} else if (selectedType === "brewpub") {
		// console.log(brewPubArray)
		createCards(brewPubArray)
	} else {
		console.log(allUsBreweriesArray)
		createCards(allUsBreweriesArray)
	}
})

// headerSearchBoxInput.addEventListener("submit", (event) => {
// 	event.preventDefault()
// 	const state = selectStateId.value
// 	breweriesListUl.innerHTML = ""
// 	getFetch(state)
// })
