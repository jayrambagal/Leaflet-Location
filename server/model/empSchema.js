const mongoose = require("mongoose")

const EmpSchema = new mongoose.Schema({
   name:String,
   department:String,
   address:String,
   latitude:Number,
   longitude:Number     
})

module.exports = mongoose.model("Employee",EmpSchema)