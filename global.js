const state = { 
  breweries: []
}



// hard-coded html elements



const breweriesList = document.querySelector('#breweries-list')

const chooseFilter = document.querySelector('#filter-by-type')

const selectStateForm = document.querySelector('#select-state-form')

const inputState = document.querySelector('#select-state')

const main = document.querySelector('main')
const breweriesListContainer = document.querySelector('article')


const filtersSection = document.querySelector('.filters-section')

const spacesToUnderscores =  (word) => {
  if (!word.includes(' ')) {
      return word
  }
      return word.split(' ').join('_')
}

//extension 4
state.myList = []

