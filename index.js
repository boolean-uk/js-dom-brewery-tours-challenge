const state = {
    breweries: []
}

const root = 'https://api.openbrewerydb.org/v1/breweries'

const form = document.querySelector('#select-state-section')
const searchInput = document.querySelector('#select-state')
const breweryList = document.querySelector('#breweries-list')
const filter = document.querySelector('#filter-by-type')


// Build a fetch function that works based on the state entered in search. Filter out all breweries that aren't Micro, Regional or Brewpub.

form.addEventListener('submit', search)

function searchFunc(event) {
    event.preventDefault()
    const stateSearch = searchInput.value
    retrieveData(byState)
    form.reset()
}

function renderCard(breweries) {
    
}


/* <li>
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
</li> */


// Add an event listener. 