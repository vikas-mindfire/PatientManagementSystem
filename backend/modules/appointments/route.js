

const router = require('../../route')
const { protect } = require('../../middleware/authMiddleware')

const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('./controller')



router.route('/:patientId').get(protect, getAppointments).post(protect, createAppointment)
router.route('/:patientId/:appointmentId').put(protect, updateAppointment).delete(protect, deleteAppointment)

module.exports = router;