const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

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
});

const sessionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
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
  users: {
    type: [codeUserWithinSession],
    required: false,
  },
});

module.exports = mongoose.model('Evaluation', sessionSchema);
