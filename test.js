const postal_code = "45040-1303"

const ul = document.querySelector('#breweries-list')
const li = document.createElement('li')
const p = document.createElement('p')
const strong = document.createElement('strong')

strong.innerText = postal_code
p.append(strong)
li.append(p)
ul.append(li)
