 <!-- requirement 1: show a list of breweries for a US state
 - note: that the breweries only show micor, regional, and brewpub
 ACTIONS
 - add a listener for the search form submission which triggers the GET request
      - the HTML element to listen for submission: <form> #select-state-form
      - don't forget to prevent default form behaviour on submit event
      - read the US state name from <input> #select-state
      - check the US state name length > 0
      - call get breweries function (state name)
  make sure the user typed something! otherwise don't submit a GET request
 - make a GET request to fetch breweries, by US state (the one the user typed)
      - GET https://api.openbrewerydb.org/breweries?by_state=(US_STATE_NAME)&per_page=50
      - if a US state has 2 words, then the " " should be replaced with "_" (there's a replace function, google it)
 - on FETCH response: save the fetched data into local state: state.breweries
 - render list of breweries
 - during render of list, filter out by type to keep micro, regional and brewpub

## Filter by type
- for each, filter out by type (micro, regional, brewpub, or all) using .filter

## Render
- get the ul "breweries-list"
- create li
    - Create title (li h2), retrieve from state.breweries.name
    - Create type (li .type), retrieve from state.breweries.brewery_type
    - Create address (li .address), retrieve from state.breweries.street, .city, and .postal_code (make sure address title is there and correct CSS classes assigned)
    - Create phone number (li .phone), retrieve from state.breweries.phone (like address, ensure that phone title is there and correct CSS)
    - Create link using anchor (.link a)
    - Append all to li
- Append li to ul


  -->