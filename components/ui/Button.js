import React from 'react'
import { TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import { Text } from '@ui-kitten/components'

export default function (props) {
  return (
    <TouchableOpacity style={tailwind('py-2 px-4 bg-blue-500 rounded-md w-full')} onPress={props.onPress}>
      <Text style={tailwind('text-white text-center text-base')}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}
