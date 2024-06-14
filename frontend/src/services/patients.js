import apiClient from "services";

const getAllPatients = async() => {
  try {
    return await apiClient.get('/patients')
  } catch (error) {
    return error?.response
  }
}

const login = async({ data }) => {
  try {
    return await apiClient.post('/users/login', { ...data})
  } catch (error) {
    return error?.response
  }
}

const patientService = {
  getAllPatients,
  login
}

export default patientService