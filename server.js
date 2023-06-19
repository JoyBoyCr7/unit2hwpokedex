const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const methodOverride = require("method-override")
const pokemondb = require("./models/pokemon")

const beginning = []
function firstPekemon (){
    for (let i = 0; i < 9; i ++){
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
app.delete("/pokemon/:id",(req,res)=>{
    const id = req.params.id
    beginning.splice(id,1)
    console.log(beginning)
    console.log(id)
    res.redirect("/pokemon")
})

// Update
app.put("/pokemon/:id",(req,res)=>{
    let id = req.params.id
    let name = req.body.name
    let type = req.body.type
    let hp = req.body.hp
    let attack = req.body.attack
    let defense = req.body.defense
    console.log(type.length)
    console.log("attack",attack)
    console.log(Array.isArray(type))
    beginning[id].name = name
    beginning[id].type = type.split(",")
    beginning[id].stats.hp = hp
    beginning[id].stats.attack = attack
    beginning[id].stats.defense = defense
    res.redirect("/pokemon")
})

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
app.get("/pokemon/:id/edit",(req,res)=>{
    const id  = req.params.id
    res.render("edit.ejs", {beginning,id})
})

// SHOW
app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    console.log("iddd",id)
    res.render('show.ejs', {beginning,id});
    });


app.listen(port,()=>{
    console.log(`live on port ${port}`)
})