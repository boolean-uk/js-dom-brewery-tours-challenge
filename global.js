const state = { 
  breweries: []
}
state.myList = []
let currentPage = 1


//accessing hard-coded html elements:

const breweriesList = document.querySelector('#breweries-list')
const chooseFilter = document.querySelector('#filter-by-type')
const selectStateForm = document.querySelector('#select-state-form')
const inputState = document.querySelector('#select-state')
const main = document.querySelector('main')
const breweriesListContainer = document.querySelector('article')
const filtersSection = document.querySelector('.filters-section')

//not particularly useful as the db api is a lot more permissive than I thought it would be - essentially, this was supposed to ensure that typing in NEW YORK would still gets results for new_york, despite the differences between the two strings. Seems to work fine with or without. 
const spacesToUnderscores =  (word) => {
  if (!word.includes(' ')) {
      return word
  }
      return word.split(' ').join('_')
}

