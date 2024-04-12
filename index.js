const BASE_URL = "https://api.openbrewerydb.org/v1/breweries/"
const LOCALHOST = "http://localhost:3000/breweries"
let store = {
    currentPage: 0,
    breweries: [],
    cities: new Set(),
    visited_breweries: []
}

const localhost_get = async () => {
    let response = await fetch(`${LOCALHOST}/`)
    if (response.status == 200) { 
        store.visited_breweries = await response.json()
    }
}
const localhost_add = async id => {
    let payload = store.breweries.find(brewery => brewery.id === id)
    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    }
    let response = await fetch(`${LOCALHOST}`, options)
    if (response.status == 200) {
        console.log(await response.json())
     }
     await localhost_get()
     render()
}
const localhost_remove = async id => {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }
    const response = await fetch(`${LOCALHOST}/${id}`, options)
    if (response.status == 200) { }
    await localhost_get()
    render()
}

const clearStore = () => {
    store.breweries = []
    store.cities.clear()
}

const getBreweries = async (limit, page, query, state, city, type) => {
    let response = await fetch(`${BASE_URL}` +
        `${query != undefined ? `search?query=${query}` : ``}` +
        `${limit != undefined ? `?per_page=${limit}` : ``}` +
        `${page != undefined ? `&page=${page}` : ``}` +
        `${state != undefined ? `&by_state=${state}` : ``}` +
        `${city != undefined ? `&by_city=${city}` : ``}` +
        `${type != undefined ? `&by_type=${type}` : ``}`)

    if (response.status == 200) {
        store.breweries = []
        store.breweries = (await response.json()).filter(brewery => brewery.brewery_type === 'micro' || brewery.brewery_type === 'regional' || brewery.brewery_type === 'brewpub')
        store.breweries.forEach(brewery => store.cities.add(brewery.city));
        store.currentPage = page
    }
}

let city_filter = []
const handleCheckCity = (event, city) => {
    if (event.checked) {
        city_filter.push(city)
    } else {
        city_filter.splice(city_filter.indexOf(city), 1)
    }
    city_filter.length > 0 ? renderBreweries(store.breweries.filter(brewery => city_filter.includes(brewery.city))) : renderBreweries(store.breweries)
}

const renderBreweries = (breweries) => {
    let brewery_list = document.getElementById("breweries-list")
    brewery_list.innerHTML = ''
    breweries.forEach(brewery => {
        let brewey_list_item = document.createElement("li")
        brewey_list_item.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
            <h3>Address:</h3>
            <p>${brewery.street}</p>
            <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
            <p>
                <button onclick=localhost_add('${brewery.id}')>Add to Visit Wishlist</button>
            </p>
        </section>
        <section class="phone">
            <h3>Phone:</h3>
            <p>${brewery.phone}</p>
        </section>
        <section class="link">
            <a href="${brewery.website_url}" target="_blank">Visit Website</a>
        </section>
        `
        brewery_list.append(brewey_list_item)
    })
}

const renderCityFilter = (cities) => {
    let city_filter_form = document.getElementById("filter-by-city-form")
    city_filter_form.innerHTML = ''
    cities.forEach(city => {
        city_filter_form.innerHTML += `
            <input type="checkbox" name="${city}" value="${city}" class="city_filter" onchange="handleCheckCity(this, '${city}')" />
            <label for="chardon">${city}</label>
        `
    })
}

const renderPagination = currentPage => {
    document.getElementById("page-current").innerText = store.currentPage
    document.getElementById("page-prev").onclick = async event => {
        if (store.currentPage == 1)
            return

        clearStore()
        store.currentPage -= 1
        await getBreweries(10, store.currentPage)
        render()
    }
    document.getElementById("page-next").onclick = async event => {
        clearStore()
        store.currentPage += 1
        await getBreweries(10, store.currentPage)
        render()
    }
}

const renderVisitBreweries = breweries => {
    let visit_brewery_list = document.getElementById("visit-breweries-list")
    visit_brewery_list.innerHTML = ''
    breweries.forEach(brewery => {
        let visit_brewey_list_item = document.createElement("li")
        visit_brewey_list_item.innerHTML = `
        <p>${brewery.name}</p>
        <button onclick=localhost_remove('${brewery.id}')>Remove</button>
        `
        visit_brewery_list.append(visit_brewey_list_item)
    })
}

const render = () => {
    renderBreweries(store.breweries)
    renderCityFilter(store.cities)
    renderPagination(store.currentPage)
    renderVisitBreweries(store.visited_breweries)
}

document.addEventListener("DOMContentLoaded", async function () {

    document.getElementById("select-state-form").onsubmit = async event => {
        event.preventDefault()
        let state = event.target.elements["select-state"].value
        clearStore()
        await getBreweries(10, 1, undefined, state)
        render();
    }

    document.getElementById("search-breweries").onkeyup = async event => {
        event.preventDefault()
        let query = event.target.value
        clearStore()
        await getBreweries(undefined, undefined, query)
        render();
    }

    document.getElementById("filter-by-type-form").onchange = async event => {
        let filter_brewery_type = event.target.value
        renderBreweries(store.breweries.filter(brewery => brewery.brewery_type === filter_brewery_type))
    }

    document.getElementsByClassName("clear-all-btn")[0].onclick = event => {
        let collection = document.getElementsByClassName("city_filter")
        for (let i = 0; i < collection.length; i++) {
            collection[i].checked = false
        }
        render()
    }

    await getBreweries(10, 1)
    await localhost_get()
    render()

})