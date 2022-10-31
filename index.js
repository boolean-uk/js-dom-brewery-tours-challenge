// targeting
// target .breweries-list


// Local state


// RENDERING

// Breweries function
  // clear html
  // for each brewery create a card (point to card rendering function)
// function end


// Filters function
  // create cities array
  // search through the array for the requested cities/state
  // make sure it only finds micro, regional or brewpub breweries
// function end


// Card rendering function
  // create li
  // create h2 for title
  // create div .type
  // create section for address
  // h3 for address title
  // p for address line 1
  // p for address line 2 /w strong
  // create section for phone number
  // h3 for phone title
  // p for number
  // section for website .link
  // anchor link to brewery site

  // apply inner text based on the state data

  // append everything to where they should be
// function end


// EVENT LISTENERS

// Event listener for when website button is clicked
  // anchor link to button?
// EL end

// Event listener for when state search is submitted
  // create variable from the entered state
  // fetch from the brewery api using the above state (also 50 items per page)
  // extract JSON from the response and convert into a JS object
  // trigger render functions
// EL end

// Event listener for filtering by brwery type
  // update city filter within state
// EL end

// Ext. 1


// Ext. 2