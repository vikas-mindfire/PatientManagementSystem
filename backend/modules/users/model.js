const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a First Name'],
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      validate: {
        validator: function (value) {
          if (value) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          return true
        },
        message: 'Invalid email address format',
      }
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);