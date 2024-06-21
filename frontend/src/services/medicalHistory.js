import apiClient from "services";

const getPaitentMedicalHistory = async(pateintId) => {
  try {
    return await apiClient.get(`/medical-history/${pateintId}`)
  } catch (error) {
    return error?.response
  }
}

const addPaitentMedicalHistory = async(pateintId, { data }) => {
  try {
    return await apiClient.post(`/medical-history/${pateintId}`, { ...data})
  } catch (error) {
    return error?.response
  }
}


const medicalHistoryService = {
  getPaitentMedicalHistory,
  addPaitentMedicalHistory
}

export default medicalHistoryService;