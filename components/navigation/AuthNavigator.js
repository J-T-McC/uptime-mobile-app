import React from 'react'

import LoginScreen from '~/components/layouts/views/auth/LoginScreen'
import RegisterScreen from '~/components/layouts/views/auth/RegisterScreen'
import ForgotPasswordScreen from '~/components/layouts/views/auth/ForgotPasswordScreen'

import { createStackNavigator} from '@react-navigation/stack'

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="Forgot Password"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false
        }}
      />
    </AuthStack.Navigator>
  )
}