const asyncHanlder = require("express-async-handler");
const { Patient } = require("../patients/model");

const createMedicalHistory = asyncHanlder(async (req, res) => {
  const { patientId } = req.params; // Assuming patientId is passed in params
  const { condition, diagnosisDate, treatments } = req.body;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newMedicalHistory = {
      condition,
      diagnosisDate,
      treatments,
    };

    patient.medicalHistory.push(newMedicalHistory);
    await patient.save();

    res
      .status(201)
      .json({
        message: "Medical history created successfully",
        medicalHistory: newMedicalHistory,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create medical history" });
  }
});

const getMedicalHistory = async (req, res) => {
  const { patientId } = req.params; // Assuming patientId is passed in params

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient.medicalHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch medical history" });
  }
};

const updateMedicalHistory = async (req, res) => {
  const { patientId, historyId } = req.params; // Assuming both patientId and historyId are passed in params
  const { condition, diagnosisDate, treatments } = req.body;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const medicalHistoryToUpdate = patient.medicalHistory.id(historyId);

    if (!medicalHistoryToUpdate) {
      return res.status(404).json({ message: "Medical history not found" });
    }

    medicalHistoryToUpdate.condition = condition;
    medicalHistoryToUpdate.diagnosisDate = diagnosisDate;
    if (treatments) {
      medicalHistoryToUpdate.treatments = treatments;
    }

    await patient.save();

    res.json({
      message: "Medical history updated successfully",
      medicalHistory: medicalHistoryToUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update medical history" });
  }
};

const deleteMedicalHistory = async (req, res) => {
  const { patientId, historyId } = req.params; // Assuming both patientId and historyId are passed in params

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const medicalHistoryToDelete = patient.medicalHistory.id(historyId);

    if (!medicalHistoryToDelete) {
      return res.status(404).json({ message: "Medical history not found" });
    }

    medicalHistoryToDelete.remove();
    await patient.save();

    res.json({ message: "Medical history deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete medical history" });
  }
};

module.exports = {
  createMedicalHistory,
  getMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
};
