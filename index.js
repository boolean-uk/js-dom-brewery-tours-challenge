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


// fetching data from the api
fetch("https://api.openbrewerydb.org/v1/breweries?by_state")

.then(function(response){
    return response.json();
})

.then(function(breweries){
    
   
    breweries.forEach((brewery) => {

        const breweryList = document.querySelector(".breweries-list")
        console.log(breweryList)
    
        // for each to create the elements needed
        const li = document.createElement("li")
        breweryList.append(li)
    
        const name = document.createElement("h2")
        name.innerText = brewery.name;
        li.append(name)

        const div = document.createElement("div")
        li.append(div)
        div.innerText = brewery.brewery_type
        div.className = "type"
    
        const address = document.createElement("section")
        address.className = "address"
        li.append(address) 
    
        const h3 = document.createElement("h3")
        h3.innerText = "Address"
        address.append(h3)
        
        const p1 = document.createElement("p")
        p1.innerText = brewery.address_1
        address.append(p1)
        
        const p2 = document.createElement("p")
        p2.innerText = brewery.postal_code
        address.append(p2)
    
        const strong = document.createElement("strong")
        p2.append(strong)
    
        const section2 = document.createElement("strong")
        li.append(address) 
    
        const phone = document.createElement("section")
        li.append(phone)
        phone.className = "phone"
        
        const header2 = document.createElement("h3")
        header2.innerText = "Phone"
        phone.append(header2)
    
        const p3 = document.createElement("p")
        p3.innerText = brewery.phone
        phone.append(p3)
    
        const link = document.createElement("section")
        link.className = "link"
        li.append(link)
    
        const websiteLink = document.createElement("a")
        websiteLink.innerText = "Vist Website"
        websiteLink.setAttribute("href", brewery.website_url);
        websiteLink.setAttribute("target", "_blank");
        link.append(websiteLink)
    })

})







  // user inputs a state in the search bar
  // event listener on the search bar
  // find function to match the search input to the data
  // display the data and relavent data in a list
  // 
  
  // create a function that renders all the ls elements
  
  