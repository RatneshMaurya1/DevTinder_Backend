const mongoose = require("mongoose")
const validation = require("validator")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
    },
    password:{
        type: String,
        required: [true,"password is required"],
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

userSchema.methods.getJwt = async function(){
    const user = this

    const token = await JWT.sign({_id:user._id}, "devTinder", {expiresIn: "7d"})
    return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this

    const userPassword = await bcrypt.compare(passwordInputByUser, user.password);
    return userPassword
}

const User = mongoose.model("User", userSchema)

module.exports = User