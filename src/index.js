import breweryLi from "./components/breweryLi.js";
import breweries from "../templates/breweryObject.js";

const breweriesList = document.getElementById('breweries-list')
const brewery = breweries[0]

breweriesList.append(breweryLi(brewery))
