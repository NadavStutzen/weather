const model = new Model();
const renderer = new Renderer();

const loadPage = async function() {
  await model.getDataFromDB();
  await model.getCurrCity();
  renderer.renderCurrCity(model.currCity);
  renderer.renderData(model.cityData);
};

const handleSearch = async function(cityName) {
  await model.getCityData(cityName);
  renderer.renderData(model.cityData);
};

$("#search").on("click", "svg", function() {
  handleSearch($("input").val());
  $("input").val("");
});

$("#container").on("click", ".delete-btn", async function() {
  const cityInfo = findNameAndIndex($(this));
  await model.removeCity(cityInfo.cityName, cityInfo.cityIndex);
  renderer.renderData(model.cityData);
});

$("#container").on("click", ".save-btn", async function() {
  const cityInfo = findNameAndIndex($(this));
  await model.saveCity(model.cityData[cityInfo.cityIndex], cityInfo.cityIndex);
  renderer.renderData(model.cityData);
});
$("#container").on("click", ".refresh", async function() {
  const cityInfo = findNameAndIndex($(this));
  await model.updateCity(cityInfo.cityName, cityInfo.cityIndex);
  renderer.renderData(model.cityData);
});

const findNameAndIndex = function(obj) {
  const cityName = obj.closest(".city").data().name;
  const cityIndex = model.cityData.findIndex(c => c.name == cityName);
  return { cityName, cityIndex };
};
loadPage();
