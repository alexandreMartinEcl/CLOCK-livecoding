const mongoose = require('mongoose');


const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}); // userSchema

const codeUserWithinSession = new Schema({
  user: {
    type: userSchema,
    required: true,
  },
  html: {
    type: String,
    default: '',
  },
  css: {
    type: String,
    default: '',
  },
  js: {
    type: String,
    default: '',
  },
}); // codeUserWithinSession

const sessionSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: userSchema,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  users: {
    type: [codeUserWithinSession],
    required: false,
  },
}); // sessionSchema

module.exports = mongoose.model('Session', sessionSchema);
