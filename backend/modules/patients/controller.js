const asyncHanlder = require('express-async-handler');
const { Patient } = require('./model');

// GET all patients with optional search and sorting
const getPatients = asyncHanlder(async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query = {
        $or: [
          { firstName: { $regex: req.query.search, $options: 'i' } },
          { lastName: { $regex: req.query.search, $options: 'i' } }
        ]
      };
    }

    let sortQuery = {};
    sortQuery[req?.query?.sortBy ?? 'updatedAt'] = req.query.sortDir === 'desc' ? -1 : 1;

    const patients = await  Patient.aggregate([
      { $match: query }, // Match the patients based on the search query
      {
        $lookup: {
          from: 'appointments', // Assuming your appointments collection is named 'appointments'
          localField: 'appointments',
          foreignField: '_id',
          as: 'appointmentsData'
        }
      },
      {
        $unwind: {
          path: '$appointmentsData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'appointmentsData.date': -1
        }
      },
      {
        $group: {
          _id: '$_id',
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          dateOfBirth: { $first: '$dateOfBirth' },
          gender: { $first: '$gender' },
          createdBy: { $first: '$createdBy' },
          latestAppointment: { $first: '$appointmentsData' }
        }
      },
      { $sort: sortQuery } // Sort the result based on the provided sort query
    ]);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getPatientById = asyncHanlder(async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

const createPatients = asyncHanlder(async (req, res) => {
  const { firstName, lastName, gender, dateOfBirth, address, contact, medicalHistory, appointments } = req.body;

  // Validate request body
  if (!firstName || !gender || !dateOfBirth || !contact.email ) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    // Assuming req.user contains the information of the current logged-in user
    const createdBy = req.user ? req.user.id : null;
    const patient = new Patient({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      address,
      contact,
      createdBy: createdBy,
      medicalHistory,
      appointments
    });

    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
})

const updatePatient = asyncHanlder( async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, gender, dateOfBirth, address, contact, medicalHistory, appointments } = req.body;

  // Validate request body
  if (!id) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }

  try {
    // Check if patient exists
    const existingPatient = await Patient.findById(id);
    if (!existingPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update patient fields
    if (firstName) existingPatient.firstName = firstName;
    if (lastName) existingPatient.lastName = lastName;
    if (gender) existingPatient.gender = gender;
    if (dateOfBirth) existingPatient.dateOfBirth = dateOfBirth;
    if (address) existingPatient.address = address;
    if (contact) existingPatient.contact = contact;
    if (medicalHistory) existingPatient.medicalHistory = medicalHistory;
    if (appointments) existingPatient.appointments = appointments;

    // Save updated patient
    const updatedPatient = await existingPatient.save();
    res.json(updatedPatient);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
})

const deletePatient = asyncHanlder(async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = {
  getPatients,
  createPatients,
  updatePatient,
  deletePatient,
  getPatientById
}