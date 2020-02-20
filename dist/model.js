class Model {
  constructor() {
    this.cityData = [];
    this.currCity = {};
  }

  async getCurrCity() {
    if (navigator.geolocation) {
      const location = await this.getLocation();
      this.currCity = await $.get(
        `./city?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );
      return;
    } else {
      return "Geolocation is not supported by this browser.";
    }
  }
  async getDataFromDB() {
    const dbCities = await $.get(`./cities`);
    dbCities.forEach(c => {
      c.saved = true;
      this.cityData.unshift(c);
    });
  }

  async getCityData(cityName) {
    const newCity = await $.get(`./city?cityName=${cityName}`);
    if (newCity == "error") {
      alert("Your serach returned no results,Try again");
      return;
    }
    if (!this.cityData.some(c => c.name == newCity.name)) {
      this.cityData.unshift(newCity);
      this.cityData[0].saved = false;
    } else {
      alert(`${cityName} already displayed`);
    }
  }

  async saveCity(city, index) {
    this.cityData[index].saved = true;
    let savePromise = await $.post(`./city`, city);
    console.log(savePromise);
  }

  async removeCity(cityName, index) {
    await $.ajax({
      url: `./city/${cityName}`,
      method: "DELETE",
      success: data => {
        console.log(`Succesfully removed `);
        this.cityData.splice(index, 1);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
  async updateCity(cityName, index) {
    const newCity = await $.get(`./city/?cityName=${cityName}`);
    this.cityData[index].saved
      ? (newCity.saved = true)
      : (newCity.saved = false);
    if (newCity.saved) {
      await $.ajax({
        url: `./city`,
        method: "PUT",
        data: newCity,
        success: res => {
          console.log(res);
          this.cityData.splice(index, 1, newCity);
        }
      });
    } else {
      this.cityData.splice(index, 1, newCity);
    }
  }

  async getLocation() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
