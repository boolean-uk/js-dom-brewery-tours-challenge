const createCityArr = (breweries) => {
  const cities = [];
  breweries.forEach((brewery) => {
    if (!cities.includes(brewery.city)) cities.push(brewery.city);
  });

  return cities;
};

export default createCityArr;
