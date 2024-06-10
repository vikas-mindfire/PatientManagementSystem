
const router = require('../../route')
const {
  getPatients,
  createPatients,
  updatePatient,
  deletePatient
} = require('./controller')

router.route('/').get(getPatients).post(createPatients)
router.route('/:id').put(updatePatient).delete(deletePatient)

module.exports = router;
