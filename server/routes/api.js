const express = require("express");
const router = express.Router();
const request = require("request");
const City = require(`../models/City`);

const apiKey = `e1c1e3622a802b737a0b62a19ddced05`;
const getWeatherUrl = function(cityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
};
router.get("/city/:cityName", function(req, res) {
  const { cityName } = req.params;
  request(getWeatherUrl(cityName), function(error, response) {
    if (response.statusCode == 200) {
      const data = JSON.parse(response.body);
      const releventData = {
        name: data.name,
        tempature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        conditionPic: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      };
      res.send(releventData);
    } else {
      res.send("error");
    }
  });
});

router.get(`/cities`, async (req, res) => {
  let cities = await City.find({});
  res.send(cities);
});

router.post(`/city`, async (req, res) => {
  const newCity = new City(req.body);
  if ((await City.find({ name: newCity.name })).length > 0) {
    res.send("City already saved to DB");
  } else {
    await newCity.save();
    res.send("Saved succesfully");
  }
});

router.delete(`/city/:cityName`, async (req, res) => {
  const { cityName } = req.params;
  await City.findOneAndDelete({ name: cityName });
  res.send(`Deleted ${cityName} from the DB`);
});

router.put(`/city`, async (req, res) => {
  const city = req.body;
  await City.findOneAndUpdate({ name: city.name }, city);
  res.send("updated");
});

module.exports = router;
