const idBreweriesList = document.querySelector("#breweries-list");
const IdSelectState = document.querySelector("#select-state-form")
const data = "https://api.openbrewerydb.org/breweries?by_state=[state]";

const breweriesURL = "https://api.openbrewerydb.org/breweries";
console.log('url ', breweriesURL)
fetch(breweriesURL)
    .then(res => res.json())
    .then(data => { 
        console.log('my data', data)
        addPubsToList(data)
    })



function addPubsToList(pubs) {  
    idBreweriesList.innerHTML = '' 
    pubs.forEach((pub) => addPub(pub));
}
  
function addPub (pub) {
    const li = document.createElement('li')
    idBreweriesList.append(li)

    const pubNameH2 = document.createElement('h2')
    const div = document.createElement('div')
    const addressSection = document.createElement('section')
    const addressH3 = document.createElement('h3')
    const streetP = document.createElement('p')
    const postCodeP = document.createElement('p')
    const phoneSection = document.createElement('section')
    const phoneH3 = document.createElement('h3')
    const phoneNumberP = document.createElement('p')
    const linkSection = document.createElement('section')
    const webLinkA = document.createElement('a')
    
    
    pubNameH2.innerText = pub.name
    div.className = "type"
    div.innerText = pub.brewery_type
    addressSection.className = "address"
    addressH3.innerText = "Address:"
    streetP.innerText = pub.street
    postCodeP.innerText = `${pub.city}, ${pub.postal_code}`
    postCodeP.style.fontWeight = "888"
    phoneSection.className = "phone"
    phoneH3.innerText = "Phone:"
    phoneNumberP.innerText = pub.phone
    // console.log('help needed', phoneNumberP)
    linkSection.className = "link"
    webLinkA.href = pub.website_url
    webLinkA.innerText = "Visit Website";
    
    li.append(pubNameH2, 
        div,
        addressSection,
        phoneSection,
        linkSection)
    addressSection.append(addressH3,
        streetP,
        postCodeP)
    phoneSection.append(phoneH3,
        phoneNumberP)
    linkSection.append(webLinkA)
    
}
  
// IdSelectState.addEventListener('submit', (event => {
//     preventDefault();
// }))



// function render() {
//     state.breweries.forEach(brewery => {
//         //update Dom with each brewery
//     })
// }
// function brewery(breweries){
//     state.breweries = breweries
//     render()
//     console.log('herererere')
// }
// function getData(state) {}
// // searchByState(state)

function addInputListener() {
    // const myForm = document.querySelector("#select-state-form");
  
    IdSelectState.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // get state from input and lowercase it all
      const myState = document
        .querySelector("#select-state")
        .value.replace(" ", "_")
        .toLowerCase();
      
      const selectedState = breweriesURL+'?by_state='+myState
      fetch(selectedState)
    //   console.log('full data from here', selectedState)
      .then(res => res.json())
      .then(data => { 
        console.log('data  from bottom',data)
          addPubsToList(data)
          
      })
  
    });
}

addInputListener()

// function filtering () {
    
    //     const micro = document.getElementById('filter-by-type').value='micro'
    //     const regional = document.getElementById('filter-by-type').value='regional'
    //     const brewpub = document.getElementById('filter-by-type').value='brewpub'
    //     console.log(micro, 'soosososoos')
    // }

function filtering () {
   
    const filter = document.querySelector('#filter-by-type')
  
    filter.addEventListener("change", (e) => {
      e.preventDefault();
      
      console.log('filter changed', filter.value);
  
      const newData =
        "https://api.openbrewerydb.org/breweries?by_type=" +
        filter.value;
        // console.log('URL To fetch for filter:', newData)
      fetch(newData)
        .then(res => res.json())
        .then(pubs => {
          idBreweriesList.innerHTML = "";
          console.log(pubs, 'jsjsjjsjjsjjs');
          return addPubsToList(pubs);
        });
    });
}

filtering ()
