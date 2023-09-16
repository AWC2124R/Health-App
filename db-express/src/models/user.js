const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  ethnicity: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
    required: true,
  },
});

const UserLogin = mongoose.model('UserLogin', UserLoginSchema);
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = {UserLogin, UserProfile};