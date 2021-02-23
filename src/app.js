//Import the exporess module to start with Exporess framework
const express = require('express')
const path = require('path')//Core package to work with file paths
const hbs= require('hbs') //HBS is loaded to use partials
const geocode = require('./utils/geocode')
const forcast  = require('./utils/forcast')

//It contains the path of the current script
// console.log(__dirname)
//This contains the path with the file name of current script
// console.log(__filename)

// console.log(path.join(__dirname,'../public'))

//This line start the express framework and store everything into app var
const app = express()

//Here we are getting the port number on which heroku will run our app, if tht not found
//will run our app on 3000 by default
const port = process.env.PORT || 3000 


publicDirectoryPath = path.join(__dirname,'../public');
//Use to customize the server, static() is use to server the static content
//app.use(express.static(publicDirectoryPath))
9
//To Tell express what seeting we are gng to use
/**Express Js Always looks for views folder to find the view but if u changes the path of views to something else
 * you have to set it usinng the app.set('views') keyword and defnining the custom path Refer express.js for more details */ 
viewPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')
 
app.set('views', viewPath);
app.set('view engine','hbs') //view engine or view is the predefined keys to locate the path of templates folder
hbs.registerPartials(partialsPath)

//The main rout to serve the data which takes two param: req-request,res-Response
app.get('',(req,res)=>{
    //res.send (returns the response output to the client)
    //res.send('Hello Express')
    //render() is use to load a view file in second argument we pass data
    res.render('index',{
        title:'Wheather',
        name:'Anurag Yadav'
    })
})
//* To serve HTML page from path <localhost:3000/help.html> */
//Route with help param
app.get('/help',(req,res)=>{
    // res.send('Help page')
    // res.send('<h1>Help page</h1>')
    res.render('help',{
        title:'Help',
        message:'This is the message which is going to help you'
    })
})

app.get('/about',(req,res)=>{
    // res.send('About Page')
    res.render('about',{
        title:'About me'
    })
})

app.get('/wheather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address is required"
        })
    }
    let address = req.query.address;
    geocode(address, (error, data) => {
        if(error){
            return res.send({
                error:error
            })
        }
        console.log('Error', error)
        console.log('Data', data)
        forcast(data.latitude,data.longitude,(error,forCastData={})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            return res.send({
                    forcast:forCastData,
                    location:data.location,
                    address:address
                })
        });
    })

    // res.send({
    //     forcast:'It is snowing',
    //     location:'Phildelphia',
    //     address:req.query.address
    // })
    //When we send data into object express strigify to JSON automatically as op
    // res.send({
    //     temprature:2,
    //     wind:'20km',
    //     humidity:'67%'
    // })
})

app.get('/products',(req,res)=>{
    //res.query => query will print all the query stirng from url
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'Search Query Param should be in URL'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',({
        title:'404',
        name:'Anurag',
        errorMessage:'Help Article not found'
    }))
    // res.send('Help article not found')
})
/** If none of the route mathches express redirect to the (*) 
 * and show the mentioned page */
app.get('*',(req,res)=>{
    res.render('404',({
        title:'404',
        name:'Anurag',
        errorMessage:'Page not found'
    }))
})

//This listen method start up the server on the port
app.listen(port,()=>{
    console.log('Server is up on port:'+port)
})