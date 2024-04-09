// const breweriesApi =
// 	"https://api.openbrewerydb.org/v1/breweries?by_country=United_States&per_page=100"
// //Access HTML elements
// //Header elements
// const header = document.querySelector(".main-header")
// const headerSection = document.querySelector("section")
// const searchBox = document.querySelector("#select-state-form")
// const searchBoxInput = document.querySelector("#select-state")
// //Main elements
// const filterForm = document.querySelector("#filter-by-type-form")
// const formSelect = document.querySelector("#filter-by-type")
// //Article elements
// const breweriesUl = document.querySelector(".breweries-list")
// const typeDefault = document.querySelector("option")
// typeDefault.innerText = "Select a type.. "
// const listTitle = document.querySelector("h1")

// //Create arrays to populate by filtering
// const allBreweries = []
// const breweriesToVisit = []
// const microArray = []
// const regionalArray = []
// const brewPubArray = []

// //Create HTML
// async function createCards(breweryArr) {
// 	const breweries = await fetchBreweries()

// 	breweriesUl.innerHTML = ""
// 	breweryArr.forEach((brew) => {
// 		breweriesUl.insertAdjacentHTML(
// 			"beforeend",
// 			`<li>
//                 <h2>${brew.name}</h2>
// 				<div class='type'>${brew.brewery_type}</div>
// 				<section class='address'>
// 					<h3>Address:</h3>
// 					<p>${brew.address_1}</p>
// 					<p>
// 						<strong>${brew.city}, ${brew.postal_code}</strong>
// 					</p>
// 				</section>
// 				<section class='phone'>
// 					<h3>Phone:</h3>
// 					<p>${brew.phone}</p>
// 				</section>
// 				<section class='link'>
// 					<a href='${brew.website_url}' target='_blank'>
// 						Visit Website
// 					</a>
// 				</section>
// 			</li>`
// 		)
// 	})
// }

// //GET breweries
// async function fetchBreweries() {
// 	const response = await fetch(breweriesApi)
// 	return response.json()
// }

// //Filter breweries by type
// async function filterBreweries() {
// 	const allTypes = await fetchBreweries()
// 	allBreweries.push(...allTypes)
// 	allTypes.filter((brew) => {
// 		const micro = brew.brewery_type === "micro"
// 		const regional = brew.brewery_type === "regional"
// 		const bPub = brew.brewery_type === "brewpub"

// 		if (micro) {
// 			microArray.push(brew)
// 			breweriesToVisit.push(brew)
// 		} else if (regional) {
// 			regionalArray.push(brew)
// 			breweriesToVisit.push(brew)
// 		} else if (bPub) {
// 			brewPubArray.push(brew)
// 			breweriesToVisit.push(brew)
// 		}
// 	})
// }

// //Filtering-dropdown functionality
// formSelect.addEventListener("change", async function (event) {
// 	event.preventDefault()
// 	await fetchBreweries()
// 	breweriesUl.innerHTML = ""
// 	const selectedType = event.target.value
// 	// let breweryType = allUsBreweriesArray

// 	if (selectedType === "micro") {
// 		console.log(microArray)
// 		listTitle.innerText = "List of Micro Breweries"
// 		createCards(microArray)
// 	} else if (selectedType === "regional") {
// 		console.log(regionalArray)
// 		listTitle.innerText = "List of Regional Breweries"
// 		createCards(regionalArray)
// 	} else if (selectedType === "brewpub") {
// 		console.log(brewPubArray)
// 		listTitle.innerText = "List of BrewPub Breweries"
// 		createCards(brewPubArray)
// 	} else {
// 		console.log(breweriesToVisit)
// 		listTitle.innerText = "List of Breweries"
// 		createCards(breweriesToVisit)
// 	}
// })

// fetchBreweries()
// filterBreweries()
// createCards(breweriesToVisit)

// // const init = async () => {
// //    await fetchBreweries()
// // filterBreweries()
// // createCards(breweriesToVisit)
// // }

// // init()

const breweriesApi =
	"https://api.openbrewerydb.org/v1/breweries?by_country=United_States&per_page=100"
//Access HTML elements
//Header elements
const header = document.querySelector(".main-header")
const headerSection = document.querySelector("section")
const headerSearchBox = document.querySelector("#select-state-form")
const stateInput = document.querySelector("#select-state")
const stateInputBtn = document.querySelector('input[type="submit"]')

// headerSearchBox.setAttribute("autocomplete", "on")
headerSearchBox.setAttribute("list", "state-list")
//Main elements
const filterForm = document.querySelector("#filter-by-type-form")
const formSelect = document.querySelector("#filter-by-type")
//Article elements
const breweriesUl = document.querySelector(".breweries-list")
const typeDefault = document.querySelector("option")
const listTitle = document.querySelector("h1")

//Create arrays to populate by filtering
const allBreweries = []
const breweriesToVisit = []
const filteredByState = []
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

//Filtering-dropdown functionality
formSelect.addEventListener("change", async function (event) {
	event.preventDefault()
	await fetchBreweries()
	breweriesUl.innerHTML = ""
	const selectedType = event.target.value
	// let breweryType = allUsBreweriesArray

	if (selectedType === "micro") {
		console.log(microArray)
		listTitle.innerText = "List of Micro Breweries"
		createCards(microArray)
	} else if (selectedType === "regional") {
		console.log(regionalArray)
		listTitle.innerText = "List of Regional Breweries"
		createCards(regionalArray)
	} else if (selectedType === "brewpub") {
		console.log(brewPubArray)
		listTitle.innerText = "List of BrewPub Breweries"
		createCards(brewPubArray)
	} else {
		console.log(breweriesToVisit)
		createCards(breweriesToVisit)
	}
})

fetchBreweries()
filterBreweries()
createCards(breweriesToVisit)

async function handleSearch(event) {
	const searchTerm = event.target.value.trim().toLowerCase()

	const searchResults = breweriesToVisit.filter((item) =>
		item.state.toLowerCase().includes(searchTerm)
	)

	filteredByState.length = 0 // Clear previous results
	filteredByState.push(...searchResults)

	await createCards(filteredByState)


	console.log("Filtered by state:", filteredByState)
}

headerSearchBox.addEventListener("input", function (event) {
	event.preventDefault()
	handleSearch(event)
})

headerSearchBox.addEventListener("click", function (event) {
	event.preventDefault()
	handleSearch(event)
})
headerSearchBox.addEventListener("submit", function (event) {
	event.preventDefault()
	handleSearch(event)
})

console.log("fbout", filteredByState)
