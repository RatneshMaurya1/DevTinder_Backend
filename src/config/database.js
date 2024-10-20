const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ratneshmaurya083:123%40maurya@cluster0.fwy5t.mongodb.net/devTinderApp")
}
module.exports = connectDB