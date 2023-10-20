// enter state and view breweries

const state = {
  tours: []
}


const root = 'https://api.openbrewerydb.org/v1/breweries'
const brewList = document.querySelector ('#breweries-list')
const stateSelectForm = document.querySelector('#select-state-form')
const filterByForm = document.querySelector('#filter-by-type-form')

const renderTours = () => {

}




const renderStateSelectAndRender = () =>{
fetch('${root}/state')
.then((response) => response.json())
    .then((data) => {
      console.log("read state", data);
      state.tours = data;
      renderTours();
    })
    .catch(error => console.error('Error fetching Todos:', error));
};

// const listItem = document.createElement('li')


// list should only show breweries that do tours

//need to be able to view certain types of info

// name, type, address, phone number

