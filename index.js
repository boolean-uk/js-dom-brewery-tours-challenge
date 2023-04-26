// step 1 create event listener for search button
const searchBtn = document.querySelector('input[type="submit"]');
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("search has been clicked!");
  // Your code to handle the event goes here
});

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


