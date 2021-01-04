import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind-rn'
import SvgLogo from '~/components/svg/SvgLogo'

export default function Logo() {
  return (
    <View style={tailwind('flex items-center mb-2')}>
      <View style={tailwind('flex flex-row text-blue-700')}>
        <SvgLogo/>
        <Text style={tailwind('text-gray-700 font-semibold text-2xl')}>Uptime</Text>
      </View>
    </View>
  )
}