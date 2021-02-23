const request = require('request')

const forcast = function(latitude,longitude,callback){
    //Location Name basis query
    //const url='http://api.weatherstack.com/current?access_key=2b8f7f922a8dc6fcd5d3bcad0d9d28a9&query=Boston'
    //Lat Long base query
    const url='http://api.weatherstack.com/current?access_key=2b8f7f922a8dc6fcd5d3bcad0d9d28a9&query='+latitude+','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Not able to connect with wahther app service',undefined)
        }else if(response.body.error){
            callback('Something wrong with service: '+ response.body.error.info,undefined)
        }else{
            const data = response.body.current;
            callback(undefined,'It is currently '+ response.body.current.temperature+" degerees out. It feels like "+ response.body.current.precip +' dgrees out')
        }
    })
}
module.exports = forcast
