// step 1 create event listener for search button
// const searchBtn = document.querySelector('input[type="submit"]');
// searchBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   console.log("search has been clicked!");
//   // Your code to handle the event goes here
// });

// step 2 Fetch
fetch("https://api.openbrewerydb.org/v1/breweries")
  .then(function (response) {
    // console.log('response', response)
    return response.json();
    // calling out to an API to get the data
    // the.json server returns an edited version just concernign the data (no errors, date stamps etc)
  })
  .then(function (breweries) {
    // breweries is an array of objects - so I need to access the objects within the array(forEach loop) and then the properties within the object(.notation)

    // this .then gives us specifically just the .json data that has been passes thr the previously .then

    //   Loop for multiple listing display - items must go in the loop!

    breweries.forEach(function (brewery) {
      console.log(brewery);

      const breweries = document.querySelector("#breweries-list");
      breweries.classList.add("breweries-list");
      const newLi = document.createElement("li");
      breweries.append(newLi);
      // title
      const newH2 = document.createElement("h2");
      newH2.innerText = brewery.name;
      newLi.append(newH2);
      console.log(newH2);
      // micro/regional/brewpub
      const newDiv = document.createElement("div");
      newDiv.classList.add("type");
      newDiv.innerText = brewery.brewery_type;
      newLi.append(newDiv);
      // address section
      const newSection = document.createElement("section");
      newSection.classList.add("address");
      newLi.append(newSection);

      const newH3 = document.createElement("h3");
      newH3.innerText = "Address:";
      newSection.append(newH3);

      const newP = document.createElement("p");
      newP.innerText = brewery.address_1;
      newSection.append(newP);

      const strongP = document.createElement("p");
      strongP.innerText = brewery.postal_code;
      newSection.append(strongP);

      // phone section

      const phoneSection = document.createElement("section");
      phoneSection.classList.add("phone");
      newLi.append(phoneSection);

      const h3Phone = document.createElement("h3");
      h3Phone.innerText = "Phone:";
      phoneSection.append(h3Phone);

      const pPhone = document.createElement("p");
      pPhone.innerText = brewery.phone;
      phoneSection.append(pPhone);

      // website button

      const webSection = document.createElement("section");
      webSection.classList.add("link");
      newLi.append(webSection);

      const a = document.createElement("a");
      a.innerText = "Visit Website";
      a.setAttribute("href", brewery.website_url);
      a.setAttribute("target", "_blank");
      webSection.append(a);
    });
  });

//   Display for one single listing (using standard-list-item.html as a guide)

const breweries = document.querySelector("#breweries-list");
breweries.classList.add("breweries-list");
const li = document.createElement("li");
breweries.append(li);

const h2 = document.createElement("h2");
h2.innerText = "Snow Belt Brew";
li.append(h2);

const div = document.createElement("div");
div.classList.add("type");
div.innerText = "Micro";
li.append(div);

//   Address Section
const sectionOne = document.createElement("section");
sectionOne.classList.add("address");
li.append(sectionOne);

const h3 = document.createElement("h3");
h3.innerText = "Address:";
sectionOne.append(h3);

const p = document.createElement("p");
p.innerText = "9511 Kile Rd";
sectionOne.append(p);

const strongP = document.createElement("p");
strongP.innerText = "Chardon, 44024";
sectionOne.append(strongP);

//   Phone Section
const sectionTwo = document.createElement("section");
sectionTwo.classList.add("phone");
li.append(sectionTwo);

const h3Phone = document.createElement("h3");
h3Phone.innerText = "Phone:";
sectionTwo.append(h3Phone);

const pPhone = document.createElement("p");
pPhone.innerText = "N/A";
sectionTwo.append(pPhone);

//   Website Section
const sectionThree = document.createElement("section");
sectionThree.classList.add("link");
li.append(sectionThree);

const a = document.createElement("a");
a.innerText = "Visit Website";
sectionThree.append(a);

