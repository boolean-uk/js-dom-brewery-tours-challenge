// imports
const visitListBlock = document.querySelector("#breweries-visitlist");

// state
const state = {
    breweries: [],
};

// global variables
const jsonServerLink = "http://localhost:3000/visitBreweries/";

// get all breweries from visit list
const getAllBreweries = () => {
    fetch(jsonServerLink)
        .then((res) => res.json())
        .then((data) => {
            state.breweries = data;
            renderBreweries();
        });
};

// delete brewery from visit list
const deleteBreweryVisit = (brewery) => {
    fetch(jsonServerLink + brewery.id, { method: "DELETE" }).then(() =>
        getAllBreweries()
    );
};

// render all breweries from visit list
const renderBreweries = () => {
    visitListBlock.querySelectorAll("li").forEach((item) => item.remove());

    state.breweries.length !== 0
        ? state.breweries.forEach((brewery) => {
              console.log(brewery);
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
              const breweryAddressStateStrong =
                  document.createElement("strong");
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

              // add brewery to visit list button

              const breweryVisitButton = document.createElement("button");

              breweryVisitButton.innerText = "Remove from visit list";
              breweryVisitButton.style.backgroundColor = "red";

              breweryVisitButton.addEventListener("click", () =>
                  deleteBreweryVisit(brewery)
              );

              breweryLink.append(breweryLinkContent, breweryVisitButton);

              // configuration
              breweryContainer.append(
                  breweryTitle,
                  breweryType,
                  breweryAddress,
                  breweryPhone,
                  breweryLink
              );

              visitListBlock.append(breweryContainer);
          })
        : (visitListBlock.innerText =
              "Ohh I did not find nothing :( \n Go back to search page and add some breweries to visit list using 'ADD TO VISIT LIST' button :)");
};

getAllBreweries();
