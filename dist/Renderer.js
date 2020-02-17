class Renderer{
    constructor(){
     this.source = $("#city-template").html()
     this.template = Handlebars.compile(this.source)
    }
    renderData(cities){
        const newcities = this.template({cities})
        $(`#container`).empty().append(newcities)
    }
}

