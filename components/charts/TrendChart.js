import React from 'react'
import { Area, Chart, HorizontalAxis, Line, Tooltip, VerticalAxis } from 'react-native-responsive-linechart'
import { Dimensions, View } from 'react-native'

export default function TrendChart (props) {

  const dataset = props.dataset ?? []

  return (
    <View>
      {dataset.length > 0 &&
      <Chart
        style={{ height: 200, width: Dimensions.get('window').width }}
        data={dataset}
        padding={{ left: 40, bottom: 20, right: 30, top: 20 }}
        yDomain={{ min: 50, max: 100 }}
      >
        <VerticalAxis tickCount={5} theme={{
          labels: { formatter: (v) => v.toFixed(0) + '%' },
          ticks: { visible: false },
          grid: { visible: false },
        }}/>
        <HorizontalAxis tickCount={dataset.length} theme={{
          labels: { formatter: (v) => '' },
          ticks: { visible: false },
        }}/>
        <Area theme={{
          gradient: {
            from: { color: '#93C5FD', opacity: 0.5 },
            to: { color: '#93C5FD', opacity: 0.5 }
          }
        }}/>
        <Line
          tooltipComponent={
            <Tooltip
              theme={{
                label: {
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                  textAnchor: 'middle',
                  opacity: 1,
                  dx: 0,
                  dy: -16.5,
                },
                shape: {
                  width: 110,
                  height: 20,
                  dx: 0,
                  dy: -13.5,
                  rx: 4,
                  color: 'black',
                },
                formatter: (point) => {
                  return `${point.meta.label}: ${point.y}%`
                }
              }}
            />
          }
          theme={{
            stroke: { color: '#93C5FD', width: 5 },
            scatter: { default: { width: 8, height: 8, rx: 4, color: '#93C5FD' }, selected: { color: '#3B82F6' } }
          }}
        />
      </Chart>
      }
    </View>
  )
}