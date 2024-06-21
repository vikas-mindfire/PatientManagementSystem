import apiClient from "services";

const getAllAppointments = async() => {
  try {
    return await apiClient.get('/doctors')
  } catch (error) {
    return error?.response
  }
}

const addAppointment = async(pateintId, { data }) => {
  try {
    return await apiClient.post(`/appointments/${pateintId}`, { ...data})
  } catch (error) {
    return error?.response
  }
}

const appointmentService = {
  getAllAppointments,
  addAppointment
}

export default appointmentService


