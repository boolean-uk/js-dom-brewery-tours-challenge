// STATE
const state = {
    breweries: [],
    filterByType: '',
    filterByName: '',
    filterByCity: [],
    currentPage: 0
};

// VARIABLES
// Used by the initial state search form listener 
// to make sure the state is spelled correctly.
const usStates = [
    "alabama", "alaska", "arizona", "arkansas", 
    "california", "colorado", "connecticut", "delaware", 
    "florida", "georgia", "hawaii", "idaho", 
    "illinois", "indiana", "iowa", "kansas", 
    "kentucky", "louisiana", "maine", "maryland", 
    "massachusetts", "michigan", "minnesota", "mississippi", 
    "missouri", "montana", "nebraska", "nevada", 
    "new hampshire", "new jersey", "new mexico", "new york", 
    "north carolina", "north dakota", "ohio", "oklahoma", 
    "oregon", "pennsylvania", "rhode island", "south carolina", 
    "south dakota", "tennessee", "texas", "utah", 
    "vermont", "virginia", "washington", "west virginia", 
    "wisconsin"
];

// Used for Pagination
const rows = 10;

// SELECT EXISTING HTML ELEMENTS
const stateForm = document.querySelector("#select-state-form");
const stateInput = document.querySelector("#select-state");
const breweryUL = document.querySelector("#breweries-list");
const filterForm = document.querySelector("#filter-by-type-form");
const filterSelect = document.querySelector("#filter-by-type");
const searchForm = document.querySelector("#search-breweries-form");
const searchInput = document.querySelector("#search-breweries");
const cityForm = document.querySelector("#filter-by-city-form");
const clearButton = document.querySelector(".clear-all-btn");
const paginationWrapper = document.querySelector(".pagination")

// EVENT LISTENERS

function submitFormListen() {
    stateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // stateInput.value = what was typed in.
        const stateSubmit = stateInput.value.toLowerCase();
        if(usStates.find(stateName => stateName === stateSubmit) === undefined){
            // must be a word that is in the array of US States above, and spelt correctly.
            return alert("That is not a real/correctly spelled State");
        };
        // regex to replace all spaces with an underscore - for fetch URL use.
        const true_state = (stateSubmit.replace(/ /g,"_"));
        // Fetch the Data from the API using the state.
        getAllBreweries(true_state);
        stateForm.reset();
    });
}

function filterTypeListen() {
    // Listening for the Type of Brewery drop down.
    filterForm.addEventListener('change', (event) => {
        const selectInput = event.target.value;
        state.filterByType = selectInput;
        state.currentPage = 0
        renderBreweries();
    });
}

function searchBarListen() {
    // Listening for the Search Bar - each stroke.
    searchForm.addEventListener("input", (event) => {
        const searchQuery = event.target.value.toLowerCase();
        state.filterByName = searchQuery;
        state.currentPage = 0
        renderBreweries();
    });
}

function clearAllListen() {
    // Listening for the clear all button.
    clearButton.addEventListener("click", () => {        
        state.filterByType = '';
        state.filterByName = '';
        state.filterByCity = [];
        state.currentPage = 0
        filterForm.reset();
        searchForm.reset();
        renderBreweries();
        renderCities(state.breweries);
        
    });
}

// NETWORK REQUESTS

