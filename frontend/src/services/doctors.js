import apiClient from "services";

const getAllDoctors = async() => {
  try {
    return await apiClient.get('/doctors')
  } catch (error) {
    return error?.response
  }
}

const doctorService = {
  getAllDoctors
}

export default doctorService


