state = {
    breweries:[
        {name: 'badbrewer',
         type: 'micro'
    },
        {name: 'otherbeer',
         type: 'notThis'}
    ],
    filterByBrewType: ['micro', 'brewpub', 'regional']
}

let typeFilteredList = state.breweries.filter((brew)=> {
    if (state.filterByBrewType.includes(brew.type)){
        return brew
    }
})

arr = ['badbrewer']


const myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
const removed = myFish.splice(3, 1);

console.log(myFish)