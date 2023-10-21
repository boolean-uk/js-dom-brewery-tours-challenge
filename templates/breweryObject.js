const breweries = [
  {
    address_2: null,
    address_3: null,
    brewery_type: "large",
    city: "San Diego",
    country: "United States",
    county_province: null,
    created_at: "2018-07-24T00:00:00.000Z",
    id: 8041,
    latitude: "32.714813",
    longitude: "-117.129593",
    name: "10 Barrel Brewing Co",
    obdb_id: "10-barrel-brewing-co-san-diego",
    phone: "6195782311",
    postal_code: "92101-6618",
    state: "California",
    street: "1501 E St",
    updated_at: "2018-08-23T00:00:00.000Z",
    website_url: "http://10barrel.com"
  }
];


const searchInput = document.querySelector('input[type="submit"]');
searchInput.addEventListener("click", function(event){
  event.preventDefault();
  console.log("search has been clicked!")
})
// user inputs a state in the search bar
// event listener on the search bar
// find function to match the search input to the data
// display the data and relavent data in a list
// 

// create a function that renders all the ls elements

function 