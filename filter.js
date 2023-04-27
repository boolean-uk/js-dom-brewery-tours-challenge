// Please see below carlos hints for filtering.
// how will i implement in to my project ?

// const state = {
//   list: [
//     {
//       title: 'first',
//       quantity: 10,
//       isTrue: true
//     },
//     {
//       title: 'second',
//       quantity: 5,
//       isTrue: false
//     },
//     {
//       title: 'third',
//       quantity: 1,
//       isTrue: true
//     },
//     {
//       title: 'fourht',
//       quantity: 12,
//       isTrue: false
//     }
//   ],
//   filterByIsTrue: false,
//   filterByQuantityGreaterThan: 5
// }

// function render() {
//   // first filter: whether isTrue === state.filterByIsTrue
//   let filteredList = state.list.filter((item) => {
//     if (item.isTrue === state.filterByIsTrue) return true // keep it
//     else return false // reject item
//   })
//   // second filter: keep items > state.filterByQuantityGreaterThan
//   filteredList = filteredList.filter((item) => {
//     if (item.quantity > state.filterByQuantityGreaterThan)
//       return true // keep it
//     else return false // reject item
//   })
//   filteredList.forEach((element) => {
//     console.log(element)
//   })
// }

// render()

const practiceFilter = {
  practiceList: [
    {
      name: 'Micro Pub 1',
      type: 'micro'
    },
    {
      name: 'Micro Pub 2',
      type: 'micro'
    },
    {
      name: 'Brew Pub 1',
      type: 'brewpub'
    },
    {
      name: 'Brew Pub 2',
      type: 'brewpub'
    },
    {
      name: 'Regional Pub 1',
      type: 'regional'
    },
    {
      name: 'Regional Pub 2',
      type: 'regional'
    }
  ],
  filterByType: 'regional',
  filterByName: 'Brewpub2'
}

function filter() {
  // first filter: filter by type isTrue === practiceFilter.filterByType
  const filteringType = practiceFilter.practiceList.filter((item1) => {
    if (item1.type === practiceFilter.filterByType) return true
    else return false
  })
  filteringType.forEach((element) => {
    console.log(element)
  })
}

filter()
