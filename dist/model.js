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
    const newCity = await $.get(`./city/${cityName}`) 
    if(newCity == 'error'){
      alert('Your serach returned no results,Try again')
      return
    } 
    if(!(this.cityData.some(c => c.name == newCity.name))){
        this.cityData.unshift(newCity);
        this.cityData[0].saved = false;
    }else{
      alert(`${cityName} already displayed`)
    }
    
  }

  async saveCity(city,index) {
    this.cityData[index].saved = true
    let savePromise = await $.post(`./city`, city);
    console.log(savePromise);
  }

  async removeCity(cityName , index) {
    $.ajax({
      url: `./city/${cityName}`,
      method: "DELETE",
      async: false,
      contentType: "text",
      success: function(data) {
        console.log(`Succesfully removed `);
      },
      error: function(err) {
        console.log(err);
      }
    });
    this.cityData.splice(index,1)
  }
  
}
