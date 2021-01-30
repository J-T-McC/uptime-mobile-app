import React, { useState, useEffect } from 'react'
import tailwind from 'tailwind-rn'
import ResourceService from '~/services/ResourceService'
import { ScrollView, View } from 'react-native'

import { Button, Text, useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'
import Card from '~/components/ui/Card'
import { UptimeIcon } from '~/helpers/icon'

export default function MonitorsScreen ({ navigation }) {
  const themeStyles = useStyleSheet(themeStyleMap)
  const [monitors, setMonitors] = useState([])
  const monitorResource = ResourceService('monitors')

  const loadMonitors = async (params) => {
    try {
      const { data } = await monitorResource.index()
      setMonitors(data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    loadMonitors()
  }, [])

  const title = (item) => (
    <View>
      <Text
        style={tailwind('text-lg font-semibold')}
        onPress={() => navigation.navigate('NestedNavs', {screen: 'Monitor', params: {monitorId: item.id}})}>{item.url}
      </Text>
    </View>
  )

  const description = (text) => (
    <View style={tailwind('pr-3')}>
      <View style={{...tailwind('p-3 rounded mt-2'), ...themeStyles.quote}}>
        <Text>{text}</Text>
      </View>
    </View>
  )

  const renderItem = (item) => (
    <Card
      key={item.id}
      title={title(item)}
      description={description("Wooo")}
      icon={<UptimeIcon status={item.uptime_status} />}
    />
  )

  const createMonitor = () => {
    alert('woooo')
  }

  return (
    <ScrollView style={{...tailwind('min-h-full'), ...themeStyles.screen}}>
      <View>
        <Text>
          <Button onPress={createMonitor}>Add Monitors</Button>to stay on top of unexpected downtime and certificate issues on yours or a service providers site
        </Text>
      </View>

      <View>
        {monitors.map(renderItem)}
      </View>
    </ScrollView>
  )
}
