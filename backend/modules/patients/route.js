
const router = require('../../route')
const { protect } = require('../../middleware/authMiddleware')

const {
  getPatients,
  createPatients,
  updatePatient,
  deletePatient
} = require('./controller')

router.route('/').get( getPatients).post(protect, createPatients)
router.route('/:id').put(protect, updatePatient).delete(protect, deletePatient)

module.exports = router;
