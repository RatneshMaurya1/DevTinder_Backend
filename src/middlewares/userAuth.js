const User = require("../models/user");
const JWT = require("jsonwebtoken");

async function userAuth(req, res, next) {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("invalid token");
    }

    const gettingToken = JWT.verify(token, "devTinder");
    const { _id } = gettingToken;

    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("user not found");
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
}

module.exports = { userAuth };
