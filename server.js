const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const methodOverride = require("method-override")
const pokemondb = require("./models/pokemon")

// middleware

app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(express.static('public'));
require('dotenv').config();

app.use(morgan("dev"))
const port = process.env.PORT

// index
app.get("/pokemon",(req,res)=>{
    res.render("index.ejs",{pokemondb})
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('show.ejs', {pokemondb,id});
    });

// New
app.get("/pokemon/new",(req,res)=>{

})

app.listen(port,()=>{
    console.log(`live on port ${port}`)
})