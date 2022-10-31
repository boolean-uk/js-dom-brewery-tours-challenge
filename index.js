const listOfBreweries = document.querySelector("#breweries-list")
const searchByState = document.querySelector("#select-state-form")
const breweriesURL = "https://api.openbrewerydb.org/breweries"


// creating local state
const siteState = {
    pubs : [ ],
    state: " ",
    typeOfPub: " "
}


// getting data from API
function searchSubmit (){
    searchByState.addEventListener("submit", event => {
        event.preventDefault()
        // converting input to the 
        const stateInput = document.querySelector("#select-state").value.replace(" ", "_").toLowerCase();
        // copying input to state
        siteState.state = stateInput;
        // converting data to varieble to fetch
        const searchedState = breweriesURL + "?by_state=" + siteState.state;
        // fetching data
        fetch(searchedState)
        // sending request to api receiving json file and converting to readable file
        .then((respond) => respond.json())
        // here is converted data
        .then((data) => {siteState.pubs = data;
            // copying data to the state
            console.log("everysingle pub", data)
            // invoking this function will put all data into required DOM
            attachPubsToList()
        })
    })
}
function attachPubsToList(){

    listOfBreweries.innerHTML = " ";
    siteState.pubs.forEach((pub) => {
        console.log("pub must appear", pub)
        // once i got the all info from API on each pub i can filter them
        if (pub.brewery_type === "micro" || pub.brewery_type === "regional" || pub.brewery_type === "brewpub"){

            // invoking this function will put every iterated pub in DOM matching above condition
            createPubInfo(pub)
        } else {
            // it will show pubs not matchin above condition
            console.log("not accessible " + pub.name + " due to filtration!")
        }
    })
}  
// attachPubsToList
// console.log(siteState.pubs)
// this is DOM, info for every pub.
function createPubInfo(pub) {
    const li = document.createElement("li");
    listOfBreweries.append(li);
    
    const pubNameH2 = document.createElement("h2");
    const div = document.createElement("div");
    const addressSection = document.createElement("section");
    const addressH3 = document.createElement("h3");
    const streetP = document.createElement("p");
    const postCodeP = document.createElement("p");
    const phoneSection = document.createElement("section");
    const phoneH3 = document.createElement("h3");
    const phoneNumberP = document.createElement("p");
    const linkSection = document.createElement("section");
    const webLinkA = document.createElement("a");
    
    pubNameH2.innerText = pub.name;
    div.className = "type";
    div.innerText = pub.brewery_type;
    addressSection.className = "address";
    addressH3.innerText = "Address:";
    streetP.innerText = pub.street;
    postCodeP.innerText = `${pub.city}, ${pub.postal_code} ${pub.state}`;
    postCodeP.style.fontWeight = "888";
    phoneSection.className = "phone";
    phoneH3.innerText = "Phone:";
    phoneNumberP.innerText = pub.phone;
    
    linkSection.className = "link";
    webLinkA.href = pub.website_url;
    webLinkA.innerText = "Visit Website";
    
    li.append(pubNameH2, div, addressSection, phoneSection, linkSection);
    addressSection.append(addressH3, streetP, postCodeP);
    phoneSection.append(phoneH3, phoneNumberP);
    linkSection.append(webLinkA);
}
function filter (){
    
}
//  1. make data available globally. by fetching brewery data
//  2. save required data in state, in state we can filter by type.
//  3. create DOM for the list to render by state inside required data of that brewery
//  4. search by state and show only brewery with certain type, by listening evnts
//  5. add event listener by type
//  6. render the state accordingly to user search
function init(){
    searchSubmit ()
    
}
init()