const mongoose = require("mongoose")
const validation = require("validator")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true,"firstName is required"],
        maxLength:20,
        minLength:4
    },
    lastName:{
        type: String,
        required: [true,"lastName is required"]
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique: true,
        trim:true,
        index:true,
        lowercase:true,
        validate(value){
            if(!validation.isEmail(value)){
                throw new Error("Please use valid email " + value)
            }
        }
    },
    password:{
        type: String,
        required: [true,"password is required"],
        validate(value){
            if (!validation.isStrongPassword(value)) {
                throw new Error("Please use strong password " + value)
            }
        }
    },
    age:{
        type: Number,
        min: [18,"you should be above 18"]
    },
    photoUrl:{
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&s",
        validate(value){
            if (!validation.isURL(value)) {
                throw new Error("Please use correct photo URL " + value)
            }
        }
    },
    about:{
        type:String,
        default: "This is defaul about message"
    },
    skills:{
        type:[String]
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    }
},{
    timestamps:true
})


const User = mongoose.model("User", userSchema)

module.exports = User