import { useState, useEffect } from 'react'
import AuthService from '~/services/AuthService'

import AsyncJSONStorage from '~/helpers/json-store'

export default function useAuth () {

  const auth = AuthService()

  const [user, setUser] = useState(null)

  const checkIfAuthenticated = async () => {
    return auth.checkIfAuthenticated().then(({ data }) => {
      setUser(data.data)
    }).catch(() => {
      setUser(null)
    })
  }

  const login = async (data) => {
    const result = auth.login(data)

    result.then(({ data }) => {
      return AsyncJSONStorage.setItem('auth', data)
    }).then(() => checkIfAuthenticated()).catch(() => {})

    return result
  }

  const logout = () => {
    return auth.logout().then(() => {
      setUser(null)
      AsyncJSONStorage.removeItem('user')
      return AsyncJSONStorage.removeItem('auth')
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

  useEffect(() => {
    if (user && Promise.resolve(user) !== user) {
      AsyncJSONStorage.setItem('user', user)
    }
  }, [user])

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