// PART 2

// - A user can enter a US state and view a list of breweries in that state

// also declare State

const stateSection = document.querySelector(".select-state-section");
const stateForm = document.querySelector("#select-state-form");
const stateInput = document.querySelector("#select-state");

const state = {
  breweries: [],
  filtered: [],
};

stateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // 	- The list should only show the following types of breweries:
  // 		- Micro
  // 		- Regional
  // 		- Brewpub

  const stateTyped = stateInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${stateTyped}&per_page=50`
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      (state.breweries = data), renderBreweries();
    });
});


// Borrowed from Hamza to help me understand - will go through all of this again over the weekend

function renderBreweries() {
    const breweriesUl = document.querySelector('#breweries-list')
    breweriesUl.innerHTML = ''
    for (let i = 0; i < state.breweries.length; i++) {

        const breweryLi = document.createElement('li')

        const breweryH2 = document.createElement('h2')
        breweryH2.innerText = state.breweries[i].name

        const breweryTypeDiv = document.createElement('div')
        breweryTypeDiv.setAttribute('class', 'type')
        breweryTypeDiv.innerText = state.breweries[i].brewery_type

        const brewerySectionAddress = document.createElement('section')
        brewerySectionAddress.setAttribute('class', 'address')

        const breweryH3Address = document.createElement('h3')
        breweryH3Address.innerText = 'Address:'

        const breweryPAddress = document.createElement('p')
        breweryPAddress.innerText = state.breweries[i].street

        const breweryPostalAddress = document.createElement('p')
        const breweryPostalStrong = document.createElement('strong')
        breweryPostalStrong.innerText = `${state.breweries[i].city}, ${state.breweries[i].postal_code}`

        const brewerySectionPhone = document.createElement('section')
        brewerySectionPhone.setAttribute('class', 'phone')

        const breweryH3Phone = document.createElement('h3')
        breweryH3Phone.innerText = 'Phone:'

        const breweryPhoneNumber = document.createElement('p')
        breweryPhoneNumber.innerText = state.breweries[i].phone

        const brewerySectionLink = document.createElement('section')
        brewerySectionLink.setAttribute('class', 'link')

        const breweryLinkA = document.createElement('a')
        breweryLinkA.setAttribute('href', state.breweries[i].website_url)
        breweryLinkA.setAttribute('target', '_blank')
        breweryLinkA.innerText = 'Visit Website'

        if (state.breweries[i].brewery_type === 'micro' || state.breweries[i].brewery_type === 'brewpub' || state.breweries[i].brewery_type === 'regional') {

            // - From the list of breweries, a user can view the following details about each brewery:
            // 	- Name
            // 	- Type of brewery
            // 	- Address
            // 	- Phone Number
            // - From the list of breweries, a user can visit the website of a brewery
            breweriesUl.append(breweryLi)
            breweryLi.append(breweryH2, breweryTypeDiv, brewerySectionAddress, brewerySectionPhone, brewerySectionLink)
            brewerySectionAddress.append(breweryH3Address, breweryPAddress, breweryPostalAddress)
            breweryPostalAddress.append(breweryPostalStrong)
            brewerySectionPhone.append(breweryH3Phone, breweryPhoneNumber)
            brewerySectionLink.append(breweryLinkA)
        }
    }
}

// - From the 'filter by type of brewery' section, a user can filter by type of brewery.
const filter = document.querySelector('#filter-by-type-form')
const selectOption = document.querySelector('#filter-by-type')

filter.addEventListener('change', function (event) {
    event.preventDefault()
    const filteredBrewery = selectOption.value
    console.log('error', filteredBrewery)
    const stateTyped = stateInput.value

    fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${filteredBrewery}&by_state=${stateTyped}&per_page=50`)
        .then((response) => {
            return response.json()
        })
        .then(function (filteredBreweryData) {
            state.breweries = filteredBreweryData,
                renderBreweries()

        })

})



renderBreweries()



