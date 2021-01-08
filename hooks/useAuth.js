import { useState } from 'react'
import AuthService from '~/services/AuthService'
import AsyncJSONStorage from '~/helpers/json-store'

export default function useAuth () {

  const auth = AuthService()
  const [user, setUser] = useState({})

  const checkIfAuthenticated = async () => {
    try {
      const { data } = await auth.checkIfAuthenticated()
      setUser(data.data)
      return AsyncJSONStorage.setItem('user', data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (data) => {
    try {
      const results = await auth.login(data)
      await AsyncJSONStorage.setItem('auth', results.data)
      await checkIfAuthenticated()
      return results
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = () => {
    return auth.logout().then(() => {
      setUser({ })
      AsyncJSONStorage.removeItem('user')
      return AsyncJSONStorage.removeItem('auth')
    }).catch((error) => {
      console.log(error.response)
    })
  }

  const userIsAuthenticated = () => {
    return user && (user.name ?? false)
  }

  const userIsVerified = () => {
    return user && (user.email_verified_at ?? false)
  }

  const shouldRedirectRoot = () => {
    return userIsAuthenticated() && userIsVerified()
  }

  return {
    login,
    logout,
    checkIfAuthenticated,
    register: auth.register,
    verifyEmail: auth.verifyEmail,
    forgotPassword: auth.forgotPassword,
    resetPassword: auth.resetPassword,
    updatePassword: auth.updatePassword,
    updateProfile: auth.updateProfile,
    resendVerificationEmail: auth.resendVerificationEmail,
    userIsAuthenticated,
    userIsVerified,
    shouldRedirectRoot,
    user,
  }
}

