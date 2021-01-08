import React from 'react'
import useAuth from '~/hooks/useAuth'
const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const auth = useAuth()

  React.useEffect(() => {
    auth.checkIfAuthenticated()
  }, [])

  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useAuthContext = () => {
  return React.useContext(AuthContext)
}
