import React, { useContext } from 'react'
import {
  PieChart as RNPieChart
} from 'react-native-chart-kit'
import { Dimensions, View } from 'react-native'
import { ThemeContext } from '~/context/ThemeContext'

export default function PieChart (props) {
  const current = useContext(ThemeContext)

  const labelColor = current.theme === 'light' ? 'black' : 'white'

  const dataset = props.dataset ?? []

  dataset.map((item) => {
    item.legendFontColor = labelColor
  })

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