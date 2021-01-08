import axios from 'axios'
import Constants from 'expo-constants'
import AsyncJSONStorage from '~/helpers/json-store'

const apiEndpoint = Constants.manifest.extra.apiEndpoint

const ApiService = axios.create({
  baseURL: apiEndpoint
})

ApiService.defaults.withCredentials = true
ApiService.defaults.headers['Accept'] = 'application/json'

ApiService.interceptors.request.use((request) =>  {
  const appendTokenHeader = async () => {
    const auth =  await AsyncJSONStorage.getItem('auth')
    request.headers.Authorization = `Bearer ${auth.token}`;
    return request
  }
  return appendTokenHeader()
})

const setAuthToken = (token = '') => {
  ApiService.defaults.headers['Authorization'] = `Bearer ${token}`
}

const setErrorHandler = (fn) => {
  ApiService.interceptors.request.use((response) => response, (error) => fn(error))
}

export default ApiService

export { setAuthToken, setErrorHandler }
