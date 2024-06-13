const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require('./model')

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({'message': 'All Fields are required'});
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({'message': 'Email already exists'});
  }

  // create hash password
  // const salt = await bcrypt.getSalt('60')
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({'message': 'Invalid user data. something looks wrong'})
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({'message': 'Invalid credentials'});
  }
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser,
};