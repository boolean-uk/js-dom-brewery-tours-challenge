const state = {
    breweries: [],
};

const root = "https://api.openbrewerydb.org/v1/breweries";
const breweryList = document.querySelector("#breweries-list");
const selectStateForm = document.querySelector("#select-state-form");

// Render brewery list function //
const removeBreweries = () => {
    const breweryListUl = breweryList.querySelectorAll("*");
    breweryListUl.forEach((child) => child.remove());
};

const renderBreweryList = () => {
    state.breweries.forEach((brewery) => {
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
            data.forEach = ((item) => {
                console.log(data)
                if (item.brewery_type === 'micro') {
                    BreweryCanVisit.push(item);
                }
                return BreweryCanVisit;
            });

            console.log(BreweryCanVisit);
            state.breweries = data;

            // console.log(data);
            removeBreweries();
            renderBreweryList();
        });
});
// || data.brewery_type === "regional" || data.brewery_type === "brewpub"
