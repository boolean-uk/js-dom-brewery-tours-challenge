let typingTime = 0;

let filterType = undefined;
let state = "";

function getTypingTime() {
  return Date.now() - typingTime;
}

/*
<li>
  <h2>Snow Belt Brew</h2>
  <div class="type">micro</div>
  <section class="address">
    <h3>Address:</h3>
    <p>9511 Kile Rd</p>
    <p><strong>Chardon, 44024</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>N/A</p>
  </section>
  <section class="link">
    <a href="null" target="_blank">Visit Website</a>
  </section>
</li>*/
function renderList(data) {
  let output = "";
  for (let i = 0; i < data.length; i++) {
    output += `<li>
        <h2>${data[i].name}</h2>
        <div class="type">${data[i].brewery_type}</div>
        <section class="address">
            <h3>Address:</h3>
            <p>${data[i].street ?? ``}</p>
            <p><strong>${data[i].city}, ${data[i].state} ${
      data[i].postal_code
    }</strong></p>
        </section>
        <section class="phone">
            <h3>Phone:</h3>
            <p>${data[i].phone ?? `---`}</p>
        </section>
        ${data[i].website_url ? `
        <section class="link">
            <a href="${data[i].website_url}" target="_blank">Visit Website</a>
        </section>` : ``}
        </li>`;
  }
  $("#breweries-list").innerHTML = output;
}

async function searchBreweries(state) {
  const req = await fetch(
    "https://api.openbrewerydb.org/breweries?per_page=50&by_state=" + state + (filterType ? `&by_type=${filterType}` : ``)
  );
  return req.json();
}

$('#filter-by-type').on('change', function() {
    filterType = this.value;
    searchBreweries(state).then(renderList);
});

$("#select-state").on("input", function () {
  state = this.val();
  if (state && state.length < 1) return;
  typingTime = Date.now();
  debounce(() => {
    if (getTypingTime() > 290) {
      searchBreweries(state).then((data) => renderList(data));
    }
  }, 300);
});

