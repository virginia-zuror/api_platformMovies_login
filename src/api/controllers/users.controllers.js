const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/token');

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) {
      return next('User already exists');
    }
    const createdUser = await newUser.save();
    createdUser.password = null;
    return res.status(201).json(`Welcome! ${createdUser.username}`);
  } catch (error) {
    return next('Error registering user', error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next('user not found', error);
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res
        .status(200)
        .json({ user: { email: user.email, _id: user._id }, token: token });
    }
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find(User.email);
    return res.status(200).json(allUsers);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = null;
      return res.status(200).json(user);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, loginUser, getAllUsers, getUserById };
