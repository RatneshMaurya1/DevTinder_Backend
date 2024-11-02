const express = require("express")
const {userAuth} = require("../middlewares/userAuth")
const {validateProfiledit} = require("../utils/validate")

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try {
      const user = req.user
      res.send(user)
    } catch (error) {
      res.status(400).send(`Error while getting the user profile:${error.message}`);
    }
  })


  profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try {
        if (!validateProfiledit(req)) {
            throw new Error("update is not allowed");
          }
          
          const logedInUser = req.user
          if (logedInUser.skills.length > 5) {
            throw new Error("only 5 skills is allowed");
          }
          Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]))
          await logedInUser.save()
          res.send(`${logedInUser.firstName} your profile updated`)
    } catch (error) {
        res.status(400).send(`Error while updating the profile:${error.message}`);
      }
  })

module.exports = profileRouter