// search button event listener
const stateSearch = document.querySelector("#select-state-form");
stateSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("select-state").value;
  stateSearch.reset();
  getStateBrewery(input);
});
// fetch date from the search input
function getStateBrewery(input) {
  fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=${input}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const stateBrewery = data; // store my fetched todos into my state object
      console.log(stateBrewery);
      renderStateBrewery(stateBrewery);
      filter(stateBrewery);
    });
}
//render the brewery list
function renderStateBrewery(stateBrewery) {
  stateBrewery.forEach((element) => {
    // create variables for each data I need
    const name = element.name;
    const type = element.brewery_type;
    const address = element.address_1;
    const province = element.state_province;
    const postCode = element.postal_code;
    const phone = element.phone;
    const website = element.website_url;
    // select elements and create elements
    const ul = document.querySelector(".breweries-list");
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const section1 = document.createElement("section");
    const section2 = document.createElement("section");
    const section3 = document.createElement("section");
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const strong = document.createElement("strong");
    const a = document.createElement("a");
    // insert elements and data
    ul.append(li);
    li.append(h2);
    h2.innerText = name;
    li.append(div);
    div.setAttribute("class", "type");
    div.innerText = type;
    li.append(section1);
    section1.setAttribute("class", "address");
    section1.append(h3);
    h3.innerText = "Address:";
    section1.append(p1);
    p1.innerText = address;
    section1.append(p2);
    p2.append(strong);
    strong.innerText = `${province},${postCode}`;
    li.append(section2);
    section2.setAttribute("class", "phone");
    section2.append(h3);
    h3.innerText = "Phone:";
    section2.append(p3);
    p3.innerText = phone;
    li.append(section3);
    section3.setAttribute("class", "link");
    section3.append(a);
    a.setAttribute("href", `${website}`);
    a.setAttribute("target", "_blank");
    a.innerText = "Visit Website";
  });
}

// filter by type and then rerender
function filter(stateBrewery) {
  const select = document.querySelector("select");
  select.addEventListener("change", (event) => {
    event.preventDefault();
    const ul = document.querySelector(".breweries-list");
    ul.innerText = "";
    const type = event.target.value;
    const filteredBrewery = stateBrewery.filter((stateBrewery) => {
      return stateBrewery.brewery_type === type;
    });
    renderStateBrewery(filteredBrewery);
  });
}
