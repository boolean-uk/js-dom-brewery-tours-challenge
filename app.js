const breweriesContainer = document.querySelector(".breweries-list");
const search = document.querySelector("#search-breweries");
const filterForm = document.querySelector("#filter-by-type-form");

const state = {
  search: null,
  brewersInState: [],
};

function getJSON(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
}

async function fetchBrewers(state) {
  try {
    const brewers = await Promise.all([
      getJSON(
        ` https://api.openbrewerydb.org/breweries?by_state=${state}&by_type=micro`
      ),
      getJSON(
        ` https://api.openbrewerydb.org/breweries?by_state=${state}&by_type=brewpub`
      ),
      getJSON(
        ` https://api.openbrewerydb.org/breweries?by_state=${state}&by_type=regional`
      ),
    ]);
    renderBrewers(brewers);
  } catch (err) {
    breweriesContainer.innerText = err.message;
    console.log(err.message);
  }
}

async function fetchBrewersByType(type) {
  const brewers = await getJSON(
    ` https://api.openbrewerydb.org/breweries?by_state=${state.search}&by_type=${type}`
  );
  renderBrewers(brewers);
}

function renderBrewers(brewers) {
  breweriesContainer.innerHTML = "";
  const brewersArr = brewers.flat();
  for (let i = brewersArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [brewersArr[i], brewersArr[j]] = [brewersArr[j], brewersArr[i]];
  }
  state.brewersInState = [];
  brewersArr.slice(0, 19).forEach((brewer) => {
    state.brewersInState.push(brewer);
    const html = `<li>
      <h2>${brewer.name}</h2>
      <div class="type">${brewer.brewery_type}</div>
      <section class="address">
        <h3>Address:</h3>
        <p>${brewer.street ? brewer.street : "N/A"}</p>
        <p>
          <strong>${brewer.city}, ${brewer.postal_code}</strong>
        </p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>${brewer.phone ? brewer.phone : "N/A"}</p>
      </section>
      <section class="link">
        <a href="${brewer.website_url}" target="_blank">
          Visit Website
        </a>
      </section>
    </li>`;

    breweriesContainer.insertAdjacentHTML("afterbegin", html);
  });

  console.log(state.brewersInState);
}

search.addEventListener("input", (e) => {
  const searchInput = e.target.value;
  state.search = searchInput;
  fetchBrewers(searchInput);
});

filterForm.addEventListener("change", (e) => {
  const type = e.target.value;
  fetchBrewersByType(type);
});
