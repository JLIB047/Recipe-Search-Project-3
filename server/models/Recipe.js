const { Schema } = require('mongoose');



const recipeSchema = new Schema({
   idMeal:{
    type: String,
    required :true
   },
  
   strMeal:{
    type: String,
    required:true
   },

  //  strYoutube:{
  //   type: String
  //  },
  //  strCategory:{
  //    type:String
  //  },
   strInstructions:{
     type:String,
     required:true
   }

});




module.exports= recipeSchema;