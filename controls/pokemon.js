const express = require("express")
const pokemondb = require("../models/pokemon")
const router = express.Router()

const beginning = []
function firstPekemon (){
    for (let i = 0; i < pokemondb.length; i ++){
        beginning.push(pokemondb[i])
    }
    return beginning
}
firstPekemon()
// index

router.get("/",(req,res)=>{
    res.render("index.ejs",{beginning})
})


// New
router.get("/new",(req,res)=>{
    res.render("new.ejs")
})
// delete
router.delete("/:id",(req,res)=>{
    const id = req.params.id
    beginning.splice(id,1)
    /// testing
    console.log(beginning)
    console.log(id)
    res.redirect("/pokemon")
})

// Update
router.put("/:id",(req,res)=>{
    let id = req.params.id
    let name = req.body.name
    let type = req.body.type
    let hp = req.body.hp
    let attack = req.body.attack
    let defense = req.body.defense
    /// testing
    console.log(type.length)
    console.log("attack",attack)
    console.log(Array.isArray(type))
    //////
    beginning[id].name = name
    beginning[id].type = type.split(",")
    beginning[id].stats.hp = hp
    beginning[id].stats.attack = attack
    beginning[id].stats.defense = defense
    res.redirect("/pokemon")
})

// Create
router.post("/create",(req,res)=>{
    let name = req.body.name
    const img = req.body.img
    let stats = req.body.stats
    console.log(stats)
    console.log(req.body)
    const type = req.body.type
    const hp = stats[0]
    const attack = stats[1]
    const defense = stats[2]
    const all = {name,img,type:type,stats:{hp,attack,defense}}
    console.log(all)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    
    beginning.push(all)
    res.redirect("/pokemon")
    
   
})
// Edit
router.get("/:id/edit",(req,res)=>{
    const id  = req.params.id
    res.render("edit.ejs", {beginning,id})
})

// SHOW
router.get("/:id", (req, res) => {
    const id = req.params.id
    ///testing
    console.log("id",id)
    res.render('show.ejs', {beginning,id});
    });

module.exports = router