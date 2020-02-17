const express = require("express");
const router = express.Router();
const request = require("request");
const City = require(`../models/City`)
//api.openweathermap.org/data/2.5/weather?q={city name}&appid=e1c1e3622a802b737a0b62a19ddced05

const apiKey = `e1c1e3622a802b737a0b62a19ddced05`;

router.get("/weather/:cityName", function(req, res) {
  const { cityName } = req.params;
  console.log(cityName);
  
  // city.substring(0,1).toUpperCase()
  // city.substring(1).toLowerCase()
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
    function(err, result) {
      if (err) {
        res.send("Your requested city is invalid");
      } else {
        const data = JSON.parse(result.body);
       // console.log(data);

        const releventData = {
          name: cityName,
          tempature: data.main.temp,
          condition: data.weather[0].description,
          descriptionPic: ""
        };
        console.log(releventData);

        res.send(releventData);
      }
    }
  );
});

router.get(`/weather/cities`, async (req, res) =>{
    let cities = await City.find({})
    console.log(cities);
    res.send(cities)
    
});

router.post(`/weather/city`, async(req, res)=> {
    const newCity = new City(req.body)
     if(await City.find({name : newCity.name})){
        res.send('City already saved to DB')
    }
    await newCity.save()
    res.send('Saved succesfully')
});

router.delete(`/weather/city/:cityName`, async(req, res) => {
    const {cityName} = req.params
    await City.findOneAndDelete({name : cityName})
    res.send(`Deleted ${cityName} from the DB`)
});

module.exports = router;
