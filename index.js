//TODO
/*
    Get the user Input
        Listen to the form submit
        get the data from the form
        replace spaces by _
        call the fecth function

    Listen to the filter for changes
        call the filter function

    Fetch the brewery list (us state name)
        request the list from the server by us state
        store that list
        call the filter function

    Filter the list
        Filter the list according to the filter selected
            for each item in the fetched list
                check if the item is part of the selected option.
                If no option is selected, check if at least one of the three options is OK
                    if yes, add the item to the filtered list
            render the filtered list
*/
//DONE
/*
    Render the list
        get the ul element 
        for each item in the filtered list
            render the template
                create the elements and their inner elements
                setting attributes for the elements
                setting the values for the elements
                appending the elements

*/
const UlElement = document.querySelector("ul");
const stateSearchForm = document.querySelector("select-state-form");

const State = {
    BreweriesList: [],
    FilteredBreweries: []
}

const RenderBreweryList = () => {
    State.FilteredBreweries.forEach(element => {
        UlElement.innerHTML = "";
        //creating elements
        const LiElement = document.createElement("li");
        const H2Element = document.createElement("h2");
        const DivElement = document.createElement("div");
        const FirstSectionElement = document.createElement("section");
        const FirstSectionH3Element = document.createElement("h3");
        const FirstSectionFirstPElement = document.createElement("p");
        const FirstSectionSecondPElement = document.createElement("p");
        const FirstSectionSecondPStrongElement = document.createElement("strong");
        const SecondSectionElement = document.createElement("section");
        const SecondSectionH3Element = document.createElement("h3");
        const SecondSectionPElement = document.createElement("p");
        const ThirdSectionElement = document.createElement("section");
        const ThirdSectionAElement = document.createElement("a");
        //setting element attributes
        DivElement.setAttribute("class", "type");
        FirstSectionElement.setAttribute("class", "address");
        SecondSectionElement.setAttribute("class", "phone");
        ThirdSectionElement.setAttribute("class", "link");
        ThirdSectionAElement.setAttribute("href", element.website_url);
        ThirdSectionAElement.setAttribute("target", "_blank");
        //filling elements
        H2Element.innerText = element.name;
        DivElement.innerText = element.brewery_type;
        FirstSectionH3Element.innerText = "Address:";
        FirstSectionFirstPElement.innerText = element.street;
        FirstSectionSecondPStrongElement.innerText = element.city +","+ element.postal_code;
        SecondSectionH3Element.innerText = "Phone:";
        SecondSectionPElement.innerText = element.phone;
        ThirdSectionAElement.innerText = "Visit Website";
        //appending elements
        FirstSectionElement.append(FirstSectionH3Element);
        FirstSectionElement.append(FirstSectionFirstPElement);
        FirstSectionSecondPElement.append(FirstSectionSecondPStrongElement);
        FirstSectionElement.append(FirstSectionSecondPElement);
        SecondSectionElement.append(SecondSectionH3Element);
        SecondSectionElement.append(SecondSectionPElement);
        ThirdSectionElement.append(ThirdSectionAElement);
        LiElement.append(H2Element);
        LiElement.append(DivElement);
        LiElement.append(FirstSectionElement);
        LiElement.append(SecondSectionElement);
        LiElement.append(ThirdSectionElement);
        UlElement.append(LiElement);
    });
}

const FecthData = (USState) => {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${USState}`)
    .then((res) => {return res.json()})
    .then((breweries) => {
        State.BreweriesList = breweries;
        FilterBreweries();
    })
}

const FilterBreweries = () => {

}

stateSearchForm.addEventListener('submit', (eventObject)=>{
    eventObject.preventDefault();
    const userInput = document.querySelector('#select-state').value.replace(' ', '_');
    FecthData(userInput);
    FilterBreweries();
    RenderBreweryList();
})