const User = require("../models/User");

const createUser = async (input) => {
  const { firstName, lastName, email, password } = input;
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");
  const newUser = new User({ firstName, lastName, email, password });
  return await newUser.save();
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, input) => {
  return await User.findByIdAndUpdate(id, input, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = { createUser, findUserById, updateUser, deleteUser };
