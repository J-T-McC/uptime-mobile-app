import axios from 'axios'
import Constants from 'expo-constants';

const apiEndpoint = Constants.manifest.extra.apiEndpoint
const sanctumEndpoint = Constants.manifest.extra.sanctumEndpoint

axios.defaults.withCredentials = true
axios.defaults.headers['Accept'] = 'application/json'

export { axios, apiEndpoint, sanctumEndpoint }