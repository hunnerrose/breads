const express = require('express')
const bread_router = express.Router()
const bread_data = require('../models/bread.js')
const Bread = require('../models/bread.js')
const baker_data = require('../models/baker.js')

//INDEX
bread_router.get('/', (req, res) => {
  baker_data.find()
    .then(foundBakers => {
      Bread.find()
        .then(foundBreads => {
          res.render('index', {
            breads: foundBreads,
            bakers: foundBakers,
            title: 'Index Page'
          })
        })
    })
    // res.render('index', {"breads": bread_data})

  // res.send(Bread)
})

// NEW
bread_router.get('/new', (req, res) => {
  baker_data.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

 // EDIT
 bread_router.get('/:id/edit', (req, res) => {
    baker_data.find()
      .then(foundBakers => {
        bread_data.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
              bread: foundBread,
              bakers: foundBakers
            })
          })
      })
    // res.render('edit', {
    //   bread: bread_data[req.params.indexArray],
    //   index: req.params.indexArray
    // })
})

//SHOW
bread_router.get('/:id', (req, res) => {
      //.findById returns a promise that holds the return data. Use .then on the method and pass it a callback w/ a variable like we did for .find
        //to be semantic, we'll name the variable foundBread. It's singular bc we only expect data for one bread.
    Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        //declare instance method function created in bread.js on returned document in show route; this would be the foundBread variable where the doc gets returned to us
        const bakedBy = foundBread.getBakedBy()
        console.log(bakedBy)
        //render show page
        res.render('show', {
          bread: foundBread
        })
      })
      .catch (err => {
        res.send('404')
      })

    /* if (bread_data[req.params.arrayIndex]) {
        res.render('Show' , {
            bread: bread_data[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
    } else {
        res.send('404')
    } */
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
      //the .create method creates a single document; it's analogous to the .insert method in native Mongo. Similar to the .insert method, it requires you to pass it an object with the info the document should have. We'll use it to create one of our breads.

    bread_data.create(req.body) //req.body is an object that holds all the data we need to create a bread doc. 
    res.redirect('/breads')
  })

  // UPDATE
bread_router.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    //req.body captures everything the user types into a form and capture it; 'new: true' ensures that the document that gets returned is the updated one
    bread_data.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedBread => {
        console.log(updatedBread)
        res.redirect(`/breads/${req.params.id}`)
      })

    // bread_data[req.params.arrayIndex] = req.body
    // res.redirect(`/breads/${req.params.arrayIndex}`)
  })
  
  
  // DELETE
bread_router.delete('/:id', (req, res) => {
    bread_data.findByIdAndDelete(req.params.id)
      .then(deletedBread => {
        res.status(303).redirect('/breads')
      })
    //Splice effectively removes items from an array
      // bread_data.splice(req.params.indexArray, 1)
      // res.status(303).redirect('/breads')
  })
  

module.exports = bread_router

//if (!req.body.image) {
    //req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//}