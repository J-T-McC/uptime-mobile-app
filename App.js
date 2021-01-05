import React, { useEffect, useRef } from 'react'
import { View, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import useAuth from '~/hooks/useAuth'
import tailwind from 'tailwind-rn'
import Toast from 'react-native-fast-toast'

import AuthNavigator from '~/components/navigation/AuthNavigator'
import AppTabs from '~/components/navigation/AppTabs'

const AppContainer = () => {
  const auth = useAuth()

  useEffect(() => {
    auth.checkIfAuthenticated()
  }, [])

  return (
    <NavigationContainer>
      {!auth.shouldRedirectRoot() && <AuthNavigator/>}
      {auth.shouldRedirectRoot() && <AppTabs/>}
    </NavigationContainer>
  )

}

export default function App () {
  return (
    <>
      <SafeAreaView style={tailwind('bg-black')}/>
      <SafeAreaView style={tailwind('h-full w-full')}>
        <AppContainer/>
      </SafeAreaView>
      <Toast ref={(ref) => global['toast'] = ref}/>
    </>
  )
}
