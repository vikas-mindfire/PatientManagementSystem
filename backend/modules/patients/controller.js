const getPatients = (req, res) => {
  res.status(200).json({message: 'Get Patients'})
}

const createPatients = (req, res) => {
  res.status(200).json({message: 'Create Patients'})
}

const updatePatient = (req, res) => {
  res.status(200).json({message: `Update Patient ${req.params.id}`})
}

const deletePatient = (req, res) => {
  res.status(200).json({message: `Delete Patient ${req.params.id}`})
}

module.exports = {
  getPatients,
  createPatients,
  updatePatient,
  deletePatient
}