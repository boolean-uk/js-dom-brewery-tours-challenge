const state = [
    {
        address_2: null,
        address_3: null,
        brewery_type: "large",
        city: "San Diego",
        country: "United States",
        county_province: null,
        created_at: "2018-07-24T00:00:00.000Z",
        id: 8041,
        latitude: "32.714813",
        longitude: "-117.129593",
        name: "10 Barrel Brewing Co",
        obdb_id: "10-barrel-brewing-co-san-diego",
        phone: "6195782311",
        postal_code: "92101-6618",
        state: "California",
        street: "1501 E St",
        updated_at: "2018-08-23T00:00:00.000Z",
        website_url: "http://10barrel.com",
    },
];

const root = "https://api.openbrewerydb.org/v1/breweries";
const breweryList = document.querySelector("#breweries-list");

const renderBreweryList = () => {
    state.forEach((brewery) => {
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

renderBreweryList();

