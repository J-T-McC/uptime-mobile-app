import React from 'react'
import {View, Text} from 'react-native'
import tailwind from 'tailwind-rn'

export default function Card(props: {
  title: '',
  description: '',
  header?: null,
  icon?: null,
}) {
  return (
    <View style={tailwind('w-full border-b border-gray-100 mb-3 pb-3')}>
      <View style={tailwind('flex flex-row pt-1 pb-1')}>
        {props.header && <View style={tailwind('absolute top-2 right-2')}>{props.header}</View>}
        <View style={tailwind('flex justify-center flex-wrap content-center w-2/12')}>
          {props.icon && <View style={tailwind('p-2 rounded-full')}>{props.icon}</View>}
        </View>
        <View style={tailwind('min-w-0 w-10/12')}>
          <View>
            {props.title}
          </View>
          <View>
            {props.description}
          </View>
        </View>
      </View>
    </View>
  )
}