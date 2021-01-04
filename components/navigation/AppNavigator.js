import React from 'react'

import DashboardScreen from '~/components/layouts/views/app/DashboardScreen'

import { createStackNavigator} from '@react-navigation/stack'

const AppStack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: true
        }}
      />
    </AppStack.Navigator>
  )
}