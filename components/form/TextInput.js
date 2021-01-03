import React from 'react'
import { Text, View, TextInput as RNTextInput } from 'react-native'

import tailwind from 'tailwind-rn'

export default function TextInput (props: {
  label: '',
  inputProps: {}
}) {
  return (
    <View>
      <Text style={tailwind('text-sm')}>{props.label}</Text>
      <RNTextInput
        {...props.inputProps}
        style={tailwind('w-full mt-2 rounded-md border-gray-300 h-10 p-2 mb-4 border')}
      />
    </View>
  )
}