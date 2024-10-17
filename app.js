const express = require("express");

const app = express()
const PORT = 4000
app.use(express.json())

const items = [
    {id:1, name:"this is 1 item", about:"1 id"},
    {id:2, name:"this is 2 item", about:"2 id"},
    {id:3, name:"this is 3 item", about:"3 id"},
]

app.get("/item", (req,res) => {
    res.json(items)
})
app.get("/item/:id", (req,res) => {
    const itemid  = parseInt(req.params.id)
    const getItem = items.find((i) => i.id === itemid)
    if (items) {
        res.json(getItem)
    }else{
        res.status(404).json({message:"item not found"})
    }
})

app.post("/item", (req,res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        about:req.body.about
    }
    items.push(newItem)
    res.status(201).json(newItem)
})
app.put("/item/:id", (req,res) => {
    const itemId = parseInt(req.params.id)
    const item = items.find((i) => i.id === itemId)
    if (item) {
        item.name = req.body.name || item.name;
        item.about = req.body.about || item.about;
        res.json(item)
    }
})

app.post("/submit", (req,res) => {
    const { firstname, lastname} = req.body;
    res.send(`this is your ${firstname} and ${lastname}`)
})

app.delete("/item/:id", (req,res) => {
    const itemId = parseInt(req.params.id)
    const itemIndex = items.findIndex((i) => i.id === itemId)
    if(itemIndex !== -1){
        const deleteItem = items.splice(itemIndex,1)
        res.json(deleteItem)
    }
})
app.listen(PORT,() => {
    console.log(`server is running at ${PORT}`)
})