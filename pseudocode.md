# DRAFT - EXTENSIONS

(cause it's beer related)

## global.js

1. const state = []
2. all const variables pointing to various relevant html elements
3. E4 add a state.myFutureVisits array to state (as a property of that object)

## render.js

1. E1 A new 'search' section under the *List of Breweries* heading
2. E2 Add a new 'filter by city' section to the filter menu, where the list is populated based on the results of the search.
3. E4 Add a "Add to visit list" button
4. E4 render the list of future brewery tours for the user based on state.myFutureVisits

## events.js

1. E1 From the 'search' section, a user can search for breweries by name
2. E1 As the user types, the brewery list should be updated automatically
3. E2 From the 'filter by city' section, the user can filter by city by selecting a checkbox beside the city name
4. E2 From the 'filter by city' section, a user can clear all filters
5. E4 Upon clicking "Add to visit list", a brewery is added to the json-server, if it is not already there

## index.js

### Extension 3

- Find out how pagination works (eg are there specific html elements, etc)
- Add pagination to the list; if the list of breweries is greater than 10 a user can go to the next page to view more breweries.
- The user can also go back a page.

### Extension 4

- When the button is clicked, a POST request should be made to your json-server to store that brewery in a list of breweries the user wants to visit.
- For breweries that are already in that list, add a "Remove from visit list" button that when clicked should make a DELETE request to json-server to remove the brewery from the list.
- Add a link to the page that displays the list of breweries stored in the to visit list. You can decide where and how you want to display this - either alongside search results, or in a new section and allow the user to switch between the search functionality and the visit list.
- When the page is reloaded, the list of breweries to visit should be loaded from json-server.

For this extension, you will have to consider:

- How are you going to store the list of breweries to visit in json-server? What information will you need to capture?:
- When rendering the list of breweries from search results, how can you tell if the brewery is already in the list of breweries to visit?

For this extension, if you are using the Live Server plugin, you must also remember to exclude the db.json file of json-server from triggering a page reload. You can do this by creating a folder called `.vscode` at the root of your project. In there, you need to add a settings.json file with the below contents
