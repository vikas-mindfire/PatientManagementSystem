

const router = require('../../route')
const { protect } = require('../../middleware/authMiddleware')

const {
  getAllDoctors,
  getDoctorById,
  createDoctors,
  updateDoctors,
  deleteDoctor
} = require('./controller')

router.route('/').get(protect, getAllDoctors).post(protect, createDoctors)
router.route('/:id').get(protect, getDoctorById).put(protect, updateDoctors).delete(protect, deleteDoctor)

module.exports = router;