// PLANNING....

// A user can enter a US state and view a list of breweries in that state
// The list should only shows the types of breweries that offer brewery tours:
// Micro
// Regional
// Brewpub
// Do not show the other types of breweries
// From the list of breweries, a user can view the following details about each brewery:
// Name
// Type of brewery
// Address
// Phone Number
// From the list of breweries, a user can visit the website of a brewery
// From the 'filter by type of brewery' section, a user can filter by type of brewery.

// things that need to get done by this afternoon 28/10/22
// + refer to templates in the templates folder for guidance
//
// Set up Fetch function to get my data from the correct url/uri
// link that data to my renderBreweryyList
function getBreweryData() {
  // below is the template you will roughly follow to get the data
  //     const uri = 'http://localhost:3000/todos'
  //   // Get the Todo from Local Server
  //   fetch(uri)
  //     .then((response) => {
  //       return response.json() // turns the respone into a Json format
  //     })
  //     .then((wholeList) => {
  //       state.todos = wholeList
  //       renderTodo()
  //     })
  // }
}

//
//  - get insomnia working and able to show the breweries FileList.
//  - have a detailed plan of the things that you will need to do.
//  - break down the steps as much as possible
//  - dont cry
//  - open a file that you can post questions to as they arise.
const state = {
  types: ['micro', 'regional', 'brewpub'],
  breweries: [],
  filterByType: ''
}
// querySelect the UL in the html
const renderBreweryList = document.querySelector('#breweries-list')
// step 1:
// implement my lists and render them

// set function
// withtin function
// --
function renderedBreweyInfo() {
  // see default template below
  // <li>
  renderBreweryList.innerText = ''

  const li = document.createElement('li')
  renderBreweryList.appendChild(li)

  console.log('hello')

  //   <h2>Snow Belt Brew</h2>
  const h2 = document.createElement('h2')
  h2.innerText = ''
  //   <div class="type">micro</div>
  const div = document.createElement('div')
  div.setAttribute('class', 'type')
  div.innerText = ''
  li.appendChild(div)
  //   <section class="address">
  const section1 = document.createElement('section')
  section1.setAttribute('class', 'address')

  //     <h3>Address:</h3>
  const h3address = document.createElement('h3')
  h3address.innerText = 'Address:'

  //     <p>9511 Kile Rd</p>
  const p1 = document.createElement('p')
  p1.innerText = ''

  //     <p><strong>Chardon, 44024</strong></p>
  const p2 = document.createElement('p')
  p2.innerText = ''
  section1.appendChild(h3address, p1, p2)
  //   </section>
  // <section class="phone">
  const section2 = document.createElement('section')
  section2.setAttribute('class', 'phone')

  //    <h3>Phone:</h3>
  const h3phone = document.createElement('h3')
  h3phone.innerText = 'Phone:'
  //     <p>N/A</p>
  const p3 = document.createElement('p')
  p3.innerText = ''
  section1.appendChild(h3phone, p3)
  //   </section>
  //   <section class="link">
  const section3 = document.createElement('section')
  section3.setAttribute('class', 'link')
  //     <a href="null" target="_blank">Visit Website</a>
  const aWebLink = document.createElement('a')
  aWebLink.setAttribute('href', '')
  aWebLink.setAttribute('target', '_blank')
  aWebLink.innerText = 'Visit Website'
  section3.appendChild(aWebLink)
  //   </section>
  // </li>
  li.appendChild(h2, div, section1, section2, section3)
  renderBreweryList.appendChild(li)
  console.log('hello')
}
renderedBreweyInfo()
// ensure li is linked to the Json files and 'getting' the correct data.
// link the search button to the li above.
// get to the point where a search will render a list in the above format.
//

// begin filter research
// list will be filtered by the state
// Micro
// Regional
// Brewpub
// if brewery not among those then do not show!

// filter data that a user can see and ensure it isthe following Name
// Type of brewery
// Address
// Phone Number
// From the list of breweries, a user can visit the website of a brewery
// From the 'filter by type of brewery' section, a user can filter by type of brewery.

// do not cry
// get it finished and drink a beer
