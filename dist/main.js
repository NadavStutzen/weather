const model = new Model()
const renderer = new Renderer()

const loadPage = async function (){
    await model.getDataFromDB()
    renderer.renderData(model.cityData)
}

const handleSearch = async function (cityName){
    await model.getCityData(cityName)
    renderer.renderData(model.cityData)
}

$('#search').on('click','svg',function(){
    handleSearch($('input').val())
    $('input').val("")
})

$('#container').on('click','.delete-btn',async function (){
    const cityName = $(this).closest('.city').data().name
    const indexToChange = model.cityData.findIndex(c => c.name == cityName)
    await model.removeCity(cityName , indexToChange)
    renderer.renderData(model.cityData)
})

$('#container').on('click','.save-btn',async function(){
    const cityName = $(this).closest('.city').data().name
    const indexToSave = model.cityData.findIndex(c => c.name == cityName)
    await model.saveCity(model.cityData[indexToSave],indexToSave)
    renderer.renderData(model.cityData)
})
loadPage()