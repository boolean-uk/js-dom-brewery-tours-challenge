//this is not my submission. I was just using this to try out pagination with fetch requests. It has not been very successful. 

const state = {
    breweries: [],
    brewerySearch: [],
    filterValue: "",
    page: 1,
    visitBreweryList: []
  };
  
  //core criteria
  
  const breweriesList = document.querySelector("#breweries-list");
  const stateSearch = document.querySelector("#select-state-form");
  const filterBrewery = document.querySelector("#filter-by-type-form");
  const resetFilterBrewery = document.querySelector("#filter-by-type");
  const searchCurrentBreweries = document.querySelector("#search-breweries-form");
//   const filterByCity = document.querySelector("#filter-by-city-form");
  const clearAll = document.querySelector(".clear-all-btn");
  const showVisitList = document.querySelector('.visit-list')
  const breweryHeading = document.querySelector('h1')
  
  stateSearch.addEventListener("submit", function (event) {
    event.preventDefault();
  
    state.page = 1
    resetFilterBrewery.value = "";
    showVisitList.innerHTML = "show visit list"
  
    const apiEndpoint = `https://api.openbrewerydb.org/breweries?by_state=${stateSearch["select-state"].value}`;
    retrieveBreweryData(apiEndpoint + `&page=${state.page}`);
  
    filterBrewery.addEventListener("change", function (event) {
      state.filterValue = event.target.value
        if (event.target.value === "") {
        state.page = 1
        retrieveBreweryData(apiEndpoint + `&page=${state.page}`);
      } else {
        state.page = 1
        retrieveBreweryData(
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
  
  
  function retrieveBreweryData(apiEndpoint) {
    fetch(apiEndpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        state.breweries = response
        state.breweries.forEach((brewery) => (brewery.isCityChecked = true));
        // renderCities();
        renderBreweries();
        searchCurrentBreweries.reset();
      });
  }
  
  function renderBreweries(arrayOfBreweries = state.breweries) {
    breweriesList.innerHTML = "";
    arrayOfBreweries
      .filter((brewery) => brewery.isCityChecked === true)
      .forEach((brewery) => addBrewery(brewery));
      addPaginationButtons(arrayOfBreweries);
  }
  
  //Extension 1 and 2 criteria
  
  searchCurrentBreweries.addEventListener("input", function (event) {
    state.page = 1;
    if(showVisitList.innerHTML === "show state breweries") {
      state.brewerySearch = state.visitBreweryList.filter((brewery) =>
      brewery.name.toLowerCase().includes(event.target.value.toLowerCase()))
    } 
    else {
      state.brewerySearch = state.breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
    renderBreweries(state.brewerySearch);
    renderCities(state.brewerySearch);
  });
  
//   clearAll.addEventListener("click", function () {
//     const checkboxes = filterByCity.querySelectorAll("input");
//     checkboxes.forEach((checkbox) => (checkbox.checked = false));
//     state.breweries.forEach((brewery) => (brewery.isCityChecked = false));
//     state.brewerySearch.forEach((brewery) => (brewery.isCityChecked = false))
//     state.visitBreweryList.forEach((brewery) => (brewery.isCityChecked = false));
//     renderBreweries();
//   });
  
//   function addCity(city) {
//     const input = document.createElement("input");
//     const label = document.createElement("label");
  
//     input.setAttribute("type", "checkbox");
//     input.setAttribute("name", city.toLowerCase());
//     input.setAttribute("value", city.toLowerCase());
  
//     label.setAttribute("for", city.toLowerCase());
//     label.innerText = city;
  
//     if (isCityAlreadyChecked(city)) {
//       input.checked = true;
//     }
  
//     input.addEventListener("change", function () {
//       checkboxEvent(state.brewerySearch, city, input);
//       checkboxEvent(state.breweries, city, input);
//       checkboxEvent(state.visitBreweryList, city, input)
  
//       if(showVisitList.innerHTML = "show state breweries") {
//         renderBreweries(state.visitBreweryList)
//       }
//       else if (isInputInSearchBreweries()) {
//         renderBreweries(state.brewerySearch);
//       } else {
//         renderBreweries();
//       }
//     });
  
//     filterByCity.append(input, label);
//   }
  
//   function isInputInSearchBreweries() {
//     return (
//       state.brewerySearch.length > 0 &&
//       state.brewerySearch.length !== state.breweries.length
//     );
//   }
  
//   function checkboxEvent(arrayOfBreweries, city, input) {
//     for (const brewery of arrayOfBreweries) {
//       if (brewery.city === city) {
//         brewery.isCityChecked = input.checked;
//       }
//     }
//   }
  
//   function renderCities(arrayOfBreweries = state.breweries) {
//     filterByCity.innerHTML = "";
//     let cities = [];
//     arrayOfBreweries.forEach((brewery) => cities.push(brewery.city));
//     let citySet = [...new Set(cities)].sort();
//     citySet.forEach((city) => addCity(city));
//   }
  
//   function isCityAlreadyChecked(city) {
//     if(state.breweries.find((brewery) => brewery.city === city) !== undefined) {
//     return state.breweries.find((brewery) => brewery.city === city).isCityChecked;
//     }
//     return true
//   }
  
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
        addButton.innerText = state.page
        if (state.filterValue === "") {
      retrieveBreweryData(`https://api.openbrewerydb.org/breweries?by_state=${arrayOfBreweries[0].state}&page=${state.page}`) 
        }
        else {
            retrieveBreweryData(`https://api.openbrewerydb.org/breweries?by_state=${arrayOfBreweries[0].state}&by_type=${state.filterValue}&page=${state.page}`)  
        }
    }
    });
  
    subtractButton.addEventListener("click", function () {
      if (state.page > 1) {
        state.page--;
        subtractButton.innerText = state.page
        if (state.filterValue === "") {
            retrieveBreweryData(`https://api.openbrewerydb.org/breweries?by_state=${arrayOfBreweries[0].state}&page=${state.page}`) 
              }
              else {
                  retrieveBreweryData(`https://api.openbrewerydb.org/breweries?by_state=${arrayOfBreweries[0].state}&by_type=${state.filterValue}&page=${state.page}`)  
              }
    }});
  
    breweriesList.prepend(subtractButton, pageNumber, addButton);
  }
  
  // ext 4 showing bookmarked breweries to visit
  
  showVisitList.addEventListener('click', function(){
    searchCurrentBreweries.reset()
    if(showVisitList.innerHTML === "show visit list") {
        showVisitList.innerHTML = "show state breweries"
        breweryHeading.innerHTML = "My Visit List"
          renderBreweries(state.visitBreweryList)
          renderCities(state.visitBreweryList)
  
    }
    else if(showVisitList.innerHTML === "show state breweries") {
      showVisitList.innerHTML = "show visit list"
      breweryHeading.innerHTML = "List of Breweries"
      renderBreweries(state.breweries) 
      renderCities(state.breweries)
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
  
  