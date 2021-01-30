import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import tailwind from 'tailwind-rn'
import Container from '~/components/ui/Container'
import TrendChart from '~/components/charts/TrendChart'
import { getTrended, getPast90Days } from '~/services/ChartService'
import PieChart from '~/components/charts/PieChart'
import RecentMonitors from '~/components/layouts/views/sections/RecentMonitors'
import ResourceService from '~/services/ResourceService'
import { useStyleSheet, Text } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'
import { UptimeIcon } from '~/helpers/icon'

export default function MonitorScreen ({route}) {

  const monitorId = route.params.monitorId
  const themeStyles = useStyleSheet(themeStyleMap)
  const [trendData, setTrendData] = useState([])
  const [pieData, setPieData] = useState([])
  const [monitor, setMonitor] = useState([])
  const [scrolledBottom, setScrolledBottom] = useState(0)
  const [refreshing, setRefreshing] = useState(false);
  const [screenKey, setScreenKey] = useState(Math.random().toString());
  const [reloadCount, setReloadCount] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setReloadCount(reloadCount+1)
    setScreenKey(Math.random().toString());
  }, []);

  useEffect(() => {

    const trended = getTrended( monitorId).then((dataset) => {
      setTrendData(dataset)
    })

    const past90Days = getPast90Days(monitorId).then((dataset) => {
      setPieData(dataset)
    })

    const monitorsResource = ResourceService('monitors').show(monitorId).then(({ data }) => {
      setMonitor(data.data[0] ?? [])
    })

    Promise.all(trended, past90Days, monitorsResource).then(() => {
      setRefreshing(false);
    }).catch(() => {

    })

  }, [screenKey])

  useEffect(() => {
    setScreenKey(Math.random().toString());
  }, [monitorId])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setScrolledBottom(scrolledBottom+1)
        }
      }}
      scrollEventThrottle={200}
      style={{...tailwind('min-h-full'), ...themeStyles.screen}}>

      <Container>
        <View style={tailwind('flex flex-row content-center pb-3 pl-3')}>
          <UptimeIcon status={monitor.uptime_status} animation='pulse'/>
          <Text style={tailwind('text-lg ml-3')}>{monitor.url}</Text>
        </View>
      </Container>

      <Container header="Past 90 days Uptime">
        <PieChart dataset={pieData}/>
      </Container>

      <Container header="Trended Uptime">
        <TrendChart dataset={trendData}/>
      </Container>

      <View>
        <Container header="Recent Events">
          <RecentMonitors renderKey={screenKey} monitorId={monitorId} scrolledBottom={scrolledBottom} />
        </Container>
      </View>

    </ScrollView>
  )
}