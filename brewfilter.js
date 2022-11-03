state = {
    breweries:[
        {name: 'badbrewer good beer',
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

let brewName = state.breweries[0].name

function reRenderCaps(name){

name = name.split(' ')

let finalWordArr = []

newBrewNameArray = name.forEach((word)=>{
    const capLet = word[0].toUpperCase()
    const rest = word.substring(1)
    finalWordArr.push (capLet + rest)
})
    return finalWordArr.join(' ')
}

console.log(reRenderCaps(brewName))
