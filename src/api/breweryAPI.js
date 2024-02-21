export const getBreweries = async (state) => {
  const response = fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state}`
  );
  const json = (await response).json();
  return json;
};
