const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const {
  ValidationError,
  AuthenticationError,
} = require("apollo-server-errors");

const signup = async (firstName, lastName, email, password) => {
  if (!email || !password || !firstName || !lastName) {
    throw new ValidationError("All fields are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError("User with this email already exists.");
  }

  const newUser = await User.create({ firstName, lastName, email, password });
  console.log("newUser------->",newUser)
  return {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new ValidationError("Email and password are required.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError("User not found.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthenticationError("Invalid credentials.");
  }
  return generateToken(user);
};

module.exports = { login, signup };