// From API
function getAllBreweries(stateName) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`)
    .then((response) => {
        return response.json();
    })
    .then((allBreweries) => {
        // setting state.breweries to the data from the API
        state.breweries = allBreweries;
        renderBreweries();
        renderCities(state.breweries);
    });

}

// From Visit Database

function getVisitData() {
    fetch('http://localhost:3000/breweries')
    .then((response) => {
        return response.json();
    })
    .then((responseData) => {
        state.visitDatabase = responseData
        console.log("inside getvisitdata", state.visitDatabase)
        renderBreweries()
    })

}

// RENDERING
function renderBreweries() {
    breweryUL.innerHTML = "";
    // currentPage--;

    let filteredBreweries = state.breweries.filter((brewery) => {
        const brewtype = brewery.brewery_type 
        if(brewtype === 'micro' || brewtype === 'regional' || brewtype === 'brewpub') {
            return true
        } else {
            return false
        }
    })

    // Filter By Brewery Type (Drop Down)

    filteredBreweries = filteredBreweries.filter((brewery) => {
        if (state.filterByType.length > 0) {
            if (brewery.brewery_type === state.filterByType) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    })

    // Filter By Brewery Name (Search Bar)

    filteredBreweries = filteredBreweries.filter((brewery) => {
        if(state.filterByName.length > 0) {
            const breweryName = brewery.name.toLowerCase();
            if(breweryName.includes(state.filterByName)) {
                return true;
            }
        } else {
            return true;
        }
    })

    // Filter By City Name (Check Boxes)

    filteredBreweries = filteredBreweries.filter((brewery) => {
        if (state.filterByCity.length === 0) return true;
        // goes through the filterByCity array, and checks for matches.
        for (let i = 0; i < state.filterByCity.length; i++) {
            if (brewery.city === state.filterByCity[i]) {
              return true; 
            }
          }
        // If it reaches here, its because it had no matches. So return false.
        return false;
    })

    // Filter By Pagination (Page Number)


    let start = rows * state.currentPage;
    let end = start + rows;

    let paginatedBreweries = filteredBreweries.slice(start, end);


    paginatedBreweries.forEach((brewery) => {
        // CREATING
        const brewLI = document.createElement("li");

        const brewH2 = document.createElement("h2");
        brewH2.innerText = brewery.name;

        const brewDiv = document.createElement("div");
        brewDiv.className = "type";
        brewDiv.innerText = brewery.brewery_type;

        const addressSection = document.createElement("section");
        addressSection.className = "address";

        const addressH3 = document.createElement("h3");
        const roadP = document.createElement("p");
        const areaP = document.createElement("p");
        const areaStrong = document.createElement("strong");

        addressH3.innerText = "Address:";
        roadP.innerText = brewery.street;
        areaStrong.innerText = `${brewery.city}, ${brewery.postal_code}`;

        // APPENDING
        areaP.append(areaStrong);
        addressSection.append(addressH3, roadP, areaP);

        // CREATING
        const phoneSection = document.createElement("section");
        phoneSection.className = "phone";

        const phoneH3 = document.createElement("h3");
        const phoneP = document.createElement("p");

        phoneH3.innerText = "Phone:";
        if(brewery.phone === null){
            phoneP.innerText = "N/A";
        } else {
            phoneP.innerText = brewery.phone;
        }

        // APPENDING
        phoneSection.append(phoneH3, phoneP);

        // CREATING
        const websiteSection = document.createElement("section");
        websiteSection.className = "link";

        const websiteAn = document.createElement("a");
        websiteAn.href = brewery.website_url;
        websiteAn.target = "_blank";
        websiteAn.innerText = "Visit Website";

        
        // APPENDING
        websiteSection.append(websiteAn);
        
        // CREATING
        const visitSection = document.createElement("section");
        visitSection.className = "visit";

        const visitBtn = document.createElement("button");
        // If the brewery name is already in the VisitDB, then change text to "remove from list"
        // Else have text as "save to list"
        if(state.visitDatabase.find(visitPub => visitPub.name === brewery.name)) {
            visitBtn.innerText = "Remove From List";
            // Add Event Listener
            // DELETE REQUEST
            visitBtn.addEventListener("click", () => {
                
                // grab ID
                const pubID = state.visitDatabase.find(visitPub => visitPub.name === brewery.name).id
    
                const options = {
                    method: "DELETE"
                }
                fetch(`http://localhost:3000/breweries/${pubID}`, options)
                .then((res) => {
                    console.log("Server Response to DELETE Fetch Status:", res.status)
                    return res.json()
                })
                .then(() => {
                    getVisitData()
                    visitBtn.innerText = "Save To List"
                })
            })
        } else {
            visitBtn.innerText = "Save To List";
            visitBtn.addEventListener("click", (event) => {

                const newSaveBrewery = {
                    name: brewery.name,
                    city: brewery.city
                }

                const newSaveBreweryJSON = JSON.stringify(newSaveBrewery)

                const options = {
                    method: "POST",
                    body: newSaveBreweryJSON,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                fetch("http://localhost:3000/breweries", options)
                .then((response) => {
                    console.log("Response to POST:", response.status)
                    return response.json()
                })
                .then(() => {
                    getVisitData()
                    visitBtn.innerText = "Remove From List"
                })

            })
        }

        // APPENDING
        visitSection.append(visitBtn);

        //FINAL APPEND
        brewLI.append(brewH2, brewDiv, addressSection, phoneSection, websiteSection, visitSection);
        breweryUL.append(brewLI);
    })
    
    if(paginatedBreweries.length > 0){

        renderPageButtons()
    }
    
  }

function renderPageButtons() {
    paginationWrapper.innerHTML = "";
    
    const backButton = document.createElement("button")
    backButton.innerText = "<"
    const currentPageSpan = document.createElement("span")
    currentPageSpan.innerText = state.currentPage + 1
    const forwardButton = document.createElement("button")
    forwardButton.innerText = ">"

    backButton.addEventListener("click", () => {
        if(state.currentPage > 0){
            state.currentPage--
            renderBreweries()
        }
        console.log(state.currentPage)
    })
    forwardButton.addEventListener("click", () => {
        state.currentPage++
        renderBreweries()
        console.log(state.currentPage)
    })

    paginationWrapper.append(backButton, currentPageSpan, forwardButton)
}

function renderCities(breweries){
    cityForm.innerHTML = "";
    
    // Mapping over the filtered array of breweries, creating an array of cities.
    const cities = breweries.map((company) => company.city);
    // Filter through that array and remove duplicates.
    const filteredCities = cities.filter((city, index) => cities.indexOf(city) === index).sort();
    
    // Render each city from the filtered array.
    filteredCities.forEach((city) => {
        // CREATING
        const cityInput = document.createElement("input");
        cityInput.type = "checkbox";
        cityInput.name = city;
        cityInput.value = city;

        const cityLabel = document.createElement("label");
        cityLabel.for = city;
        cityLabel.innerText = city;

        // Listening for check marks on cities, to then filter and re-render breweries.
        cityInput.addEventListener("change", () => {
            if(cityInput.checked) {
                state.filterByCity.push(city)
                state.currentPage = 0
                renderBreweries()
            } else {
                // if changed, but unchecked. remove that city from the array and rerender.
                state.filterByCity = state.filterByCity.filter((item) => item !== city);
                state.currentPage = 0
                renderBreweries()
            }
        });
        // APPENDING
        cityForm.append(cityInput, cityLabel);
    })
}



// START
submitFormListen();
filterTypeListen();
searchBarListen();
clearAllListen();
getVisitData()


// json-server --watch breweries.json --port 3000