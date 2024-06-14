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
    phone: String,
    email: String
  },
  medicalHistory: [
    {
      condition: String,
      diagnosisDate: Date,
      treatments: [
        {
          name: String,
          date: Date
        }
      ]
    }
  ],
  appointments: [
    {
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
      },
      date: Date,
      reason: String
    }
  ]
}, {
  timestamps: true,
});

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  specialization: String,
  contact: {
    phone: String,
    email: String
  }
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Patient, Doctor };
