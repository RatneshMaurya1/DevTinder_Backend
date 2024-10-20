const express = require("express");
const connectDB = require("./config/database");
const app = express()
const PORT = 4000
app.use(express.json())


connectDB().then(() => {
    console.log("Database connected successfully...")
    app.listen(PORT,() => {
        console.log(`server is running at ${PORT}`)
    })
}).catch((err) => {
    console.error("DB connection failed",err)
})
