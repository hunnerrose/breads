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

//Index:
baker_router.get('/', (req, res) => {
    bakerData.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

//Show:
baker_router.get('/:id', (req, res) => {
    bakerData.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

// Delete
baker_router.delete('/:id', (req, res) => {
    bakerData.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})


//export
module.exports = baker_router