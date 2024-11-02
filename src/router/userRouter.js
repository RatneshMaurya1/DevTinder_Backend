const express = require("express")
const User = require("../models/user");

const userRouter = express.Router()

userRouter.get("/user", async (req, res) => {
    const email = req.body.email;
    let user = await User.find({ email: email });
    try {
      if (user.length === 0) {
        res.status(404).send("user not found");
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(400).send("Error while saving the user", error);
    }
  });
  userRouter.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
      let user = await User.findById(id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("user not found");
      }
    } catch (error) {
      res.status(400).send("Error while getting the user", error);
    }
  });
  
  userRouter.delete("/user/:userID", async (req, res) => {
    let userID = req.params.userID;
    try {
      const deletedUser = await User.findOneAndDelete({_id:userID});
      res.send(deletedUser + "user deleted successfully");
    } catch (error) {
      res.status(400).send("Error while getting the user", error);
    }
  });
  
  userRouter.patch("/user/:userID", async (req, res) => {
    let userID = req.params.userID;
    let data = req.body;
  
    try {
      const allowedUpdate = [
        "gender",
        "firstName",
        "lastName",
        "age",
        "photoUrl",
        "about",
        "skills",
      ];
      const isUpdatedField = Object.keys(data).every((k) =>
        allowedUpdate.includes(k)
      );
      if (!isUpdatedField) {
        throw new Error("update is not allowed");
      }
      if (data.skills.length > 5) {
        throw new Error("only 5 skills is allowed");
      }
      const updatedUser = await User.findOneAndUpdate({ _id: userID }, data, {
        runValidators: true,
      });
      res.send(updatedUser);
    } catch (error) {
      res.status(400).send(`Error while saving the user:${error.message}`);
    }
  });
  

module.exports = userRouter