const express = require("express");
const connectDB = require("./config/database");
const app = express()
const PORT = 4000
app.use(express.json())
const User = require("./models/user")

app.post("/signup", (req,res) => {
    const user = new User({
        firstName: "Maurya",
        lastName: "Ratnesh",
        email: "shailesh@gmail.com",
        password: "shailesh1234",
        age: 24
    })
    try {
        user.save()
        res.send("user created successfully")
    } catch (error) {
        res.status(400).send("Error while saving the user",error)
    }
})





connectDB().then(() => {
    console.log("Database connected successfully...")
    app.listen(PORT,() => {
        console.log(`server is running at ${PORT}`)
    })
}).catch((err) => {
    console.error("DB connection failed",err)
})
