const path = require('path')
const express = require('express') //a function
const hbs = require('hbs') //for partials
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

const app = express()  //generates an express application


//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //this sets the views directory to 'template' directory
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {    //app.com
//     //res.send('Hello express!')
//     res.send('<h1>Hello express!</h1>') //sends back string parsed into html by express
// })



// app.get('/help', (req, res) => {  //app.com/help
//     //res.send('Help page')
//     res.send({      //sends back js object parsed into json by express 
//         name: 'Harsh',
//         age:20
//     })
// })

// app.get('/about', (req, res) => { //app.com/about
//     //res.send('About page')
//     res.send([{
//         name: "Harsh"
//     }, {
//         name: "Gagan"
//     }]) //sends back js array object parsed into json by express
// })

// app.get('/weather', (req, res) => { //app.com/weather  
//     //res.send('Weather page')
//     res.send({
//         forecast: "",
//         location: ""
//     })
// })

app.get('/weather', (req, res) => { //app.com/weather  
    //res.send('Weather page')
    if (!req.query.address) {
        return res.send({ error: 'Address required' })  //first sends back then function is stopped to execute
    }

    geocode(req.query.address, (error, { longitude, latitude,location}={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error)
                return res.send({ error })
            res.send({
               forecast: forecastData,
                   location: location,
                   address: req.query.address
             })
            
        })

    })
    // res.send({
    //     forecast: "",
    //     location: "",
    //     address:req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
          error:'You must provide a search term(in query string)'
        })
    }
    
    //console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harsh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name:"Harsh"
  })  
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         msg:"I am here to help you!"
//     })
// })

app.get('/help', (req, res) => {
    res.render('help', {
        msg: "I am here to help you!",
        title: "Help",
        name:"Harsh"
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title:'404',
        errorMsg: "Help article not found",
        name:"Harsh"
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title:"404",
        errorMsg: "Page not found",
        name:"Harsh"
        
    })
})
app.listen(3000, () => {   //starts server on port 3000
    console.log('Server is up on port 3000.')
})

