function renderBreweries(renderList) {
  clearElement(BREWERY_LIST);

  renderList.forEach((brewery) => renderBrewery(brewery));
  STATE.page.currentPage = 1;
  paginate();
}

function renderBrewery(brewery) {
  const li = makeElement("li");
  li.id = brewery.id

  const h2 = makeElement("h2", null, brewery.name);
  const typeDiv = makeElement("div", "type", brewery.brewery_type);

  const addressSection = makeElement("section", "address");
  const addressLines = [];
  addressLines.push(makeElement("h3", null, "Address:"));
  addressLines.push(makeElement("p", null, brewery.address_1));
  addressLines.push(makeElement("p", null, brewery.address_2));
  addressLines.push(makeElement("p", null, brewery.address_3));
  addressLines.push(
    makeElement("p", "strong", `${brewery.city}, ${brewery.postal_code}`)
  );

  multiAppend(
    addressSection,
    ...addressLines.filter((element) => !!element.innerText)
  );

  const phoneSection = makeElement("section", "phone");
  const phoneLines = [];
  phoneLines.push(makeElement("h3", null, "Phone:"));
  phoneLines.push(makeElement("p", null, formatPhoneNumber(brewery.phone)));
  multiAppend(phoneSection, ...phoneLines);

  const linkSection = makeElement("section", "link");
  const anchor = makeElement("a", null, "Visit Website");
  anchor.href = brewery.website_url;
  anchor.target = "_blank";
  linkSection.append(anchor);

  multiAppend(li, h2, typeDiv, addressSection, phoneSection, linkSection);
  BREWERY_LIST.append(li);
}

function renderPaginateSelector() {
  clearElement(PAGINATION_NUMBERS);

  const { currentPage, pageCount } = STATE.page;

  const additionalPage = 3;

  const numbers = [];
  for (let i = 1; i <= STATE.page.pageCount; i++) {
    numbers.push(i);
  }

  pageNumbers = numbers.map((number, idx) => {
    const element = makeElement("span", "page-number", number);
    element.classList.add("page-number");

    if (idx === currentPage - 1) element.id = "selected-page";

    if (idx > currentPage + 1 && idx !== pageCount - 1 && idx > 6) {
      element.classList.add("hidden");
    } else if (idx < currentPage - 3 && idx !== 0 && idx < pageCount - 7) {
      element.classList.add("hidden");
    }

    return element;
  });

  multiAppend(PAGINATION_NUMBERS, ...pageNumbers);

  if (
    currentPage < pageCount - additionalPage &&
    pageCount > additionalPage * 2 + 2
  ) {
    const morePagesRight = makeElement("span", "page-more", "...");
    PAGINATION_NUMBERS.children[STATE.page.pageCount - 1].before(
      morePagesRight
    );
  }

  if (currentPage > additionalPage + 1 && pageCount > additionalPage * 2 + 2) {
    const morePagesLeft = makeElement("span", "page-more", "...");
    PAGINATION_NUMBERS.children[0].after(morePagesLeft);
  }

  togglePaginateAdjacentButtons();
}

function renderCityFilterList() {
  const cityList = obtainCityList();

  cityList.forEach((city) => {
    const checkBox = makeElement("input");
    checkBox.id = `city-${city.toLowerCase()}`;
    checkBox.type = "checkbox";
    checkBox.value = city.toLowerCase();
    checkBox.addEventListener("change", e => {
      renderBreweries(collateFilters())
    })

    const label = makeElement("label", null, city);
    label.htmlFor = `city-${city.toLowerCase()}`;

    CITY_FILTER_FORM.append(checkBox);
    CITY_FILTER_FORM.append(label);
  });
}
