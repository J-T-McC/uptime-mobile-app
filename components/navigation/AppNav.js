import React from 'react'
import DashboardScreen from '~/components/layouts/views/app/DashboardScreen'
import MonitorsScreen from '~/components/layouts/views/app/MonitorsScreen'
import MonitorScreen from '~/components/layouts/views/app/MonitorScreen'
import ChannelsScreen from '~/components/layouts/views/app/ChannelsScreen'
import { Drawer, DrawerItem, Icon, IndexPath, Divider } from '@ui-kitten/components'
import {View} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'
import tailwind from 'tailwind-rn'
import Logo from '~/components/ui/Logo'
import { useAuthContext } from '~/context/AuthContext'

const AppDrawer = createDrawerNavigator();

export default function AppNav () {

  const themeStyles = useStyleSheet(themeStyleMap)
  const Auth = useAuthContext()

  const Icons = {
    dashboard: (props) => (<Icon {...props} name='home-outline'/>),
    monitors: (props) => (<Icon {...props} name='search-outline'/>),
    channels: (props) => (<Icon {...props} name='bell-outline'/>),
    logout: (props) => (<Icon {...props} name='log-out-outline'/>),
  }

  const Header = (props) => (
    <React.Fragment>
      <View style={{...tailwind('flex flex-row justify-center p-5'), ...themeStyles.container}}>
        <Logo/>
      </View>
      <Divider/>
    </React.Fragment>
  );

  const DrawerContent = ({ navigation, state }) => (
    <Drawer
      header={Header}
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem accessoryLeft={Icons.dashboard} title='Dashboard' />
      <DrawerItem accessoryLeft={Icons.monitors} title='Monitors' />
      <DrawerItem accessoryLeft={Icons.channels} title='Channels' />
      <DrawerItem accessoryLeft={Icons.logout} title='Logout' onPress={Auth.logout}/>
    </Drawer>
  );

  const headerOptions = {
    headerShown: true,
    headerStyle: {...themeStyles.container},
    ...themeStyles.header,
  }

  return (
      <AppDrawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
        <AppDrawer.Screen
          barStyle={tailwind('border')}
          name="Dashboard"
          component={DashboardScreen}
          options={headerOptions}
        />

        <AppDrawer.Screen
          name="Monitors"
          component={MonitorsScreen}
          options={headerOptions}
        />

        <AppDrawer.Screen
          name="Channels"
          component={ChannelsScreen}
          options={headerOptions}
        />

        <AppDrawer.Screen
          name="Monitor"
          component={MonitorScreen}
          options={headerOptions}
        />
      </AppDrawer.Navigator>
  )
}