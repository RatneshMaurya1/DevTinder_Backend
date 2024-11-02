const express = require("express")

const connectionRouter = express.Router()

connectionRouter.post("/sendConnectionRequest", (req,res) => {
    try {
        const user = req.body
        res.send(user)
    } catch (error) {
        console.log("invali connection request" + error)
    }
})

module.exports = connectionRouter