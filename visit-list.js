function findBreweryInState(id) {
  return makeRenderList().filter((brewery) => brewery.id === id);
}

function saveBrewery(brewery) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brewery),
  };

  fetch(`${LIVE_SERVER_ROOT}/brewery`, options);
}

function loadSavedBreweries(id) {
  id = id ? id : "";
  const idString = id ? `id=${id}` : ""

  return fetch(`${LIVE_SERVER_ROOT}/brewery?${idString}`)
    .then((res) => res.json())
    .then((res) => {
      STATE.savedBreweries.push(...res);
    });
}

function postTest() {
  const brewery = STATE.breweries.micro[1];

  console.log("brewery", brewery);

  saveBrewery(brewery);
}

// half code ideas for extension 4:

function checkIfSaved(e) {
  const elementId = e.target.id
  // if loadSavedBreweries(elementId) returns result:
    // toggleDeleteButton()
    // toggleAddButton
}

function renderSaved() {
  //should be able to patchwork existing render functions
}
