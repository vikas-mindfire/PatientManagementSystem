

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  specialization: String,
  contact: {
    phone: {
      type: String,
      validate: {
        validator: function(value) {
          if (value) return /^[0-9]{10}$/.test(value); // Validate a 10-digit phone number
          return true
        },
        message: 'Phone number must be a valid 10-digit number'
      }
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address format',
      }
    }
  }
}, {
  timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;