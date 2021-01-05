import React, { useState, useEffect } from 'react'
import { Text, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn'
import Container from '~/components/ui/Container'
import TrendChart from '~/components/charts/TrendChart'

import {getTrended, getPast90Days} from '~/services/ChartService'
import PieChart from '~/components/charts/PieChart'

export default function DashboardScreen ({ navigation }) {

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

  return (
    <ScrollView style={tailwind('min-h-full')}>

      <Container header="Past 90 days Uptime">
        <PieChart dataset={pieData}/>
      </Container>

      <Container header="Trended Uptime">
        <TrendChart dataset={trendData}/>
      </Container>

    </ScrollView>
  )
}