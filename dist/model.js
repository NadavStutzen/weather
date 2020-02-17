class Model {
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    const dbCities = await $.get(`./cities`);
    dbCities.forEach(c => {
      c.saved = true;
      this.cityData.unshift(c);
    });
  }

  async getCityData(cityName) {
    this.cityData.unshift(await $.get(`./city/${cityName}`));
    this.cityData[0].saved = false;
  }

  async saveCity(city) {
    let savePromise = await $.post(`./city`, city);
    alert(savePromise);
  }

  async removeCity(cityName) {
    $.ajax({
      url: `./city/${cityName}`,
      method: "DELETE",
      async: false,
      contentType: "text",
      success: function(data) {
        alert(`Succesfully removed `);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
  //Testing purposes method
  printCities() {
    console.log(this.cityData);
  }
}
