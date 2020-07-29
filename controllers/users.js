const User = require("../models/user");

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

    // Respond with token
    res.json({ user: "created" });

    //  const email = req.value.body.email;
    //  const Password = req.value.body.password;
  },
  signIn: async (req, res, next) => {
    // Generate token
    console.log("UsersController.signIn() called!");
  },
  secret: async (req, res, next) => {
    console.log("UsersController.secret() called!");
  },
};
