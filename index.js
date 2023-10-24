fetch ('https://api.openbrewerydb.org/v1/breweries')
.then((Response)=>Response.json())
.then((data)=>console.log(data))
