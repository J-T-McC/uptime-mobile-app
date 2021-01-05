import React from 'react'
import {
  PieChart as RNPieChart
} from 'react-native-chart-kit'
import { Dimensions, View } from 'react-native'

export default function PieChart (props) {
  const dataset = props.dataset ?? []
  return (
    <View>
      {dataset &&
      <RNPieChart
        data={dataset}
        width={Dimensions.get('window').width}
        height={150}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'y'}
        backgroundColor={'transparent'}
        absolute
      />
      }
    </View>
  )

}