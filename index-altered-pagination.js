//this is not my submission. I was just using this to try out pagination with fetch requests. 

const state = {
    breweries: [],
    filterValue: "",
    page: 1,
    visitBreweryList: [],
    searchValue: "",
    state: ""
  };
  
  //core criteria
  
  const breweriesList = document.querySelector("#breweries-list");
  const stateSearch = document.querySelector("#select-state-form");
  const filterBrewery = document.querySelector("#filter-by-type-form");
  const resetFilterBrewery = document.querySelector("#filter-by-type");
  const searchCurrentBreweries = document.querySelector("#search-breweries-form");
  const clearAll = document.querySelector(".clear-all-btn");
  const showVisitList = document.querySelector('.visit-list')
  const breweryHeading = document.querySelector('h1')
  
  stateSearch.addEventListener("submit", function (event) {
    event.preventDefault();
  
    state.state = stateSearch["select-state"].value
    state.page = 1
    resetFilterBrewery.value = "";
    showVisitList.innerHTML = "show visit list"
    searchCurrentBreweries.reset()
  
    const apiEndpoint = `https://api.openbrewerydb.org/breweries?by_state=${stateSearch["select-state"].value}`;
    retrieveDataAndRenderBreweries(apiEndpoint + `&page=${state.page}`);
  
    filterBrewery.addEventListener("change", function (event) {
      state.filterValue = event.target.value
        if (event.target.value === "") {
        state.page = 1
        searchCurrentBreweries.reset()
        retrieveDataAndRenderBreweries(apiEndpoint + `&page=${state.page}`);
      } else {
        state.page = 1
        searchCurrentBreweries.reset()
        retrieveDataAndRenderBreweries(
          apiEndpoint + `&by_type=${event.target.value}` + `&page=${state.page}`
        )
        ;
      }
    });
  });
  
  function addBrewery(brewery) {
    const liElement = document.createElement("li");
    liElement.innerHTML = `<h2>${brewery.name}</h2>
    <div class="type">${brewery.brewery_type}</div>
    <section class="address">
      <h3>Address:</h3>
      <p>${brewery.street}</p>
      <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
    </section>
    <section class="phone">
      <h3>Phone:</h3>
      <p>${brewery.phone}</p>
    </section>
    <section class="link">
    <button>${visitListButtonText(brewery)}</button>
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    </section>`;
  
    const visitList = liElement.querySelector('button')
    addAndDeleteVisitListButton(visitList, brewery)
  
    breweriesList.append(liElement);
  }
  
  
  function retrieveDataAndRenderBreweries(apiEndpoint) {
    fetch(apiEndpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        state.breweries = response
        state.breweries.forEach((brewery) => (brewery.isCityChecked = true));
        renderBreweries();
      });
  }
  
  function renderBreweries(arrayOfBreweries = state.breweries) {
    breweriesList.innerHTML = "";
    arrayOfBreweries
      .filter((brewery) => brewery.isCityChecked === true)
      .forEach((brewery) => addBrewery(brewery));
      addPaginationButtons(arrayOfBreweries);
  }
  
  //Extension 1 criteria
  
  searchCurrentBreweries.addEventListener("input", function (event) {
    state.page = 1;
    state.searchValue = event.target.value

    if(showVisitList.innerHTML === "show state breweries") {
      const visitListSearch = state.visitBreweryList.filter((brewery) =>
      brewery.name.toLowerCase().includes(event.target.value.toLowerCase()))
      renderBreweries(visitListSearch);
    } 
    else if (state.filterValue === "") {
      retrieveDataAndRenderBreweries(`https://api.openbrewerydb.org/breweries?by_state=${state.state}&by_name=${event.target.value}&page=${state.page}`) 
        }
        else {
            retrieveDataAndRenderBreweries(`https://api.openbrewerydb.org/breweries?by_state=${state.state}&by_type=${state.filterValue}&by_name=${event.target.value}&page=${state.page}`)  
        }
    
  });

  // Unable to complete Ext 2 for this solution. 
  
  
  //Pagination functions
  
  function addPaginationButtons(arrayOfBreweries) {

    const addButton = document.createElement("button");
    const pageNumber = document.createElement("span");
    const subtractButton = document.createElement("button");
  
    pageNumber.style.margin = "10px";
  
    addButton.innerText = "+";
    pageNumber.innerText = state.page;
    subtractButton.innerText = "-";
  
    addButton.addEventListener("click", function () {
        if(arrayOfBreweries.length === 20) {
        state.page++;
        pageNumber.innerText = state.page
        retrieveCorrectDataAndRender()
    }
    });
  
    subtractButton.addEventListener("click", function () {
      if (state.page > 1) {
        state.page--;
        pageNumber.innerText = state.page
        retrieveCorrectDataAndRender()
    }});
  
    breweriesList.prepend(subtractButton, pageNumber, addButton);
  }

  function retrieveCorrectDataAndRender() {
    if(searchCurrentBreweries.value !== "" && state.filterValue === "" ){
      retrieveDataAndRenderBreweries(`https://api.openbrewerydb.org/breweries?by_state=${state.state}&by_name=${state.searchValue}&page=${state.page}`) 
        }
    else if(searchCurrentBreweries.value !== "" && state.filterValue !== "" ) {
            retrieveDataAndRenderBreweries(`https://api.openbrewerydb.org/breweries?by_state=${state.state}&by_type=${state.filterValue}&by_name=${state.searchValue}&page=${state.page}`)  
        }
    else if (state.filterValue === "") {
  retrieveDataAndRenderBreweries(`https://api.openbrewerydb.org/breweries?by_state=${state.state}&page=${state.page}`) 
    }
    else {
        retrieveDataAndRenderBreweries(`https://api.openbrewerydb.org/breweries?by_state=${state.state}&by_type=${state.filterValue}&page=${state.page}`)  
    }
  }
  
  // ext 4 showing bookmarked breweries to visit
  
  showVisitList.addEventListener('click', function(){
    searchCurrentBreweries.reset()
    if(showVisitList.innerHTML === "show visit list") {
        showVisitList.innerHTML = "show state breweries"
        breweryHeading.innerHTML = "My Visit List"
          renderBreweries(state.visitBreweryList)
  
    }
    else if(showVisitList.innerHTML === "show state breweries") {
      showVisitList.innerHTML = "show visit list"
      breweryHeading.innerHTML = "List of Breweries"
      renderBreweries(state.breweries) 
    }
  })
  
  function addAndDeleteVisitListButton(visitList, brewery) {
    visitList.addEventListener('click', function() {
    if(visitList.innerHTML === "Add to Visit List") {
    fetch("http://localhost:3000/visit-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(brewery)
    })
    .then(function() {
      updateVisitList()
   visitList.innerHTML = "remove from visit list"
   } )
      }
  else {
    fetch(`http://localhost:3000/visit-list/${brewery.id}`, {
      method: "DELETE"})
      .then(function() {
        updateVisitList()
        visitList.innerHTML = "Add to Visit List"
        } )
  }
  })
  }
  
  function isInVisitList(brewery) {
  for (let item of state.visitBreweryList) {
    if(item.id === brewery.id) return true
  }
  return false
  }
  
  function visitListButtonText(brewery) {
    if(isInVisitList(brewery)) {
      return `remove from visit list`
    }
    return `Add to Visit List`
  }
  
  function updateVisitList() {
  fetch("http://localhost:3000/visit-list")
  .then(function (response) {
    return response.json();
  })
    .then(function(response) { 
      state.visitBreweryList = response
    })
  }
  
  updateVisitList()
  
  