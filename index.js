const breweriesApi =
	"https://api.openbrewerydb.org/v1/breweries?by_country=United_States&per_page=100"
//Access HTML elements
//Header elements
const header = document.querySelector(".main-header")
const headerSection = document.querySelector("section")
const headerSearchBox = document.querySelector("#select-state-form")
const searchBoxInput = document.querySelector("#select-state")
//Main elements
const filterForm = document.querySelector("#filter-by-type-form")
const formSelect = document.querySelector("#filter-by-type")
//Article elements
const breweriesUl = document.querySelector(".breweries-list")
const typeDefault = document.querySelector("option")
typeDefault.innerText = "Select a type.. "

//Create arrays to populate by filtering
const allBreweries = []
const breweriesToVisit = []
const microArray = []
const regionalArray = []
const brewPubArray = []

//Create HTML
async function createCards(breweryArr) {
	const breweries = await fetchBreweries()

	breweriesUl.innerHTML = ""
	breweryArr.forEach((brew) => {
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

//GET breweries
async function fetchBreweries() {
	const response = await fetch(breweriesApi)
	return response.json()
}

//Filter breweries by type
async function filterBreweries() {
	const allTypes = await fetchBreweries()
	allBreweries.push(...allTypes)
	allTypes.filter((brew) => {
		const micro = brew.brewery_type === "micro"
		const regional = brew.brewery_type === "regional"
		const bPub = brew.brewery_type === "brewpub"

		if (micro) {
			microArray.push(brew)
			breweriesToVisit.push(brew)
		} else if (regional) {
			regionalArray.push(brew)
			breweriesToVisit.push(brew)
		} else if (bPub) {
			brewPubArray.push(brew)
			breweriesToVisit.push(brew)
		}
	})
}

//Filtering dropdown functionality
formSelect.addEventListener("change", async function (event) {
	event.preventDefault()
	await fetchBreweries()
	breweriesUl.innerHTML = ""
	const selectedType = event.target.value
	// let breweryType = allUsBreweriesArray

	if (selectedType === "micro") {
		console.log(microArray)
		createCards(microArray)
	} else if (selectedType === "regional") {
		console.log(regionalArray)
		createCards(regionalArray)
	} else if (selectedType === "brewpub") {
		console.log(brewPubArray)
		createCards(brewPubArray)
	} else {
		console.log(breweriesToVisit)
		createCards(breweriesToVisit)
	}
})

fetchBreweries()
filterBreweries()
createCards(breweriesToVisit)

// const init = async () => {
//    await fetchBreweries()
// filterBreweries()
// createCards(breweriesToVisit)
// }

// init()
