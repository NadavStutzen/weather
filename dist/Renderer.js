class Renderer{
    constructor(){
     this.citySource = $("#city-template").html()
     this.cityTemplate = Handlebars.compile(this.citySource)
     this.currCitySource = $("#currcity-template").html()
     this.currCityTemplate = Handlebars.compile(this.currCitySource) 
    }
    renderData(cities){
        const newcities = this.cityTemplate({cities})
        $(`#container`).empty().append(newcities)
    }
    renderCurrCity(city){
        const newCurrCity = this.currCityTemplate(city)
        $("#currCityContainer").empty().append(newCurrCity)
    }
}

