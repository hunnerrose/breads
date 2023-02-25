const express = require('express')
// DEPENDENCIES
const methodOverride = require('method-override')
//REQUIRE MONGOOSE
const mongoose = require('mongoose')



//CONFIGURATION
require('dotenv').config()
MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
// console.log(PORT)
const app = express()

// MIDDLEWARE (Here, we are setting up which view engine will be used and requiring JSX so we can utilize it to build our views.)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
    //What's engine again?
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
// MIDDLEWARE
app.use(methodOverride('_method'))
//Connect to Mongo using Mongoose
    //First argument that connect takes is the Mongo URI; 2nd argument contains optional properties that get rid of deprecation warnings

mongoose.set('strictQuery', true);
mongoose.connect(
    MONGO_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, 
    () => { console.log('connected to mongo: ', MONGO_URI) }
)  


//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})



//Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//404 Page
app.get('*', (req, res) => {
    res.send('404')
})

//LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

