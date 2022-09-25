const express = require("express");
const mongoose = require("mongoose")
const route = require("./routes/route")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

require('dotenv').config();


app.use(bodyParser.json())
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const url = "mongodb+srv://Rak18000:Rakesh123@cluster0.xntrj.mongodb.net/shopping-site"

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("Mongodb is connected "))
    .catch((err) => console.log(err))

app.use("/", route)

app.listen(process.env.PORT || 8000, function () {
    console.log("Express is running on port " + (process.env.PORT || 8000))
})
