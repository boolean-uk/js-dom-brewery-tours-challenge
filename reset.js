// import { state } from "./app.js";
import {
  searchForm,
  stateForm,
  visit,
  search,
  filterSection,
  state,
} from "./app.js";
import { fetchBrewers } from "./fetchBrewers.js";

export function reset() {
  state.brewers = [];
  fetchBrewers();
  stateForm.reset();
  searchForm.reset();
  state.pubSearch = null;
  visit.style.display = "flex";
  search.style.display = "unset";
  filterSection.style.display = "unset";
}
