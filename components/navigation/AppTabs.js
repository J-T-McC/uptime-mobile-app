import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import DashboardScreen from '~/components/layouts/views/app/DashboardScreen'
import MonitorsScreen from '~/components/layouts/views/app/MonitorsScreen'
import ChannelsScreen from '~/components/layouts/views/app/ChannelsScreen'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import tailwind from 'tailwind-rn'

const AppTab = createMaterialTopTabNavigator()

export default function AppTabs () {

  return (
    <>
      <AppTab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;
        //
        //     console.log(route.name)
        //     switch(route.name) {
        //       case 'Dashboard':
        //         iconName = focused ? 'ios-home': 'ios-home-outline'
        //         break;
        //       case 'Monitors':
        //         iconName = focused ? 'ios-search' : 'ios-search-outline'
        //         break;
        //       case 'Channels':
        //         iconName = focused ? 'ios-notifications' : 'ios-notifications-outline'
        //         break;
        //       default:
        //         throw 'Route name not defined'
        //     }
        //
        //     // You can return any component that you like here!
        //     return <Ionicons name={iconName} size={size} color={color} />;
        //   },
        // })}
        tabBarOptions={{
          showLabel: true,
          activeTintColor: 'rgb(59,130,246)',
          inactiveTintColor: 'gray',
          tabStyle: tailwind('border-r border-gray-100 flex content-center justify-around')
        }}>
        <AppTab.Screen
          barStyle={tailwind('border')}
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerShown: true
          }}
        />

        <AppTab.Screen
          name="Monitors"
          component={MonitorsScreen}
          options={{
            headerShown: true
          }}
        />

        <AppTab.Screen
          name="Channels"
          component={ChannelsScreen}
          options={{
            headerShown: true
          }}
        />
      </AppTab.Navigator>
    </>
  )
}