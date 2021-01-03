import { useState, useEffect } from 'react'
import { axios, apiEndpoint, sanctumEndpoint } from '../helpers/api'
import AsyncJSONStorage from '@/helpers/json-store'
import { useLocation } from '@/react-router'
//retrieve our user if it exists

export default function useAuth () {

  const [user, setUser] = useState({})

  const location = useLocation()

  const checkIfAuthenticated = async () => {

    const auth = await AsyncJSONStorage.getItem('auth')

    if (auth.token) {
      axios.defaults.headers['Authorization'] = `Bearer ${auth.token}`
    }

    return axios
      .get(apiEndpoint + '/authenticated')
      .then(({ data }) => {
        setUser(data.data)
      })
      .catch((error) => {
        console.log(error)
        setUser({})
      })
  }

  // auth route must be set in route meta property
  // @/router/auth.js
  const isAuthRoute = () => {
    return location.pathname.includes('auth')
  }

  // default laravel fortify endpoints
  const login = (data) => {
    return axios
      .post(apiEndpoint + '/sanctum/token', data)
      .then(({ data }) => {
        console.log(data)
        return AsyncJSONStorage.setItem('auth', data)
      }).then(() => checkIfAuthenticated())
  }

  const register = (data) => {
    return axios.post(apiEndpoint + '/register', data)
  }

  const verifyEmail = async (id, hash, params) => {
    return axios.get(apiEndpoint + `/email/verify/${id}/${hash}`, {
      params
    })
  }

  const forgotPassword = (data) => {
    return axios.post(apiEndpoint + '/forgot-password', data)
  }

  const resetPassword = (data) => {
    return axios.post(apiEndpoint + '/reset-password', data)
  }

  const updatePassword = (data) => {
    return axios.put(apiEndpoint + '/user/password', data)
  }

  const updateProfile = (data) => {
    return axios.put(apiEndpoint + '/user/profile-information', data)
  }

  const logout = () => {
    return axios.post(apiEndpoint + '/logout').then(() => {
      setUser({})
      AsyncJSONStorage.removeItem('user')
      return AsyncJSONStorage.removeItem('auth')
    })
  }

  const resendVerificationEmail = () => {
    return axios.post(apiEndpoint + '/email/verification-notification')
  }

  // helper methods
  const userIsAuthenticated = () => {
    return user.name ?? false
  }

  const userIsVerified = () => {
    return user.email_verified_at ?? false
  }

  const shouldRedirectRoot = () => {
    return userIsAuthenticated() && userIsVerified() && isAuthRoute()
  }

  const shouldRedirectLogin = () => {
    return (!userIsAuthenticated() || !userIsVerified()) && !isAuthRoute()
  }


  useEffect(() => {
    AsyncJSONStorage.setItem('user', user)
  }, [user])

  return {
    user,

    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    resendVerificationEmail,
    checkIfAuthenticated,
    isAuthRoute,
    userIsAuthenticated,
    userIsVerified,
  }
}

