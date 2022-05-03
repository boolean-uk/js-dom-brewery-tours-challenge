const breweriesToVisit = document.getElementById("breweries-we-want-to-visit");

function renderListOfBreweriesToVisit(data) {
  breweriesToVisit.innerHTML = "";

  data.forEach((el) => {
    const htmlBrewery = getBreweryHtml(el);
    breweriesToVisit.insertAdjacentHTML("afterbegin", htmlBrewery);

    const removeBreweryFromList = document.getElementById("remove-from-list");
    removeBreweryFromList.addEventListener("click", () => {
      deleteFromLocalServer(el);
      setTimeout(() => {
        fetchFromLocalServer();
      }, 100);
    });
  });
}

function getBreweryHtml(el) {
  const htmlBrewery = `<li class='brewery-list-item'>
    <h2>${el.name}</h2>
    <div class="type">${el.brewery_type}</div>
    <section class="address">
      <h3>Address:</h3>
      <p>${el.street}</p>
      <p><strong>${el.city}, ${el.postal_code}</strong></p>
    </section>
    <section class="link">
    <a href="${el.website_url}" target="_blank">Visit Website</a>
    </section>
    <section class="phone">
      <h3>Phone:</h3>
      <p>N/A</p>
    </section>
    <section class='add-remove-json-server'>
    <button id='remove-from-list' class="button-88-remove display-none" role="button">REMOVE FROM VISIT LIST</button>
    </section>
     </li>`;

  return htmlBrewery;
}

// FETCH DATA FROM SERVER
function fetchFromLocalServer() {
  fetch("http://localhost:3000/breweries")
    .then((res) => res.json())
    .then((data) => {
      renderListOfBreweriesToVisit(data);
    });
}

// UPDATE LOCAL SERVER
function updateLocalServer(el) {
  const opts = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...el }),
  };

  fetch(`http://localhost:3000/breweries`, opts)
    .then((res) => res.json())
    .then(() => {
      console.log("update server");
    });
}

// DELETE ITEM FROM LOCAL SERVER
function deleteFromLocalServer(el) {
  fetch(`http://localhost:3000/breweries/${el.id}`, {
    method: "DELETE",
  });
}

// RENDER visit.html ONLOAD

window.onload = fetchFromLocalServer();
