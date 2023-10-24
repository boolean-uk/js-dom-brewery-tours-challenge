const STATE = {
  breweries: {
    micro: [],
    regional: [],
    brewpub: [],
  },
  page: {
    currentPage: 1,
    pageLimit: 10,
  },
  savedBreweries: []
};

const SELECT_STATE_FORM = document.querySelector("#select-state-form");
const SELECT_STATE_INPUT = SELECT_STATE_FORM.querySelector(
  ":scope > #select-state"
);

const BREWERY_LIST = document.querySelector("#breweries-list");
const PAGINATION = document.querySelector(".pagination");
const PAGINATION_NUMBERS = PAGINATION.querySelector(":scope .page-numbers");

const NAME_FILTER = document.querySelector("#search-breweries-form > input");
const BREWERY_TYPE_FILTER = document.querySelector("#filter-by-type");
const CITY_FILTER_FORM = document.querySelector("#filter-by-city-form");

const LIVE_SERVER_ROOT = "http://127.0.0.1:3000"