function renderBreweryLi(breweriesToDisplay) {
  const breweryUL = document.querySelector(".breweries-list");
  breweryUL.innerHTML = "";

  breweriesToDisplay.forEach((brewery) => {
    const breweryLi = document.createElement("li");
    breweryUL.append(breweryLi);

    const breweryHeader = document.createElement("h2");
    breweryHeader.innerText = brewery.name;

    const breweryType = document.createElement("div");
    breweryType.className = "type";
    breweryType.innerText = brewery.brewery_type;

    const breweryAddress = document.createElement("section");
    breweryAddress.className = "address";

    const addressHeading = document.createElement("h3");
    addressHeading.innerText = "Address:";

    const breweryStreet = document.createElement("p");
    breweryStreet.innerText = brewery.address_1;

    const breweryPostCode = document.createElement("p");
    const postCodeText = document.createElement("strong");
    postCodeText.innerHTML = brewery.city + ", " + brewery.postal_code;
    breweryPostCode.append(postCodeText);
    breweryAddress.append(addressHeading, breweryStreet, breweryPostCode);

    const breweryPhone = document.createElement("section");
    breweryPhone.className = "phone";

    const phoneHeading = document.createElement("h3");
    phoneHeading.innerText = "Phone:";

    const phoneNumber = document.createElement("p");
    phoneNumber.textContent = brewery.phone;
    breweryPhone.append(phoneHeading, phoneNumber);

    const breweryWebsite = document.createElement("section");
    breweryWebsite.className = "link";

    const breweryWebLink = document.createElement("a");
    breweryWebLink.href = brewery.website_url;
    breweryWebLink.innerText = "Visit Website";
    breweryWebsite.append(breweryWebLink);

    const addToListBtn = document.createElement("button");
    addToListBtn.className = "addToListBtn";
    addToListBtn.innerText = "Add to List";
    breweryWebsite.append(addToListBtn);

    addToListBtn.addEventListener("click", async () => {
      event.preventDefault();
      console.log("You clicked the add to list button");
      const repsonse = await fetch("http://localhost:3000/myBreweries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: brewery.id,
          address_1: brewery.address_1,
          brewery_type: brewery.brewery_type,
          city: brewery.city,
          country: brewery.country,
          name: brewery.name,
          phone: brewery.phone,
          postal_code: brewery.postal_code,
          state: brewery.state,
          street: brewery.street,
          website_url: brewery.website_url,
        }),
      });
    });

    breweryLi.append(
      breweryHeader,
      breweryType,
      breweryAddress,
      breweryPhone,
      breweryWebsite
    );
  });

  if (page > 0) {
    const previousPageButton = document.createElement("button");
    previousPageButton.id = "previous_page";
    previousPageButton.innerText = "Previous Page";
    breweryUL.append(previousPageButton);

    previousPageButton.addEventListener("click", () => {
      page--;
      loadNextPage();
    });
  } else {
    console.log("You are on page 1.");
  }

  const pageNumber = document.createElement("p");
  pageNumber.innerText = page + 1;
  pageNumber.id = "page_number";
  breweryUL.append(pageNumber);

  const nextPageButton = document.createElement("button");
  nextPageButton.id = "next_page";
  nextPageButton.innerText = "Next Page";
  breweryUL.append(nextPageButton);

  nextPageButton.addEventListener("click", () => {
    page++;
    loadNextPage();
  });
}
