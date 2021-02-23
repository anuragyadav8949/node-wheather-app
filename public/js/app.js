const { response } = require("express");

console.log('App Js data');
//Fetch is the api of code js to get the js and it call then() in which we can call a callback method
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

//When app will be on heroku it will try yo fetch local host URL which will not work hence,
//We appended our /wheather endpoint only it will run main url by default
// fetch('http://localhost:3000/weahter?address=boston').then((response)=>{
    fetch('/weahter?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        console.log(error)

        }else{
            console.log(data.location)
            console.log(data.forcast)
        }
    })
})

const wheatherForm = document.querySelector('form')
const search = document.querySelector('input')
wheatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //Here we use to stop the dafult behaviour of refreshing entire page of on form submit
    location = search.value
    if(!location){
        alert('Please provide a location')
        console.log('Location is needed')
    }
    fetch('http://localhost:3000/weahter?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        console.log(error)

        }else{
            console.log(data.location)
            console.log(data.forcast)
        }
    })
})

})