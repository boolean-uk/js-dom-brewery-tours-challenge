// let variable declared named state to store the object (which starts off blank)
let state = {
  searchState: "",
  breweryType: "",
  cities: [],
};

// const variable declared to store the getBreweries arrow function
const getBreweries = () => {
  // The API link used to fetch the data required for the website & database
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.searchState}`)
    // Once the API is found then it is converted to json to be used with javascript
    .then((res) => res.json())
    // once converted then the breweries are found on the state & rendered using the render() function
    .then((breweries) => {
      state.breweries = breweries;
      render();
    });
};

// const variable declared named createBreweryLink which will store the function to create the link for the brewery, the link used in the parameter
const createBreweryLink = (link) => {
  // const variable called section declared to store the element created "section" as shown in the standard-list-items.html template
  const section = document.createElement("section");
  // the class "link" created for the section element
  section.className = "link";
  // const variable called section declared to store the element created "a" (anchor) within the section element as shown in the standard-list-items.html template
  const a = document.createElement("a");
  // the link for the brewery
  a.href = link;
  // Opens the linke in a new window
  a.target = "_blank";
  // text inserted for the a link
  a.innerText = "Visit Website";
  // append a within the section element
  section.append(a);
  // return the section
  return section;
};

// Arrow function created and stored in the const variable createBrewery, the brewery used in the parameter
const createBrewery = (brewery) => {
  // li element created in the document (HTML), stored in createBrewery
  const breweryContainer = document.createElement("li");

  // Arrow function created and stored in the const variable createBreweryTitle, title of brewery used in the parameter
  const createBreweryTitle = (title) => {
    // h2 element created in the document (HTML), stored in createBrewery
    const brewerytitle = document.createElement("h2");
    // The inner text for the h2
    brewerytitle.innerText = title;
    // the brewerytitle returned from the function when called (to be appended)
    return brewerytitle;
  };

  // Arrow function created and stored in the const variable createBreweryType, type of brewery used in the parameter
  const createBreweryType = (type) => {
    // div element created in the document (HTML), stored in div
    const div = document.createElement("div");
    // class name created for div called type
    div.className = "type";
    // the text inserted for this elelment
    div.innerText = type;
    // the div is returned from the function when called (to be appended)
    return div;
  };

  // Arrow function created and stored in the const variable createBreweryAddress, the brewery used in the parameter
  const createBreweryAddress = (brewery) => {
    // section element created in the document (HTML), stored in section
    const section = document.createElement("section");
    // class name created for section called address
    section.className = "address";
    // line 1 of address created in the document (HTML), stored in address1
    const address1 = document.createElement("h3");
    // innertext for that address line inserted
    address1.innerText = "Address:";
    // line 2 of address created in the document (HTML), stored in address2
    const address2 = document.createElement("p");
    // innertext for that address line inserted
    address2.innerText = brewery.street;
    // line 3 of address created in the document (HTML), stored in address3
    const address3 = document.createElement("p");
    // Element created as this part of the address is in bold (strong)
    const address3Bold = document.createElement("strong");
    // innertext for the bold text line, which is the brewery city & postcode found with ${} - the brewery in the parameter matches with brewery dot notation in the ${}
    address3Bold.innerText = `${brewery.city}, ${brewery.postal_code}`;
    // appending the bold address part
    address3.append(address3Bold);
    // appending the remaining parts of the address
    section.append(address1, address2, address3);
    // returns this section when createBreweryAddress() is called to be rendered
    return section;
  };

  // Arrow function created and stored in the const variable createBreweryPhone, phone used in the parameter
  const createBreweryPhone = (phone) => {
    // Number to store either the number from ${phone} or n/a if there isn't one, hence the ?
    const Number = phone ? `+${phone}` : "N/A";
    // creating the element section stored in const variable section
    const section = document.createElement("section");
    // creating a class for the section called phone. As shown on standard-list-items.html template
    section.className = "phone";
    // creating element h3, stored in variable phoneHeading
    const phoneHeading = document.createElement("h3");
    // the text inserted on the page "Phone:"... hardcoded
    phoneHeading.innerText = "Phone:";
    // creating element p, stored in variable phoneNumber
    const phoneNumber = document.createElement("p");
    // inserting the number for each brewery
    phoneNumber.innerText = phone;
    // appending the phoneHeading & phoneNumber within the section
    section.append(phoneHeading, phoneNumber);
    // returns the section when createBreweryPhone() is called (when appended)
    return section;
  };

  // The brewery Container appending all the functions above created & within the brackets are the path to the information being appended in the object
  breweryContainer.append(
    createBreweryTitle(brewery.name),
    createBreweryType(brewery.brewery_type),
    // Why just brewery?
    createBreweryAddress(brewery),
    createBreweryPhone(brewery.phone),
    createBreweryLink(brewery.website_url)
  );
  // returns the appended container with all the elements included via the functions
  return breweryContainer;
};

// renderBreweries arrow function created and stored in a const variable
const renderBreweries = () => {
  // Getting access to #breweries-list within the index.html by using querySelector & it stored under breweriesList
  const breweriesList = document.querySelector("#breweries-list");
  // const variable declared to store the breweries where .map() creates a new array containing the breweries which go to the li created on the createBrewery() function
  const breweries = state.breweries.map((brewery) => createBrewery(brewery));
  // the breweriesList appended showing all the breweries
  breweriesList.append(...breweries);
};

// render() used to render the breweries by calling the  renderBreweries() function
// clear() called when render() is called.  This ensures the list is clear before rendering & doesn't create duplicates
const render = () => {
  clear();
  renderBreweries();
};

// clearBreweries arrow function created and stored in a const variable
const clearBreweries = () => {
  // Getting access to #breweries-list within the index.html by using querySelector & it stored under breweryList
  const breweryList = document.querySelector("#breweries-list");
  // A const variable declared to store the breweries being cleared via from() locating the brewery list, the children selected within that (the brewery) & then for each brewery it is removed using remove()
  const breweries = Array.from(breweryList.children);
  breweries.forEach((brewery) => brewery.remove());
};

// clear() used to clear before the rendering process - render()
const clear = () => {
  clearBreweries();
};

//  arrow function created and stored in a const variable BreweriesFilter, with one parameter (breweries)
const BreweriesFilter = (breweries) => {
  // const variable declared breweriesType to store the types of breweries in an array []
  const breweriesType = ["micro", "regional", "brewpub"];
  // returns a new array from the breweries object which includes the brewery type
  return breweries.filter((brewery) =>
    breweriesType.includes(brewery.brewery_type)
  );
};

const filteredBreweries = () => {
  let filters = `?per_page=50`;
  console.log(state);
  if (state.state.length > 0) {
    filters += `&by_state=${state.state}`;
  }

  if (state.breweryType.length > 0) {
    filters += `&by_type=${state.breweryType}`;
  }

  // fetch the api data to be filtered
  fetch(`https://api.openbrewerydb.org/breweries/${filters}`)
    // Once the API is found then it is converted to json to be used with javascript
    .then((res) => res.json())
    // once converted then the fitlered breweries are found on the state & rendered using the render() function
    .then((res) => {
      state.breweries = BreweriesFilter(res);
      render();
    });
};

//const variable declared to store the arrow function filterForm
const filterForm = () => {
  // const variable declared named filterByType to store the access to the ID #filter-by-type
  const filterByType = document.querySelector("#filter-by-type");
  // an event listener added when the filter change occurs then the brewery type gets actioned & the filterBreweries() called to show the types of breweries (micro etc)
  filterByType.addEventListener("change", (event) => {
    state.breweryType = event.target.value;
    filteredBreweries();
  });
};

//  arrow function created and stored in a const variable
const eventListener = () => {
  // const variable declared called form which gives access to the ID #select-state-form in index.html
  const form = document.querySelector("#select-state-form");
  // an event listerner added to the form, so when a user submits then the following code is carried out
  form.addEventListener("submit", (event) => {
    // used to stop refreshing or any default behaviour on the form
    event.preventDefault();
    // requestedState stores access to the ID #select-state & the value is what is requested by the user eg Ohio
    const requestedState = document.querySelector("#select-state").value;
    state.state = requestedState;
    filteredBreweries();
  });
};

// Calls the eventListener() & filterForm() functions
eventListener();
filterForm();
