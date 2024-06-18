import apiClient from "services";

const getAllPatients = async() => {
  try {
    return await apiClient.get('/patients')
  } catch (error) {
    return error?.response
  }
}

const addPatients = async({ data }) => {
  try {
    return await apiClient.post('/patients', { ...data})
  } catch (error) {
    return error?.response
  }
}

const deletePatient = async(patientId) => {
  try {
    return await apiClient.delete(`/patients/${patientId}`)
  } catch (error) {
    return error?.response
  }
}

const patientService = {
  getAllPatients,
  addPatients,
  deletePatient
}

export default patientService