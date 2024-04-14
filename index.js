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
const list = document.querySelector("article")

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

// Create HTML for brewery cards
function createCards(breweriesArr, page = 1, pageSize = 10) {
	const startIndex = (page - 1) * pageSize
	const endIndex = startIndex + pageSize
	const currentPageData = breweriesArr.slice(startIndex, endIndex)
	breweriesUl.innerHTML = ""
	currentPageData.forEach((brew) => {
		breweriesUl.insertAdjacentHTML(
			"beforeend",
			`<li>
                <h2>${brew.name}</h2>
                <div class='type'>${brew.brewery_type}</div>
                <section class='address'>
                    <h3>Address:</h3>
                    <p>${brew.address_1}</p>
                    <p>
                        <strong>${brew.city}, ${brew.postal_code}, ${brew.state}</strong>
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
	createPagination(breweriesArr)
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

	filteredByName.length = 0
	filteredByName.push(...searchResults)

	createCards(filteredByName)
}

// Populate brewery cards based on selected type
function populateBreweryCards(selectedType) {
	breweriesUl.innerHTML = ""

	let selectedArray = breweriesToVisit
	let titleText = "List of Breweries"

	if (selectedType === "micro") {
		selectedArray = microArray
		titleText = "List of Micro Breweries"
	} else if (selectedType === "regional") {
		selectedArray = regionalArray
		titleText = "List of Regional Breweries"
	} else if (selectedType === "brewpub") {
		selectedArray = brewPubArray
		titleText = "List of BrewPub Breweries"
	}

	listTitle.innerText = titleText
	createSearchByName()
	createCards(selectedArray)
	createPagination(selectedArray) 
}

// Take care of pagination

function createPagination(arr) {
	const numPages = Math.ceil(arr.length / 10) 
	let paginationContainer = document.getElementById("paginationContainer")

	if (!paginationContainer) {
		paginationContainer = document.createElement("div")
		paginationContainer.id = "paginationContainer"
		list.insertAdjacentElement("beforeend", paginationContainer)
	} else {
		paginationContainer.innerHTML = ""
	}

	paginationContainer.insertAdjacentHTML(
		"beforeend",
		`
        <button id="prevPage">Previous Page</button>
        <span id="pageInfo"></span>
        <button id="nextPage">Next Page</button>
        `
	)

	const pageInfo = document.getElementById("pageInfo")
	pageInfo.textContent = `Page ${currentPage} of ${numPages}`
	paginationContainer.style.display = "flex"
	paginationContainer.style.justifyContent = "space-between"
	paginationContainer.style.alignItems = "center"

	addPaginationEventListeners(arr, numPages, pageInfo)
}

// Event listeners

//Pagination buttons
let currentPage = 1
function addPaginationEventListeners(arr, numPages, pageInfo) {
	const prevPageBtn = document.getElementById("prevPage")
	const nextPageBtn = document.getElementById("nextPage")

	prevPageBtn.addEventListener("click", function () {
		currentPage--

		if (currentPage < 1) currentPage = 1
		createCards(arr, currentPage)
		pageInfo.innerText = `Page ${currentPage} of ${numPages}`
	})

	nextPageBtn.addEventListener("click", function () {
		currentPage++

		if (currentPage > numPages) currentPage = numPages
		createCards(arr, currentPage)
		pageInfo.innerText = `Page ${currentPage} of ${numPages}`
	})
}

// Filtering dropdown
formSelect.addEventListener("change", function (event) {
	const selectedType = event.target.value
	populateBreweryCards(selectedType)
})

// Search_by_State input
stateInput.addEventListener("input", function (event) {
	const searchTerm = event.target.value.trim().toLowerCase()
	const searchResults = breweriesToVisit.filter((item) =>
		item.state.toLowerCase().includes(searchTerm)
	)
	filteredByState.length = 0 
	filteredByState.push(...searchResults)
	createCards(filteredByState)
})

// Search_by_Name input
headerSearchBox.addEventListener("submit", function (event) {
	event.preventDefault()
})

// Initialize the application with breweriesToVisit[] so it lists all the visitable breweries
async function initialize() {
	await fetchBreweries()
	filterBreweries()
	createSearchByName()
	createCards(breweriesToVisit)
}

initialize()
