// *** Planning

/*

1 - use insomnia to ensure I can access the data from the API
    - get familiar with the data structure returned, and which parts I might need

2 - create a local state array in my JS that I can store brewery information in
    - think about paths to getting to the parts of the data I want for rendering later
    - think about how I can filter by brewery types for rendering specified types

3 - be able to take the user input from the search bar
    - prevent default submit behaviour to avoid page reloading
        -set up an event listener for when the form is submitted 
    - use the user input to construct the FETCH GET for data that matches this
    - check the links using insomnia and console.log() what is returned to check it

4 - saving the fetched data to my local state
    - ensure the state is cleared for each search
    - push the retrieved data into my local state array

5 - render the state on the page
    - use the templates for the format of the HTML components to create dynamically
    - create a function that will make a list item forEach of the matching data in the local state

*/

