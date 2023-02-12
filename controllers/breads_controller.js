const express = require('express')
const bread_router = express.Router()
const bread_data = require('../models/bread.js')

//INDEX
bread_router.get('/', (req, res) => {
    res.render('index', {"breads": bread_data})
  // res.send(Bread)
})

//SHOW
bread_router.get('/:arrayIndex', (req, res) => {
    if (bread_data[req.params.arrayIndex]) {
        res.render('Show' , {
            bread: bread_data[req.params.arrayIndex]
        })
    } else {
        res.send('404')
    }
})

module.exports = bread_router