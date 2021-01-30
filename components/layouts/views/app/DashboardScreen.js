import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import Container from '~/components/ui/Container'
import TrendChart from '~/components/charts/TrendChart'
import { getTrended, getPast90Days } from '~/services/ChartService'
import PieChart from '~/components/charts/PieChart'
import RecentMonitors from '~/components/layouts/views/sections/RecentMonitors'

import { useStyleSheet } from '@ui-kitten/components'
import themeStyleMap from '~/services/ThemeService'

export default function DashboardScreen ({ navigation }) {

  const themeStyles = useStyleSheet(themeStyleMap)

  const [trendData, setTrendData] = useState([])
  const [pieData, setPieData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [screenKey, setScreenKey] = useState(Math.random().toString())
  const [scrolledBottom, setScrolledBottom] = useState(0)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setScreenKey(Math.random().toString())
  }, [])

  useEffect(() => {

    const trended = getTrended().then((dataset) => {
      setTrendData(dataset)
    })

    const past90Days = getPast90Days().then((dataset) => {
      setPieData(dataset)
    })

    Promise.all(trended, past90Days).then(() => {
      setRefreshing(false)
    }).catch(() => {

    })

  }, [screenKey])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setScrolledBottom(scrolledBottom + 1)
        }
      }}
      scrollEventThrottle={2000}
      style={themeStyles.screen}>

      <Container header="Past 90 days Uptime">
        <PieChart dataset={pieData}/>
      </Container>

      <Container header="Trended Uptime">
        <TrendChart dataset={trendData}/>
      </Container>

      <View>
        <Container header="Recent Events">
          <RecentMonitors renderKey={screenKey} scrolledBottom={scrolledBottom}/>
        </Container>
      </View>
    </ScrollView>
  )
}