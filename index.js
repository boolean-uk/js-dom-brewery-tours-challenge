let applicationState = {
  selectedFilters: [],
  usState: "",
  breweries: [],
};
//selecter
const myform = document.querySelector("#select-state-form");
const selection = document.querySelector("#filter-by-type");
const listB = document.querySelector("#breweries-list");

function getData(usState) {
  applicationState.usState = usState;
  console.log("usstate", applicationState.usState);
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${applicationState.usState}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (breweries) {
      console.log("state breweries", breweries);
      // store breweries in local state and render
      setState(breweries);
    });
}

function addInputListener() {
  myform.addEventListener("submit", (event) => {
    event.preventDefault();
    const myState = document
      .querySelector("#select-state")
      .value.replace(" ", "_")
      .toLowerCase();
    getData(myState);
  });
}

function render() {
  listB.innerHTML = "";
  const filterBreweries = filterBreweriesBY()
    filterBreweries.forEach((brewery) => {
      const liE = document.createElement("li");
      listB.appendChild(liE);
      const liH2 = document.createElement("h2");
      const liDiv = document.createElement("div");
      const liSecAdd = document.createElement("section");
      const firstSech3 = document.createElement("h3");
      const firstSecPOne = document.createElement("p");
      const firstSecPTwo = document.createElement("p");
      const firstSecPTwoSt = document.createElement("strong");
      firstSecPTwo.appendChild(firstSecPTwoSt);
      liSecAdd.append(firstSech3);
      liSecAdd.append(firstSecPOne);
      liSecAdd.append(firstSecPTwo);
  
      const lisecPhone = document.createElement("section");
      const secondSecH3 = document.createElement("h3");
      const secondSecpara = document.createElement("p");
      lisecPhone.append(secondSecH3);
      lisecPhone.append(secondSecpara);
  
      const liseclink = document.createElement("section");
      const thirdSecAnchor = document.createElement("a");
      liseclink.append(thirdSecAnchor);
      liE.append(liH2);
      liE.append(liDiv);
      liE.append(liSecAdd);
      liE.append(lisecPhone);
      liE.append(liseclink);
      liH2.innerHTML = brewery.name;
      liDiv.className = "type";
      liDiv.innerText = brewery.brewery_type;
      liSecAdd.className = "address";
      firstSech3.innerHTML = "Address";
      firstSecPOne.innerHTML = brewery.street;
      firstSecPTwoSt.innerHTML = `${brewery.city},${brewery.postal_code} ${brewery.state}`;
  
      lisecPhone.className = "phone";
      secondSecH3.innerHTML = "phone";
  
      secondSecpara.innerHTML = brewery.phone;
      liseclink.className = "link";
      thirdSecAnchor.setAttribute("href", brewery.website_url);
      thirdSecAnchor.setAttribute("target", "_blank");
      thirdSecAnchor.innerHTML = "vist website";
    
    })
  
}
    
const filterBreweriesBY = () =>{
  let filterList =[]
  if(applicationState.selectedFilters.length === 0){
    const defaultFilters =['micro','regional','brewpub']
    filterList=applicationState.breweries.filter((brewery) =>defaultFilters.includes(brewery.brewery_type))
  }
  else{
    filterList =applicationState.breweries.filter((brewery) => state.selectedFilters.includes(brewery.brewery_type))
  }
  return filterList
}

function addFilterByTypeListener(usState) {
  applicationState.usState = usState;

  console.log("usstate", applicationState.usState);
  let newData = `https://api.openbrewerydb.org/breweries?by_state=${applicationState.usState}&by_type=${selection.value}`;
  console.log("new data: ", newData);
  fetch(newData)
    .then(function (response) {
      return response.json();
    })
    .then(function (breweries) {
      console.log("filter breweries", breweries);

      setState(breweries);
    });
}

function FilterByTypeAddListener() {
  selection.addEventListener("change", (event) => {
    event.preventDefault();
    console.log("selection", selection.value);
    const usStateFilter = document
      .querySelector("#select-state")
      .value.replace(" ", "_")
      .toLowerCase();
    addFilterByTypeListener(usStateFilter);
  });
}
function setState(breweries) {
  applicationState.breweries = breweries;
  render();
}
function init() {
  addInputListener();
  FilterByTypeAddListener();
}

init();
