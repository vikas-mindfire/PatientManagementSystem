const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
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
  },
  medicalHistory: [
    {
      condition: {
        type: String,
        required: true
      },
      diagnosisDate: {
        type: Date,
        required: true
      },
      treatments: [
        {
          name: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            required: true
          }
        }
      ]
    }
  ],
  appointments: [
    {
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      reason: {
        type: String,
        required: true
      },
      notes: String
    }
  ]
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient };
