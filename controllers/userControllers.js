const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken.js");

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      theme : user.theme,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    theme: "primary",
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const updateTheme = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(
    filter,
    { $set: {theme : obj} },
    {
      new: true,
    }
  );
  res.status(201).json({
    theme : req.body
  });
});

const getTheme = asyncHandler(async (req,res) => {
  const {email} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json({
      theme: user.theme,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }

})

module.exports = { authUser, registerUser, updateTheme, getTheme };
