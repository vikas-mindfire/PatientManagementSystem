const Doctor = require("./model");
const asyncHanlder = require("express-async-handler");

const getAllDoctors = asyncHanlder(async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const getDoctorById = asyncHanlder(async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const createDoctors = asyncHanlder(async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const updateDoctors = asyncHanlder(async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, specialization, contact } = req.body;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.firstName = firstName;
    doctor.lastName = lastName;
    doctor.specialization = specialization;
    doctor.contact = contact;

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

const deleteDoctor = asyncHanlder(async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctors,
  updateDoctors,
  deleteDoctor
}