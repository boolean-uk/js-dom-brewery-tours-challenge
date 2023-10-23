// The main
const state = {
    breweries: [],
};

// A new state for filtering into the original state above //
const newState = {
    breweries: [],
};

const root = "https://api.openbrewerydb.org/v1/breweries";
const breweryList = document.querySelector("#breweries-list");
const selectStateForm = document.querySelector("#select-state-form");
const filterByType = document.getElementById("filter-by-type");
const article = document.querySelector("article")

// Render brewery list function //
const removeBreweries = () => {
    const breweryListUl = breweryList.querySelectorAll("*");
    breweryListUl.forEach((child) => child.remove());
};


const renderSearch = () => {
    const section = document.createElement('section')

    const form = document.createElement ('form')
    form.setAttribute("id", "search-breweries-form")

    const label = document.createElement('label')
    label.setAttribute("for", "searchBarInput")
    form.append(label)

    const h2 = document.createElement('h2')
    h2.innerText = "Search Breweries:"
    label.append(h2)
    
    const input = document.createElement('input')
    input.setAttribute("type", "text")
    input.setAttribute("id", "searchBarInput")
    form.append(input)

    section.append(form)
    article.append(section)

}

renderSearch()
// The main render for the page based on value/state entered in search bar //
const renderBreweryList = (breweryState) => {
    breweryState.breweries.forEach((brewery) => {
        const li = document.createElement("li");

        const breweryName = document.createElement("h2");
        breweryName.innerText = brewery.name;

        const breweryType = document.createElement("div");
        breweryType.innerText = brewery.brewery_type;
        breweryType.classList.add("type");

        const addressSection = document.createElement("section");
        addressSection.classList.add("address");

        const address = document.createElement("h3");
        address.innerText = "Address:";

        const street = document.createElement("p");
        street.innerText = brewery.street;

        const cityAndPostCode = document.createElement("p");
        const strong = document.createElement("strong");
        strong.innerText = `${brewery.city}, ${brewery.postal_code}`;
        cityAndPostCode.append(strong);

        addressSection.append(address, street, cityAndPostCode);

        const phoneSection = document.createElement("section");
        phoneSection.classList = "phone";

        const phoneNumberTitle = document.createElement("h3");
        phoneNumberTitle.innerText = "Phone:";

        const phoneNumber = document.createElement("p");
        phoneNumber.innerText = brewery.phone;

        phoneSection.append(phoneNumberTitle, phoneNumber);

        const websiteLinkSection = document.createElement("section");
        websiteLinkSection.classList.add("link");

        const linkAnchor = document.createElement("a");
        linkAnchor.setAttribute("href", brewery.website_url);
        linkAnchor.setAttribute("target", "_blank");
        linkAnchor.innerText = "Visit Website";

        websiteLinkSection.append(linkAnchor);

        li.append(
            breweryName,
            breweryType,
            addressSection,
            phoneSection,
            websiteLinkSection
        );

        breweryList.append(li);
    });
};
// Event listener to populate state //
selectStateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchState = event.target[0].value;
    // console.log(searchState);

    fetch(`${root}?by_state=${searchState}`)
        .then((response) => response.json())
        .then((data) => {
            let BreweryCanVisit = [];
            data.forEach((item) => {
                if (
                    item.brewery_type === "micro" ||
                    item.brewery_type === "regional" ||
                    item.brewery_type === "brewpub"
                ) {
                    BreweryCanVisit.push(item);
                }
                return BreweryCanVisit;
            });

            // console.log(BreweryCanVisit);
            state.breweries = BreweryCanVisit;
            removeBreweries();
            renderBreweryList(state);
        });
});

// Event listener that looks at different selcted options in dropdown list //
filterByType.addEventListener("click", (event) => {
    let selectedType = filterByType.value;

    if (selectedType === "micro") {
        console.log("micro")
        changeState("micro");
    } else if (selectedType === "regional") {
        console.log("regional")
        changeState("regional");
    } else if (selectedType === "brewpub") {
        console.log("brewpub")
        changeState("brewpub");
    }else {
        removeBreweries()
        renderBreweryList(state)
    }
});

// A function that chnages what shows on html based on what parameter is passed in //
function changeState(type) {
    newState.breweries = []
    state.breweries.forEach((brewery) => {
        if (brewery.brewery_type === type) {
            newState.breweries.push(brewery);
        }
        return newState;
    });
    removeBreweries()
    renderBreweryList(newState)
}

