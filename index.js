//PLAN
// 1.  -Import/fetch data of breweries from the api and list them 
//     -put an event listener that on submit shows the user what they searched for
//     -filter the data so that it ONLY shows THE TYPE of breweries THAT OFFERS TOURS
//     -Every brewery shoud contain the following details:
//          + NAME
//          + TYPE OF BREWERY
//          + ADRESS
//          + PHONE NUMBER
//
// 2. From the list of breweries a user can visit their website
// 3. From the "filter by type" section, a user can filter by type a brewery



const form = document.querySelector("#select-state-form");
const searchInput = document.querySelector("#select-state");
const brewUl = document.querySelector("#breweries-list");
const filterForm = document.querySelector("#filter-by-type-form");
const filter = document.querySelector("#filter-by-type");


const state = {
  breweries: [],
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const type = searchInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_state=${type}&per_page=50`
  )
    .then((response) => response.json())
    .then(function (data) {
      state.breweries = data;
      renderListOfBreweries();
    });
});

filterForm.addEventListener("change", function (event) {
  event.preventDefault();

  const filtered = filter.value;
  const type = searchInput.value;

  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_type=${filtered}&by_state=${type}&per_page=50`
  )
    .then((response) => response.json())
    .then(function (filteredBreweryData) {
      state.breweries = filteredBreweryData;
      renderListOfBreweries();
    });
});



//LIST OF BREWERIES
function renderListOfBreweries(breweries) {
    brewUl.innerHTML = ''

    state.breweries.forEach((brewery) => {
        const li = document.createElement('li')
        const breweryName = document.createElement('h2')
        breweryName.innerText = brewery.name
        li.append(breweryName)

        const breweryType = document.createElement('div')
        breweryType.setAttribute('class', 'type')
        breweryType.innerText = brewery.brewery_type
        li.append(breweryType)

        const section1 = document.createElement('section')
        section1.setAttribute('class', 'adress')
        const breweryAdress = document.createElement('h3')
        breweryAdress.innerText = 'Adress:'
        const brewerySreet = document.createElement('p')
        brewerySreet.innerText = brewery.street 
        const postalCode = document.createElement('strong')
        postalCode.innerText = brewery.city + ', ' + brewery.postal_code
        section1.append(breweryAdress, brewerySreet, postalCode)
        li.append(section1)

        const section2 = document.createElement('section')
        section2.setAttribute('class', 'phone')
        const breweryPhoneNumber = document.createElement('h3')
        breweryPhoneNumber.innerText = 'Phone:'+ brewery.phone
        section2.append(breweryPhoneNumber)
        li.append(section2)

        const section3 = document.createElement('section')
        section3.setAttribute('class', 'link')
        const breweryWebsiteLink = document.createElement('a')
        breweryWebsiteLink.href = brewery.website_url
        breweryWebsiteLink.innerText = 'VISIT WEBSITE'
        section3.append(breweryWebsiteLink)
        li.append(section3)

        brewUl.append(li)


    })
}


