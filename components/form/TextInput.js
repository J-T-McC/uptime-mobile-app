import React from 'react'
import { View } from 'react-native'
import { Text, Input } from '@ui-kitten/components'

import tailwind from 'tailwind-rn'

export default function TextInput (props: {
  label: '',
  inputProps: {}
}) {
  return (
    <View>
      <Text style={tailwind('text-sm')}>{props.label}</Text>
      <Input
        {...props.inputProps}
        style={tailwind('h-10 mb-4 mt-2')}
      />
    </View>
  )
}