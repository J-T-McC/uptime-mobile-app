import React, { useState, useEffect } from 'react'
import { View, Text, Keyboard } from 'react-native'
import InputWrapper from '~/components/form/InputWrapper'
import tailwind from 'tailwind-rn'

export default function ChannelsScreen ({ navigation }) {

  return (
    <InputWrapper>
      <View style={tailwind('p-6 max-w-sm w-full h-full bg-white rounded-md')}>
        <View>
          <Text>Channels</Text>
        </View>
      </View>
    </InputWrapper>
  )
}