//state for the main source 
const state = {
    breweries : []
};
    
//root url for the fetch
const root = "https://api.openbrewerydb.org/v1/breweries";
//breweries list for the ul
const breweryList = document.querySelector('.breweries-list');
//form to submit the seach value
const selectStateForm = document.querySelector('#select-state-form')
//for the filter 
const filterByType = document.querySelector('#filter-by-type')
const selectState = document.querySelector('#select-state')

//render fucntion to display the created items
function renderBreweryList() {
    state.breweries.forEach((brewery) => {
        // only for the type micro,regional,brewpub
        if (brewery.brewery_type === 'micro' ||
            brewery.brewery_type === 'regional' ||
            brewery.brewery_type === 'brewpub' ){
            
        //for the li 
        const li = document.createElement('li')

            //h2 inside the li
            const breweryName = document.createElement('h2')
            breweryName.innerText = brewery.name

            //div
            const breweryType = document.createElement('div')
            breweryType.setAttribute('class','type')
            breweryType.innerText = brewery.brewery_type

            //for the section 
            const sectionAddress = document.createElement('section')
            sectionAddress.setAttribute('class','address')

                //for the h3 inside the sectionAdress
                const addressH3 = document.createElement('h3')
                addressH3.innerText = 'Address :'
                //for the address p
                const addressStreet = document.createElement('p')
                addressStreet.innerText = brewery.street
                //for the city 
                const addressCity = document.createElement('p')
                    //for the strong 
                    const addressStrong = document.createElement('strong')
                    addressStrong.innerText = `${brewery.city},${brewery.postal_code}`

                    //appending evrything inside 
                addressCity.append(addressStrong)
            sectionAddress.append(addressH3,addressStreet,addressCity)

            //for the  sectionPhone 
            const sectionPhone = document.createElement('section')
            sectionPhone.setAttribute('class','phone')

                //for the h3 insdei the phone 
                const phoneH3 = document.createElement('h3')
                phoneH3.innerText = 'Phone :'
                //for the phone number insdie tthe p 
                const phoneNumber = document.createElement('p')
                if(brewery.phone === null){
                    phoneNumber.innerText = `N/A`
                }else{
                    phoneNumber.innerText = `${brewery.phone}`
                }
                //appeding the section 
            sectionPhone.append(phoneH3,phoneNumber)

            //sectionLink 
            const sectionLink = document.createElement('section')
            sectionLink.classList.add('link')
                //for the a 
                const link = document.createElement('a')
                link.setAttribute('href',`${brewery.website_url}`)
                link.setAttribute('target','_blank')
                link.innerText='Visit Website'
            sectionLink.append(link)    

        li.append(breweryName,breweryType,sectionAddress,sectionPhone,sectionLink)
    breweryList.append(li)
            }

    })
}

function main(){
    fetch(`${root}`)
        .then((response)=> response.json())
        .then((data)=> {
            state.breweries = data;
            renderBreweryList()
        })
}


//to remove the items from the ul
function remove (){
    breweryList.innerHTML = '';
}

function filter(){
    fetch(`${root}?by_state=${selectState.value}&by_type=${filterByType.value}`)
        .then((res)=>res.json())
        .then((data)=>{
            state.breweries = data;
            renderBreweryList();
        })
}

//for submitting the form 
selectStateForm.addEventListener('submit',(event) =>{
    event.preventDefault();
    remove();
    //for the value that is searched
    // const searchValue =  event.target[0].value;
    // console.log(searchValue)
    if(filterByType.value === ''){
        fetch(`${root}?by_state=${selectState.value}`)
            .then((response)=>response.json())
            .then((data)=>{
                state.breweries = data;
                renderBreweryList();
            })
    }else{
        filter();
    }
})

filterByType.addEventListener('click',(event)=> {
    event.preventDefault();
    remove();
    if(filterByType.value === ''){
        renderBreweryList();
    }else{
        filter();
    }
})

//for the extensions
//main 
const mainBody = document.querySelector('main')

//for the extension 1 
function searchName(){
    //create the entire header for extions1
    const header = document.createElement('header')
    header.classList.add('search-bar')

        //create form inside the header
        const form = document.createElement('form')
        form.setAttribute('id','search-breweries-form')
        // form.setAttribute('autocomplete','off')
        form.autocomplete = 'off'

            //label inside the header
            const label = document.createElement('label')
            label.setAttribute('for','search-breweries')

                //h2 insdie the label 
                const h2 = document.createElement('h2')
                h2.innerText = 'Search Breweries:'
                label.append(h2)

            const input = document.createElement('input')
            input.setAttribute('id','search-breweries')   
            input.setAttribute('name','search-breweries') 
            input.setAttribute('type','text') 

            form.append(label,input)
        header.append(form)
    mainBody.append(header)

    //adding addEventListener for the form to search name
    form.addEventListener('input',(event)=>{
        event.preventDefault();
        remove();
        fetch(`${root}?by_name=${input.value}`)
            .then((response)=>response.json())
            .then((data)=>{
                state.breweries = data;
                renderBreweryList();
            })
    })
}
searchName();




//for the amin fucntion 
main();