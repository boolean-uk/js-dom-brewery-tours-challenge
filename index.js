const breweriesApi =
	"https://api.openbrewerydb.org/v1/breweries?by_country=United_States&per_page=100"

// Access HTML elements
const header = document.querySelector(".main-header")
const headerSection = document.querySelector("section")
const headerSearchBox = document.querySelector("#select-state-form")
const stateInput = document.querySelector("#select-state")
const stateInputBtn = document.querySelector('input[type="submit"]')
const filterForm = document.querySelector("#filter-by-type-form")
const formSelect = document.querySelector("#filter-by-type")
const breweriesUl = document.querySelector(".breweries-list")
const typeDefault = document.querySelector("option")
const listTitle = document.querySelector("h1")

// Create arrays to populate by filtering
const allBreweries = []
const breweriesToVisit = []
const filteredByState = []
const filteredByName = []
const microArray = []
const regionalArray = []
const brewPubArray = []

// Fetch breweries data
async function fetchBreweries() {
	const response = await fetch(breweriesApi)
	const breweries = await response.json()
	allBreweries.push(...breweries)
	// breweriesToVisit.push(...breweries)
}

// Create HTML for brewery cards
function createCards(breweryArr) {
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

//Create HTML and functionality for search_by_name box
async function createSearchByName() {
	listTitle.insertAdjacentHTML(
		"beforeend",
		`<header class="search-bar">
            <form id="search-breweries-form" autocomplete="off">
                <label for="search-breweries"><h2>Search breweries:</h2></label>
                <input id="search-breweries" name="search-breweries" type="text">
            </form>
        </header>`
	)

	const searchInput = document.getElementById("search-breweries")

	searchInput.addEventListener("input", function (event) {
		handleNameSearch(event)
	})

	const searchForm = document.getElementById("search-breweries-form")
	searchForm.addEventListener("submit", function (event) {
		event.preventDefault()
		handleNameSearch(event)
	})
}

 function handleNameSearch(event) {
	const searchTerm = event.target.value.trim().toLowerCase()

	const searchResults = breweriesToVisit.filter((item) =>
		item.name.toLowerCase().includes(searchTerm)
	)

	filteredByName.length = 0 // Clear previous results(?)
	filteredByName.push(...searchResults)

 createCards(filteredByName)
}

// Filter breweries by type
function filterBreweries() {
	allBreweries.forEach((brew) => {
		if (brew.brewery_type === "micro") {
			microArray.push(brew)
			breweriesToVisit.push(brew)
		} else if (brew.brewery_type === "regional") {
			regionalArray.push(brew)
			breweriesToVisit.push(brew)
		} else if (brew.brewery_type === "brewpub") {
			brewPubArray.push(brew)
			breweriesToVisit.push(brew)
		}
	})
}

// Populate brewery cards based on selected type
function populateBreweryCards(selectedType) {
	breweriesUl.innerHTML = ""

	if (selectedType === "micro") {
		listTitle.innerText = "List of Micro Breweries"
		createSearchByName()
		createCards(microArray)
	} else if (selectedType === "regional") {
		listTitle.innerText = "List of Regional Breweries"
		createSearchByName()
		createCards(regionalArray)
	} else if (selectedType === "brewpub") {
		listTitle.innerText = "List of BrewPub Breweries"
		createSearchByName()
		createCards(brewPubArray)
	} else {
		listTitle.innerText = "List of Breweries"
		createSearchByName()
		createCards(breweriesToVisit)
	}
}

// Event listener for filtering dropdown
formSelect.addEventListener("change", function (event) {
	const selectedType = event.target.value
	populateBreweryCards(selectedType)
})

// Event listener for state input
stateInput.addEventListener("input", function (event) {
	const searchTerm = event.target.value.trim().toLowerCase()
	const searchResults = breweriesToVisit.filter((item) =>
		item.state.toLowerCase().includes(searchTerm)
	)
	filteredByState.length = 0 // Clear previous results
	filteredByState.push(...searchResults)
	createCards(filteredByState)
})

// Event listener for name search
headerSearchBox.addEventListener("submit", function (event) {
	event.preventDefault()
})

// Initialize the application
async function initialize() {
	await fetchBreweries()
	filterBreweries()
	createSearchByName()
	createCards(breweriesToVisit)
}

initialize()
