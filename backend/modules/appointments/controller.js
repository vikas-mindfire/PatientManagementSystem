
const { Patient } = require('../patients/model')
const asyncHanlder = require('express-async-handler');

// Get all appointments for a patient
const getAppointments = asyncHanlder(async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient.appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})

// Create a new appointment for a patient
const createAppointment = asyncHanlder(async (req, res) => {
  const patientId = req.params.patientId;
  const { doctor, date, reason, notes } = req.body;

  // Basic validation
  if (!doctor || !date || !reason) {
    return res.status(400).json({ message: 'Doctor, date, and reason are required' });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newAppointment = {
      doctor,
      date,
      reason,
      notes
    };

    patient.appointments.push(newAppointment);
    await patient.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// update an existing appointment
const updateAppointment = asyncHanlder(async (req, res) => {
  const patientId = req.params.patientId;
  const appointmentId = req.params.appointmentId;
  const { doctor, date, reason, notes } = req.body;

  // Basic validation
  if (!doctor || !date || !reason) {
    return res.status(400).json({ message: 'Doctor, date, and reason are required' });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const appointmentToUpdate = patient.appointments.id(appointmentId);
    if (!appointmentToUpdate) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointmentToUpdate.set({
      doctor,
      date,
      reason,
      notes
    });

    await patient.save();

    res.json(appointmentToUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE delete an appointment
const deleteAppointment = asyncHanlder(async (req, res) => {
  const patientId = req.params.patientId;
  const appointmentId = req.params.appointmentId;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const appointmentToDelete = patient.appointments.id(appointmentId);
    if (!appointmentToDelete) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointmentToDelete.remove();
    await patient.save();

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
}