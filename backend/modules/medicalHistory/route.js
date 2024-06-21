
const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware')

const {
  createMedicalHistory,
  getMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
} = require('./controller')

router.route('/:patientId').get(protect, getMedicalHistory).post(protect, createMedicalHistory)
router.route('/:patientId/:historyId').put(protect, updateMedicalHistory).delete(protect, deleteMedicalHistory)

module.exports = router;