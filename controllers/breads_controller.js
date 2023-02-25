const express = require('express')
const bread_router = express.Router()
const bread_data = require('../models/bread.js')

  //My index page is not loading; not sure why;
    //Double checked my MongoDB and a breads database was still not created. Not sure why, I followed all of the steps in the modules and even tried troubleshooting/updating a few things; index page still isn't loading nor is the breads database being created :(
//INDEX
bread_router.get('/', (req, res) => {
    bread_data.find().then((foundBread_data) => {
      res.render('index', {
        breads: foundBread_data,
        title: 'Index Page'
      }) ;
      // console.log(foundBread_data)
    })


  // res.send(Bread)
})

// NEW
bread_router.get('/new', (req, res) => {
    res.render('new')
})

 // EDIT
 bread_router.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: bread_data[req.params.indexArray],
      index: req.params.indexArray
    })
})

//SHOW
bread_router.get('/:arrayIndex', (req, res) => {
    if (bread_data[req.params.arrayIndex]) {
        res.render('Show' , {
            bread: bread_data[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
    } else {
        res.send('404')
    }
})

// CREATE
bread_router.post('/', (req, res) => {
    //why does this call for an exclamation mark? v
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    bread_data.create(req.body)
    res.redirect('/breads')
  })

  // UPDATE
bread_router.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    bread_data[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
  })
  
  
  // DELETE
bread_router.delete('/:indexArray', (req, res) => {
    //Splice effectively removes items from an array
    bread_data.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
  })
  

module.exports = bread_router

//if (!req.body.image) {
    //req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//}