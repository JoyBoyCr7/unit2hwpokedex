const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const methodOverride = require("method-override")
const pokemondb = require("./models/pokemon")

const beginning = []
function firstPekemon (){
    for (let i = 0; i < 3; i ++){
        beginning.push(pokemondb[i])
    }
    return beginning
}
// middleware

//// testing
console.log(firstPekemon())
//// testing
console.log(beginning[0].img)

app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(express.static('public'));
require('dotenv').config();

app.use(morgan("dev"))
const port = process.env.PORT

// index

app.get("/pokemon",(req,res)=>{
    res.render("index.ejs",{beginning})
})

// New
app.get("/pokemon/new",(req,res)=>{
    res.render("new.ejs")
})
// delete

// Update

// Create
app.post("/pokemon/create",(req,res)=>{
    let name = req.body.name
    for (let i = 0; i < pokemondb.length; i++){
        if (name === pokemondb[i].name){
            beginning.push(pokemondb[i])
            res.redirect("/pokemon")
        }  
    }
})
// Edit


// SHOW
app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('show.ejs', {beginning,id});
    });


app.listen(port,()=>{
    console.log(`live on port ${port}`)
})