//require dependencies
const express = require('express')
const baker_router = express.Router()
const bakerData = require('../models/baker.js')
const bakerSeed = require('../models/baker_seed.js')


//Seed data; mak eit so when we go to http://localhost:8085/bakers/data/seed, it will seed the database w/ our baker seed data and reidrect back to the /breads index page
baker_router.get('/data/seed', (req, res) => {
    bakerData.insertMany(bakerSeed)
        .then(res.redirect('/breads'))
})

//export
module.exports = baker_router