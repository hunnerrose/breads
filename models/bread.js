//We should write our schema in our models folder. Previously we had hard-coded data here but now that we'll be integrating a real database (Mongo DB) we won't need the hard coded data here anymore. Instead, we'll replace its contents w/ our Mongoose schema.

//Require Mongoose
const mongoose = require('mongoose')
//Create shorthand for the Schema constructor
const { Schema } = mongoose

//Now that we have access to Mongoose in the file we can write our Schema. WE'll want to make sure our schema matches what we hard-coded before so we should determine what fields we wants and what datatype each one is.

//Let's define our schema using the Schema constructor and save it to a variable named breadSchema

const breadSchema = new Schema ({
  //here we write the main part of the schema. What goes into this object are the fields we want the model to have as well as the datatype each field should be.
  name: { type: String, required: true}, //<use required field when necessary
  hasGluten: { type: Boolean }, //or can just use type definition shorthand or 'hasGluten: Boolean'
  image: { type: String, default: 'http://placehold.it/500x500.png' } //<use default when useful/desired in case this field is left out
})

//Awesome; we've finished our Mongoose schema; for our schema to do anything, we'll need to create a model with it to interact with a Mongo DB. Let's create a Bread model under the schema.

const Bread = mongoose.model('Bread', breadSchema)

    //'const Bread': The variable we save our model to. Conventionally, it should be capitalized and use the singular version of the collection the model is for

    //'mongoose.model': A Mongoose method that creates a model for us based on the arguments we pass it. This is what will later allow us to interact w/ our Mongo database

    //'Bread': The 1st argument we passed is the name of the collection we want to connect this model to. As w/ the variable, this should be capitalized and use the singular version of the collection name. In our case we want it to connect to a collection named 'breads' so that becomes 'Bread' when singular and capitalized

    //'breadSchema': The 2nd argument we passed is the schema we want our model to use. 



//Currently, the model is stuck in our models/bread.js file but we want to use it in our breads controller. We need to export it! Be sure to export the model(collection), not the schema (document).

module.exports = Bread  
















/* module.exports = [
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
       image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten-Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ] */
  
