// SELECTORS
const selectElement = document.querySelector("#filter-by-type");
const breweryList = document.querySelector("#breweries-list");

// COMPONENTS
function BreweryListItem(data) {
	const li = document.createElement("li");
	li.innerHTML = `
        <h2>${data.name}</h2>
        <div class="type">${data.brewery_type}</div>
        <section class="address">
        <h3>Address:</h3>
        <p>${data.address_1}</p>
        <p><strong>${data.city}, ${data.postal_code}</strong></p>
        </section>
        <section class="phone">
        <h3>Phone:</h3>
        <p>${data.phone || "N/A"}</p>
        </section>
        <section class="link">
        ${
			data.website_url
				? `<a href="${data.website_url}" target="_blank">Visit Website</a>
        </section>`
				: `<a cursor=not-allowed>Website unavailable</a>
        </section>`
		}
      `;

	if (!data.website_url) li.querySelector("a").style.cursor = "not-allowed";

	return li;
}

// RENDERS
function renderListItems(list = []) {
	console.log("list", list);
	breweryList.replaceChildren(...list.map((e) => BreweryListItem(e)));
}

// EVENTS & DATA
let API_RAW_DATA;

async function getBreweries() {
	//show only micro regional brewpub
	API_RAW_DATA = (await listBreweries()).filter((e) =>
		["micro", "regional", "brewpub"].includes(e.brewery_type)
	);
}
async function filterBreweries(key = "", filters = []) {
	return (API_RAW_DATA || (await getBreweries())).filter((e) =>
		filters.includes(e[key])
	);
}

async function onLoad() {
	await getBreweries();
	renderListItems(API_RAW_DATA);
}

//FILTERING BY TYPE
async function onSelectTypeHandler(e) {
	renderListItems(await filterBreweries("brewery_type", [e.target.value]));
}
selectElement.addEventListener("change", (e) => onSelectTypeHandler(e));

onLoad();
