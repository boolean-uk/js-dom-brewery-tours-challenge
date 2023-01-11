//Network Request


// PLAN:
// Core Requirements -
// Create STATE object
//      - all breweries array = by_state Fetch.

const applicationState = {
    usState: "" ,
    breweries:[],
}
 
// All Selecter
const breweriesListUL=document.querySelector('#breweries-list')
const breweriesShowForm=document.querySelector('#select-state-form')

  
// Add event listener for form submit - #select-state-form
//      - make sure submit is not empty / and is an actual state.
//          - if statement on input.value.length / .lowercase.find() on us state array. 
//          - if state has space in it, replace with underscore and save to variable.
//      - prevent default behaviour.
//      - Call GET function.


breweriesShowForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(breweriesListUL)
    const myState = document
      .querySelector("#select-state")
      .value.replace(" ", "_")
      .toLowerCase();
    getData(myState);
    
  });



function getbreweries(){
    breweriesListUL.innertext=""
    for (let i = 0; i < applicationState.breweries.length; i++) {
        const brewery = applicationState.breweries[i];
    console.log(brewery)
        const liE = document.createElement("li");
        breweriesListUL.appendChild(liE);
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
}
}

function setState(breweries) {
    applicationState.breweries = breweries;
    getbreweries();
  }
  
// Create GET FUNCTION
//      - make a fetch request by_state from brewery API, using saved state variable:
//      - GET https://api.openbrewerydb.org/breweries?by_state=USER_SUBMITTED_STATE&per_page=50
//      - save data to all breweries array in state object.
function getData(usState) {
    applicationState.usState = usState;
  
    console.log("usstate",applicationState.usState);
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${applicationState.usState}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (breweries) {
        console.log("state breweries", breweries);
        // store breweries in local state and render
        setState(breweries);
      });
  }

// Create Render Function
//      - clear inner html
//      - breweries.filter what we want
//          - Render filtered array
//            - loop through correct array
//            - create document elements
//            - add attributes
//            - append
// Filter By Type selector
//      - Add Event listener to drop down menu
//          - filter to what we want
//          - render filtered array.