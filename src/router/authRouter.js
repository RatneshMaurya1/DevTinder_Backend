const express = require("express")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignup } = require("../utils/validate");

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    try {
      validateSignup(req);
      const { firstName, lastName, email, password } = req.body;
  
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
  
      await user.save();
      res.send("user created successfully");
    } catch (error) {
      res.status(400).send(`Error while saving the user:${error.message}`);
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email:email});
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isValidPassword = await user.validatePassword(password)
      if (isValidPassword) {
  
        const token = await user.getJwt()
        res.cookie("token",token)
  
        res.send("Logged in successfully");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      res.status(400).send(`Error while login the user:${error.message}`);
    }
  });
  authRouter.post("/logout", (req,res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now(0))
    })
    res.send("loggedout successfully ")
  })
  
  

module.exports = authRouter