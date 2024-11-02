const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = 4000;
app.use(express.json());
const User = require("./models/user");
const cookieParser =  require("cookie-parser")
app.use(cookieParser())

const authRouter = require("./router/authRouter")
const connectionRouter = require("./router/connectionRouter")
const profileRouter = require("./router/profileRouter")
const userRouter = require("./router/userRouter")

app.use("/",authRouter)
app.use("/",connectionRouter)
app.use("/",profileRouter)
app.use("/",userRouter)




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
