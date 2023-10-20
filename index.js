
// STATE

const state = {
    breweries: [],
    selectStateValue: "",
    filterByType: "all"
  }


const stateForm = document.querySelector("#select-state-form");
const stateInput = document.querySelector("#select-state");
const breweriesList = document.querySelector("#breweries-list");
const filterByType = document.querySelector("#filter-by-type");
const searchBreweriesInpu = document.querySelector("#search-breweries");

// AN Event Listener will be added to detect when the search occurs

stateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchBarText = stateInput.value;
  const usStateFromSearchText = searchBarText
state.selectStateValue = usStateFromSearchText;
fetchSubmit();
});


function fetchSubmit() {
  const url = `https://api.openbrewerydb.org/breweries?by_state=${state.selectStateValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((breweries) => {
      
      

        // An if statement will be passed this is to filter out the brewery type making sure it solely focuses on [micro , regional , brewpub]

      const filterThrBreweries = breweries.filter((brewery) => {
        if (
        brewery.brewery_type === "micro" ||
        brewery.brewery_type === "regional" ||
        brewery.brewery_type === "brewpub"
        ) {
          return true;
        }
        return false;
        
      });
      state.breweries = filterThrBreweries;
      renderBreweries();
    });
}


stateForm.addEventListener("submit" , (event) => {
  event.preventDefault();
})

filterByType.addEventListener("change", (event) => {
  state.filterByType = event.target.value;
  renderBreweries();
  
});

// Here I will be rendering the code

function renderSelBrewery(brewery) {
  const li = document.createElement("li");

  const h2 = document.createElement("h2");
  h2.innerText = brewery.name;
  li.append(h2);

  const div = document.createElement("div");
  div.innerText = brewery.brewery_type;
  div.setAttribute("class", "type");
  li.append(div);

  const classAdressSection = document.createElement("section");
  classAdressSection.setAttribute("class", "address");
 li.append(classAdressSection);
  const h3Adress = document.createElement("h3");
  h3Adress.innerText = "Address:";
    classAdressSection.append(h3Adress)

  const p1Address = document.createElement("p");
  p1Address.innerText = brewery.street;
  classAdressSection.append(p1Address)

  const p2Address = document.createElement("p");
  const strong = document.createElement("strong");
  strong.innerText = brewery.city;
  classAdressSection.append(p2Address)
  p2Address.append(strong);

  // phone section
  const phoneSection = document.createElement("section");
  phoneSection.setAttribute("class", "phone");
  li.append(phoneSection);

  const phoneH3 = document.createElement("h3");
  phoneH3.innerText = "Phone:";
  phoneSection.append(phoneH3);

  const phoneP = document.createElement("p");
  phoneP.innerText = brewery.phone;
    phoneSection.append(phoneP);
  
  const link = document.createElement("section");
  link.setAttribute("class", "link");
  li.append(link);

  const a = document.createElement("a");
  a.setAttribute("href", brewery.website_url);
  a.setAttribute("target", "_blank");
  a.innerText = "Visit Website";
  link.append(a);

  breweriesList.append(li);
}

function renderBreweries() {
  breweriesList.innerHTML = "";
  let filteredBreweries = state.breweries.filter((brewery) => {
    if (state.filterByType === "all") return true;
    if (state.filterByType === brewery.brewery_type) return true;
    return false;
  });

  filteredBreweries.forEach((brewery) => renderSelBrewery(brewery));
}
    renderBreweries();
