import apiClient from "services";

const register = async({ data }) => {
  try {
    return await apiClient.post('/users/register', { ...data})
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

const authService = {
  register,
  login
}

export default authService