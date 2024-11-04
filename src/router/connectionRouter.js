const express = require("express")
const {userAuth} = require("../middlewares/userAuth")
const ConnectionRequest = require("../models/connection")
const User = require("../models/user");


const connectionRouter = express.Router()

connectionRouter.post("/request/:status/:toUserId", userAuth, async (req,res) => {
    try {
        const fromUserId = req.user
        const toUserId = req.params.toUserId
        const status = req.params.status
        const userInDb = await User.findById({_id:toUserId})
        if(!userInDb){
            throw new Error("user not found")
        }
        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status)){
            throw new Error("invalid status field")
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(existingConnectionRequest){
           return res.status(400).json({message: "connection request is already exists"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        await connectionRequest.save()
        res.send("connection request sent successfully")
    } catch (error) {
        res.status(500).send(`invalid connection request:${error.message}`)
    }
})

module.exports = connectionRouter