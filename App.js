import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Router, Route, Link, withRouter } from '@/react-router'
import useAuth from '@/hooks/useAuth'

import tailwind from 'tailwind-rn'

const Home = () => <Text>Home</Text>;
const About = () => <Text>About</Text>;

import Login from '@/components/layouts/views/auth/Login'
import Register from '@/components/layouts/views/auth/Register'
import ForgotPassword from '@/components/layouts/views/auth/ForgotPassword'

const AppContainer = withRouter(({ history }) => {

  const auth = useAuth()

  useEffect(() => {
    //TODO figure out routing and remove this
    auth.checkIfAuthenticated()

    if(!auth.userIsAuthenticated()) {
      if(history) {
        history.push('/auth/login')
      }
    }

  }, [])

  if(!auth.userIsAuthenticated()) {
    return (
      <View style={tailwind('bg-gray-100 h-full')}>
        <Route exact path="/auth/login" component={Login}/>
        <Route exact path="/auth/register" component={Register}/>
        <Route exact path="/auth/forgot-password" component={ForgotPassword}/>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Link to="/dashboard">
          <Text>Dashboard</Text>
        </Link>
        <Link to="/monitors">
          <Text>Monitors</Text>
        </Link>
        <Link to="/channels">
          <Text>Channels</Text>
        </Link>
      </View>

      <Route exact path="/dashboard" component={Home}/>
      <Route exact path="/monitors" component={Home}/>
      <Route exact path="/channels" component={About}/>
    </View>
  )

})

export default function App () {
  return (
    <Router>
      <AppContainer/>
    </Router>
  )
}
