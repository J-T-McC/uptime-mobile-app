import React, { useState, useEffect } from 'react'
import ResourceService from '~/services/ResourceService'
import { View } from 'react-native'
import Card from '~/components/ui/Card'
import tailwind from 'tailwind-rn'
import moment from 'moment'
import { Spinner, Text, Icon, useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function RecentMonitors (props: {
  monitorId?: null,
  scrolledBottom?: 0,
  renderKey?: null,
}) {

  const navigation = useNavigation()
  const themeStyles = useStyleSheet(themeStyleMap)
  const [recentEvents, setRecentEvents] = useState([])
  const [paginationMeta, setPaginationMeta] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)
  const recentEventsResource = ResourceService('latest-monitor-events')
  const insets = useSafeAreaInsets()

  const loadRecentEvents = async (params) => {
    setLoading(true)
    const { data } = props.monitorId ?
      await recentEventsResource.show(props.monitorId, params) :
      await recentEventsResource.index(params)
    setRecentEvents([...recentEvents, ...data.data])
    setPaginationMeta(data.meta)
    setLoading(false)
  }

  const hasMoreResources = () => {
    return paginationMeta && paginationMeta.current_page < paginationMeta.last_page
  }

  useEffect(() => {
    setRecentEvents([])
    setPaginationMeta(null)
    setCurrentPage(1)
    setReloadCount(reloadCount + 1)
  }, [props.renderKey])

  useEffect(() => {
    if (!loading && (!paginationMeta || hasMoreResources())) {
      loadRecentEvents({ page: currentPage })
    }
  }, [currentPage, reloadCount])

  useEffect(() => {
    setCurrentPage(currentPage + 1)
  }, [props.scrolledBottom])

  const iconSize = 34

  const eventToIconMap = {
    'CERTIFICATE-VALID': (<Icon width={iconSize} height={iconSize} name='shield-off-outline' fill='#FBBF24'/>),
    'CERTIFICATE-INVALID': (<Icon width={iconSize} height={iconSize} name='shield-off-outline' fill='#F87171'/>),
    'CERTIFICATE-EXPIRED': (<Icon width={iconSize} height={iconSize} name='shield-off-outline' fill='#F87171'/>),
    'UPTIME-RECOVERED': (<Icon name="arrow-circle-up-outline" width={iconSize} height={iconSize} fill='#60A5FA'/>),
    'UPTIME-OFFLINE': (<Icon name="arrow-circle-down-outline" width={iconSize} height={iconSize} fill='#F87171'/>),
  }

  const title = (item) => (
    <View>
      <Text
        style={tailwind('text-lg font-semibold')}
        onPress={() => navigation.navigate('NestedNavs', {
          screen: 'Monitor',
          params: { monitorId: item.monitor.id }
        })}>{item.monitor.url}
      </Text>
      <View>
        <Text
          style={tailwind('text-xs max-w-md')}>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}: {item.category} - {item.status}
        </Text>
      </View>
    </View>
  )

  const description = (text) => (
    <View style={tailwind('pr-3')}>
      <View style={{ ...tailwind('p-3 rounded mt-2'), ...themeStyles.quote }}>
        <Text>"{text}"</Text>
      </View>
    </View>
  )

  const renderItem = (item) => (
    <Card
      key={item.id}
      title={title(item)}
      description={description(item.error)}
      icon={eventToIconMap[`${item.category}-${item.status}`]}
    />
  )

  return (
    <View key={props.renderKey} style={{ paddingBottom: insets.bottom }}>
      {recentEvents.length > 0 && recentEvents.map(renderItem)}
      {loading && paginationMeta && <View style={tailwind('flex flex-row justify-center')}>
        <Spinner/>
      </View>}
    </View>
  )

}