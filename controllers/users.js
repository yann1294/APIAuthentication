const JWT = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../configuration");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "ADG",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    // Email & Password
    // req.value.body
    console.log("contents of req.value.body", req.value.body);
    console.log("UsersController.signUp() called!");

    const { email, password } = req.value.body;
    // Check if there is user with the same email

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).send({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      email: email,
      password: password,
    });
    await newUser.save();

    // old static response
    //  res.json({ user: "created" });

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },
  signIn: async (req, res, next) => {
    // Generate token
    //  console.log("UsersController.signIn() called!");
  },
  secret: async (req, res, next) => {
    console.log("UsersController.secret() called!");
  },
};
