// Please see below carlos hints for filtering.
// how will i implement in to my project ?

const state = {
  list: [
    {
      title: 'first',
      quantity: 10,
      isTrue: true
    },
    {
      title: 'second',
      quantity: 5,
      isTrue: false
    },
    {
      title: 'third',
      quantity: 1,
      isTrue: true
    },
    {
      title: 'fourht',
      quantity: 12,
      isTrue: false
    }
  ],
  filterByIsTrue: false,
  filterByQuantityGreaterThan: 5
}

function render() {
  // first filter: whether isTrue === state.filterByIsTrue
  let filteredList = state.list.filter((item) => {
    if (item.isTrue === state.filterByIsTrue) return true // keep it
    else return false // reject item
  })
  // second filter: keep items > state.filterByQuantityGreaterThan
  filteredList = filteredList.filter((item) => {
    if (item.quantity > state.filterByQuantityGreaterThan)
      return true // keep it
    else return false // reject item
  })
  filteredList.forEach((element) => {
    console.log(element)
  })
}

render()
