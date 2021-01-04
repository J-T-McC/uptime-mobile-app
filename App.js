import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import useAuth from '~/hooks/useAuth'
import tailwind from 'tailwind-rn'
import Toast from 'react-native-fast-toast'

import AuthNavigator from '~/components/navigation/AuthNavigator'
import AppNavigator from '~/components/navigation/AppNavigator'

const AppContainer = () => {
  const auth = useAuth()

  useEffect(() => {
    auth.checkIfAuthenticated()
  }, [])

  console.log(auth.userIsAuthenticated())

  return (
    <NavigationContainer>
      {auth.shouldRedirectRoot() && <AppNavigator/>}
      {!auth.shouldRedirectRoot() && <AuthNavigator/>}
    </NavigationContainer>
  )

}

export default function App () {
  return (
    <>
      <View style={tailwind('h-full w-full flex')}>
        <AppContainer/>
      </View>
      <Toast ref={(ref) => global['toast'] = ref}/>
    </>
  )
}
