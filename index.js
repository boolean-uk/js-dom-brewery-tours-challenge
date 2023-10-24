const root = 'https://api.openbrewerydb.org/v1//breweries?by_state='
const FilterByTypeRoot = 'https://api.openbrewerydb.org/v1/breweries?by_type='

const form = document.querySelector('#select-state-form')
const listUl = document.querySelector('#breweries-list')

const state = {
   ListOfBreweries: []
}
// for delete
const DeleteLiAll = () => {
   const deleteall = ContainerForList.querySelectorAll('*')
   deleteall.forEach((child) => child.remove())
}

//main funtion to create li elements to show in the list 
function renderBreweries() {
   state.ListOfBreweries.forEach((brewery) => {
      //li
      const li = document.createElement('li')
      const h2 = document.createElement('h2')
      h2.innerText = brewery.name

      const div = document.createElement('div')
      div.setAttribute('class', 'type')
      div.innerText = brewery.brewery_type

      const sectionAddress = document.createElement('section')
      sectionAddress.classList.add('address')

      const addressH3 = document.createElement('h3')
      addressH3.innerText = 'Address :'

      const p1 = document.createElement('p')
      p1.innerText = brewery.address_1

      const p2 = document.createElement('p')
      const strong = document.createElement('strong')
      //strong.innerText = `${brewery.city},${brewery.postal_code}`
      strong.innerText = brewery.state_province
      strong.innerText += '' + brewery.postal_code
      p2.append(strong)
      sectionAddress.append(addressH3, p1, p2)

      const sectionPhone = document.createElement('section')
      PhoneSection.setAttribute('class', 'phone')
      const h3 = document.createElement('h3')
      h3.innerText = 'Phone :'

      const PhoneNumber = document.createElement('p')
      PhoneNumber.innerText = brewery.phone
      sectionPhone.append(h3, p)

      const sectionLink = document.createElement('section')
      LinkSection.setAttribute('class', 'link')
      const link = document.createElement('a')
      link.href = brewery.website_url
      link.target = '_blank'
      link.innerText = 'Visit Website'
      sectionLink.append(link)
      li.append(h2, div, sectionAddress, sectionPhone, sectionLink)
      ul.append(li)
   })
}

const FetchAndCreateData = (UserState) => {
   fetch(`${root}${UserState}`)
      .then((response) => response.json())
      .then((data) => {
         state.ListOfBreweries = data
         console.log(state.ListOfBreweries)
         DeleteLiAll()
         renderBreweries()
      })
}

form.addEventListener('submit', (event) => {
   event.preventDefault()
   console.log('i am clicked ')
   const UserState = event.target[0].value
   console.log(UserState)
   FetchAndCreateData(UserState)


})

const FilterByType = (SelectedOption) => {
   fetch(`${FilterByTypeRoot}${SelectedOption}`)
      .then((response) => response.json())
      .then((data) => {
         state.ListOfBreweries = data
         // console.log(state.ListOfBreweries)
         renderBreweries()
      })

}

const Filter = document.querySelector('#filter-by-type')
console.log(Filter)


Filter.addEventListener('change', (event) => {
   event.preventDefault()

   const SelectedOption = event.target.value

   if (SelectedOption === 'micro') {
      console.log('i am  a', SelectedOption)
      DeleteLiAll()
      FilterByType(SelectedOption)


   } else if (SelectedOption === 'regional') {
      console.log('i am the ', SelectedOption)
      DeleteLiAll()
      FilterByType(SelectedOption)


   } else if (SelectedOption === 'brewpub') {
      console.log('i am ', SelectedOption)
      DeleteLiAll()
      FilterByType(SelectedOption)
   }

})