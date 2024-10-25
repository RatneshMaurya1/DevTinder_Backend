const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = 4000;
app.use(express.json());
const User = require("./models/user");
const { validateSignup } = require("./utils/validate");
const bcrypt = require("bcrypt");

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email:email});
    if (!user) {
      throw new Error("Invalid email or password");
    }
    console.log(user.password)
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.send("Logged in successfully");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send(`Error while login the user:${error.message}`);
  }
});

app.get("/user", async (req, res) => {
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
app.get("/user/:id", async (req, res) => {
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

app.delete("/user", async (req, res) => {
  let userID = req.body.userID;
  try {
    const deletedUser = await User.findOneAndDelete(userID);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("Error while getting the user", error);
  }
});

app.patch("/user/:userID", async (req, res) => {
  let userID = req.params.userID;
  let data = req.body;

  try {
    const allowedUpdate = [
      "gender",
      "firstName",
      "lastName",
      "password",
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

app.get("/feed", async (req, res) => {
  let user = await User.find({});
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

connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
