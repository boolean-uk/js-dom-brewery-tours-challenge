# Brewery Tours Challenge

![BreweryTours](images/brewery.jpg)

## Setup
1. Fork this repository to your GitHub account
2. Clone your forked repository to your machine

## Description
In this challenge we explore a common scenario in eCommerce and booking sites, using filters and search to modify what we render from the state. You'll apply all the skills you've learned in the JS DOM unit: dynamic DOM creation, event listeners, state and requesting data from a server.

## Acceptance Criteria

Use the `index.html` file as a starting point. The `templates` folder provides HTML snippets that show how the dynamic elements of the page should be created.

### Standard
![Standard](images/standard.png)
- A user can enter a US state and view a list of breweries in that state
	- The list should only shows the types of breweries that offer brewery tours:
		- Micro
		- Regional
		- Brewpub
	- **Do not** show the other types of breweries
- From the list of breweries, a user can view the following details about each brewery:
	- Name
	- Type of brewery
	- Address
	- Phone Number
- From the list of breweries, a user can visit the website of a brewery
- From the 'filter by type of brewery' section, a user can filter by type of brewery.

### Extension 1
- A new 'search' section should be added under the *List of Breweries* heading
![Extension1](images/extension-1.png)
- From the 'search' section, a user can search for breweries by name
- As the user types, the brewery list should be updated automatically

### Extension 2
- Add a new 'filter by city' section to the filter menu
- The cities list should be populated based on the results of the search. Each city should only appear once.

![Extension2](images/extension-2.png)

- From the 'filter by city' section, the user can filter by city by selecting a checkbox beside the city name
- From the 'filter by city' section, a user can clear all filters

### Extension 3
-  Add pagination to the list; if the list of breweries is greater than 10 a user can go to the next page to view more breweries.
- The user can also go back a page.

## Tips
- Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries
- The API supports searching by different criteria. In this case, you want to search by state so the URL format you will use is: `https://api.openbrewerydb.org/breweries?by_state=[state]`, with `[state]` replaced with the state the user searches for.
- Start by sketching out your `state` object - what state exists in the application and how will you model it?
- Write your `fetch` request to load the data based on the users search. Use `console.log` with the response to make sure you understand the returned data structure.
- Remember to filter out breweries that are not of type `micro`, `regional` or `brewpub`.
- Implement the required functionality using the state pattern. User input updates the state, when the state is updated render the page.
