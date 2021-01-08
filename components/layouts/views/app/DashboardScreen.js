import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import tailwind from 'tailwind-rn'
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

  useEffect(() => {
    getTrended().then((dataset) => {
      setTrendData(dataset)
    })

    getPast90Days().then((dataset) => {
      setPieData(dataset)
    })
  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  const [scrolledBottom, setScrolledBottom] = useState(0)

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setScrolledBottom(scrolledBottom+1)
        }
      }}
      scrollEventThrottle={2000}
      style={{...tailwind('min-h-full'), ...themeStyles.screen}}>

      <Container header="Past 90 days Uptime">
        <PieChart dataset={pieData}/>
      </Container>

      <Container header="Trended Uptime">
        <TrendChart dataset={trendData}/>
      </Container>

      <View>
        <Container header="Recent Events">
          <RecentMonitors scrolledBottom={scrolledBottom}/>
        </Container>
      </View>

    </ScrollView>
  )
}