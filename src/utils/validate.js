const validate = require("validator")

function validateSignup(req){
    const {email,password} = (req.body)
    const userKeys = Object.keys(req.body);
    const requiredField = ["firstName", "lastName", "email", "password"];
    const missingField = requiredField.filter((f) => !userKeys.includes(f));
    if (missingField.length > 0) {
      throw new Error(`missing required field: ${missingField}`);
    }
    if(!validate.isEmail(email)){
        throw new Error("Please enter a valid email")
    }
    if (!validate.isStrongPassword(password)) {
        throw new Error("Please use strong password " + password)
    }
}

module.exports = {validateSignup}