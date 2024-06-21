
const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware')

const {
  getPatients,
  createPatients,
  updatePatient,
  deletePatient,
  getPatientById
} = require('./controller')

router.route('/').get(protect, getPatients).post(protect, createPatients)
router.route('/:id').get(protect, getPatientById).put(protect, updatePatient).delete(protect, deletePatient)

module.exports = router;
