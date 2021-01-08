import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import tailwind from 'tailwind-rn'
import Container from '~/components/ui/Container'
import TrendChart from '~/components/charts/TrendChart'
import { getTrended, getPast90Days } from '~/services/ChartService'
import PieChart from '~/components/charts/PieChart'
import RecentMonitors from '~/components/layouts/views/sections/RecentMonitors'
import ResourceService from '~/services/ResourceService'
import { useStyleSheet, Icon, Text } from '@ui-kitten/components'
import {appTheme} from '~/theme/app'
import themeStyleMap from '~/services/ThemeService'

export default function MonitorScreen ({route}) {

  const monitorId = route.params.monitorId
  const themeStyles = useStyleSheet(themeStyleMap)
  const [trendData, setTrendData] = useState([])
  const [pieData, setPieData] = useState([])
  const [monitor, setMonitor] = useState([])
  const [scrolledBottom, setScrolledBottom] = useState(0)
  const pulseIconRef = React.useRef();

  useEffect(() => {
    getTrended( monitorId).then((dataset) => {
      setTrendData(dataset)
    })

    getPast90Days(monitorId).then((dataset) => {
      setPieData(dataset)
    })

    ResourceService('monitors').show(monitorId).then(({ data }) => {
      setMonitor(data.data[0] ?? [])
    })

    pulseIconRef.current.startAnimation();

  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  const getPulseClass = (status) => {
    switch (status) {
      case 'up' :
        return appTheme['color-success-500']
      case 'down':
        return appTheme['color-danger-500']
      default:
        return appTheme['color-basic-400']
    }
  }

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setScrolledBottom(scrolledBottom+1)
        }
      }}
      scrollEventThrottle={200}
      style={{...tailwind('min-h-full'), ...themeStyles.screen}}>

      <Container header="Monitor">
        <View style={tailwind('flex flex-row content-center pb-3 pl-3')}>
          <Icon
            ref={pulseIconRef}
            animation='pulse'
            animationConfig={{ cycles: Infinity }}
            name='checkmark-circle-outline'
            fill={getPulseClass(monitor.uptime_status)}
            width={25}
            height={25}
          />
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
          <RecentMonitors monitorId={monitorId} scrolledBottom={scrolledBottom}/>
        </Container>
      </View>

    </ScrollView>
  )
}