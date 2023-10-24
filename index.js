const brewerylistContainer = document.querySelector("#article")
const state = {
    breweries:[]
}
const renderBreweryList =(breweries)=> {
    breweries.forEach((brewery) => {
        const breweries =document.querySelector("ul")
        const brewerylistContainer= document.createElement("li")
        const breweryh2= document.createElement("h2")
        breweryh2.innerText= brewery.name
        const brewerydiv= document.createElement("div")
        brewerydiv.innerText=brewery.brewery_type
        const section1= document.createElement("section")
        const breweryaddress = document.createElement("h3")
        breweryaddress.innerText = brewery.address_1
        const breweryp= document.createElement("p")
        breweryp.innerText= brewery.address_2
        const breweryp2= document.createElement("p")
        const bstrong = document.createElement("strong")
        bstrong.innerText=brewery.city
        const section2 = document.createElement("section")
        const section2h3 = document.createElement("h3")
        section2h3.innerText=brewery.phone
        const section2p = document.createElement("p")
        section2p.innerText =brewery.postal_code
        const section3 = document.createElement("section")
        const section3link = document.createElement("a")
        section3link.innerText = brewery.website

        brewerylistContainer.append(breweryh2)
        brewerylistContainer.append(brewerydiv)
        brewerylistContainer.append(section1)
        brewerylistContainer.append(section2)
        brewerylistContainer.append(section3)
        section1.append(breweryaddress)
        section1.append(breweryp)
        breweryp2.append(bstrong)
        section1.append(breweryp2)
        section2.append(section2h3)
        section2.append(section2p)
        section3.append(section3link)
        breweries.append(brewerylistContainer)

    })

    console.log(state.breweries)
}

const getDataandRender =() => {
    fetch('https://api.openbrewerydb.org/v1/breweries')
  .then((Response)=>Response.json()) //promise asynchronous
  .then((data)=> {
    state.breweries = data;
    renderBreweryList(state.breweries);
   });
   
}
getDataandRender();
