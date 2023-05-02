const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require("./routes/index"))


mongoose.connect("mongodb+srv://jayrambagal:jayram1234@cluster0.adxgsmg.mongodb.net/test")
.then(()=> console.log("connect to database"))
.catch(error => console.log(error))

app.listen(5000,async(req,res)=>{
    console.log("server starts on port 5000");
})


