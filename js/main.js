// imports
const breweriesList = document.querySelector("#breweries-list");

const formSearchState = document.querySelector("#select-state-form");

const fromFilterByType = document.querySelector("#filter-by-type");

const searchByName = document.querySelector("#select-name-form");

const filterByCitiesList = document.querySelector("#filter-by-cities-list");
const clearCitiesList = document.querySelector("#clear-cities-list");

const paginationBlock = document.querySelector("#pagination");

// global variables
const defaultLink = "https://api.openbrewerydb.org/v1/breweries";

// state
const state = {
    breweries: [],
    type: "",
    stateName: "",
    name: "",
    citiesList: [],
    citiesFilter: [],
    currentPage: 1,
    totalPages: 0,
};

// global functions
const updateState = (data) => {
    state.breweries = data;
    state.citiesList = [...new Set(data.map((item) => item.city))];
    renderListOfCities();
    renderBreweries();
};

// FETCH REQUESTS ------------------------------------------------------------------------------------------------------------------------------------

// get all breweries from api
const getAllBreweries = () => {
    fetch(
        `${defaultLink}?${state.type ? "by_type=" + state.type + "&" : ""}${
            state.stateName ? "by_state=" + state.stateName + "&" : ""
        }${state.name ? "by_name=" + state.name + "&" : ""}per_page=10&page=${
            state.currentPage
        }`
    )
        .then((response) => response.json())
        .then((data) => updateState(data));

    getPaginationPages();
};

// get breweries by cities
const getBreweriesByCities = () => {
    if (state.citiesFilter.length === 0) getAllBreweries();
    state.breweries = [];

    state.citiesFilter.forEach((city) => {
        fetch(`${defaultLink}?by_city=${city}`)
            .then((response) => response.json())
            .then((data) => {
                state.breweries = [...state.breweries, ...data];
                renderBreweries();
            });
    });
};

// get total pages for pagination
const getPaginationPages = () => {
    fetch(
        `${defaultLink}/meta?${
            state.type ? "by_type=" + state.type + "&" : ""
        }${state.stateName ? "by_state=" + state.stateName + "&" : ""}${
            state.name ? "by_name=" + state.name + "&" : ""
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            state.totalPages = Math.ceil(data.total / 10);
            renderPagination();
        });
};

// RENDERS --------------------------------------------------------------------------------------------------------------------------------------------

// render breweries from state
const renderBreweries = () => {
    breweriesList.querySelectorAll("li").forEach((item) => item.remove());

    state.breweries.forEach((brewery) => {
        const breweryContainer = document.createElement("li");

        const breweryTitle = document.createElement("h2");
        breweryTitle.innerText = brewery.name;

        const breweryType = document.createElement("div");
        breweryType.setAttribute("class", "type");
        breweryType.innerText = brewery.brewery_type;

        // address of brewery

        const breweryAddress = document.createElement("section");
        breweryAddress.setAttribute("class", "address");

        const breweryAddressTitle = document.createElement("h3");
        breweryAddressTitle.innerText = "Address:";

        const breweryAddressStreet = document.createElement("p");
        breweryAddressStreet.innerText = brewery.street;

        const breweryAddressState = document.createElement("p");
        const breweryAddressStateStrong = document.createElement("strong");
        breweryAddressStateStrong.innerText = `${brewery.city}, ${brewery.postal_code}`;
        breweryAddressState.append(breweryAddressStateStrong);

        breweryAddress.append(
            breweryAddressTitle,
            breweryAddressStreet,
            breweryAddressState
        );

        // phone of brewery

        const breweryPhone = document.createElement("section");
        breweryPhone.setAttribute("class", "phone");

        const breweryPhoneTitle = document.createElement("h3");
        breweryPhoneTitle.innerText = "Phone:";

        const breweryPhoneContent = document.createElement("p");
        breweryPhoneContent.innerText = brewery.phone;

        breweryPhone.append(breweryPhoneTitle, breweryPhoneContent);

        // link for website of brewery

        const breweryLink = document.createElement("section");
        breweryLink.setAttribute("class", "link");

        const breweryLinkContent = document.createElement("a");
        breweryLinkContent.setAttribute("target", "_blank");
        breweryLinkContent.href = brewery.website_url;
        breweryLinkContent.innerText = "Visit Website";

        breweryLink.append(breweryLinkContent);

        // configuration
        breweryContainer.append(
            breweryTitle,
            breweryType,
            breweryAddress,
            breweryPhone,
            breweryLink
        );

        breweriesList.append(breweryContainer);
    });
};

// render list of cities
const renderListOfCities = () => {
    filterByCitiesList
        .querySelectorAll("label")
        .forEach((item) => item.remove());
    state.citiesList.forEach((city) => {
        const cityListContainer = document.createElement("label");

        const cityListInput = document.createElement("input");
        cityListInput.type = "checkbox";
        cityListInput.value = city.toLowerCase();

        cityListInput.addEventListener("change", (e) => {
            const value = e.target.value;
            e.target.checked
                ? state.citiesFilter.push(value)
                : (state.citiesFilter = state.citiesFilter.filter(
                      (item) => item !== value
                  ));

            getBreweriesByCities();
        });

        // configuration

        cityListContainer.append(cityListInput, city);
        filterByCitiesList.append(cityListContainer);
    });
};

// render pagination
const renderPagination = () => {
    // clear pagination block
    paginationBlock.querySelectorAll("*").forEach((item) => item.remove());

    // create elements
    const buttonPrev = document.createElement("button");
    buttonPrev.innerText = "Prev";

    buttonPrev.addEventListener("click", () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            getAllBreweries();
        }
    });

    const count = document.createElement("span");
    count.innerText = `${state.currentPage} / ${state.totalPages}`;

    const buttonNext = document.createElement("button");
    buttonNext.innerText = "Next";

    buttonNext.addEventListener("click", () => {
        if (state.currentPage < state.totalPages) {
            state.currentPage++;
            getAllBreweries();
        }
    });

    // configuration
    paginationBlock.append(buttonPrev, count, buttonNext);
};

// EVENTS ------------------------------------------------------------------------------------------------------------------------------------

// search by state of brewery
formSearchState.addEventListener("submit", (e) => {
    e.preventDefault();

    state.stateName = e.target["select-state"].value;
    e.target["select-state"].value = "";
    state.currentPage = 1;
    getAllBreweries();
});

// using filters for type of brewery
fromFilterByType.addEventListener("change", (e) => {
    state.type = e.target.value;
    getAllBreweries();
});

// search by name of brewery
searchByName.addEventListener("submit", (e) => e.preventDefault());
searchByName.addEventListener("input", (e) => {
    state.name = e.target.value;
    getAllBreweries();
});

// clear list of cities
clearCitiesList.addEventListener("click", () => {
    filterByCitiesList
        .querySelectorAll("label input")
        .forEach((item) => (item.checked = false));

    getAllBreweries();
});

// calls main functions

getAllBreweries();
