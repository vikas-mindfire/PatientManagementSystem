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

const patientService = {
  getAllPatients,
  addPatients
}

export default patientService