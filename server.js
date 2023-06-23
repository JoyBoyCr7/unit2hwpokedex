const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const methodOverride = require("method-override")

const pokemon_router = require("./controls/pokemon")

// middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(express.static('public'));
require('dotenv').config();

app.use(morgan("dev"))
app.use("/pokemon",pokemon_router)
const port = process.env.PORT



app.listen(port,()=>{
    console.log(`live on port ${port}`)
})