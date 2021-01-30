import React, { useContext,useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { ToastProvider } from 'react-native-fast-toast'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import AuthContext, { AuthProvider } from '~/context/AuthContext'
import { ThemeContext } from '~/context/ThemeContext'
import AuthNavigator from '~/components/navigation/AuthNavigator'
import AppNav from '~/components/navigation/AppNav'
import { appTheme } from '~/theme/app'
import {StatusBar} from 'react-native'

const AppContainer = () => {
  const Auth = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!Auth.shouldRedirectRoot() && <AuthNavigator/>}
      {Auth.shouldRedirectRoot() && <AppNav/>}
    </NavigationContainer>
  )
}

export default function App () {
  const [theme, setTheme] = useState('dark')
  const [statusBar, setStatusBar] = useState('dark-content')

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  const toggleStatusBar = () => {
    const map = {'dark': 'light-content', 'light': 'dark-content'}
    setStatusBar(map[theme])
  }

  useEffect(() => {
    toggleStatusBar()
  }, [theme])

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={EvaIconsPack}/>
          <ApplicationProvider {...eva} theme={{ ...eva[theme], ...appTheme }}>
            <StatusBar barStyle={statusBar} />
            <AuthProvider>
              <AppContainer/>
            </AuthProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </ToastProvider>
    </SafeAreaProvider>
  )
}
