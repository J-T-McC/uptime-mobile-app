import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components'
import { ToastProvider } from 'react-native-fast-toast'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva'
import AuthContext, { AuthProvider } from '~/context/AuthContext'
import { ThemeContext } from '~/context/ThemeContext'
import AuthNavigator from '~/components/navigation/AuthNavigator'
import AppNav from '~/components/navigation/AppNav'
import tailwind from 'tailwind-rn'
import { appTheme } from '~/theme/app'

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
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <SafeAreaView style={tailwind('bg-black')}/>
      <ToastProvider>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <IconRegistry icons={EvaIconsPack}/>
          <ApplicationProvider {...eva} theme={{ ...eva[theme], ...appTheme }}>
            <Layout style={tailwind('h-full w-full')}>
              <AuthProvider>
                <AppContainer/>
              </AuthProvider>
            </Layout>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </ToastProvider>
    </>
  )
}
